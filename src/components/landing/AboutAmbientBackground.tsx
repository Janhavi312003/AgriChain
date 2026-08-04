'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const AboutVegScene = dynamic(
  () => import('./AboutVegScene').then((m) => m.AboutVegScene),
  {
    ssr: false,
    loading: () => (
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            'linear-gradient(165deg, #faf7ef 0%, #f3f6eb 50%, #eaf5e2 100%)',
        }}
      />
    ),
  }
)

function AmbientGradient() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden
      style={{
        background: `
          radial-gradient(ellipse 70% 55% at 85% 20%, rgba(60, 163, 69, 0.12), transparent 55%),
          radial-gradient(ellipse 50% 40% at 10% 80%, rgba(234, 245, 226, 0.95), transparent 50%),
          linear-gradient(165deg, #faf7ef 0%, #f3f6eb 50%, #eaf5e2 100%)
        `,
      }}
    />
  )
}

/**
 * About mission ambient layer.
 * Lazy-loads Vegetable3D + framer-motion scene only on About.
 * Static gradient under 768px or prefers-reduced-motion.
 */
export default function AboutAmbientBackground() {
  const [mode, setMode] = useState<'pending' | '3d' | 'static'>('pending')

  useEffect(() => {
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const widthMq = window.matchMedia('(min-width: 768px)')

    const sync = () => {
      setMode(!motionMq.matches && widthMq.matches ? '3d' : 'static')
    }

    sync()
    motionMq.addEventListener('change', sync)
    widthMq.addEventListener('change', sync)
    return () => {
      motionMq.removeEventListener('change', sync)
      widthMq.removeEventListener('change', sync)
    }
  }, [])

  if (mode === 'pending' || mode === 'static') return <AmbientGradient />
  return <AboutVegScene />
}
