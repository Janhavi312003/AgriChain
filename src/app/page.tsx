import Navbar from '@/components/Navbar'
import Hero from '@/components/landing/Hero'
import LivingLedgerTicker from '@/components/landing/LivingLedgerTicker'
import FeatureSections from '@/components/landing/FeatureSections'
import HowItWorks from '@/components/landing/HowItWorks'
import LandingFooter from '@/components/landing/LandingFooter'

export default function Home() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main id="main">
        <Hero />
        <FeatureSections />
        <HowItWorks />
        {/* Living Ledger — normal document flow, directly above Footer */}
        <LivingLedgerTicker />
      </main>
      <LandingFooter />
    </div>
  )
}
