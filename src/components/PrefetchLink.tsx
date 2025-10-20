'use client'

import Link from 'next/link'
import { useState } from 'react'

export function PrefetchLink({
  href,
  children,
  prefetch = true,
  ...props
}: {
  href: string
  children: React.ReactNode
  prefetch?: boolean
  [key: string]: any
}) {
  const [shouldPrefetch, setShouldPrefetch] = useState(prefetch)

  return (
    <Link
      {...props}
      href={href}
      prefetch={shouldPrefetch}
      onMouseEnter={() => setShouldPrefetch(true)} // Prefetch when user hovers
      className="text-gray-700 hover:text-[#6BBE45] transition-colors duration-200"
    >
      {children}
    </Link>
  )
}
