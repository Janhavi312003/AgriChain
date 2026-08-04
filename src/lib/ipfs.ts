export type HarvestMetadata = {
  name: string
  description?: string
  image: string
  grade?: string
  freshnessScore?: number
  qualityNotes?: string
  tags?: string[]
  aiGrade?: string
  aiFreshnessScore?: number
  aiGenerated: boolean
}

/** Upload a raw file to Pinata and return the IPFS CID. */
export async function uploadToIPFS(file: File): Promise<string> {
  const JWT = process.env.NEXT_PUBLIC_PINATA_JWT

  if (!JWT) {
    throw new Error('Pinata JWT not configured')
  }

  try {
    const formData = new FormData()
    formData.append('file', file)

    const metadata = JSON.stringify({
      name: file.name,
    })
    formData.append('pinataMetadata', metadata)

    const options = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', options)

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
      body: formData,
    })

    const data = await response.json()
    if (!response.ok || !data.IpfsHash) {
      throw new Error(data.error?.details || data.error || 'Failed to pin file to IPFS')
    }
    return data.IpfsHash
  } catch (error) {
    console.error('Error uploading to IPFS:', error)
    throw error
  }
}

/** Pin a JSON object to Pinata and return the IPFS CID. */
export async function uploadJSONToIPFS(
  json: Record<string, unknown>,
  name = 'agrichain-harvest-metadata'
): Promise<string> {
  const JWT = process.env.NEXT_PUBLIC_PINATA_JWT

  if (!JWT) {
    throw new Error('Pinata JWT not configured')
  }

  const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${JWT}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pinataContent: json,
      pinataMetadata: { name },
    }),
  })

  const data = await response.json()
  if (!response.ok || !data.IpfsHash) {
    throw new Error(data.error?.details || data.error || 'Failed to pin JSON to IPFS')
  }
  return data.IpfsHash
}

/**
 * Upload harvest image, then pin a metadata JSON that references it
 * (includes AI grade/freshness fields). Returns the metadata CID to store on-chain.
 */
export async function uploadHarvestToIPFS(
  imageFile: File,
  fields: {
    name: string
    description?: string
    grade?: string
    freshnessScore?: number
    qualityNotes?: string
    tags?: string[]
    aiGrade?: string
    aiFreshnessScore?: number
    aiGenerated: boolean
  }
): Promise<string> {
  const imageHash = await uploadToIPFS(imageFile)

  const metadata: HarvestMetadata = {
    name: fields.name,
    description: fields.description || '',
    image: imageHash,
    grade: fields.grade,
    freshnessScore: fields.freshnessScore,
    qualityNotes: fields.qualityNotes,
    tags: fields.tags || [],
    aiGrade: fields.aiGrade,
    aiFreshnessScore: fields.aiFreshnessScore,
    aiGenerated: fields.aiGenerated,
  }

  return uploadJSONToIPFS(metadata as unknown as Record<string, unknown>, `harvest-${fields.name}`)
}

export function getIPFSUrl(hash: string): string {
  const gateway = process.env.NEXT_PUBLIC_PINATA_GATEWAY || 'gateway.pinata.cloud'
  // Strip ipfs:// prefix if present
  const cid = hash.replace(/^ipfs:\/\//, '')
  return `https://${gateway}/ipfs/${cid}`
}
