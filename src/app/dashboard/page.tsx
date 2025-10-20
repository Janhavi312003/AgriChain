'use client'

import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import Navbar from '@/components/Navbar'
import HarvestCard from '@/components/HarvestCard'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract'
import { uploadToIPFS } from '@/lib/ipfs'
import toast from 'react-hot-toast'
import { Upload, User, Loader2 } from 'lucide-react'

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
  const [quantity, setQuantity] = useState('')
  const [pricePerUnit, setPricePerUnit] = useState('')
  const [cropImage, setCropImage] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  // Contract interactions
  const { writeContract, data: hash } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  // Read farmer data
  const { data: farmerData, isLoading: isLoadingFarmer, refetch: refetchFarmer } = useReadContract({
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

  useEffect(() => {
    if (isSuccess) {
      toast.success('Transaction successful!')
      refetchFarmer()
      refetchHarvests()

      // Reset forms
      setFarmerName('')
      setFarmerLocation('')
      setCropName('')
      setQuantity('')
      setPricePerUnit('')
      setCropImage(null)
    }
  }, [isSuccess])

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
      const ipfsHash = await uploadToIPFS(cropImage)
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

  // Do not render content until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        {/* Optional: static or no loader here */}
      </div>
    )
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="text-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md mx-auto">
              <div className="bg-[#6BBE45]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-[#6BBE45]" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
              <p className="text-gray-600 mb-6">Please connect your wallet to access the dashboard</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const isFarmerRegistered = farmerData && (farmerData as any).isRegistered

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your harvests and explore the marketplace</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          <button onClick={() => setActiveTab('marketplace')} className={`pb-4 px-4 font-medium transition-colors ${activeTab === 'marketplace' ? 'text-[#6BBE45] border-b-2 border-[#6BBE45]' : 'text-gray-600 hover:text-gray-900'}`}>
            Marketplace
          </button>
          <button onClick={() => setActiveTab('register')} className={`pb-4 px-4 font-medium transition-colors ${activeTab === 'register' ? 'text-[#6BBE45] border-b-2 border-[#6BBE45]' : 'text-gray-600 hover:text-gray-900'}`}>
            Register as Farmer
          </button>
          <button onClick={() => setActiveTab('upload')} className={`pb-4 px-4 font-medium transition-colors ${activeTab === 'upload' ? 'text-[#6BBE45] border-b-2 border-[#6BBE45]' : 'text-gray-600 hover:text-gray-900'}`} disabled={!isFarmerRegistered}>
            Upload Harvest
          </button>
        </div>

        {/* Content */}
        {activeTab === 'marketplace' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Available Harvests</h2>
              <p className="text-gray-600">Browse and purchase fresh produce directly from farmers</p>
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
                  <p className="text-gray-600">No harvests available yet</p>
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
                  <p className="text-gray-600 mb-4">You are registered as a farmer</p>
                  <div className="bg-gray-50 p-4 rounded-xl text-left">
                    <p className="text-sm text-gray-600 mb-1">Name</p>
                    <p className="font-medium mb-3">{(farmerData as any).name}</p>
                    <p className="text-sm text-gray-600 mb-1">Location</p>
                    <p className="font-medium">{(farmerData as any).location}</p>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-6">Register as Farmer</h2>
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
                          <span>Register</span>
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
                  <h2 className="text-2xl font-bold mb-6">Upload New Harvest</h2>
                  <form onSubmit={handleUploadHarvest} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Crop Name
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Crop Image
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#6BBE45] transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setCropImage(e.target.files?.[0] || null)}
                          className="hidden"
                          id="crop-image"
                          required
                        />
                        <label htmlFor="crop-image" className="cursor-pointer">
                          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600">{cropImage ? cropImage.name : 'Click to upload image'}</p>
                        </label>
                      </div>
                    </div>
                    <button type="submit" disabled={isUploading || isConfirming} className="w-full btn-primary flex items-center justify-center space-x-2">
                      {isUploading || isConfirming ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-5 h-5" />
                          <span>Upload Harvest</span>
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
