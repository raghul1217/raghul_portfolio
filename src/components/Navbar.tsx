/**
 * Navbar — sticky top navigation with scroll-aware frosted glass, active section highlight,
 * theme toggle, and mobile hamburger menu with AnimatePresence overlay.
 */

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'
import { useTheme } from '../hooks/useTheme'
import { useActiveSection } from '../hooks/useActiveSection'

const NAV_LINKS = [
  { label: 'About',      href: '#hero' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
]

const SECTION_IDS = ['hero', 'skills', 'experience', 'projects', 'contact']

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const activeSection = useActiveSection(SECTION_IDS)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = useCallback((href: string) => {
    setMobileOpen(false)
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-bg/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-border dark:border-dark-border'
            : ''
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Monogram */}
          <a
            href="#hero"
            onClick={e => { e.preventDefault(); handleNavClick('#hero') }}
            className="font-[family:var(--font-logo)] font-bold text-xl uppercase tracking-[0.15em] hover:opacity-80 transition-opacity"
            aria-label="Go to top"
          >
            <span className="text-ink dark:text-ink-on-dark">Render</span><span className="text-coral">Spark</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map(link => {
              const id = link.href.replace('#', '')
              const isActive = activeSection === id
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={e => { e.preventDefault(); handleNavClick(link.href) }}
                  className={`relative text-sm font-medium transition-colors duration-200 py-1
                    after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5
                    after:bg-coral after:transition-all after:duration-300
                    ${isActive
                      ? 'text-coral after:w-full'
                      : 'text-ink-muted dark:text-ink-muted-dark hover:text-coral after:w-0 hover:after:w-full'
                    }`}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>

          {/* Right: theme toggle + mobile hamburger */}
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ rotate: 180, scale: 0.9 }}
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="rounded-full p-2 bg-surface dark:bg-dark-surface hover:bg-surface2 dark:hover:bg-dark-surface2 text-ink-muted dark:text-ink-muted-dark transition-colors focus-visible:ring-2 focus-visible:ring-coral focus-visible:outline-none"
            >
              {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
            </motion.button>

            <button
              onClick={() => setMobileOpen(prev => !prev)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden rounded-full p-2 bg-surface dark:bg-dark-surface hover:bg-surface2 dark:hover:bg-dark-surface2 text-ink-muted dark:text-ink-muted-dark transition-colors focus-visible:ring-2 focus-visible:ring-coral focus-visible:outline-none"
            >
              {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-bg/95 dark:bg-dark-bg/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 pt-16"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={e => { e.preventDefault(); handleNavClick(link.href) }}
                className="text-3xl font-[family:var(--font-display)] font-bold text-ink dark:text-ink-on-dark hover:text-coral transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
