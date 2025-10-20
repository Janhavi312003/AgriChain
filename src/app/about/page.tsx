import Navbar from '@/components/Navbar'
import { Target, Heart, Globe, Zap } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About AgriChain</h1>
          <p className="text-xl text-gray-600">
            Revolutionizing agriculture through blockchain technology
          </p>
        </div>

        <div className="space-y-8">
          <div className="card">
            <div className="flex items-start space-x-4">
              <div className="bg-[#6BBE45]/10 p-3 rounded-xl">
                <Target className="w-8 h-8 text-[#6BBE45]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed">
                  AgriChain is dedicated to empowering farmers by providing a transparent, secure, and fair 
                  trading platform built on blockchain technology. We eliminate middlemen, ensuring farmers 
                  receive fair compensation for their hard work while buyers get authentic, quality produce.
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-start space-x-4">
              <div className="bg-[#6BBE45]/10 p-3 rounded-xl">
                <Heart className="w-8 h-8 text-[#6BBE45]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Why Fair Trade Matters</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Traditional agricultural supply chains often exploit farmers through unfair pricing and 
                  delayed payments. By leveraging blockchain technology, we create a direct connection 
                  between farmers and buyers, ensuring:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-[#6BBE45] mr-2">•</span>
                    <span>Instant payments upon sale completion</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#6BBE45] mr-2">•</span>
                    <span>Fair pricing set by farmers themselves</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#6BBE45] mr-2">•</span>
                    <span>Complete transparency in transactions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#6BBE45] mr-2">•</span>
                    <span>Verifiable product authenticity</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-start space-x-4">
              <div className="bg-[#6BBE45]/10 p-3 rounded-xl">
                <Zap className="w-8 h-8 text-[#6BBE45]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">How It Works</h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">1. Farmer Registration</h3>
                    <p>Farmers register on the platform with their details and connect their wallet.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">2. Upload Harvest</h3>
                    <p>Farmers upload harvest information including crop images stored on IPFS for authenticity.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">3. Marketplace Listing</h3>
                    <p>Harvests appear in the marketplace where buyers can browse and verify details.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">4. Direct Purchase</h3>
                    <p>Buyers purchase directly using cryptocurrency, with payment going straight to the farmer.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-start space-x-4">
              <div className="bg-[#6BBE45]/10 p-3 rounded-xl">
                <Globe className="w-8 h-8 text-[#6BBE45]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Built on Base</h2>
                <p className="text-gray-700 leading-relaxed">
                  AgriChain is built on the Base blockchain, a secure, low-cost, and developer-friendly 
                  Ethereum Layer 2 solution. This ensures fast transactions, minimal fees, and robust 
                  security for all participants in the agricultural supply chain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
