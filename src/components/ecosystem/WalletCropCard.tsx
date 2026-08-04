'use client'

import { useEffect, useMemo, useState } from 'react'
import { useAccount, useBalance } from 'wagmi'
import { IconWalletLeaf } from './Icons'

/** Wallet glass card — crops grow taller as ETH balance increases */
export function WalletCropCard() {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const eth = mounted && isConnected && balance ? Number(balance.formatted) : 0
  const growth = Math.min(1, eth / 0.05)

  const stalks = useMemo(
    () =>
      [0, 1, 2, 3, 4].map((i) => {
        const base = 18 + i * 4
        const height = base + growth * (28 + i * 6)
        return { i, height }
      }),
    [growth]
  )

  const balanceLabel =
    mounted && isConnected && balance
      ? `${eth.toFixed(4)} ${balance.symbol}`
      : 'Connect to grow'

  return (
    <div className="island-card gold-ring p-5 transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-ink/55">Wallet canopy</p>
          <p className="mt-1 font-display text-2xl font-bold text-emerald">{balanceLabel}</p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald text-gold-soft">
          <IconWalletLeaf size={20} />
        </span>
      </div>

      <svg viewBox="0 0 220 90" className="h-20 w-full" aria-hidden>
        <defs>
          <linearGradient id="cropGold" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#0b3d2e" />
            <stop offset="100%" stopColor="#d4af37" />
          </linearGradient>
        </defs>
        <path d="M0 78 Q55 68 110 78 T220 78 L220 90 L0 90 Z" fill="#0b3d2e" opacity="0.85" />
        {stalks.map(({ i, height }) => {
          const x = 30 + i * 40
          return (
            <g key={i}>
              <line
                x1={x}
                y1={78}
                x2={x}
                y2={78 - height}
                stroke="url(#cropGold)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <ellipse
                cx={x}
                cy={78 - height - 6}
                rx={7 + growth * 3}
                ry={10 + growth * 4}
                fill="#3dd68c"
              />
              {growth > 0.35 && (
                <circle cx={x + 4} cy={78 - height - 2} r={2.5} fill="#d4af37" />
              )}
            </g>
          )
        })}
      </svg>

      <p className="mt-2 text-xs text-ink/50">
        {mounted && isConnected
          ? growth > 0.6
            ? 'Canopy thriving - balance feeds the field.'
            : 'Crops respond to on-chain balance.'
          : 'Link a wallet to awaken the plot.'}
      </p>
    </div>
  )
}
