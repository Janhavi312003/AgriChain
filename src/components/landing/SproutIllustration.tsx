'use client'

import { motion, useReducedMotion } from 'framer-motion'

/**
 * Line-art seed → sprout loop.
 * Fully-grown geometry is defined in GrownPlantPaths (shared by static + animated).
 */
export default function SproutIllustration({ className = '' }: { className?: string }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <div className={className} aria-hidden>
        <SproutSvg>
          <GrownPlantPaths />
        </SproutSvg>
      </div>
    )
  }

  return (
    <div className={className} aria-hidden>
      <SproutSvg>
        {/* Soft mound */}
        <ellipse cx="120" cy="210" rx="56" ry="12" fill="#EAF5E2" />
        <path
          d="M64 210 Q120 196 176 210"
          stroke="#1F3D1A"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.3"
        />

        {/* Seed — visible first, then fades */}
        <motion.g
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: [1, 1, 0, 0, 1], scale: [1, 1, 0.7, 0.7, 1] }}
          transition={{
            duration: 7,
            times: [0, 0.08, 0.22, 0.9, 1],
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ transformOrigin: '120px 200px' }}
        >
          <ellipse
            cx="120"
            cy="200"
            rx="11"
            ry="7"
            fill="#C99A3E"
            stroke="#1F3D1A"
            strokeWidth="1.5"
          />
          <path d="M114 200 Q120 196 126 200" stroke="#1F3D1A" strokeWidth="1" opacity="0.35" />
        </motion.g>

        {/* Stem */}
        <motion.path
          d="M120 200 L120 78"
          stroke="#6BBE45"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 0, 1, 1, 0] }}
          transition={{
            duration: 7,
            times: [0, 0.1, 0.32, 0.88, 1],
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />

        {/* Idle sway wrapper — only while grown */}
        <motion.g
          animate={{ rotate: [0, 0, -2.5, 2.5, -1.5, 1.5, 0, 0] }}
          transition={{
            duration: 7,
            times: [0, 0.38, 0.48, 0.58, 0.68, 0.78, 0.88, 1],
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ transformOrigin: '120px 200px' }}
        >
          {/* Left leaf — large teardrop */}
          <motion.g
            style={{ transformOrigin: '120px 145px' }}
            initial={{ scale: 0, rotate: -55, opacity: 0 }}
            animate={{
              scale: [0, 0, 1, 1, 0],
              rotate: [-55, -55, -22, -22, -55],
              opacity: [0, 0, 1, 1, 0],
            }}
            transition={{
              duration: 7,
              times: [0, 0.28, 0.4, 0.88, 1],
              repeat: Infinity,
              ease: 'easeOut',
            }}
          >
            <path
              d="M120 148
                 C95 142 72 128 62 105
                 C62 105 78 98 98 112
                 C108 120 116 132 120 148Z"
              fill="#6BBE45"
              stroke="#1F3D1A"
              strokeWidth="1.75"
              strokeLinejoin="round"
            />
            <path
              d="M120 148 C105 135 90 120 78 110"
              stroke="#1F3D1A"
              strokeWidth="1.25"
              opacity="0.45"
              fill="none"
            />
          </motion.g>

          {/* Right leaf */}
          <motion.g
            style={{ transformOrigin: '120px 128px' }}
            initial={{ scale: 0, rotate: 55, opacity: 0 }}
            animate={{
              scale: [0, 0, 0, 1, 1, 0],
              rotate: [55, 55, 55, 20, 20, 55],
              opacity: [0, 0, 0, 1, 1, 0],
            }}
            transition={{
              duration: 7,
              times: [0, 0.35, 0.42, 0.52, 0.88, 1],
              repeat: Infinity,
              ease: 'easeOut',
            }}
          >
            <path
              d="M120 130
                 C145 122 168 106 178 82
                 C178 82 162 78 142 94
                 C132 104 124 116 120 130Z"
              fill="#6BBE45"
              stroke="#1F3D1A"
              strokeWidth="1.75"
              strokeLinejoin="round"
            />
            <path
              d="M120 130 C135 116 150 102 164 92"
              stroke="#1F3D1A"
              strokeWidth="1.25"
              opacity="0.45"
              fill="none"
            />
          </motion.g>

          {/* Top leaf */}
          <motion.g
            style={{ transformOrigin: '120px 90px' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 0, 0, 0, 1, 1, 0],
              opacity: [0, 0, 0, 0, 1, 1, 0],
            }}
            transition={{
              duration: 7,
              times: [0, 0.45, 0.5, 0.55, 0.65, 0.88, 1],
              repeat: Infinity,
              ease: 'easeOut',
            }}
          >
            <path
              d="M120 92
                 C108 78 102 58 108 40
                 C114 48 118 62 120 78
                 C122 62 126 48 132 40
                 C138 58 132 78 120 92Z"
              fill="#6BBE45"
              stroke="#1F3D1A"
              strokeWidth="1.75"
              strokeLinejoin="round"
            />
            <path
              d="M120 92 L120 48"
              stroke="#1F3D1A"
              strokeWidth="1.25"
              opacity="0.45"
            />
          </motion.g>
        </motion.g>

        {/* Gold sun accent — appears when grown */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.5, 0.5, 1, 1, 0.5] }}
          transition={{
            duration: 7,
            times: [0, 0.55, 0.65, 0.88, 1],
            repeat: Infinity,
            ease: 'easeOut',
          }}
          style={{ transformOrigin: '178px 42px' }}
        >
          <circle cx="178" cy="42" r="12" fill="#C99A3E" />
          <circle cx="178" cy="42" r="12" stroke="#1F3D1A" strokeWidth="1.5" fill="none" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180
            return (
              <line
                key={deg}
                x1={178 + Math.cos(rad) * 15}
                y1={42 + Math.sin(rad) * 15}
                x2={178 + Math.cos(rad) * 20}
                y2={42 + Math.sin(rad) * 20}
                stroke="#C99A3E"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )
          })}
        </motion.g>
      </SproutSvg>
    </div>
  )
}

function SproutSvg({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 240 230"
      className="mx-auto h-auto w-full max-w-[260px] lg:max-w-[300px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Sprouting plant illustration"
    >
      {children}
    </svg>
  )
}

/** Fully-grown end state — also used for prefers-reduced-motion */
function GrownPlantPaths() {
  return (
    <>
      <ellipse cx="120" cy="210" rx="56" ry="12" fill="#EAF5E2" />
      <path
        d="M64 210 Q120 196 176 210"
        stroke="#1F3D1A"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
      />
      <path d="M120 200 L120 78" stroke="#6BBE45" strokeWidth="4" strokeLinecap="round" />
      {/* Left leaf */}
      <path
        d="M120 148
           C95 142 72 128 62 105
           C62 105 78 98 98 112
           C108 120 116 132 120 148Z"
        fill="#6BBE45"
        stroke="#1F3D1A"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M120 148 C105 135 90 120 78 110" stroke="#1F3D1A" strokeWidth="1.25" opacity="0.45" fill="none" />
      {/* Right leaf */}
      <path
        d="M120 130
           C145 122 168 106 178 82
           C178 82 162 78 142 94
           C132 104 124 116 120 130Z"
        fill="#6BBE45"
        stroke="#1F3D1A"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M120 130 C135 116 150 102 164 92" stroke="#1F3D1A" strokeWidth="1.25" opacity="0.45" fill="none" />
      {/* Top leaf */}
      <path
        d="M120 92
           C108 78 102 58 108 40
           C114 48 118 62 120 78
           C122 62 126 48 132 40
           C138 58 132 78 120 92Z"
        fill="#6BBE45"
        stroke="#1F3D1A"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M120 92 L120 48" stroke="#1F3D1A" strokeWidth="1.25" opacity="0.45" />
      {/* Sun */}
      <circle cx="178" cy="42" r="12" fill="#C99A3E" />
      <circle cx="178" cy="42" r="12" stroke="#1F3D1A" strokeWidth="1.5" fill="none" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180
        return (
          <line
            key={deg}
            x1={178 + Math.cos(rad) * 15}
            y1={42 + Math.sin(rad) * 15}
            x2={178 + Math.cos(rad) * 20}
            y2={42 + Math.sin(rad) * 20}
            stroke="#C99A3E"
            strokeWidth="2"
            strokeLinecap="round"
          />
        )
      })}
    </>
  )
}
