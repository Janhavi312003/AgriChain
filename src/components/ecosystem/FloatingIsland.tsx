'use client'

import { motion } from 'framer-motion'
import type { ReactNode, MouseEvent } from 'react'

type FloatingIslandProps = {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'button' | 'a'
  href?: string
  onClick?: () => void
}

export function FloatingIsland({
  children,
  className = '',
  delay = 0,
  as = 'div',
  href,
  onClick,
}: FloatingIslandProps) {
  const handleRipple = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--rx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
    el.style.setProperty('--ry', `${((e.clientY - rect.top) / rect.height) * 100}%`)
  }

  const shared = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
    whileHover: { y: -8 },
    className: `island-card ripple p-5 md:p-6 ${className}`,
    onMouseDown: handleRipple,
  }

  if (as === 'a' && href) {
    return (
      <motion.a href={href} {...shared} onClick={onClick}>
        {children}
      </motion.a>
    )
  }

  if (as === 'button') {
    return (
      <motion.button type="button" {...shared} onClick={onClick}>
        {children}
      </motion.button>
    )
  }

  return <motion.div {...shared}>{children}</motion.div>
}
