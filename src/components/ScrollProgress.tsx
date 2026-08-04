'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

/**
 * Slim left-edge scroll progress — fresh-green fill via useScroll/useTransform.
 * Hides when #site-footer enters the viewport so it never cuts through the footer.
 */
export default function ScrollProgress() {
  const pathname = usePathname()
  const { scrollYProgress } = useScroll()
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])
  const [footerInView, setFooterInView] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const onChange = () => setReduceMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    setFooterInView(false)

    const attach = () => {
      const footer = document.getElementById('site-footer')
      if (!footer) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          setFooterInView(entry.isIntersecting && entry.intersectionRatio > 0)
        },
        { threshold: [0, 0.05, 0.1], rootMargin: '0px 0px -8% 0px' }
      )
      observer.observe(footer)
      return observer
    }

    // Footer may mount a tick after route change
    let observer = attach()
    const raf = window.requestAnimationFrame(() => {
      observer?.disconnect()
      observer = attach()
    })

    return () => {
      window.cancelAnimationFrame(raf)
      observer?.disconnect()
    }
  }, [pathname])

  const hidden = footerInView

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] h-dvh w-1 origin-top bg-fresh-green"
      style={{
        scaleY: reduceMotion ? scrollYProgress : scaleY,
      }}
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    />
  )
}
