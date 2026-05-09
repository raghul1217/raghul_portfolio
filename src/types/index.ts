/** Shared TypeScript interfaces for Raghul Ramakrishnan's portfolio */

export interface Project {
  id: number
  title: string
  description: string
  image: string
  tech: string[]
  github: string
  live: string
}

export interface SkillGroup {
  label: string
  color: 'coral' | 'sky' | 'mint' | 'lemon' | 'lilac'
  skills: string[]
}

export interface TimelineEntry {
  type: 'work' | 'education'
  title: string
  subtitle: string
  date: string
  tagLabel: string
  tagColor: 'mint' | 'lilac' | 'coral' | 'sky' | 'lemon'
  dotColor: 'mint' | 'lilac' | 'coral' | 'sky' | 'lemon'
  description: string
}
