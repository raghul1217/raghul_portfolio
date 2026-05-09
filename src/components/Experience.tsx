/**
 * Experience — vertical timeline with alternating left/right cards on desktop,
 * gradient center line, animated dots, and slide-in animations.
 */

import { motion } from 'framer-motion'
import { FiBriefcase, FiBook } from 'react-icons/fi'
import type { TimelineEntry } from '../types'

const entries: TimelineEntry[] = [
  {
    type: 'work',
    title: 'Software Engineer Level I',
    subtitle: 'Algomox',
    date: 'Sep 2025 – Present',
    tagLabel: '🟢 Current',
    tagColor: 'mint',
    dotColor: 'mint',
    description:
      'Building scalable enterprise software solutions across the full stack. Collaborating with cross-functional teams to ship high-quality product features.',
  },
  {
    type: 'education',
    title: 'B.E. Computer Science Engineering',
    subtitle: 'Government College of Engineering, Salem',
    date: '2021 – 2025',
    tagLabel: '🎓 Graduated 2025',
    tagColor: 'lilac',
    dotColor: 'lilac',
    description:
      'Strong foundation in data structures, algorithms, system design, OOP, and software engineering principles.',
  },
]

const TAG_CLASSES: Record<string, string> = {
  mint:   'bg-mint/10 text-mint',
  lilac:  'bg-lilac/10 text-lilac',
  coral:  'bg-coral/10 text-coral',
  sky:    'bg-sky/10 text-sky',
  lemon:  'bg-lemon/10 text-lemon',
}

const DOT_CLASSES: Record<string, string> = {
  mint:   'bg-mint',
  lilac:  'bg-lilac',
  coral:  'bg-coral',
  sky:    'bg-sky',
  lemon:  'bg-lemon',
}

export default function Experience() {
  return (
    <section id="experience" className="w-full py-24 bg-bg dark:bg-dark-bg">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="mb-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted dark:text-ink-muted-dark mb-3">
            Background
          </p>
          <h2 className="font-[family:var(--font-display)] font-bold text-4xl md:text-5xl tracking-tight text-ink dark:text-ink-on-dark">
            Journey
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center vertical line — hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-coral via-sky to-mint" />

          <div className="flex flex-col gap-12">
            {entries.map((entry, index) => {
              const isLeft = index % 2 === 0
              return (
                <div key={index} className="relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0">

                  {/* Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                    className={`w-full md:w-5/12 ${isLeft ? 'md:pr-10 md:text-right' : 'md:ml-auto md:pl-10'}`}
                  >
                    <div className="bg-surface dark:bg-dark-surface rounded-2xl p-6 border border-border dark:border-dark-border shadow-sm hover:shadow-md transition-shadow duration-300">

                      {/* Icon + date row */}
                      <div className={`flex items-center gap-3 mb-4 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                        <div className="w-9 h-9 rounded-xl bg-bg dark:bg-dark-bg flex items-center justify-center text-ink-muted dark:text-ink-muted-dark shrink-0">
                          {entry.type === 'work' ? <FiBriefcase size={16} /> : <FiBook size={16} />}
                        </div>
                        <span className="text-xs font-mono text-ink-muted dark:text-ink-muted-dark">
                          {entry.date}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-semibold font-[family:var(--font-display)] text-ink dark:text-ink-on-dark mb-1">
                        {entry.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-sm text-ink-muted dark:text-ink-muted-dark mb-3">
                        {entry.subtitle}
                      </p>

                      {/* Tag pill */}
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold mb-3 ${TAG_CLASSES[entry.tagColor]}`}>
                        {entry.tagLabel}
                      </span>

                      {/* Description */}
                      <p className="text-sm text-ink-muted dark:text-ink-muted-dark leading-relaxed">
                        {entry.description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Timeline dot — centered on line (desktop only) */}
                  <div className={`hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-4 h-4 rounded-full ${DOT_CLASSES[entry.dotColor]} border-2 border-bg dark:border-dark-bg animate-pulse z-10`} />

                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
