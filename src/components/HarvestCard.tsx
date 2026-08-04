'use client'

import { useState, useEffect } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { motion } from 'framer-motion'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract'
import { getIPFSUrl } from '@/lib/ipfs'
import toast from 'react-hot-toast'
import { Package, MapPin, DollarSign, ShoppingCart, CheckCircle } from 'lucide-react'
import { Vegetable3D, guessVegType } from '@/components/ecosystem/Vegetable3D'

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

type ResolvedMeta = {
  imageUrl: string
  description?: string
  aiGrade?: string
  aiFreshnessScore?: number
}

export default function HarvestCard({ harvest, userAddress }: HarvestCardProps) {
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [meta, setMeta] = useState<ResolvedMeta | null>(null)
  const { writeContract, data: hash } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  useEffect(() => {
    let cancelled = false

    async function resolve() {
      if (!harvest.ipfsHash) return

      const url = getIPFSUrl(harvest.ipfsHash)
      try {
        const res = await fetch(url)
        const contentType = res.headers.get('content-type') || ''

        if (contentType.includes('application/json')) {
          const json = await res.json()
          if (cancelled) return
          const imageCid = typeof json.image === 'string' ? json.image : null
          setMeta({
            imageUrl: imageCid ? getIPFSUrl(imageCid) : url,
            description: json.description,
            aiGrade: json.aiGrade || json.grade,
            aiFreshnessScore: json.aiFreshnessScore ?? json.freshnessScore,
          })
          return
        }

        if (!cancelled) setMeta({ imageUrl: url })
      } catch {
        if (!cancelled) setMeta({ imageUrl: url })
      }
    }

    resolve()
    return () => {
      cancelled = true
    }
  }, [harvest.ipfsHash])

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
  const veg = guessVegType(harvest.cropName)

  return (
    <motion.div
      className="island-card overflow-hidden p-0"
      whileHover={{ y: -10, scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
    >
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-emerald to-emerald-deep">
        {harvest.ipfsHash ? (
          <img
            src={meta?.imageUrl || getIPFSUrl(harvest.ipfsHash)}
            alt={harvest.cropName}
            className="absolute inset-0 h-full w-full object-cover opacity-55"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/80 via-transparent to-transparent" />

        {/* 3D vegetable sculpture */}
        <motion.div
          className="absolute bottom-2 right-2 h-28 w-28 drop-shadow-xl"
          animate={{ y: [0, -6, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Vegetable3D type={veg} className="h-full w-full" />
        </motion.div>

        {meta?.aiGrade && (
          <div className="absolute left-3 top-3 rounded-xl border border-gold/30 bg-emerald-deep/70 px-2.5 py-1 text-xs font-semibold text-gold-soft backdrop-blur">
            Grade {meta.aiGrade}
            {meta.aiFreshnessScore != null ? ` · ${meta.aiFreshnessScore}` : ''}
          </div>
        )}
        {harvest.sold && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-xl bg-leaf/90 px-2.5 py-1 text-xs font-semibold text-emerald-deep">
            <CheckCircle className="h-3.5 w-3.5" />
            Sold
          </div>
        )}
      </div>

      <div className="space-y-3 p-5">
        <h3 className="font-display text-xl font-bold text-emerald">{harvest.cropName}</h3>

        {meta?.description && (
          <p className="line-clamp-2 text-sm text-ink/60">{meta.description}</p>
        )}

        <div className="space-y-2 text-sm text-ink/65">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-leaf" />
            <span>{harvest.quantity.toString()} units</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-gold" />
            <span>{(Number(harvest.pricePerUnit) / 1e18).toFixed(4)} ETH / unit</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-emerald" />
            <span className="truncate">{harvest.farmer.slice(0, 10)}...</span>
          </div>
        </div>

        <div className="border-t border-emerald/10 pt-3">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-ink/55">Total</span>
            <span className="font-display text-2xl font-bold text-emerald">
              {totalPriceInEth.toFixed(4)} ETH
            </span>
          </div>

          {!harvest.sold && !isFarmer && userAddress && (
            <button
              onClick={handlePurchase}
              disabled={isPurchasing || isConfirming}
              className="btn-primary w-full"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>{isPurchasing || isConfirming ? 'Settling...' : 'Purchase'}</span>
            </button>
          )}

          {isFarmer && (
            <div className="rounded-2xl bg-sage/80 px-4 py-2 text-center text-sm font-medium text-emerald">
              Your harvest
            </div>
          )}

          {harvest.sold && (
            <div className="rounded-2xl bg-ink/5 px-4 py-2 text-center text-sm font-medium text-ink/50">
              Already sold
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
