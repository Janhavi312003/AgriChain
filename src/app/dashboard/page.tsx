'use client'

import { useState, useEffect, useRef } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import Navbar from '@/components/Navbar'
import HarvestCard from '@/components/HarvestCard'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract'
import { uploadHarvestToIPFS } from '@/lib/ipfs'
import toast from 'react-hot-toast'
import { Upload, User, Loader2, RefreshCw, Sparkles } from 'lucide-react'

type Grade = 'A' | 'B' | 'C' | ''

const ANALYZE_TIMEOUT_MS = 50_000 // slightly above server Gemini timeout (45s)

export default function Dashboard() {
  const { address, isConnected } = useAccount()
  const [activeTab, setActiveTab] = useState<'register' | 'upload' | 'marketplace'>('marketplace')

  // Mounted flag to avoid hydration mismatch
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Farmer registration state
  const [farmerName, setFarmerName] = useState('')
  const [farmerLocation, setFarmerLocation] = useState('')

  // Harvest upload state
  const [cropName, setCropName] = useState('')
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState('')
  const [pricePerUnit, setPricePerUnit] = useState('')
  const [farmerNotes, setFarmerNotes] = useState('')
  const [cropImage, setCropImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  // AI analysis state
  const [grade, setGrade] = useState<Grade>('')
  const [freshnessScore, setFreshnessScore] = useState<number | null>(null)
  const [qualityNotes, setQualityNotes] = useState('')
  const [aiTags, setAiTags] = useState<string[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [aiError, setAiError] = useState<string | null>(null)
  const [aiAvailable, setAiAvailable] = useState(false)
  // Snapshots of AI-filled text to detect manual edits for aiGenerated flag
  const [originalAiTitle, setOriginalAiTitle] = useState('')
  const [originalAiDescription, setOriginalAiDescription] = useState('')

  const analyzingRef = useRef(false)
  // AbortController lives in a ref so re-renders never recreate/abort it accidentally.
  // Only abort on: (a) unmount, (b) Regenerate replacing an in-flight call, (c) 15s timeout.
  const abortControllerRef = useRef<AbortController | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Contract interactions
  const { writeContract, data: hash } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  // Read farmer data
  const { data: farmerData, refetch: refetchFarmer } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getFarmer',
    args: address ? [address] : undefined,
  })

  // Read all harvests
  const { data: harvests, isLoading: isLoadingHarvests, refetch: refetchHarvests } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getAllHarvests',
  })

  const clearAnalysisTimeout = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  const abortInFlightAnalysis = (reason: string) => {
    clearAnalysisTimeout()
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(reason)
      abortControllerRef.current = null
    }
  }

  const resetUploadForm = () => {
    abortInFlightAnalysis('reset')
    setCropName('')
    setDescription('')
    setQuantity('')
    setPricePerUnit('')
    setFarmerNotes('')
    setCropImage(null)
    setImagePreview(null)
    setGrade('')
    setFreshnessScore(null)
    setQualityNotes('')
    setAiTags([])
    setAiError(null)
    setAiAvailable(false)
    setOriginalAiTitle('')
    setOriginalAiDescription('')
    setIsAnalyzing(false)
    analyzingRef.current = false
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Transaction successful!')
      refetchFarmer()
      refetchHarvests()
      setFarmerName('')
      setFarmerLocation('')
      resetUploadForm()
    }
  }, [isSuccess])

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview)
    }
  }, [imagePreview])

  // Abort in-flight analysis only on true unmount — not on benign re-renders.
  useEffect(() => {
    return () => {
      abortInFlightAnalysis('unmount')
    }
  }, [])

  const analyzeProduce = async (file: File, cropTypeHint?: string) => {
    // Regenerate / new run: cancel the previous request, then start fresh.
    abortInFlightAnalysis('replaced')

    analyzingRef.current = true
    setIsAnalyzing(true)
    setAiError(null)

    const controller = new AbortController()
    abortControllerRef.current = controller
    timeoutRef.current = setTimeout(() => {
      controller.abort('timeout')
    }, ANALYZE_TIMEOUT_MS)

    try {
      const formData = new FormData()
      formData.append('image', file)
      if (cropTypeHint?.trim()) formData.append('cropType', cropTypeHint.trim())
      if (farmerNotes.trim()) formData.append('farmerNotes', farmerNotes.trim())
      if (address) formData.append('walletAddress', address)

      const response = await fetch('/api/analyze-produce', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      })

      clearAnalysisTimeout()

      const result = await response.json()
      const data = result.data

      if (!data || data.aiAvailable === false) {
        setAiAvailable(false)
        setAiError(
          result.error ||
            "Couldn't analyze image automatically - please fill details manually"
        )
        return
      }

      setAiAvailable(true)
      setGrade(data.grade as Grade)
      setFreshnessScore(data.freshnessScore)
      setQualityNotes(data.qualityNotes || '')
      setAiTags(Array.isArray(data.tags) ? data.tags : [])

      if (data.title) {
        setCropName(data.title)
        setOriginalAiTitle(data.title)
      }
      if (data.description) {
        setDescription(data.description)
        setOriginalAiDescription(data.description)
      }
    } catch (err) {
      const reason = controller.signal.reason
      const isAbort =
        err === 'timeout' ||
        err === reason ||
        (typeof DOMException !== 'undefined' &&
          err instanceof DOMException &&
          err.name === 'AbortError') ||
        (err instanceof Error && err.name === 'AbortError')

      if (isAbort) {
        // Benign: superseded by Regenerate, form reset, or component unmount
        if (reason === 'replaced' || reason === 'unmount' || reason === 'reset') {
          return
        }
        console.error('Analyze produce aborted:', reason, err)
      } else {
        console.error('Analyze produce error:', err)
      }

      setAiAvailable(false)
      setAiError("Couldn't analyze image automatically - please fill details manually")
    } finally {
      // Only the active request may clear shared in-flight state (avoids race with Regenerate)
      if (abortControllerRef.current === controller) {
        clearAnalysisTimeout()
        abortControllerRef.current = null
        setIsAnalyzing(false)
        analyzingRef.current = false
      }
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null

    if (imagePreview) URL.revokeObjectURL(imagePreview)

    // Cancel any in-flight analysis when the image changes
    abortInFlightAnalysis('replaced')
    setIsAnalyzing(false)
    analyzingRef.current = false

    // Reset AI fields when image changes
    setGrade('')
    setFreshnessScore(null)
    setQualityNotes('')
    setAiTags([])
    setAiError(null)
    setAiAvailable(false)
    setOriginalAiTitle('')
    setOriginalAiDescription('')

    if (!file) {
      setCropImage(null)
      setImagePreview(null)
      return
    }

    setCropImage(file)
    setImagePreview(URL.createObjectURL(file))

    // AI assist — never blocks listing if it fails
    await analyzeProduce(file, cropName)
  }

  const handleRegenerate = async () => {
    if (!cropImage) return
    // Mid-request Regenerate aborts the previous call via abortInFlightAnalysis('replaced')
    await analyzeProduce(cropImage, cropName)
  }

  const handleRegisterFarmer = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'registerFarmer',
        args: [farmerName, farmerLocation],
      })
      toast.success('Registration submitted!')
    } catch (error: any) {
      console.error('Registration error:', error)
      toast.error(error.message || 'Failed to register')
    }
  }

  const handleUploadHarvest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!cropImage) {
      toast.error('Please select an image')
      return
    }
    try {
      setIsUploading(true)

      const aiGenerated =
        aiAvailable &&
        cropName.trim() === originalAiTitle.trim() &&
        description.trim() === originalAiDescription.trim()

      const ipfsHash = await uploadHarvestToIPFS(cropImage, {
        name: cropName,
        description,
        grade: grade || undefined,
        freshnessScore: freshnessScore ?? undefined,
        qualityNotes: qualityNotes || undefined,
        tags: aiTags,
        aiGrade: grade || undefined,
        aiFreshnessScore: freshnessScore ?? undefined,
        aiGenerated,
      })

      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'uploadHarvest',
        args: [cropName, BigInt(quantity), parseEther(pricePerUnit), ipfsHash],
      })
      toast.success('Harvest upload submitted!')
    } catch (error: any) {
      console.error('Upload error:', error)
      toast.error(error.message || 'Failed to upload harvest')
    } finally {
      setIsUploading(false)
    }
  }

  const gradeBadgeClass =
    grade === 'A'
      ? 'bg-green-100 text-green-800'
      : grade === 'B'
        ? 'bg-amber-100 text-amber-800'
        : grade === 'C'
          ? 'bg-orange-100 text-orange-800'
          : 'bg-gray-100 text-gray-600'

  // Do not render content until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-pulse rounded-full bg-emerald/20" />
      </div>
    )
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex min-h-[70vh] items-center justify-center px-4">
          <div className="island-card gold-ring max-w-md p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald text-gold-soft">
              <User className="h-8 w-8" />
            </div>
            <h2 className="font-display text-2xl font-bold text-emerald">Connect your wallet</h2>
            <p className="mt-3 text-ink/60">
              Use Connect Wallet in the navbar to open a secure Web3 session and enter the market.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const isFarmerRegistered = farmerData && (farmerData as any).isRegistered

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-emerald">Field Dashboard</h1>
          <p className="mt-1 text-ink/60">A simple place to sell your harvest or buy fresh produce directly from growers.</p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button onClick={() => setActiveTab('marketplace')} className={`min-h-11 rounded-2xl px-5 py-3 font-display text-sm font-semibold transition ${activeTab === 'marketplace' ? 'bg-emerald text-gold-soft shadow-lg' : 'bg-white/60 text-ink/60 hover:bg-sage/60'}`}>
            Marketplace
          </button>
          <button onClick={() => setActiveTab('register')} className={`min-h-11 rounded-2xl px-5 py-3 font-display text-sm font-semibold transition ${activeTab === 'register' ? 'bg-emerald text-gold-soft shadow-lg' : 'bg-white/60 text-ink/60 hover:bg-sage/60'}`}>
            Register as Farmer
          </button>
          <button onClick={() => setActiveTab('upload')} className={`min-h-11 rounded-2xl px-5 py-3 font-display text-sm font-semibold transition ${activeTab === 'upload' ? 'bg-emerald text-gold-soft shadow-lg' : 'bg-white/60 text-ink/60 hover:bg-sage/60'}`} disabled={!isFarmerRegistered}>
            List Your Harvest
          </button>
        </div>

        {/* Content */}
        {activeTab === 'marketplace' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Fresh from the farm</h2>
              <p className="text-gray-600">Browse produce listed directly by growers. Every purchase is recorded securely on-chain.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {harvests === undefined || isLoadingHarvests ? (
                <div className="col-span-full text-center py-12">
                  <Loader2 className="w-12 h-12 animate-spin text-[#6BBE45] mx-auto" />
                </div>
              ) : harvests.length > 0 ? (
                (harvests as any[]).map((harvest) => (
                  <HarvestCard key={harvest.id.toString()} harvest={harvest} userAddress={address} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-600">The market is ready for its first harvest. Register as a farmer and create the first listing.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'register' && (
          <div className="max-w-2xl mx-auto">
            <div className="card">
              {isFarmerRegistered ? (
                <div className="text-center py-8">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Already Registered</h3>
                  <p className="text-gray-600 mb-4">Your grower profile is active. You can now list harvests for buyers to discover.</p>
                  <div className="bg-gray-50 p-4 rounded-xl text-left">
                    <p className="text-sm text-gray-600 mb-1">Name</p>
                    <p className="font-medium mb-3">{(farmerData as any).name}</p>
                    <p className="text-sm text-gray-600 mb-1">Location</p>
                    <p className="font-medium">{(farmerData as any).location}</p>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-6">Start selling as a grower</h2>
                  <p className="mb-6 text-gray-600">Create your on-chain grower profile once, then list each harvest in a few clear steps.</p>
                  <form onSubmit={handleRegisterFarmer} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={farmerName}
                        onChange={(e) => setFarmerName(e.target.value)}
                        className="input-field"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={farmerLocation}
                        onChange={(e) => setFarmerLocation(e.target.value)}
                        className="input-field"
                        placeholder="City, State, Country"
                        required
                      />
                    </div>
                    <button type="submit" disabled={isConfirming} className="w-full btn-primary flex items-center justify-center space-x-2">
                      {isConfirming ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <User className="w-5 h-5" />
                          <span>Create grower profile</span>
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="max-w-2xl mx-auto">
            <div className="card">
              {!isFarmerRegistered ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">Please register as a farmer first to upload harvests</p>
                  <button onClick={() => setActiveTab('register')} className="btn-primary mt-4">
                    Register Now
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-6">Turn today&apos;s harvest into a trusted listing</h2>
                  <p className="mb-6 text-gray-600">Add a photo and the essentials. AI can suggest details, but you always review and publish the final listing.</p>
                  <form onSubmit={handleUploadHarvest} className="space-y-4">
                    {/* Image upload + AI preview */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Crop Image
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#6BBE45] transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          id="crop-image"
                          required
                          disabled={isAnalyzing}
                        />
                        <label
                          htmlFor="crop-image"
                          className={`cursor-pointer ${isAnalyzing ? 'pointer-events-none opacity-60' : ''}`}
                        >
                          {imagePreview ? (
                            <img
                              src={imagePreview}
                              alt="Crop preview"
                              className="mx-auto mb-3 max-h-48 rounded-lg object-cover"
                            />
                          ) : (
                            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          )}
                          <p className="text-gray-600">
                            {cropImage ? cropImage.name : 'Add a clear photo of your crop'}
                          </p>
                          <p className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            AI suggests a quality grade and buyer-friendly description
                          </p>
                        </label>
                      </div>

                      {isAnalyzing && (
                        <div className="mt-3 flex items-center gap-2 text-sm text-[#6BBE45]">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Reviewing your crop photo...</span>
                        </div>
                      )}

                      {aiError && !isAnalyzing && (
                        <p className="mt-3 text-sm text-amber-700 bg-amber-50 px-3 py-2 rounded-lg">
                          {aiError}
                        </p>
                      )}

                      {(grade || freshnessScore !== null) && !isAnalyzing && (
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {grade && (
                            <span className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-semibold ${gradeBadgeClass}`}>
                              Grade {grade}
                            </span>
                          )}
                          {freshnessScore !== null && (
                            <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-sky-50 text-sky-800">
                              Freshness {freshnessScore}/100
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={handleRegenerate}
                            disabled={!cropImage}
                            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 disabled:opacity-50"
                          >
                            <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
                            Regenerate
                          </button>
                        </div>
                      )}

                      {qualityNotes && !isAnalyzing && aiAvailable && (
                        <p className="mt-2 text-xs text-gray-500">{qualityNotes}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Crop Name / Title
                      </label>
                      <input
                        type="text"
                        value={cropName}
                        onChange={(e) => setCropName(e.target.value)}
                        className="input-field"
                        placeholder="e.g., Organic Tomatoes"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input-field min-h-[96px] resize-y"
                        placeholder="Tell buyers what makes this harvest special—variety, freshness, growing method, or harvest date."
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quality Grade
                        </label>
                        <select
                          value={grade}
                          onChange={(e) => setGrade(e.target.value as Grade)}
                          className="input-field"
                        >
                          <option value="">Select grade</option>
                          <option value="A">A — Excellent</option>
                          <option value="B">B — Good</option>
                          <option value="C">C — Fair</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Farmer Notes (optional)
                        </label>
                        <input
                          type="text"
                          value={farmerNotes}
                          onChange={(e) => setFarmerNotes(e.target.value)}
                          className="input-field"
                          placeholder="e.g., harvested this morning"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quantity (units)
                        </label>
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          className="input-field"
                          placeholder="100"
                          min="1"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Price per Unit (ETH)
                        </label>
                        <input
                          type="number"
                          step="0.0001"
                          value={pricePerUnit}
                          onChange={(e) => setPricePerUnit(e.target.value)}
                          className="input-field"
                          placeholder="0.001"
                          min="0.0001"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isUploading || isConfirming || isAnalyzing}
                      className="w-full btn-primary flex items-center justify-center space-x-2"
                    >
                      {isUploading || isConfirming ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-5 h-5" />
                          <span>List Your Harvest</span>
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
