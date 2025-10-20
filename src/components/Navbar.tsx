'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Sprout, Menu, X, Wallet } from 'lucide-react'
import { useState, useEffect } from 'react'
import { PrefetchLink } from './PrefetchLink'

export default function Navbar() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`

  const getWalletIcon = (connectorId: string) =>
    connectorId.includes('coinbase') ? '🟦' :
    connectorId.includes('metaMask') ? '🦊' : '💼'

  const getWalletName = (id: string, name: string) =>
    id.includes('coinbase') ? 'Coinbase Wallet' :
    id.includes('metaMask') ? 'MetaMask' : name

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <PrefetchLink href="/" prefetch={true}>
              <div className="flex items-center space-x-2 group">
                <div className="bg-[#6BBE45] p-2 rounded-xl group-hover:scale-110 transition-transform duration-200">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">AgriChain</span>
              </div>
            </PrefetchLink>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <PrefetchLink href="/" prefetch={true}>Home</PrefetchLink>
              <PrefetchLink href="/dashboard" prefetch={true}>Dashboard</PrefetchLink>
              <PrefetchLink href="/about" prefetch={true}>About</PrefetchLink>
              <PrefetchLink href="/contact" prefetch={true}>Contact</PrefetchLink>
            </div>

            {/* Wallet Button - Desktop */}
            <div className="hidden md:block">
              {!mounted ? (
                <div className="w-[180px] h-[42px]" />
              ) : isConnected && address ? (
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 px-4 py-2 rounded-xl">
                    <span className="text-sm font-medium text-gray-700">{formatAddress(address)}</span>
                  </div>
                  <button onClick={() => disconnect()} className="btn-secondary py-2">Disconnect</button>
                </div>
              ) : (
                <button onClick={() => setShowWalletModal(true)} className="btn-primary flex items-center space-x-2">
                  <Wallet className="w-5 h-5" />
                  <span>Connect Wallet</span>
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-3">
              <PrefetchLink href="/" onClick={() => setMobileMenuOpen(false)}>Home</PrefetchLink>
              <PrefetchLink href="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</PrefetchLink>
              <PrefetchLink href="/about" onClick={() => setMobileMenuOpen(false)}>About</PrefetchLink>
              <PrefetchLink href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</PrefetchLink>

              {mounted && (
                <>
                  {isConnected && address ? (
                    <>
                      <div className="bg-gray-100 px-4 py-2 rounded-xl text-center">
                        <span className="text-sm font-medium text-gray-700">{formatAddress(address)}</span>
                      </div>
                      <button onClick={() => disconnect()} className="w-full btn-secondary">
                        Disconnect
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setShowWalletModal(true)}
                      className="w-full btn-primary flex items-center justify-center space-x-2"
                    >
                      <Wallet className="w-5 h-5" />
                      <span>Connect Wallet</span>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Wallet Selection Modal */}
      {showWalletModal && mounted && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowWalletModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Connect Wallet</h2>
              <button onClick={() => setShowWalletModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
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
                  className="w-full flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-xl hover:border-[#6BBE45] hover:bg-gray-50 transition-all duration-200"
                >
                  <span className="text-3xl">{getWalletIcon(connector.id)}</span>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-900">{getWalletName(connector.id, connector.name)}</p>
                    <p className="text-sm text-gray-500">
                      {connector.id.includes('coinbase') ? 'Connect with Coinbase Wallet' : 'Connect with MetaMask'}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">By connecting, you agree to our Terms of Service</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
