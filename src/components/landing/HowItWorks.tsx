'use client'

import { motion, useReducedMotion } from 'framer-motion'

const STEPS = [
  {
    num: '01',
    title: 'Register as a grower',
    body: 'Connect your wallet and create a simple on-chain profile — name and location — once.',
  },
  {
    num: '02',
    title: 'Upload & AI-grade',
    body: 'Add a harvest photo. Gemini can suggest a grade and description; you edit and approve before listing.',
  },
  {
    num: '03',
    title: 'Buy on-chain',
    body: 'Buyers browse listings and purchase directly. Price and provenance stay visible on Base.',
  },
  {
    num: '04',
    title: 'Escrow payment',
    body: 'Funds settle through the marketplace contract so both sides get a clear, verifiable payment trail.',
  },
]

export default function HowItWorks() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="bg-sprout-light px-5 py-16 sm:px-8 sm:py-20 lg:px-10" aria-labelledby="how-it-works-heading">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <h2
            id="how-it-works-heading"
            className="font-display text-3xl font-light lowercase leading-tight tracking-tight text-deep-forest sm:text-4xl"
          >
            how it works
          </h2>
          <p className="mt-3 text-base leading-relaxed text-parchment-dim sm:text-lg">
            Four steps from farm gate to settled payment — without a middleman in between.
          </p>
        </motion.div>

        <ol className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {STEPS.map((step, i) => (
            <motion.li
              key={step.num}
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: reduceMotion ? 0 : i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[24px] border border-deep-forest/8 bg-cream p-6 shadow-[0_12px_32px_rgba(31,61,26,0.06)] sm:p-7"
            >
              <span className="font-mono text-sm tracking-wider text-fresh-green-solid">{step.num}</span>
              <h3 className="mt-3 font-display text-xl font-normal lowercase leading-snug text-deep-forest">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-parchment-dim sm:text-[15px]">{step.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
