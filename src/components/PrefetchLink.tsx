'use client'

import Link from 'next/link'
import { useState } from 'react'

export function PrefetchLink({
  href,
  children,
  prefetch = true,
  className = 'text-ink/70 hover:text-forest transition-colors duration-200',
  ...props
}: {
  href: string
  children: React.ReactNode
  prefetch?: boolean
  className?: string
  [key: string]: any
}) {
  const [shouldPrefetch, setShouldPrefetch] = useState(prefetch)

  return (
    <Link
      {...props}
      href={href}
      prefetch={shouldPrefetch}
      onMouseEnter={() => setShouldPrefetch(true)}
      className={className}
    >
      {children}
    </Link>
  )
}
