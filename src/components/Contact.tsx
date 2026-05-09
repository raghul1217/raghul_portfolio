/**
 * Contact — two-column layout with info rows on the left and a validated
 * controlled form on the right, with AnimatePresence success toast.
 * TODO: Wire up to EmailJS or Formspree for real email delivery.
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMail, FiLinkedin, FiGithub, FiGlobe } from 'react-icons/fi'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

const CONTACT_ROWS = [
  { icon: FiMail,     label: 'Email',    value: 'raghulramakrishnan2004@gmail.com', href: 'mailto:raghulramakrishnan2004@gmail.com', accent: 'coral'  },
  { icon: FiLinkedin, label: 'LinkedIn', value: 'linkedin.com/in/raghul-ram',         href: 'https://www.linkedin.com/in/raghul-ram/', accent: 'sky'   },
  { icon: FiGithub,   label: 'GitHub',   value: 'github.com/raghul1217',              href: 'https://github.com/raghul1217',           accent: 'mint'  },
  { icon: FiGlobe,    label: 'Figma',    value: 'figma.com/@renderspark',             href: 'https://www.figma.com/@renderspark',      accent: 'lilac' },
]

const ACCENT_ICON: Record<string, string> = {
  coral: 'bg-coral/10 text-coral',
  sky:   'bg-sky/10 text-sky',
  mint:  'bg-mint/10 text-mint',
  lilac: 'bg-lilac/10 text-lilac',
}

const SUBJECT_OPTIONS = [
  'Website Design',
  'Mobile App Development',
  'Poster / Graphic Design',
  'Full-Stack Development',
  'Other',
]

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {}
  if (!form.name.trim()) errors.name = 'Name is required.'
  if (!form.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email.'
  }
  if (!form.subject) errors.subject = 'Please select a subject.'
  if (!form.message.trim()) errors.message = 'Message is required.'
  return errors
}

const inputClass = `w-full px-4 py-3 rounded-xl bg-surface dark:bg-dark-surface border border-border dark:border-dark-border text-ink dark:text-ink-on-dark placeholder:text-ink-muted dark:placeholder:text-ink-muted-dark focus:outline-none focus:border-coral focus:ring-2 focus:ring-coral/20 transition-all duration-200`

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [showToast, setShowToast] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitting(true)
    // TODO: Wire up to EmailJS or Formspree for real email delivery
    setTimeout(() => {
      setSubmitting(false)
      setForm({ name: '', email: '', subject: '', message: '' })
      setShowToast(true)
      setTimeout(() => setShowToast(false), 4000)
    }, 800)
  }

  return (
    <section id="contact" className="w-full py-24 bg-bg dark:bg-dark-bg">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted dark:text-ink-muted-dark mb-3">
            Get In Touch
          </p>
          <h2 className="font-[family:var(--font-display)] font-bold text-4xl md:text-5xl tracking-tight text-ink dark:text-ink-on-dark">
            Let&rsquo;s Build Something
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* ── Left: info ── */}
          <div className="flex flex-col gap-6">
            <p className="text-base text-ink-muted dark:text-ink-muted-dark leading-relaxed">
              Whether you have a startup idea, need a website, a mobile app, or a brand identity —
              I&rsquo;d love to hear about it. Available for freelance projects, collaborations, and
              full-time opportunities.
            </p>

            <div className="flex flex-col gap-3">
              {CONTACT_ROWS.map(row => (
                <a
                  key={row.label}
                  href={row.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-surface dark:bg-dark-surface border border-border dark:border-dark-border hover:border-coral transition-colors focus-visible:ring-2 focus-visible:ring-coral focus-visible:outline-none group"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${ACCENT_ICON[row.accent]}`}>
                    <row.icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-ink-muted dark:text-ink-muted-dark">{row.label}</p>
                    <p className="text-sm font-medium text-ink dark:text-ink-on-dark group-hover:text-coral transition-colors">
                      {row.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: form ── */}
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

            {/* Name */}
            <div>
              <input
                type="text"
                name="name"
                id="contact-name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
                aria-label="Your name"
              />
              {errors.name && <p className="text-xs text-coral mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                id="contact-email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
                aria-label="Your email"
              />
              {errors.email && <p className="text-xs text-coral mt-1">{errors.email}</p>}
            </div>

            {/* Subject */}
            <div>
              <select
                name="subject"
                id="contact-subject"
                value={form.subject}
                onChange={handleChange}
                className={`${inputClass} cursor-pointer`}
                aria-label="Project type"
              >
                <option value="" disabled>Select a subject…</option>
                {SUBJECT_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {errors.subject && <p className="text-xs text-coral mt-1">{errors.subject}</p>}
            </div>

            {/* Message */}
            <div>
              <textarea
                name="message"
                id="contact-message"
                rows={5}
                placeholder="Tell me about your project…"
                value={form.message}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
                aria-label="Your message"
              />
              {errors.message && <p className="text-xs text-coral mt-1">{errors.message}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-coral text-white font-semibold hover:bg-coral/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-coral/30 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-coral focus-visible:outline-none"
            >
              {submitting ? 'Sending…' : 'Send Message →'}
            </button>
          </form>
        </div>
      </div>

      {/* Success toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 px-6 py-4 rounded-xl bg-mint text-white font-semibold shadow-lg z-50"
          >
            ✓ Message sent! I&rsquo;ll get back to you soon.
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
