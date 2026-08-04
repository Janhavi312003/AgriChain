import { GoogleGenAI, ThinkingLevel } from '@google/genai'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

// In-memory rate limiter: max 10 requests per wallet address per hour.
// NOTE: This Map resets on server restart. Replace with Redis/Upstash before production scale.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 10
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour
// Vision + JSON can exceed 15s on gemini-3.x; keep headroom above typical latency.
const GEMINI_TIMEOUT_MS = 45_000

export type ProduceAnalysis = {
  grade: 'A' | 'B' | 'C'
  freshnessScore: number
  qualityNotes: string
  title: string
  description: string
  tags: string[]
  aiAvailable: boolean
}

const SAFE_DEFAULT: ProduceAnalysis = {
  grade: 'C',
  freshnessScore: 0,
  qualityNotes: 'Automatic analysis unavailable. Please fill in details manually.',
  title: '',
  description: '',
  tags: [],
  aiAvailable: false,
}

function checkRateLimit(walletAddress: string): boolean {
  const key = walletAddress.toLowerCase()
  const now = Date.now()
  const entry = rateLimitMap.get(key)

  if (!entry || now >= entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false
  }

  entry.count += 1
  return true
}

function buildPrompt(cropType?: string, farmerNotes?: string): string {
  return `You are an agricultural produce quality assessor. Analyze this crop/produce image and respond with ONLY valid JSON (no markdown, no extra text) in this exact shape:

{
  "grade": "A" | "B" | "C",
  "freshnessScore": <integer 0-100>,
  "qualityNotes": "<one sentence on visible quality, max 25 words>",
  "title": "<short marketplace title, max 8 words>",
  "description": "<buyer-facing product description, 2-3 sentences, honest and non-exaggerated>",
  "tags": ["<up to 5 relevant tags>"]
}

Crop type (if provided by farmer): ${cropType || 'not provided'}
Farmer's notes (if provided): ${farmerNotes || 'not provided'}

Base the grade and freshness purely on visible cues in the image: color, blemishes, ripeness, damage, uniformity. If the image is unclear, blurry, or does not show produce, set "grade" to "C", explain why in qualityNotes, and keep the description neutral.`
}

function stripMarkdownFences(text: string): string {
  return text
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim()
}

function parseAnalysis(raw: string): ProduceAnalysis | null {
  try {
    const cleaned = stripMarkdownFences(raw)
    const parsed = JSON.parse(cleaned)

    const grade = parsed.grade
    if (grade !== 'A' && grade !== 'B' && grade !== 'C') return null

    const freshnessScore = Number(parsed.freshnessScore)
    if (!Number.isFinite(freshnessScore)) return null

    return {
      grade,
      freshnessScore: Math.max(0, Math.min(100, Math.round(freshnessScore))),
      qualityNotes: String(parsed.qualityNotes || '').slice(0, 200),
      title: String(parsed.title || '').slice(0, 80),
      description: String(parsed.description || ''),
      tags: Array.isArray(parsed.tags)
        ? parsed.tags.map((t: unknown) => String(t)).slice(0, 5)
        : [],
      aiAvailable: true,
    }
  } catch {
    return null
  }
}

async function callGemini(
  base64Image: string,
  mimeType: string,
  cropType?: string,
  farmerNotes?: string
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured')
  }

  const ai = new GoogleGenAI({ apiKey })
  const prompt = buildPrompt(cropType, farmerNotes)

  const responsePromise = ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: [
      { inlineData: { data: base64Image, mimeType } },
      prompt,
    ],
    config: {
      // Produce grading is a simple vision task — minimize thinking to cut latency.
      thinkingConfig: {
        thinkingLevel: ThinkingLevel.MINIMAL,
      },
    },
  })

  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error('Gemini request timed out')), GEMINI_TIMEOUT_MS)
  })

  const response = await Promise.race([responsePromise, timeoutPromise])
  const text = response.text

  if (!text) {
    throw new Error('Empty response from Gemini')
  }

  return text
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get('image')
    const cropType = (formData.get('cropType') as string | null)?.trim() || undefined
    const farmerNotes = (formData.get('farmerNotes') as string | null)?.trim() || undefined
    const walletAddress =
      (formData.get('walletAddress') as string | null)?.trim() || 'anonymous'

    if (!image || !(image instanceof File)) {
      return NextResponse.json(
        { success: false, error: 'Image file is required' },
        { status: 400 }
      )
    }

    if (!image.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: 'File must be an image' },
        { status: 400 }
      )
    }

    if (!checkRateLimit(walletAddress)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit exceeded. Please try again later.',
          data: SAFE_DEFAULT,
        },
        { status: 429 }
      )
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        success: true,
        data: SAFE_DEFAULT,
        error: "Couldn't analyze image automatically - please fill details manually",
      })
    }

    const buffer = Buffer.from(await image.arrayBuffer())
    const base64Image = buffer.toString('base64')
    const mimeType = image.type || 'image/jpeg'

    // First attempt
    let rawText: string
    try {
      rawText = await callGemini(base64Image, mimeType, cropType, farmerNotes)
    } catch (err) {
      console.error('Gemini call failed - full error object:', err)
      console.error(
        'Gemini call failed - serialized:',
        err instanceof Error
          ? { name: err.name, message: err.message, stack: err.stack, cause: err.cause }
          : err
      )
      return NextResponse.json({
        success: true,
        data: SAFE_DEFAULT,
        error: "Couldn't analyze image automatically - please fill details manually",
      })
    }

    let parsed = parseAnalysis(rawText)

    // Retry once if JSON parsing fails
    if (!parsed) {
      try {
        rawText = await callGemini(base64Image, mimeType, cropType, farmerNotes)
        parsed = parseAnalysis(rawText)
      } catch (err) {
        console.error('Gemini retry failed - full error object:', err)
        console.error(
          'Gemini retry failed - serialized:',
          err instanceof Error
            ? { name: err.name, message: err.message, stack: err.stack, cause: err.cause }
            : err
        )
      }
    }

    if (!parsed) {
      return NextResponse.json({
        success: true,
        data: SAFE_DEFAULT,
        error: "Couldn't analyze image automatically - please fill details manually",
      })
    }

    return NextResponse.json({ success: true, data: parsed })
  } catch (error) {
    console.error('analyze-produce error - full error object:', error)
    console.error(
      'analyze-produce error - serialized:',
      error instanceof Error
        ? { name: error.name, message: error.message, stack: error.stack, cause: error.cause }
        : error
    )
    return NextResponse.json({
      success: true,
      data: SAFE_DEFAULT,
      error: "Couldn't analyze image automatically - please fill details manually",
    })
  }
}
