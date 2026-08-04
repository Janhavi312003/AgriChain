'use client'

import { motion } from 'framer-motion'

/** Soft sky layer: gradients, drifting clouds, birds, sunlight, floating particles */
export function AmbientSky() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Sunlight bloom */}
      <div
        className="absolute -top-24 right-[8%] h-72 w-72 rounded-full opacity-70"
        style={{
          background:
            'radial-gradient(circle, rgba(231,198,107,0.55) 0%, rgba(231,198,107,0.12) 45%, transparent 70%)',
        }}
      />

      {/* Abstract hills */}
      <svg className="absolute bottom-0 left-0 w-[140%] min-w-[900px] h-[42%]" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="#c8e0b8" d="M0,224 C240,280 420,120 720,180 C1020,240 1200,260 1440,160 L1440,320 L0,320 Z" />
        <path fill="#b5d5a4" d="M0,260 C300,200 500,300 780,250 C1060,200 1240,230 1440,210 L1440,320 L0,320 Z" opacity="0.9" />
        <path fill="#9fc48a" d="M0,290 C260,250 540,310 820,280 C1100,250 1280,270 1440,250 L1440,320 L0,320 Z" />
      </svg>

      {/* Clouds */}
      <motion.div
        className="absolute top-16 left-[-10%] opacity-80"
        animate={{ x: [0, 60, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <Cloud />
      </motion.div>
      <motion.div
        className="absolute top-28 right-[5%] opacity-70 scale-75"
        animate={{ x: [0, -50, 0] }}
        transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
      >
        <Cloud />
      </motion.div>
      <motion.div
        className="absolute top-10 left-[40%] opacity-60 scale-50"
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
      >
        <Cloud />
      </motion.div>

      {/* Birds */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute text-forest/40"
          style={{ top: 48 + i * 28, left: `${15 + i * 22}%` }}
          animate={{ x: [0, 120 + i * 40], y: [0, -8, 4, 0] }}
          transition={{ duration: 18 + i * 4, repeat: Infinity, ease: 'linear', delay: i * 2 }}
        >
          <Bird />
        </motion.div>
      ))}

      {/* Particles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-wheat/70"
          style={{
            width: 4 + (i % 3),
            height: 4 + (i % 3),
            left: `${8 + i * 6.5}%`,
            bottom: `${10 + (i % 5) * 8}%`,
            animation: `particle-rise ${6 + (i % 5)}s ease-in infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
    </div>
  )
}

function Cloud() {
  return (
    <svg width="160" height="60" viewBox="0 0 160 60" fill="none">
      <ellipse cx="50" cy="38" rx="36" ry="18" fill="white" fillOpacity="0.85" />
      <ellipse cx="88" cy="32" rx="42" ry="22" fill="white" fillOpacity="0.9" />
      <ellipse cx="122" cy="40" rx="28" ry="14" fill="white" fillOpacity="0.8" />
    </svg>
  )
}

function Bird() {
  return (
    <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
      <path d="M1 8 C6 2 9 2 11 6 C13 2 16 2 21 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
