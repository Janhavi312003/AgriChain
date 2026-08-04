'use client'

import { useRef, useState, FormEvent } from 'react'
import Navbar from '@/components/Navbar'
import LandingFooter from '@/components/landing/LandingFooter'
import toast from 'react-hot-toast'

/**
 * Contact form via Web3Forms.
 * Set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in .env.local
 * (get a free access key at https://web3forms.com).
 */
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() || ''
const CONTACT_EMAIL = 'hello@agrichain.io'

type Errors = Partial<Record<'name' | 'email' | 'message', string>>

function validate(name: string, email: string, message: string): Errors {
  const errors: Errors = {}
  if (!name.trim()) errors.name = 'Name is required'
  if (!email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = 'Enter a valid email address'
  }
  if (!message.trim()) errors.message = 'Message is required'
  else if (message.trim().length < 10) errors.message = 'Please write a bit more (at least 10 characters)'
  return errors
}

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const next = validate(name, email, message)
    setErrors(next)
    if (Object.keys(next).length > 0) return

    if (!WEB3FORMS_ACCESS_KEY) {
      toast.error('Contact form is not configured yet. Please email us directly.')
      return
    }

    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    formData.append('access_key', WEB3FORMS_ACCESS_KEY)
    formData.append('subject', 'New message from AgriChain contact form')
    formData.append('from_name', 'AgriChain Website')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })
      const result = await response.json()

      if (result.success) {
        toast.success("Message sent — we'll get back to you soon.")
        formRef.current?.reset()
        setName('')
        setEmail('')
        setMessage('')
        setErrors({})
      } else {
        toast.error('Something went wrong. Please try again or email us directly.')
      }
    } catch {
      toast.error('Something went wrong. Please try again or email us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const fieldClass = (hasError: boolean) =>
    `w-full min-h-11 rounded-xl border bg-cream px-4 py-3 text-deep-forest outline-none transition-colors focus:border-fresh-green focus:ring-2 focus:ring-fresh-green/25 disabled:opacity-60 ${
      hasError ? 'border-red-700/70' : 'border-deep-forest/15'
    }`

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main id="main" className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-xl">
          <h1 className="font-display text-4xl font-light lowercase leading-tight tracking-tight text-deep-forest sm:text-5xl">
            get in touch
          </h1>
          <p className="mt-4 text-base leading-relaxed text-parchment-dim sm:text-lg">
            Questions about listings, Base, or farming with AgriChain? Send a note — we read every
            message.
          </p>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-10 space-y-5"
            noValidate
          >
            {/* Honeypot — hidden from users; bots that fill it get rejected by Web3Forms */}
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
            />

            <div>
              <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-deep-forest">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
                className={fieldClass(!!errors.name)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
              />
              {errors.name && (
                <p id="contact-name-error" className="mt-1.5 text-sm text-red-800">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-deep-forest">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className={fieldClass(!!errors.email)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
              />
              {errors.email && (
                <p id="contact-email-error" className="mt-1.5 text-sm text-red-800">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-deep-forest">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isSubmitting}
                className={`${fieldClass(!!errors.message)} min-h-[120px] resize-y`}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
              />
              {errors.message && (
                <p id="contact-message-error" className="mt-1.5 text-sm text-red-800">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-harvest w-full min-h-11 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:min-w-[180px]"
            >
              {isSubmitting ? 'Sending…' : 'Send message'}
            </button>
          </form>

          <p className="mt-8 text-sm text-parchment-dim">
            or email us directly at{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex min-h-11 items-center font-medium text-fresh-green-solid underline-offset-2 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </main>
      <LandingFooter />
    </div>
  )
}
