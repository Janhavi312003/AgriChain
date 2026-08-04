type IconProps = {
  className?: string
  size?: number
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function IconSproutChain({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <path {...stroke} d="M12 21v-8" />
      <path {...stroke} d="M12 13c-3-1-5-3.5-5-6.5C7 4 9 3 12 3c0 3 1.5 5.5 4 7" />
      <path {...stroke} d="M8.5 18.5h7" />
      <rect x="5" y="18" width="3" height="3" rx="0.6" {...stroke} />
      <rect x="10.5" y="18" width="3" height="3" rx="0.6" {...stroke} />
      <rect x="16" y="18" width="3" height="3" rx="0.6" {...stroke} />
    </svg>
  )
}

export function IconWalletLeaf({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="3" y="6" width="18" height="13" rx="3" {...stroke} />
      <path {...stroke} d="M3 10h18" />
      <circle cx="16.5" cy="14.5" r="1.4" {...stroke} />
      <path {...stroke} d="M8 4.5c1.5 0 2.5 1.2 2.5 2.7" />
    </svg>
  )
}

export function IconTokenCrop({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="8" {...stroke} />
      <path {...stroke} d="M12 8v8M9.5 10.5c1.2-1 3.8-1 5 0M9.5 13.5c1.2 1 3.8 1 5 0" />
    </svg>
  )
}

export function IconWeatherSun({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="4" {...stroke} />
      <path {...stroke} d="M12 2.8v2.2M12 19v2.2M2.8 12h2.2M19 12h2.2M5.1 5.1l1.6 1.6M17.3 17.3l1.6 1.6M18.9 5.1l-1.6 1.6M6.7 17.3l-1.6 1.6" />
    </svg>
  )
}

export function IconSoilHealth({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <path {...stroke} d="M3 16c2.5-2 5-3 9-3s6.5 1 9 3" />
      <path {...stroke} d="M5 19h14" />
      <path {...stroke} d="M8 13c.5-2 1.8-4 4-5.5C14.2 9 15.5 11 16 13" />
      <path {...stroke} d="M10 8.5c.4-1.4 1.2-2.5 2-3.2" />
    </svg>
  )
}

export function IconMarketBasket({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <path {...stroke} d="M4 9h16l-1.4 9.2A2 2 0 0 1 16.6 20H7.4a2 2 0 0 1-2-1.8L4 9Z" />
      <path {...stroke} d="M9 9V6.5a3 3 0 0 1 6 0V9" />
    </svg>
  )
}

export function IconAiSpark({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <path {...stroke} d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      <path {...stroke} d="M12 8.5 13.8 12 17 13.2 13.8 14.5 12 18l-1.8-3.5L7 13.2 10.2 12Z" />
    </svg>
  )
}

export function IconScanCrop({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <path {...stroke} d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
      <path {...stroke} d="M12 9c-1.5 1.2-2.5 2.8-2.5 4.2 0 1.5 1.1 2.8 2.5 2.8s2.5-1.3 2.5-2.8c0-1.4-1-3-2.5-4.2Z" />
    </svg>
  )
}
