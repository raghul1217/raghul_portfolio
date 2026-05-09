/**
 * Hero — full-screen landing section with stagger entrance, typewriter subtitle,
 * spinning conic-gradient ring, floating accent blobs, CTA buttons, and social icons.
 */

import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiUser } from 'react-icons/fi'
import { useTypewriter } from '../hooks/useTypewriter'

const TYPEWRITER_WORDS = ['Software Engineer', 'Graphic Designer', 'Freelancer', 'Full-Stack Developer']

const fadeUp = (delay: number) => ({
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export default function Hero() {
  const { displayText } = useTypewriter({ words: TYPEWRITER_WORDS })

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center bg-bg dark:bg-dark-bg pt-16"
    >
      <div className="max-w-6xl mx-auto px-6 w-full py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* ── Left column ── */}
          <div className="flex flex-col gap-6 order-2 md:order-1">

            {/* Eyebrow badge */}
            <motion.div {...fadeUp(0)}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface dark:bg-dark-surface border border-border dark:border-dark-border text-sm text-ink-muted dark:text-ink-muted-dark">
                ✦ Available for Freelance
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              {...fadeUp(0.1)}
              className="font-[family:var(--font-display)] font-bold text-5xl md:text-7xl leading-none tracking-tight text-ink dark:text-ink-on-dark"
            >
              Raghul<br />
              <span className="text-coral">Ramakrishnan</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div {...fadeUp(0.2)} className="h-8 flex items-center">
              <span className="text-xl md:text-2xl text-ink-muted dark:text-ink-muted-dark font-[family:var(--font-body)]">
                {displayText}
                <span className="animate-pulse text-coral ml-0.5">|</span>
              </span>
            </motion.div>

            {/* About paragraph */}
            <motion.p
              {...fadeUp(0.3)}
              className="text-base text-ink-muted dark:text-ink-muted-dark leading-relaxed max-w-lg"
            >
              Software Engineer Level I at Algomox, building scalable full-stack applications and
              cross-platform mobile experiences. B.E. Computer Science from Government College of
              Engineering, Salem (2025). Alongside engineering, I craft visual identities, UI
              systems, and posters — currently open to freelance projects in web, mobile, and
              graphic design.
            </motion.p>

            {/* CTA buttons */}
            <motion.div {...fadeUp(0.4)} className="flex gap-4 flex-wrap">
              <a
                href="#projects"
                onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="px-6 py-3 rounded-full bg-coral text-white font-semibold hover:bg-coral/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-coral/30 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-coral focus-visible:outline-none"
              >
                View Projects
              </a>
              <a
                href="#contact"
                onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="px-6 py-3 rounded-full border-2 border-coral text-coral font-semibold hover:bg-coral hover:text-white hover:-translate-y-0.5 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-coral focus-visible:outline-none"
              >
                Hire Me
              </a>
            </motion.div>

            {/* Social icons */}
            <motion.div {...fadeUp(0.5)} className="flex gap-4 pt-2">
              {[
                { icon: <FiGithub size={18} />, href: '#', label: 'GitHub' },        // TODO: Replace with real link
                { icon: <FiLinkedin size={18} />, href: '#', label: 'LinkedIn' },     // TODO: Replace with real link
                { icon: <FiMail size={18} />, href: 'mailto:#', label: 'Email' },    // TODO: Replace with real link
              ].map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2.5 rounded-full bg-surface dark:bg-dark-surface hover:bg-coral hover:text-white text-ink-muted dark:text-ink-muted-dark transition-all duration-200 focus-visible:ring-2 focus-visible:ring-coral focus-visible:outline-none"
                >
                  {social.icon}
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Right column: profile image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
            className="flex justify-center order-1 md:order-2"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">

              {/* Spinning conic-gradient ring */}
              <div
                className="absolute inset-0 rounded-full animate-spin-slow"
                style={{
                  background: 'conic-gradient(from 0deg, #E8603A, #38A3E8, #1DC98A, #F5B731, #8B7EF0, #E8603A)',
                  padding: '3px',
                }}
              />

              {/* Profile image circle */}
              <div className="absolute inset-[3px] rounded-full bg-surface dark:bg-dark-surface overflow-hidden flex items-center justify-center">
                <img
                  src="/profile.jpg"
                  alt="Raghul Ramakrishnan"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
                {/* Fallback silhouette */}
                <FiUser className="text-8xl text-ink-muted/30 dark:text-ink-muted-dark/30 absolute" size={120} />
              </div>

              {/* Floating accent blobs */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 0, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-sky opacity-80"
              />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: 0.5, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full bg-mint opacity-80"
              />
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, delay: 1, ease: 'easeInOut' }}
                className="absolute top-1/2 -left-8 w-5 h-5 rounded-full bg-lemon opacity-80"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
