'use client'

import { usePathname } from 'next/navigation'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { PrefetchLink } from './PrefetchLink'
import {
  IconSproutChain,
  IconWalletLeaf,
  IconMarketBasket,
  IconAiSpark,
  IconScanCrop,
} from './ecosystem/Icons'

const NAV = [
  { href: '/', label: 'Home', Icon: IconSproutChain },
  { href: '/dashboard', label: 'Market', Icon: IconMarketBasket },
  { href: '/about', label: 'About', Icon: IconAiSpark },
  { href: '/contact', label: 'Contact', Icon: IconScanCrop },
]

export default function LuxuryShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const [mounted, setMounted] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [walletOpen, setWalletOpen] = useState(false)

  useEffect(() => setMounted(true), [])

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`

  return (
    <div className="app-shell">
      {/* Desktop floating sidebar */}
      <aside className="floating-sidebar" aria-label="Primary">
        <PrefetchLink href="/" className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/20 text-gold-soft">
          <IconSproutChain size={22} />
        </PrefetchLink>

        {NAV.map(({ href, label, Icon }) => (
          <PrefetchLink
            key={href}
            href={href}
            className="sidebar-link"
            data-active={pathname === href ? 'true' : 'false'}
          >
            <Icon size={20} />
            <span>{label}</span>
          </PrefetchLink>
        ))}

        <div className="mt-auto pt-2">
          {!mounted ? null : isConnected && address ? (
            <button
              onClick={() => disconnect()}
              className="sidebar-link"
              title={formatAddress(address)}
            >
              <IconWalletLeaf size={20} />
              <span>Out</span>
            </button>
          ) : (
            <button onClick={() => setWalletOpen(true)} className="sidebar-link" data-active="true">
              <IconWalletLeaf size={20} />
              <span>Wallet</span>
            </button>
          )}
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between border-b border-white/40 bg-white/50 px-4 py-3 backdrop-blur-xl lg:hidden">
        <PrefetchLink href="/" className="flex items-center gap-2 font-display text-lg font-bold text-emerald">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald text-gold-soft">
            <IconSproutChain size={18} />
          </span>
          AgriChain
        </PrefetchLink>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="rounded-xl p-2 text-emerald"
          aria-label="Menu"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass-dark fixed inset-x-3 top-16 z-50 space-y-2 p-4 lg:hidden"
          >
            {NAV.map(({ href, label }) => (
              <PrefetchLink
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-2xl px-4 py-3 text-white/90 hover:bg-white/10"
              >
                {label}
              </PrefetchLink>
            ))}
            {mounted &&
              (isConnected && address ? (
                <button onClick={() => disconnect()} className="btn-secondary w-full">
                  Disconnect {formatAddress(address)}
                </button>
              ) : (
                <button onClick={() => setWalletOpen(true)} className="btn-gold w-full">
                  Connect Wallet
                </button>
              ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="app-shell-main">{children}</div>

      <AnimatePresence>
        {walletOpen && mounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-emerald-deep/50 p-4 backdrop-blur-sm"
            onClick={() => setWalletOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="glass-panel w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-display text-2xl font-bold text-emerald">Connect Wallet</h2>
                <button onClick={() => setWalletOpen(false)} className="rounded-xl p-2 hover:bg-sage/40" aria-label="Close">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-3">
                {connectors.map((connector) => (
                  <button
                    key={connector.id}
                    onClick={() => {
                      connect({ connector })
                      setWalletOpen(false)
                    }}
                    className="flex w-full items-center gap-4 rounded-2xl border border-emerald/10 bg-white/70 p-4 text-left transition hover:border-gold hover:bg-sage/30"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald text-gold-soft">
                      <IconWalletLeaf size={22} />
                    </span>
                    <div>
                      <p className="font-display font-semibold text-ink">{connector.name}</p>
                      <p className="text-sm text-ink/55">Secure Web3 session</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
