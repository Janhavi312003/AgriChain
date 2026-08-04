'use client'

import { motion } from 'framer-motion'
import { Vegetable3D } from '@/components/ecosystem/Vegetable3D'

const float = (duration: number, delay: number) => ({
  y: [0, -22, 0, 14, 0],
  rotateY: [-32, 36, -18, 28, -32],
  rotateX: [6, -8, 4, -6, 6],
  rotateZ: [-5, 7, -3, 5, -5],
  transition: {
    duration,
    delay,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
})

/**
 * Animated Vegetable3D ambient scene — CSS 3D perspective + framer-motion.
 * Intentionally low opacity, but clearly moving so it reads as atmosphere, not a flat stamp.
 */
export function AboutVegScene() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
      style={{ perspective: '900px' }}
    >
      {/* Soft base wash so produce has something to sit on */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 55% 50% at 88% 35%, rgba(60, 163, 69, 0.14), transparent 60%),
            radial-gradient(ellipse 40% 35% at 8% 75%, rgba(201, 154, 62, 0.08), transparent 55%),
            linear-gradient(165deg, #faf7ef 0%, #f3f6eb 55%, #eaf5e2 100%)
          `,
        }}
      />

      <motion.div
        className="absolute -right-4 top-[6%] h-64 w-64 md:right-[4%] md:h-80 md:w-80"
        style={{ transformStyle: 'preserve-3d', transformPerspective: 900, opacity: 0.42 }}
        animate={float(14, 0)}
      >
        <Vegetable3D
          type="leafy"
          className="h-full w-full drop-shadow-[0_24px_40px_rgba(31,61,26,0.18)]"
        />
      </motion.div>

      <motion.div
        className="absolute -left-8 bottom-[8%] h-48 w-48 md:left-[2%] md:h-60 md:w-60"
        style={{ transformStyle: 'preserve-3d', transformPerspective: 900, opacity: 0.36 }}
        animate={float(18, 1.2)}
      >
        <Vegetable3D
          type="tomato"
          className="h-full w-full drop-shadow-[0_20px_36px_rgba(31,61,26,0.16)]"
        />
      </motion.div>

      <motion.div
        className="absolute right-[22%] bottom-[18%] h-36 w-36 md:h-44 md:w-44"
        style={{ transformStyle: 'preserve-3d', transformPerspective: 900, opacity: 0.34 }}
        animate={float(11, 0.6)}
      >
        <Vegetable3D
          type="carrot"
          className="h-full w-full drop-shadow-[0_16px_28px_rgba(31,61,26,0.14)]"
        />
      </motion.div>

      {/* Text-side veil only — keeps copy readable without washing out the scene */}
      <div className="absolute inset-y-0 left-0 w-full max-w-2xl bg-gradient-to-r from-cream via-cream/85 to-transparent md:w-[58%]" />
    </div>
  )
}
