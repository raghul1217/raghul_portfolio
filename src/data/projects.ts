/** Project data for the portfolio — TODO: Replace with real project data, images, and URLs */

import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 1,
    title: 'AlgoMox Dashboard',
    description:
      'Enterprise-grade admin dashboard built with React and TypeScript. Features real-time data visualization, role-based access control, and a fully responsive design system.',
    image: '/projects/algomox.png', // TODO: Replace with real image
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    github: 'https://github.com/raghulramakrishnan', // TODO: Replace
    live: '',
  },
  {
    id: 2,
    title: 'RenderSpark Portfolio',
    description:
      'Personal portfolio website with smooth animations, clean visual hierarchy, and a focus on design craft. Built to showcase both engineering and design capabilities.',
    image: '/projects/renderspark.png', // TODO: Replace with real image
    tech: ['React', 'TypeScript', 'Figma'],
    github: 'https://github.com/raghulramakrishnan', // TODO: Replace
    live: 'https://renderspark.vercel.app/',
  },
  {
    id: 3,
    title: 'Flutter Commerce App',
    description:
      'Cross-platform mobile e-commerce application with product listings, cart management, and payment gateway integration — built with Flutter for iOS and Android.',
    image: '/projects/flutter-app.png', // TODO: Replace with real image
    tech: ['Flutter', 'Dart', 'Firebase', 'REST API'],
    github: 'https://github.com/raghulramakrishnan', // TODO: Replace
    live: '',
  },
  {
    id: 4,
    title: 'GraphQL API Gateway',
    description:
      'Scalable API gateway built with Node.js and GraphQL that consolidates multiple microservices behind a unified schema with JWT authentication and rate limiting.',
    image: '/projects/api-gateway.png', // TODO: Replace with real image
    tech: ['Node.js', 'GraphQL', 'Go', 'MongoDB'],
    github: 'https://github.com/raghulramakrishnan', // TODO: Replace
    live: '',
  },
]
