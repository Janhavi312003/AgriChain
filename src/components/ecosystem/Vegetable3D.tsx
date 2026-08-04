'use client'

type VegType = 'tomato' | 'corn' | 'leafy' | 'carrot' | 'generic'

const PALETTE: Record<VegType, { a: string; b: string; c: string }> = {
  tomato: { a: '#e85d4c', b: '#c43b2b', c: '#2f7a3a' },
  corn: { a: '#f0d78c', b: '#d4af37', c: '#3dd68c' },
  leafy: { a: '#3dd68c', b: '#0b3d2e', c: '#a8f0c8' },
  carrot: { a: '#e8913a', b: '#c46a1e', c: '#3dd68c' },
  generic: { a: '#d4afe0', b: '#0b3d2e', c: '#d4af37' },
}

export function guessVegType(name: string): VegType {
  const n = name.toLowerCase()
  if (n.includes('tomato') || n.includes('pepper')) return 'tomato'
  if (n.includes('corn') || n.includes('wheat') || n.includes('grain')) return 'corn'
  if (n.includes('lettuce') || n.includes('spinach') || n.includes('leaf') || n.includes('green'))
    return 'leafy'
  if (n.includes('carrot') || n.includes('root')) return 'carrot'
  return 'generic'
}

/** Low-poly 3D vegetable — original SVG, used in marketplace cards */
export function Vegetable3D({
  type = 'generic',
  className = '',
}: {
  type?: VegType
  className?: string
}) {
  const c = PALETTE[type]

  if (type === 'tomato') {
    return (
      <svg viewBox="0 0 80 80" className={className} aria-hidden>
        <ellipse cx="40" cy="48" rx="22" ry="20" fill={c.a} />
        <ellipse cx="32" cy="42" rx="8" ry="6" fill={c.b} opacity="0.35" />
        <path d="M40 28 C36 20 30 18 28 22 C34 24 36 28 40 30 C44 28 46 24 52 22 C50 18 44 20 40 28Z" fill={c.c} />
      </svg>
    )
  }

  if (type === 'corn') {
    return (
      <svg viewBox="0 0 80 80" className={className} aria-hidden>
        <ellipse cx="40" cy="44" rx="12" ry="26" fill={c.a} />
        <ellipse cx="40" cy="44" rx="8" ry="22" fill={c.b} opacity="0.35" />
        <path d="M28 50 Q20 40 26 28" fill="none" stroke={c.c} strokeWidth="4" />
        <path d="M52 50 Q60 40 54 28" fill="none" stroke={c.c} strokeWidth="4" />
      </svg>
    )
  }

  if (type === 'carrot') {
    return (
      <svg viewBox="0 0 80 80" className={className} aria-hidden>
        <polygon points="40,22 52,70 28,70" fill={c.a} />
        <polygon points="40,22 52,70 40,70" fill={c.b} opacity="0.45" />
        <path d="M34 22 Q40 8 46 22" fill="none" stroke={c.c} strokeWidth="3" />
        <path d="M38 20 Q32 10 30 18" fill="none" stroke={c.c} strokeWidth="2.5" />
      </svg>
    )
  }

  if (type === 'leafy') {
    return (
      <svg viewBox="0 0 80 80" className={className} aria-hidden>
        <path d="M40 70 C20 50 18 28 40 12 C62 28 60 50 40 70Z" fill={c.a} />
        <path d="M40 70 C28 52 30 32 40 18" fill="none" stroke={c.b} strokeWidth="2" />
        <ellipse cx="40" cy="40" rx="6" ry="10" fill={c.c} opacity="0.5" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden>
      <polygon points="40,14 62,40 40,66 18,40" fill={c.a} opacity="0.9" />
      <polygon points="40,14 62,40 40,40" fill={c.b} opacity="0.35" />
      <circle cx="40" cy="40" r="8" fill={c.c} />
    </svg>
  )
}
