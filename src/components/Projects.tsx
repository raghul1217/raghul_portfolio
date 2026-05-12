/**
 * Projects — responsive card grid with subtitle, image/gradient fallback, tool badges,
 * GitHub + Live links, and whileInView stagger animations.
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { projects } from '../data/projects'

const GRADIENT_PAIRS = [
  ['var(--color-coral)', 'var(--color-sky)'],
  ['var(--color-sky)',   'var(--color-mint)'],
  ['var(--color-mint)',  'var(--color-lemon)'],
  ['var(--color-lemon)', 'var(--color-lilac)'],
  ['var(--color-lilac)', 'var(--color-coral)'],
  ['var(--color-coral)', 'var(--color-mint)'],
]

function ProjectImage({ src, title, index }: { src: string; title: string; index: number }) {
  const [failed, setFailed] = useState(false)
  const [a, b] = GRADIENT_PAIRS[index % GRADIENT_PAIRS.length]

  if (!src || failed) {
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}
      >
        <span className="text-white/80 text-sm font-semibold text-center px-4 leading-snug">{title}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={title}
      loading="lazy"
      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
      onError={() => setFailed(true)}
    />
  )
}

export default function Projects() {
  return (
    <section id="projects" className="w-full py-24 bg-surface dark:bg-dark-surface">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted dark:text-ink-muted-dark mb-3">
            Selected Work
          </p>
          <h2 className="font-[family:var(--font-display)] font-bold text-4xl md:text-5xl tracking-tight text-ink dark:text-ink-on-dark">
            Work I&rsquo;m Proud Of
          </h2>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="group rounded-2xl overflow-hidden bg-bg dark:bg-dark-bg border border-border dark:border-dark-border hover:border-coral dark:hover:border-coral hover:shadow-xl hover:shadow-coral/10 transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-surface dark:bg-dark-surface">
                <ProjectImage src={project.image} title={project.title} index={index} />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1 gap-3">

                {/* Title */}
                <h3 className="text-lg font-semibold font-[family:var(--font-display)] text-ink dark:text-ink-on-dark leading-snug">
                  {project.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm text-ink-muted dark:text-ink-muted-dark leading-relaxed"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {project.description}
                </p>

                {/* Tool badges */}
                <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                  {project.tools.map(t => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs rounded-full bg-surface dark:bg-dark-surface border border-border dark:border-dark-border text-ink-muted dark:text-ink-muted-dark"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center justify-between pt-2 border-t border-border dark:border-dark-border mt-1">
                  {project.github && project.github !== project.liveLink ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} on GitHub`}
                      className="flex items-center gap-1.5 text-sm text-ink-muted dark:text-ink-muted-dark hover:text-coral transition-colors focus-visible:ring-2 focus-visible:ring-coral focus-visible:outline-none rounded"
                    >
                      <FiGithub size={15} /> GitHub
                    </a>
                  ) : (
                    <span />
                  )}

                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live demo`}
                      className="flex items-center gap-1.5 text-sm font-semibold text-coral hover:text-coral/80 transition-colors focus-visible:ring-2 focus-visible:ring-coral focus-visible:outline-none rounded ml-auto"
                    >
                      <FiExternalLink size={15} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
