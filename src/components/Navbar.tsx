'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { PrefetchLink } from './PrefetchLink'
import { IconSproutChain, IconWalletLeaf } from './ecosystem/Icons'

export default function Navbar() {
  const pathname = usePathname()
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [pastHero, setPastHero] = useState(false)

  const isLanding = pathname === '/'

  useEffect(() => {
    setMounted(true)
  }, [])

  // Landing only: solid cream once Hero scrolls out of view
  useEffect(() => {
    if (!isLanding) {
      setPastHero(false)
      return
    }

    const hero = document.getElementById('landing-hero')
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Solid nav when hero is mostly out of the viewport
        setPastHero(!entry.isIntersecting || entry.intersectionRatio < 0.15)
      },
      { threshold: [0, 0.15, 0.5, 1], rootMargin: '-64px 0px 0px 0px' }
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [isLanding])

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`

  const getWalletName = (id: string, name: string) =>
    id.includes('coinbase') ? 'Coinbase Wallet' : id.includes('metaMask') ? 'MetaMask' : name

  const landingGlass = isLanding && !pastHero
  const landingSolid = isLanding && pastHero

  const navClass = isLanding
    ? landingGlass
      ? 'fixed top-0 left-0 right-0 z-50 border-b border-[rgba(60,163,69,0.35)] bg-[rgba(60,163,69,0.22)] backdrop-blur-[12px] transition-[background-color,box-shadow,border-color] duration-200'
      : 'fixed top-0 left-0 right-0 z-50 border-b border-deep-forest/10 bg-cream shadow-[0_8px_24px_rgba(31,61,26,0.08)] transition-[background-color,box-shadow,border-color] duration-200'
    : 'sticky top-0 z-50 border-b border-deep-forest/10 bg-cream/95 backdrop-blur-xl'

  return (
    <>
      {/* Spacer so fixed landing nav doesn't cover hero */}
      {isLanding && <div className="h-16" aria-hidden />}

      <nav className={navClass}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <PrefetchLink href="/" prefetch={true}>
            <div className="group flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-fresh-green text-deep-forest transition-transform duration-300 group-hover:scale-105">
                <IconSproutChain size={20} />
              </span>
              <span className="font-display text-xl font-normal tracking-tight text-deep-forest">
                AgriChain
              </span>
            </div>
          </PrefetchLink>

          <div className="hidden items-center gap-8 md:flex">
            {[
              ['/', 'Home'],
              ['/dashboard', 'Dashboard'],
              ['/about', 'About'],
              ['/contact', 'Contact'],
            ].map(([href, label]) => (
              <PrefetchLink
                key={href}
                href={href}
                prefetch={true}
                className="text-sm font-medium text-deep-forest/75 transition-colors hover:text-deep-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fresh-green"
              >
                {label}
              </PrefetchLink>
            ))}
          </div>

          <div className="hidden md:block">
            {!mounted ? (
              <div className="h-[44px] w-[180px]" />
            ) : isConnected && address ? (
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-sprout-light px-4 py-2 font-mono text-sm text-deep-forest">
                  {formatAddress(address)}
                </div>
                <button onClick={() => disconnect()} className="btn-secondary py-2">
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowWalletModal(true)}
                className="btn-harvest min-h-11 py-2.5"
              >
                <IconWalletLeaf size={18} />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-xl p-2 text-deep-forest hover:bg-fresh-green/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fresh-green md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={
                isLanding
                  ? landingSolid
                    ? 'overflow-hidden border-t border-deep-forest/10 bg-cream md:hidden'
                    : 'overflow-hidden border-t border-[rgba(60,163,69,0.35)] bg-[rgba(60,163,69,0.22)] backdrop-blur-[12px] md:hidden'
                  : 'overflow-hidden border-t border-deep-forest/10 bg-cream md:hidden'
              }
            >
              <div className="space-y-3 px-4 py-4">
                {[
                  ['/', 'Home'],
                  ['/dashboard', 'Dashboard'],
                  ['/about', 'About'],
                  ['/contact', 'Contact'],
                ].map(([href, label]) => (
                  <PrefetchLink
                    key={href}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex min-h-11 items-center font-medium text-deep-forest"
                  >
                    {label}
                  </PrefetchLink>
                ))}

                {mounted &&
                  (isConnected && address ? (
                    <>
                      <div className="rounded-full bg-sprout-light px-4 py-2 text-center font-mono text-sm text-deep-forest">
                        {formatAddress(address)}
                      </div>
                      <button onClick={() => disconnect()} className="btn-secondary w-full min-h-11">
                        Disconnect
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setShowWalletModal(true)}
                      className="btn-harvest w-full min-h-11"
                    >
                      <IconWalletLeaf size={18} />
                      Connect Wallet
                    </button>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {showWalletModal && mounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-deep-forest/40 p-4 backdrop-blur-sm"
            onClick={() => setShowWalletModal(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="w-full max-w-md rounded-2xl border border-deep-forest/10 bg-cream p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-2xl font-normal text-deep-forest">Connect Wallet</h2>
                <button
                  onClick={() => setShowWalletModal(false)}
                  className="rounded-xl p-2 hover:bg-sprout-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fresh-green"
                  aria-label="Close"
                >
                  <X className="h-5 w-5 text-deep-forest" />
                </button>
              </div>

              <div className="space-y-3">
                {connectors.map((connector) => (
                  <button
                    key={connector.id}
                    onClick={() => {
                      connect({ connector })
                      setShowWalletModal(false)
                    }}
                    className="flex min-h-11 w-full items-center gap-4 rounded-2xl border border-deep-forest/10 bg-sprout-light/80 p-4 text-left transition hover:border-fresh-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fresh-green"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-fresh-green text-deep-forest">
                      <IconWalletLeaf size={22} />
                    </span>
                    <div>
                      <p className="font-medium text-deep-forest">
                        {getWalletName(connector.id, connector.name)}
                      </p>
                      <p className="text-sm text-parchment-dim">Secure Web3 connection</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
