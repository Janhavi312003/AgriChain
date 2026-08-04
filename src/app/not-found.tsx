import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <main
        id="main"
        className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-5 py-20 text-center sm:px-8"
      >
        <p className="font-mono text-sm tracking-wider text-fresh-green-solid">404</p>
        <h1 className="mt-4 font-display text-4xl font-light lowercase leading-tight tracking-tight text-deep-forest sm:text-5xl">
          this field is empty
        </h1>
        <p className="mt-4 text-base leading-relaxed text-parchment-dim">
          We couldn&apos;t find that page. It may have moved, or the link might be off by a furrow.
        </p>
        <div className="mt-10 flex justify-center">
          <Link href="/" className="btn-harvest min-h-11 px-6">
            Back home
          </Link>
        </div>
      </main>
    </div>
  )
}
