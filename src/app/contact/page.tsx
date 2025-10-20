'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import toast from 'react-hot-toast'
import { Mail, MapPin, Send } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const form = e.target as HTMLFormElement
      const formDataObj = new FormData(form)
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataObj
      })

      if (response.ok) {
        toast.success('Message sent successfully!')
        setFormData({ name: '', email: '', message: '' })
      } else {
        toast.error('Failed to send message')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600">
            Have questions? We'd love to hear from you
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="hidden"
                name="access_key"
                value="43e127fb-fb4a-4255-8a25-dfb868286c33"
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="input-field resize-none"
                  placeholder="Your message..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-start space-x-4">
                <div className="bg-[#6BBE45]/10 p-3 rounded-xl">
                  <Mail className="w-6 h-6 text-[#6BBE45]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email</h3>
                  <p className="text-gray-600">hello@agrichain.io</p>
                  <p className="text-gray-600">support@agrichain.io</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start space-x-4">
                <div className="bg-[#6BBE45]/10 p-3 rounded-xl">
                  <MapPin className="w-6 h-6 text-[#6BBE45]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Network</h3>
                  <p className="text-gray-600">Base Sepolia Testnet</p>
                  <p className="text-gray-600">Chain ID: 84532</p>
                </div>
              </div>
            </div>

            <div className="card bg-gradient-to-r from-[#6BBE45] to-[#558B37] text-white">
              <h3 className="font-bold text-xl mb-3">Join Our Community</h3>
              <p className="mb-4">
                Be part of the blockchain revolution in agriculture. Connect with farmers 
                and buyers building a fairer food system.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">
                  Twitter
                </a>
                <a href="#" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">
                  Discord
                </a>
                <a href="#" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">
                  Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
