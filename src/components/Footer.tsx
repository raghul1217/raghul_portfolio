/**
 * Footer — monogram, social icons, copyright, and back-to-top button.
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMessageCircle, FiInstagram, FiMail, FiArrowUp } from 'react-icons/fi'

const SOCIALS = [
  { icon: FiGithub,         href: 'https://github.com/raghul1217',                  label: 'GitHub'    },
  { icon: FiLinkedin,       href: 'https://www.linkedin.com/in/raghul-ram/',         label: 'LinkedIn'  },
  { icon: FiMessageCircle,  href: 'https://wa.me/9345546946',                        label: 'WhatsApp'  },
  { icon: FiInstagram,      href: 'https://www.instagram.com/raghul_ramm',           label: 'Instagram' },
  { icon: FiMail,           href: 'mailto:raghulramakrishnan2004@gmail.com',         label: 'Email'     },
]

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <footer className="py-12 border-t border-border dark:border-dark-border bg-surface dark:bg-dark-surface">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-6">

          {/* Monogram */}
          <span className="font-[family:var(--font-logo)] font-extrabold text-2xl tracking-tight">
            <span className="text-ink dark:text-ink-on-dark">Render</span><span className="text-coral">Spark</span>
          </span>

          {/* Social icons */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {SOCIALS.map(social => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-bg dark:bg-dark-bg hover:bg-coral hover:text-white text-ink-muted dark:text-ink-muted-dark transition-all duration-200 focus-visible:ring-2 focus-visible:ring-coral focus-visible:outline-none"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-ink-muted dark:text-ink-muted-dark text-center">
            © 2025 Raghul Ramakrishnan · Crafted with React &amp; ♥
          </p>
          <p className="text-xs text-ink-muted/60 dark:text-ink-muted-dark/60">
            Open to freelance opportunities
          </p>

        </div>
      </footer>

      {/* Back-to-top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-coral text-white flex items-center justify-center shadow-lg hover:bg-coral/90 hover:-translate-y-1 transition-all z-40 focus-visible:ring-2 focus-visible:ring-coral focus-visible:outline-none"
          >
            <FiArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
