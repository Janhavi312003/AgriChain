import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// @ts-ignore: Cannot find module or type declarations for side-effect import of './globals.css'.
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AgriChain - Empowering Farmers Through Blockchain',
  description: 'Blockchain-based platform for fair trade farming on Base',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
