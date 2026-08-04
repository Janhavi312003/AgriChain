'use client'

import { motion } from 'framer-motion'

/** Floating miniature farm island — custom low-poly SVG (Nature × Blockchain) */
export default function FarmScene({ className = '' }: { className?: string }) {
  return (
    <div className={`farm-island-stage ${className}`} aria-hidden>
      <div className="farm-island-float">
        <svg viewBox="0 0 720 540" className="h-auto w-full drop-shadow-2xl" role="img">
          <title>Floating AgriChain farm island</title>
          <defs>
            <linearGradient id="isleTop" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3dd68c" />
              <stop offset="100%" stopColor="#145c43" />
            </linearGradient>
            <linearGradient id="isleSide" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6b4423" />
              <stop offset="100%" stopColor="#3d2614" />
            </linearGradient>
            <linearGradient id="goldBeam" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#d4af37" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#d4af37" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#d4af37" stopOpacity="0.15" />
            </linearGradient>
            <radialGradient id="aura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#d4af37" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Soft aura behind island */}
          <ellipse cx="360" cy="300" rx="260" ry="90" fill="url(#aura)" />

          {/* Main floating island */}
          <g>
            <polygon points="120,300 360,190 600,300 360,410" fill="url(#isleTop)" />
            <polygon points="360,410 600,300 600,340 360,450" fill="#0b3d2e" />
            <polygon points="120,300 120,340 360,450 360,410" fill="url(#isleSide)" />

            {/* Cliff facets */}
            <polygon points="200,340 360,410 360,430 220,355" fill="#2a1a0e" opacity="0.45" />
          </g>

          {/* Blockchain nodes under soil */}
          <g>
            {[0, 1, 2, 3, 4].map((i) => {
              const x = 220 + i * 55
              const y = 430 + (i % 2) * 10
              return (
                <g key={i}>
                  <polygon
                    points={`${x},${y} ${x + 22},${y - 11} ${x + 44},${y} ${x + 22},${y + 11}`}
                    fill="#d4af37"
                    opacity="0.9"
                  />
                  <polygon
                    points={`${x + 22},${y + 11} ${x + 44},${y} ${x + 44},${y + 14} ${x + 22},${y + 25}`}
                    fill="#a88820"
                  />
                  <polygon
                    points={`${x},${y} ${x},${y + 14} ${x + 22},${y + 25} ${x + 22},${y + 11}`}
                    fill="#7a6418"
                  />
                  {i < 4 && (
                    <line
                      x1={x + 44}
                      y1={y}
                      x2={x + 55}
                      y2={y + (i % 2 ? -8 : 8)}
                      stroke="url(#goldBeam)"
                      strokeWidth="2.5"
                    />
                  )}
                </g>
              )
            })}
            <path
              d="M240 415 C280 390 320 385 360 375 C400 365 440 380 480 370"
              fill="none"
              stroke="#3dd68c"
              strokeWidth="2"
              opacity="0.75"
            />
          </g>

          {/* Trees */}
          <g transform="translate(200,230)">
            <polygon points="30,80 0,40 60,40" fill="#0b3d2e" />
            <polygon points="30,55 -5,20 65,20" fill="#145c43" />
            <polygon points="30,35 8,8 52,8" fill="#3dd68c" />
            <rect x="26" y="80" width="8" height="18" fill="#6b4423" />
          </g>
          <g transform="translate(480,245)">
            <polygon points="24,60 0,30 48,30" fill="#0b3d2e" />
            <polygon points="24,40 4,14 44,14" fill="#3dd68c" />
            <rect x="20" y="60" width="7" height="14" fill="#6b4423" />
          </g>

          {/* Crops / wheat */}
          <g transform="translate(300,290)">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <g key={i} className="animate-sway" style={{ animationDelay: `${i * 0.15}s` }}>
                <line x1={i * 18} y1={40} x2={i * 18} y2={10} stroke="#0b3d2e" strokeWidth="2.2" />
                <ellipse cx={i * 18} cy={8} rx="4.5" ry="7" fill="#d4af37" />
              </g>
            ))}
          </g>

          {/* Irrigation */}
          <g transform="translate(250,270)">
            <path d="M0 18 H110" stroke="#5ec8f0" strokeWidth="3.5" strokeLinecap="round" opacity="0.75" />
            {[20, 50, 80].map((x) => (
              <motion.path
                key={x}
                d={`M${x} 18 Q${x + 3} 36 ${x} 50`}
                fill="none"
                stroke="#9adfff"
                strokeWidth="2"
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: x / 60 }}
              />
            ))}
          </g>

          {/* Solar panels */}
          <g transform="translate(150,265)">
            <polygon points="0,30 50,10 90,28 40,48" fill="#1a2744" />
            <polygon points="0,30 40,48 40,54 0,36" fill="#0d1524" />
            <line x1="20" y1="22" x2="55" y2="36" stroke="#3dd68c" strokeWidth="1" opacity="0.5" />
            <line x1="35" y1="16" x2="70" y2="30" stroke="#3dd68c" strokeWidth="1" opacity="0.5" />
            <polygon points="10,28 30,20 55,32 35,40" fill="#2b4570" opacity="0.7" />
          </g>

          {/* Windmill */}
          <g transform="translate(540,175)">
            <rect x="16" y="36" width="9" height="70" fill="#d9d2c5" />
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '20.5px 36px' }}
            >
              <polygon points="20.5,36 62,24 64,32" fill="#d4af37" />
              <polygon points="20.5,36 32,78 24,80" fill="#f0d78c" />
              <polygon points="20.5,36 -18,48 -16,40" fill="#d4af37" />
              <polygon points="20.5,36 8,-4 14,-6" fill="#f0d78c" />
            </motion.g>
            <circle cx="20.5" cy="36" r="5" fill="#0b3d2e" />
          </g>

          {/* Barn */}
          <g transform="translate(400,230)">
            <polygon points="0,55 40,30 80,55 80,95 0,95" fill="#b85c38" />
            <polygon points="0,55 40,30 40,42 0,67" fill="#8b3e28" />
            <rect x="30" y="68" width="20" height="27" fill="#3d2218" />
          </g>

          {/* Farmer */}
          <g transform="translate(330,255)">
            <circle cx="16" cy="8" r="7" fill="#e8c4a0" />
            <path d="M4 18 C4 12 28 12 28 18 L26 44 L6 44 Z" fill="#0b3d2e" />
            <rect x="10" y="22" width="12" height="14" rx="2" fill="#1a2744" />
            <rect x="12" y="24" width="8" height="9" rx="1" fill="#3dd68c" />
          </g>

          {/* Drone */}
          <motion.g
            animate={{ x: [0, 50, 0], y: [0, -14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <g transform="translate(280,95)">
              <rect x="12" y="14" width="36" height="12" rx="4" fill="#1a2744" />
              <rect x="22" y="8" width="16" height="8" rx="2" fill="#3dd68c" />
              <line x1="0" y1="16" x2="12" y2="18" stroke="#94a3b8" strokeWidth="2" />
              <line x1="48" y1="18" x2="60" y2="16" stroke="#94a3b8" strokeWidth="2" />
              <circle cx="0" cy="16" r="5" fill="#cbd5e1" opacity="0.85" />
              <circle cx="60" cy="16" r="5" fill="#cbd5e1" opacity="0.85" />
              <motion.line
                x1="30"
                y1="26"
                x2="30"
                y2="70"
                stroke="#d4af37"
                strokeWidth="2"
                strokeDasharray="4 4"
                animate={{ opacity: [0.2, 0.95, 0.2] }}
                transition={{ duration: 1.1, repeat: Infinity }}
              />
            </g>
          </motion.g>

          {/* Tractor */}
          <g transform="translate(170,310)">
            <rect x="24" y="14" width="55" height="22" rx="3" fill="#3dd68c" />
            <rect x="58" y="4" width="24" height="18" rx="2" fill="#0b3d2e" />
            <circle cx="34" cy="42" r="11" fill="#222" />
            <circle cx="34" cy="42" r="4" fill="#d4af37" />
            <circle cx="78" cy="40" r="8" fill="#222" />
          </g>
        </svg>
      </div>
    </div>
  )
}
