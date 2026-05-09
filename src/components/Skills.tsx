/**
 * Skills — grouped skill pills with tech icons, candy accent colors per group,
 * and whileInView stagger animations.
 */

import { motion } from 'framer-motion'
import {
  SiReact, SiAngular, SiTypescript, SiBootstrap,
  SiFlutter,
  SiGo, SiNodedotjs, SiPython,
  SiPostgresql, SiMysql, SiMongodb,
  SiGraphql,
  SiGit, SiGithub,
  SiFigma,
} from 'react-icons/si'
import { FiCode } from 'react-icons/fi'
import React from 'react'
import type { SkillGroup } from '../types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SKILL_ICONS: Record<string, React.ComponentType<any>> = {

  React: SiReact,
  Angular: SiAngular,
  TypeScript: SiTypescript,
  Bootstrap: SiBootstrap,
  Flutter: SiFlutter,
  Go: SiGo,
  Java: FiCode,           // SiJava not in react-icons/si; using generic code icon
  'Node.js': SiNodedotjs,
  Python: SiPython,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  'REST API': SiNodedotjs,
  GraphQL: SiGraphql,
  Postman: FiCode,        // SiPostman may not be available; fallback
  Git: SiGit,
  GitHub: SiGithub,
  Figma: SiFigma,
}

const ACCENT_COLORS: Record<string, string> = {
  coral:  'text-coral border-coral shadow-coral/20',
  sky:    'text-sky border-sky shadow-sky/20',
  mint:   'text-mint border-mint shadow-mint/20',
  lemon:  'text-lemon border-lemon shadow-lemon/20',
  lilac:  'text-lilac border-lilac shadow-lilac/20',
}

const ACCENT_LABEL: Record<string, string> = {
  coral:  'text-coral',
  sky:    'text-sky',
  mint:   'text-mint',
  lemon:  'text-lemon',
  lilac:  'text-lilac',
}

const skillGroups: SkillGroup[] = [
  { label: 'Frontend',        color: 'coral',  skills: ['React', 'Angular', 'TypeScript', 'Bootstrap'] },
  { label: 'Mobile',          color: 'sky',    skills: ['Flutter'] },
  { label: 'Backend',         color: 'mint',   skills: ['Go', 'Java', 'Node.js', 'Python'] },
  { label: 'Databases',       color: 'lemon',  skills: ['PostgreSQL', 'MySQL', 'MongoDB'] },
  { label: 'APIs & Tools',    color: 'lilac',  skills: ['REST API', 'GraphQL', 'Postman'] },
  { label: 'DevOps & Collab', color: 'coral',  skills: ['Git', 'GitHub'] },
  { label: 'Design',          color: 'sky',    skills: ['Figma'] },
]

export default function Skills() {
  return (
    <section id="skills" className="w-full py-24 bg-surface dark:bg-dark-surface">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted dark:text-ink-muted-dark mb-3">
            What I Work With
          </p>
          <h2 className="font-[family:var(--font-display)] font-bold text-4xl md:text-5xl tracking-tight text-ink dark:text-ink-on-dark">
            My Toolkit
          </h2>
        </div>

        {/* Skill groups */}
        <div className="flex flex-col gap-10">
          {skillGroups.map(group => (
            <div key={group.label}>
              {/* Category label */}
              <p className={`text-xs font-semibold uppercase tracking-widest mb-4 ${ACCENT_LABEL[group.color]}`}>
                {group.label}
              </p>

              {/* Skill pills */}
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill, index) => {
                  const Icon = SKILL_ICONS[skill]
                  const accentClass = ACCENT_COLORS[group.color]
                  return (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                      className={`
                        group/pill flex items-center gap-2.5 px-4 py-2.5 rounded-xl
                        bg-bg dark:bg-dark-bg border border-border dark:border-dark-border
                        text-sm font-medium text-ink dark:text-ink-on-dark
                        hover:border-current hover:shadow-md hover:-translate-y-1
                        transition-all duration-200 cursor-default
                        hover:${accentClass.split(' ')[0]}
                      `}
                      style={{ '--tw-shadow-color': 'transparent' } as React.CSSProperties}
                    >
                      {Icon && (
                        <Icon
                          size={16}
                          className={`text-ink-muted dark:text-ink-muted-dark group-hover/pill:${accentClass.split(' ')[0]} transition-colors`}
                        />
                      )}
                      {skill}
                    </motion.div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
