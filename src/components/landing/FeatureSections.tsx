'use client'

import { motion, useReducedMotion } from 'framer-motion'

const FEATURES = [
  {
    title: 'fair prices, direct from farmers',
    body: 'Buyers meet growers without a middleman taking a cut. Listings set by farmers, paid on-chain — so more of every rupee stays with the people who grew the crop.',
    icon: FairPriceIcon,
  },
  {
    title: 'AI-verified quality',
    body: 'Upload a harvest photo and Gemini suggests a grade and honest description. Farmers stay in control — AI assists, it never blocks a listing.',
    icon: AiQualityIcon,
  },
  {
    title: 'transparent, on-chain trust',
    body: 'Every sale settles on Base. Provenance, price, and payment live on a public ledger you can verify — not a private spreadsheet.',
    icon: TrustIcon,
  },
  {
    title: 'Base network, low fees',
    body: 'Built for real farm commerce: fast finality and fees low enough that a small harvest listing still makes sense.',
    icon: BaseFeesIcon,
  },
]

export default function FeatureSections() {
  const reduceMotion = useReducedMotion()

  return (
    <div>
      {FEATURES.map((feature, i) => {
        const bg = i % 2 === 0 ? 'bg-cream' : 'bg-sprout-light'
        const Icon = feature.icon

        return (
          <section
            key={feature.title}
            className={`${bg} px-5 py-16 sm:px-8 sm:py-20 lg:px-10`}
          >
            <motion.div
              className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2 lg:gap-16"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={i % 2 === 1 ? 'lg:order-2' : undefined}>
                <motion.div
                  className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-fresh-green/15 text-fresh-green shadow-[0_8px_24px_rgba(31,61,26,0.06)]"
                  whileHover={reduceMotion ? undefined : { y: -3, rotate: -3 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                >
                  <Icon />
                </motion.div>
                <h2 className="mt-6 font-display text-3xl font-light lowercase leading-tight tracking-tight text-deep-forest sm:text-4xl">
                  {feature.title}
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-parchment-dim sm:text-lg">
                  {feature.body}
                </p>
              </div>

              <div className={i % 2 === 1 ? 'lg:order-1' : undefined}>
                <div className="rounded-[28px] border border-deep-forest/8 bg-cream/80 p-8 shadow-[0_16px_40px_rgba(31,61,26,0.07)] sm:p-10">
                  <Icon large />
                </div>
              </div>
            </motion.div>
          </section>
        )
      })}
    </div>
  )
}

function FairPriceIcon({ large = false }: { large?: boolean }) {
  const s = large ? 120 : 28
  return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none" aria-hidden className={large ? 'mx-auto text-fresh-green' : ''}>
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" />
      <path d="M24 14v20M18 20c0-2.5 2.5-4 6-4s6 1.5 6 4-2.5 4-6 4-6 1.5-6 4 2.5 4 6 4 6-1.5 6-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function AiQualityIcon({ large = false }: { large?: boolean }) {
  const s = large ? 120 : 28
  return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none" aria-hidden className={large ? 'mx-auto text-fresh-green' : ''}>
      <path d="M24 10l2.5 8.5L35 21l-8.5 2.5L24 32l-2.5-8.5L13 21l8.5-2.5L24 10Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" opacity="0.35" />
    </svg>
  )
}

function TrustIcon({ large = false }: { large?: boolean }) {
  const s = large ? 120 : 28
  return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none" aria-hidden className={large ? 'mx-auto text-fresh-green' : ''}>
      <rect x="12" y="14" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="26" y="14" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="19" y="28" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <path d="M22 19h4M24 24v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function BaseFeesIcon({ large = false }: { large?: boolean }) {
  const s = large ? 120 : 28
  return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none" aria-hidden className={large ? 'mx-auto text-fresh-green' : ''}>
      <path d="M14 30l10-16 10 16H14Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M18 30h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="34" r="2" fill="currentColor" />
    </svg>
  )
}
