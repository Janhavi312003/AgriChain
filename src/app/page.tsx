import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { ArrowRight, Shield, Users, TrendingUp, Leaf } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Empowering Farmers Through Blockchain
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Fair trade farming platform connecting farmers directly with buyers using Base blockchain technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard" className="btn-primary inline-flex items-center justify-center space-x-2">
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/about" className="btn-secondary bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 inline-flex items-center justify-center">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose AgriChain?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transparent, secure, and fair trade platform built on blockchain technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="bg-[#6BBE45]/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[#6BBE45]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Transactions</h3>
              <p className="text-gray-600">All transactions are recorded on the blockchain for maximum security</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-[#6BBE45]/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#6BBE45]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Direct Connection</h3>
              <p className="text-gray-600">Connect farmers directly with buyers, removing middlemen</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-[#6BBE45]/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-[#6BBE45]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fair Pricing</h3>
              <p className="text-gray-600">Farmers set their own prices and receive full payment</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-[#6BBE45]/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-[#6BBE45]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Sustainability</h3>
              <p className="text-gray-600">Support sustainable farming practices and local agriculture</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#6BBE45] to-[#558B37]">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Join AgriChain?</h2>
          <p className="text-xl text-white/90 mb-8">
            Start trading fairly and transparently on the blockchain today
          </p>
          <Link href="/dashboard" className="btn-primary bg-white text-[#6BBE45] hover:bg-gray-100 inline-flex items-center space-x-2">
            <span>Launch Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-[#6BBE45] p-2 rounded-xl">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">AgriChain</span>
              </div>
              <p className="text-gray-400">Empowering farmers through blockchain technology on Base</p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link href="/dashboard" className="text-gray-400 hover:text-white">Dashboard</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white">About</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Network</h4>
              <p className="text-gray-400">Built on Base Sepolia Testnet</p>
              <p className="text-sm text-gray-500 mt-2">Chain ID: 84532</p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AgriChain. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
