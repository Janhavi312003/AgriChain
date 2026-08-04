import type { Metadata } from 'next'
import { Fraunces, Inter, IBM_Plex_Mono } from 'next/font/google'
// @ts-ignore: Cannot find module or type declarations for side-effect import of './globals.css'.
import './globals.css'
import { Providers } from './providers'
import ScrollProgress from '@/components/ScrollProgress'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-fraunces',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'AgriChain — empowering farmers through blockchain',
    template: '%s · AgriChain',
  },
  description:
    'Fair, direct harvest trade on Base. Farmers and buyers meet without middlemen — transparent on-chain prices, AI-assisted quality notes, and verifiable settlement.',
  openGraph: {
    title: 'AgriChain — empowering farmers through blockchain',
    description:
      'Fair, direct harvest trade on Base. Transparent prices, no middleman.',
    siteName: 'AgriChain',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgriChain — empowering farmers through blockchain',
    description:
      'Fair, direct harvest trade on Base. Transparent prices, no middleman.',
  },
  icons: {
    icon: '/icon',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${inter.variable} ${ibmPlexMono.variable} font-body antialiased`}
      >
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ScrollProgress />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
