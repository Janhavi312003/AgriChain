import { PrefetchLink } from '@/components/PrefetchLink'
import { IconSproutChain } from '@/components/ecosystem/Icons'
import { CONTRACT_ADDRESS } from '@/lib/contract'

const NAV_LINKS = [
  ['/', 'Home'],
  ['/dashboard', 'Dashboard'],
  ['/about', 'About'],
  ['/contact', 'Contact'],
] as const

function formatAddress(addr: string) {
  if (addr.length < 12) return addr
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`
}

export default function LandingFooter() {
  const hasContract =
    typeof CONTRACT_ADDRESS === 'string' &&
    CONTRACT_ADDRESS.startsWith('0x') &&
    CONTRACT_ADDRESS.length >= 42

  const basescanUrl = hasContract
    ? `https://sepolia.basescan.org/address/${CONTRACT_ADDRESS}`
    : 'https://sepolia.basescan.org'

  return (
    <footer id="site-footer" className="border-t border-deep-forest/10 bg-sprout-light">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {/* Brand */}
          <div>
            <PrefetchLink href="/" className="inline-flex items-center gap-2.5 text-deep-forest">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-fresh-green text-deep-forest">
                <IconSproutChain size={20} />
              </span>
              <span className="font-display text-xl font-normal tracking-tight">AgriChain</span>
            </PrefetchLink>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-parchment-dim">
              Fair trade farmland, on Base.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-sm font-medium text-deep-forest">Quick links</p>
            <nav className="mt-4 flex flex-col gap-1" aria-label="Footer">
              {NAV_LINKS.map(([href, label]) => (
                <PrefetchLink
                  key={href}
                  href={href}
                  className="inline-flex min-h-11 w-fit items-center text-sm text-deep-forest/75 transition-colors hover:text-deep-forest"
                >
                  {label}
                </PrefetchLink>
              ))}
            </nav>
          </div>

          {/* Network / contract trust signal */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-sm font-medium text-deep-forest">Network</p>
            <p className="mt-4 text-sm text-parchment-dim">Built on Base Sepolia</p>
            {hasContract ? (
              <a
                href={basescanUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex min-h-11 max-w-full flex-col justify-center gap-1 rounded-xl border border-deep-forest/10 bg-cream/80 px-4 py-3 transition-colors hover:border-fresh-green/40 hover:bg-cream"
              >
                <span className="text-xs text-parchment-dim">Marketplace contract</span>
                <span className="font-mono text-sm tracking-tight break-all text-deep-forest">
                  {formatAddress(CONTRACT_ADDRESS)}
                </span>
                <span className="text-xs font-medium text-fresh-green-solid">View on Basescan →</span>
              </a>
            ) : (
              <p className="mt-3 font-mono text-xs text-parchment-dim">
                Contract address unset — set NEXT_PUBLIC_CONTRACT_ADDRESS to link Basescan.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-deep-forest/10 bg-cream/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p className="text-xs text-parchment-dim sm:text-sm">
            © 2026 AgriChain. Built as a student project.
          </p>
          <p className="font-mono text-[11px] text-parchment-dim">Base Sepolia · Chain ID 84532</p>
        </div>
      </div>
    </footer>
  )
}
