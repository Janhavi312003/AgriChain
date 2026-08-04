'use client'

import { useEffect, useState } from 'react'

/**
 * Living Ledger ticker — placeholder harvest entries.
 * TODO: eventually pull from on-chain getAllHarvests instead of SAMPLE_LISTINGS.
 */
const SAMPLE_LISTINGS = [
  'Organic Tomatoes · Grade A · Nashik · 0.002 ETH',
  'Basmati Rice · Grade A · Punjab · 0.0015 ETH',
  'Alphonso Mangoes · Grade B · Ratnagiri · 0.003 ETH',
  'Fresh Spinach · Grade A · Ooty · 0.0008 ETH',
  'Sugarcane · Grade B · Kolhapur · 0.0012 ETH',
  'Turmeric · Grade A · Erode · 0.0025 ETH',
  'Cotton · Grade B · Gujarat · 0.0018 ETH',
  'Green Chillies · Grade A · Andhra · 0.0009 ETH',
]

export default function LivingLedgerTicker() {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const onChange = () => setReduceMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const items = SAMPLE_LISTINGS

  if (reduceMotion) {
    return (
      <div className="ledger-ticker" role="region" aria-label="Sample harvest listings">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-3.5">
          {items.slice(0, 4).map((entry) => (
            <span key={entry} className="font-mono text-[13px] tracking-wide text-cream sm:text-sm">
              {entry}
              <span className="mx-3 text-cream/50" aria-hidden>
                ·
              </span>
            </span>
          ))}
        </div>
      </div>
    )
  }

  // Duplicate list for seamless wraparound (track translates -50%)
  const loop = [...items, ...items]

  return (
    <div className="ledger-ticker" role="region" aria-label="Sample harvest listings">
      <div className="ledger-ticker-track py-3.5">
        {loop.map((entry, i) => (
          <span
            key={`${entry}-${i}`}
            className="inline-flex shrink-0 items-center whitespace-nowrap px-1 font-mono text-[13px] tracking-wide text-cream sm:text-sm"
          >
            {entry}
            <span className="mx-5 text-cream/55" aria-hidden>
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
