import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import LandingFooter from '@/components/landing/LandingFooter'
import AboutAmbientBackground from '@/components/landing/AboutAmbientBackground'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Why AgriChain exists — fair, direct trade between farmers and buyers, with transparent on-chain pricing.',
}

const GLOSSARY = [
  {
    term: 'Wallet',
    meaning:
      'Your account and identity on AgriChain, like a bank account you control yourself.',
  },
  {
    term: 'On-chain',
    meaning:
      'Recorded permanently on a public ledger anyone can check, not stored in a private company database.',
  },
  {
    term: 'Gas fee',
    meaning:
      'A tiny network fee (fractions of a cent on Base) for processing a transaction, not a fee AgriChain charges.',
  },
  {
    term: 'Escrow',
    meaning:
      'Payment is held safely until the trade is confirmed, so neither side is trusting the other blindly.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main id="main">
        {/* Mission — ambient Vegetable3D (lazy, desktop + motion only) */}
        <section className="relative isolate min-h-[28rem] overflow-hidden px-5 py-16 sm:min-h-[32rem] sm:px-8 sm:py-20 lg:px-10">
          <AboutAmbientBackground />
          <div className="relative z-10 mx-auto max-w-2xl">
            <h1 className="font-display text-4xl font-light lowercase leading-tight tracking-tight text-deep-forest sm:text-5xl">
              why we built agrichain
            </h1>
            <div className="mt-8 space-y-4 text-base leading-relaxed text-deep-forest sm:text-lg">
              <p>
                Most farmers still sell through layers of middlemen. By the time produce reaches a
                buyer, the grower has lost price control — and often a large share of the value.
              </p>
              <p>
                AgriChain is a place for farmers and buyers to trade directly. Listings, prices, and
                payments live on Base so anyone can see what was agreed, without a private ledger
                sitting between them.
              </p>
              <p>
                We care about fairness you can check: clear pricing, optional AI help for quality
                notes, and settlement that doesn&apos;t depend on trusting a broker.
              </p>
            </div>
          </div>
        </section>

        {/* Section A — For farmers / For buyers */}
        <section className="bg-cream px-5 py-16 sm:px-8 sm:py-20 lg:px-10" aria-labelledby="who-for-heading">
          <div className="mx-auto max-w-5xl">
            <h2
              id="who-for-heading"
              className="font-display text-3xl font-light lowercase leading-tight text-deep-forest sm:text-4xl"
            >
              who it&apos;s for
            </h2>
            <p className="mt-3 max-w-xl text-base text-parchment-dim">
              Two sides of the same fair trade — growers and buyers, meeting on-chain.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              <article className="rounded-[24px] border border-deep-forest/10 bg-sprout-light/80 p-6 sm:p-8">
                <p className="font-mono text-xs tracking-wider text-fresh-green-solid uppercase">
                  For farmers
                </p>
                <h3 className="mt-3 font-display text-2xl font-normal lowercase text-deep-forest">
                  list once, get paid directly
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-deep-forest/85 sm:text-base">
                  List your harvest with a photo — get a fair-price suggestion and an AI-assisted
                  quality description. Buyers pay in ETH directly to your wallet the moment they
                  purchase. No commission taken by AgriChain, no waiting on a middleman to release
                  funds.
                </p>
              </article>

              <article className="rounded-[24px] border border-deep-forest/10 bg-sprout-light/80 p-6 sm:p-8">
                <p className="font-mono text-xs tracking-wider text-fresh-green-solid uppercase">
                  For buyers
                </p>
                <h3 className="mt-3 font-display text-2xl font-normal lowercase text-deep-forest">
                  see the price, trust the ledger
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-deep-forest/85 sm:text-base">
                  Every listing shows exactly what the farmer set, verified on-chain. Payment goes
                  straight to the grower, held in escrow until you confirm receipt — so you&apos;re
                  not trusting a stranger&apos;s word, you&apos;re trusting a public ledger.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Section B — Blockchain glossary */}
        <section
          className="bg-sprout-light px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
          aria-labelledby="blockchain-basics-heading"
        >
          <div className="mx-auto max-w-5xl">
            <h2
              id="blockchain-basics-heading"
              className="font-display text-3xl font-light lowercase leading-tight text-deep-forest sm:text-4xl"
            >
              new to blockchain? here&apos;s what that means
            </h2>
            <p className="mt-3 max-w-xl text-base text-parchment-dim">
              A few words you&apos;ll see on AgriChain — plain language, no jargon tax.
            </p>

            <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {GLOSSARY.map((item) => (
                <li
                  key={item.term}
                  className="rounded-[20px] border border-deep-forest/8 bg-cream p-5 sm:p-6"
                >
                  <p className="font-mono text-sm tracking-wide text-fresh-green-solid">{item.term}</p>
                  <p className="mt-2 text-sm leading-relaxed text-deep-forest/85 sm:text-[15px]">
                    {item.meaning}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How it's different */}
        <section className="bg-cream px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display text-3xl font-light lowercase leading-tight text-deep-forest sm:text-4xl">
              how it&apos;s different
            </h2>
            <p className="mt-3 max-w-xl text-base text-parchment-dim">
              A simple look at traditional mandi / middleman trade versus AgriChain.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-[24px] border border-deep-forest/10 bg-sprout-light/60 p-6 sm:p-8">
                <p className="font-mono text-xs tracking-wider text-parchment-dim uppercase">
                  Traditional mandi
                </p>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-deep-forest sm:text-base">
                  <li>Price set through intermediaries; grower often last to know</li>
                  <li>Payment path opaque; cuts and delays are common</li>
                  <li>Quality judged informally, hard to audit later</li>
                  <li>Little lasting record of what sold for what</li>
                </ul>
              </div>
              <div className="rounded-[24px] border border-fresh-green/30 bg-cream p-6 shadow-[0_12px_32px_rgba(31,61,26,0.06)] sm:p-8">
                <p className="font-mono text-xs tracking-wider text-fresh-green-solid uppercase">
                  AgriChain
                </p>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-deep-forest sm:text-base">
                  <li>Direct listing and payment between farmer and buyer</li>
                  <li>On-chain price history you can verify on Base</li>
                  <li>Optional AI quality suggestions the farmer can edit</li>
                  <li>Escrow-style settlement with a public trail</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Stats strip — placeholders until contract reads are wired */}
        <section className="bg-sprout-light px-5 py-14 sm:px-8 lg:px-10" aria-labelledby="about-stats-heading">
          <div className="mx-auto max-w-5xl">
            <h2 id="about-stats-heading" className="sr-only">
              Marketplace snapshot
            </h2>
            {/* TODO: replace placeholders with live getAllHarvests / farmer registry reads */}
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
              {[
                { label: 'Farmers onboarded', value: '120+' },
                { label: 'Harvests listed', value: '340+' },
                { label: 'Avg. settlement', value: '~2 min' },
                { label: 'Network', value: 'Base' },
              ].map((stat) => (
                <div key={stat.label} className="min-w-0">
                  <p className="font-mono text-2xl tracking-tight text-deep-forest sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-parchment-dim sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 font-mono text-[11px] text-parchment-dim">
              Snapshot placeholders — wire to contract data before launch.
            </p>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  )
}
