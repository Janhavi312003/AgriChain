'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract'
import { getIPFSUrl } from '@/lib/ipfs'
import toast from 'react-hot-toast'
import { Package, MapPin, DollarSign, ShoppingCart, CheckCircle } from 'lucide-react'

interface HarvestCardProps {
  harvest: {
    id: bigint
    farmer: string
    cropName: string
    quantity: bigint
    pricePerUnit: bigint
    ipfsHash: string
    sold: boolean
    buyer: string
    createdAt: bigint
  }
  userAddress?: string
}

export default function HarvestCard({ harvest, userAddress }: HarvestCardProps) {
  const [isPurchasing, setIsPurchasing] = useState(false)
  const { writeContract, data: hash } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const totalPrice = Number(harvest.pricePerUnit) * Number(harvest.quantity)
  const totalPriceInEth = totalPrice / 1e18

  const handlePurchase = async () => {
    try {
      setIsPurchasing(true)
      
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'purchaseHarvest',
        args: [harvest.id],
        value: parseEther(totalPriceInEth.toString()),
      })

      toast.success('Transaction submitted!')
    } catch (error: any) {
      console.error('Purchase error:', error)
      toast.error(error.message || 'Failed to purchase harvest')
    } finally {
      setIsPurchasing(false)
    }
  }

  if (isSuccess) {
    toast.success('Purchase successful!')
  }

  const isFarmer = userAddress?.toLowerCase() === harvest.farmer.toLowerCase()

  return (
    <div className="card fade-in">
      {harvest.ipfsHash && (
        <div className="relative h-48 w-full mb-4 rounded-xl overflow-hidden bg-gray-100">
          <img
            src={getIPFSUrl(harvest.ipfsHash)}
            alt={harvest.cropName}
            className="w-full h-full object-cover"
          />
          {harvest.sold && (
            <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
              <CheckCircle className="w-4 h-4" />
              <span>Sold</span>
            </div>
          )}
        </div>
      )}

      <div className="space-y-3">
        <h3 className="text-xl font-bold text-gray-900">{harvest.cropName}</h3>

        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2 text-gray-600">
            <Package className="w-4 h-4 text-[#6BBE45]" />
            <span>Quantity: {harvest.quantity.toString()} units</span>
          </div>

          <div className="flex items-center space-x-2 text-gray-600">
            <DollarSign className="w-4 h-4 text-[#6BBE45]" />
            <span>Price per unit: {(Number(harvest.pricePerUnit) / 1e18).toFixed(4)} ETH</span>
          </div>

          <div className="flex items-center space-x-2 text-gray-600">
            <MapPin className="w-4 h-4 text-[#6BBE45]" />
            <span className="truncate">Farmer: {harvest.farmer.slice(0, 10)}...</span>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">Total Price:</span>
            <span className="text-2xl font-bold text-[#6BBE45]">{totalPriceInEth.toFixed(4)} ETH</span>
          </div>

          {!harvest.sold && !isFarmer && userAddress && (
            <button
              onClick={handlePurchase}
              disabled={isPurchasing || isConfirming}
              className="w-full btn-primary flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>{isPurchasing || isConfirming ? 'Processing...' : 'Purchase'}</span>
            </button>
          )}

          {isFarmer && (
            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-center text-sm font-medium">
              Your Harvest
            </div>
          )}

          {harvest.sold && (
            <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-center text-sm font-medium">
              Already Sold
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
