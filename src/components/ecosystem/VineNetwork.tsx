'use client'

import { motion } from 'framer-motion'

/** Glowing vine network — visual metaphor for on-chain farm-to-farm transfers */
export function VineNetwork({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[32px] ${className}`}>
      <svg viewBox="0 0 800 220" className="h-auto w-full" aria-hidden>
        <defs>
          <linearGradient id="vineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3dd68c" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#d4af37" stopOpacity="1" />
            <stop offset="100%" stopColor="#3dd68c" stopOpacity="0.2" />
          </linearGradient>
          <filter id="vineBlur">
            <feGaussianBlur stdDeviation="1.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Farms as nodes */}
        {[
          [80, 110],
          [250, 60],
          [420, 130],
          [580, 55],
          [720, 120],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="18" fill="#0b3d2e" />
            <circle cx={x} cy={y} r="10" fill="#3dd68c" opacity="0.85" />
            <circle cx={x} cy={y} r="4" fill="#d4af37" />
          </g>
        ))}

        {/* Glowing vines */}
        <path
          className="vine-glow"
          d="M98 110 C160 90 190 70 232 65"
          fill="none"
          stroke="url(#vineGrad)"
          strokeWidth="3"
          filter="url(#vineBlur)"
        />
        <path
          className="vine-glow"
          d="M268 70 C320 100 360 140 402 128"
          fill="none"
          stroke="url(#vineGrad)"
          strokeWidth="3"
          filter="url(#vineBlur)"
          style={{ animationDelay: '0.6s' }}
        />
        <path
          className="vine-glow"
          d="M438 120 C490 80 520 50 562 58"
          fill="none"
          stroke="url(#vineGrad)"
          strokeWidth="3"
          filter="url(#vineBlur)"
          style={{ animationDelay: '1.2s' }}
        />
        <path
          className="vine-glow"
          d="M598 62 C650 90 680 120 702 118"
          fill="none"
          stroke="url(#vineGrad)"
          strokeWidth="3"
          filter="url(#vineBlur)"
          style={{ animationDelay: '1.8s' }}
        />

        <motion.circle
          r="5"
          fill="#d4af37"
          animate={{
            cx: [98, 232, 402, 562, 702],
            cy: [110, 65, 128, 58, 118],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-emerald-deep/80 to-transparent p-6 pt-16">
        <p className="font-display text-lg font-semibold text-gold-soft">Settlement vines</p>
        <p className="mt-1 max-w-md text-sm text-white/70">
          Each payment travels as a luminous vine — farm to farm, sealed by Base.
        </p>
      </div>
    </div>
  )
}
