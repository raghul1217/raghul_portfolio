/** Project data for Raghul Ramakrishnan's portfolio */

import type { Project } from '../types'

import auraImg      from '../assets/aura.png'
import progeniImg   from '../assets/progeni.png'
import youtuberImg  from '../assets/youtuber.png'
import groceryImg   from '../assets/grocery.png'
import shopImg      from '../assets/shop.png'
import museumImg    from '../assets/museum.jpg'

export const projects: Project[] = [
  {
    id: 1,
    title: 'Registration Website for Aura25',
    description:
      'Developed the Aura event registration website using React, featuring Framer Motion, scroll effects, and a sleek design. Integrated Google Forms for user data registration.',
    image: auraImg,
    tools: ['React', 'Framer Motion', 'Google Forms', 'Vercel', 'Hostinger'],
    github: '',
    liveLink: 'https://www.aura25.site',
  },
  {
    id: 2,
    title: 'Website for Symposium',
    description:
      'Developed a symposium website with JWT authentication, user profiles, QR code-based payment verification, and MongoDB integration for seamless registration and data management.',
    image: progeniImg,
    tools: ['React', 'MongoDB', 'Node', 'Express', 'JWT', 'Vercel'],
    github: '',
    liveLink: 'https://progeni25.vercel.app/',
  },
  {
    id: 3,
    title: 'UI Design for YouTuber',
    description:
      "Designed a modern UI in Figma for a movie review YouTuber's website, focusing on showcasing videos and enhancing user engagement.",
    image: youtuberImg,
    tools: ['Figma', 'Unsplash'],
    github: '',
    liveLink: 'https://www.figma.com/design/J2w0M341gDQDaVyXvwTyVG/Youtuber-Design?node-id=0-1&t=4XkPFc0d1hWf30UK-1',
  },
  {
    id: 4,
    title: 'Modern Ecommerce Website',
    description:
      'A sleek e-commerce platform with a modern design, dynamic cart and wishlist, robust filters, and a budget tracker for a seamless shopping experience.',
    image: groceryImg,
    tools: ['React', 'Removebg', 'Framer Motion', 'Vercel'],
    github: 'https://github.com/raghul1217/Algomox-Groceryshop',
    liveLink: 'https://algomox-groceryshop-3z7i.vercel.app/',
  },
  {
    id: 5,
    title: 'E-Products Shopping',
    description:
      'Developed a MERN stack shopping cart website with full CRUD functionality, featuring an admin panel for efficient product management, editing, and updates.',
    image: shopImg,
    tools: ['React', 'Node', 'Express', 'Tailwind', 'Cloudinary', 'MongoDB', 'Vercel'],
    github: 'https://github.com/raghul1217/Project_expo_stripe',
    liveLink: 'https://digi-frontend-bay.vercel.app',
  },
  {
    id: 6,
    title: 'Museum UI Design',
    description:
      'Designed a modern UI in Figma for a museum website, focusing on showcasing multiple events, historical statues, and conducting virtual tours.',
    image: museumImg,
    tools: ['Figma', 'Unsplash', 'Iconify'],
    github: 'https://www.figma.com/design/TRea6h6M2UKkwBtAkDVr5V/REVIVE24-MUSEUM?node-id=0-1&t=Wo5140NiCp6dVTXU-1',
    liveLink: 'https://www.figma.com/design/TRea6h6M2UKkwBtAkDVr5V/REVIVE24-MUSEUM?node-id=0-1&t=Wo5140NiCp6dVTXU-1',
  },
]
