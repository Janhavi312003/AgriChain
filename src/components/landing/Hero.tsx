'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import SproutIllustration from './SproutIllustration'

/**
 * Landing hero — bright cream palette + sprout illustration.
 * Parallax + reduced-motion handling preserved.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const onChange = () => setReduceMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (reduceMotion) return

    const onScroll = () => {
      const bg = bgRef.current
      const section = sectionRef.current
      if (!bg || !section) return
      const rect = section.getBoundingClientRect()
      const offset = Math.min(0, rect.top) * -0.35
      bg.style.transform = `translate3d(0, ${offset}px, 0) scale(1.08)`
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [reduceMotion])

  return (
    <section
      ref={sectionRef}
      id="landing-hero"
      className="relative isolate flex min-h-[88vh] items-center overflow-hidden bg-cream pb-16 pt-28 sm:min-h-[92vh] sm:pb-24 sm:pt-32"
      aria-labelledby="hero-headline"
    >
      <div
        ref={bgRef}
        className="hero-parallax-bg pointer-events-none absolute inset-0 -z-10 h-[120%] w-full origin-top"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 85% 55% at 75% 15%, rgba(107, 190, 69, 0.18), transparent 55%),
            radial-gradient(ellipse 60% 45% at 10% 85%, rgba(234, 245, 226, 0.9), transparent 50%),
            linear-gradient(165deg, #faf7ef 0%, #f3f6eb 45%, #eaf5e2 100%)
          `,
        }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/4 bg-gradient-to-t from-cream to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:gap-12 lg:px-10">
        <div className="min-w-0">
          <p className="mb-5 font-mono text-xs tracking-[0.22em] text-parchment-dim uppercase sm:text-sm">
            Base Sepolia · fair trade farmland
          </p>

          <h1
            id="hero-headline"
            className="font-display text-[2.125rem] font-light leading-[1.15] tracking-tight text-deep-forest lowercase break-words sm:text-5xl md:text-6xl lg:text-[4.5rem]"
          >
            empowering farmers through blockchain
          </h1>

          <p className="mt-6 max-w-xl text-base font-normal leading-relaxed text-parchment-dim sm:text-lg">
            A quiet marketplace where harvests meet the ledger — direct trade, verifiable quality,
            and payments that settle on Base.
          </p>

          <div className="mt-10">
            <Link href="/dashboard" className="btn-harvest inline-flex min-h-11 w-full justify-center sm:w-auto sm:min-w-[160px]">
              Get Started
            </Link>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[240px] sm:max-w-[280px] lg:max-w-none lg:justify-self-end">
          <SproutIllustration />
        </div>
      </div>
    </section>
  )
}
