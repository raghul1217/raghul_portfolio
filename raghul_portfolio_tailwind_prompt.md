# Master Prompt — Raghul Ramakrishnan Portfolio Website
### Stack: React 18 + TypeScript + Tailwind CSS v4 + Framer Motion

> Copy this entire prompt into Claude Opus or any frontier model. It is self-contained.

---

## ROLE & OBJECTIVE

You are an expert React + TypeScript frontend engineer and UI/UX designer. Your task is to build a **complete, production-ready, single-page portfolio website** for **Raghul Ramakrishnan** — a Software Engineer & Graphic Designer who is also starting a freelance business in website design, mobile app development, and poster/graphic creation.

The website must be professional, visually memorable, and designed to attract freelance clients while showcasing engineering credibility. Every section, animation, and color choice should serve this dual purpose.

---

## TECH STACK

- **React 18 + TypeScript** — Vite scaffold
- **Tailwind CSS v4** — all styling via utility classes. Custom design tokens defined in `@theme {}` block inside `globals.css`. Dark mode via `dark:` variants toggled by adding `class="dark"` on `<html>`.
- **Framer Motion** — scroll animations, entrance effects, hover interactions, layout transitions.
- **React Icons** — `react-icons/si` for tech stack logos, `react-icons/fi` for UI icons (feather icons).
- **No UI kits** — no MUI, Chakra, shadcn. All components hand-composed from Tailwind utilities.

---

## SETUP

```bash
npm create vite@latest raghul-portfolio -- --template react-ts
cd raghul-portfolio
npm install tailwindcss @tailwindcss/vite framer-motion react-icons
```

### `vite.config.ts`
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

---

## DESIGN TOKENS — `src/globals.css`

```css
@import "tailwindcss";

@theme {
  /* ── Candy Accent Colors ── */
  --color-coral:  #E8603A;
  --color-sky:    #38A3E8;
  --color-mint:   #1DC98A;
  --color-lemon:  #F5B731;
  --color-lilac:  #8B7EF0;

  /* ── Light Theme Surfaces ── */
  --color-bg:        #FFFFFF;
  --color-surface:   #F6F5F2;
  --color-surface2:  #EDECEA;
  --color-border:    #D3D1C7;

  /* ── Dark Theme Surfaces ── */
  --color-dark-bg:       #0D0D14;
  --color-dark-surface:  #16161F;
  --color-dark-surface2: #1E1E2C;
  --color-dark-border:   #2A2A38;

  /* ── Typography ── */
  --color-ink:           #111118;
  --color-ink-muted:     #5A5A6A;
  --color-ink-on-dark:   #E8E8F0;
  --color-ink-muted-dark:#8888A0;

  /* ── Fonts ── */
  --font-display: 'Cabinet Grotesk', 'DM Sans', sans-serif;
  --font-body:    'Instrument Sans', 'DM Sans', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;

  /* ── Spacing extras ── */
  --radius-pill: 999px;
}
```

Add this to the top of `globals.css` to load the fonts:
```css
@import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500&f[]=instrument-sans@400,500&display=swap');
```

Use `font-[family:var(--font-display)]` and `font-[family:var(--font-body)]` as Tailwind arbitrary value classes wherever needed. Set `font-[family:var(--font-body)]` as the default on `<body>`.

---

## THEME SYSTEM

- Dark mode class strategy: Tailwind v4 uses `dark:` variants. Toggle by adding/removing `class="dark"` on `<html>`.
- Write a `useTheme` hook in `src/hooks/useTheme.ts` that reads/writes `localStorage.getItem('theme')` and applies `document.documentElement.classList.toggle('dark')`.
- A floating theme toggle button (sun ↔ moon via `FiSun` / `FiMoon` from react-icons/fi) is always visible in the top-right of the navbar.
- Color mapping per theme:

| Token | Light | Dark |
|---|---|---|
| Page bg | `bg-bg` | `dark:bg-dark-bg` |
| Card bg | `bg-surface` | `dark:bg-dark-surface` |
| Heading | `text-ink` | `dark:text-ink-on-dark` |
| Body text | `text-ink-muted` | `dark:text-ink-muted-dark` |
| Border | `border-border` | `dark:border-dark-border` |

Candy accent colors (`coral`, `sky`, `mint`, `lemon`, `lilac`) are used identically in both themes — same hex values. They are vivid enough to read on both white and dark ink backgrounds.

---

## TYPOGRAPHY RULES

- Headings: `font-[family:var(--font-display)] font-bold tracking-tight`
- Body: `font-[family:var(--font-body)] font-normal leading-relaxed`
- Section eyebrow labels: `text-xs font-semibold uppercase tracking-widest text-ink-muted dark:text-ink-muted-dark`
- **Never use**: Inter, Roboto, Arial, system-ui as primary fonts.
- Section heading size: `text-4xl md:text-5xl`
- Subsection/card titles: `text-xl font-semibold`

---

## LAYOUT RULES

- Max content width: `max-w-6xl mx-auto px-6`
- Sections are `w-full py-24` containers with the content div inside.
- Smooth scroll: add `scroll-behavior: smooth` in `globals.css` on `html`.
- Subtle noise texture on the page background — add this utility in `globals.css`:
```css
body {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
}
```

---

## FILE STRUCTURE

```
src/
├── App.tsx
├── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Skills.tsx
│   ├── Experience.tsx
│   ├── Projects.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── hooks/
│   ├── useTheme.ts           ← localStorage + class toggle
│   ├── useTypewriter.ts      ← cycling typewriter text
│   └── useActiveSection.ts   ← IntersectionObserver for nav highlight
├── data/
│   └── projects.ts           ← project cards data array
└── types/
    └── index.ts              ← shared TS interfaces
```

---

## SECTION 1 — NAVBAR

Sticky top navbar. On scroll past 60px, add backdrop blur and a bottom border:
```
className="fixed top-0 w-full z-50 transition-all duration-300"
scrolled: "bg-bg/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-border dark:border-dark-border"
```

Contents:
- **Left**: Monogram `"RR"` in `font-[family:var(--font-display)] font-bold text-2xl text-coral` — links to `#hero`.
- **Center (desktop)**: Nav links — `About`, `Skills`, `Experience`, `Projects`, `Contact`. Active section link gets `text-coral` highlight (use `useActiveSection` hook with IntersectionObserver). Hover: `text-coral transition-colors`. Each link has an animated underline: `after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-coral after:w-0 hover:after:w-full after:transition-all`.
- **Right**: Theme toggle button — `FiSun` / `FiMoon` icon in a `rounded-full p-2 bg-surface dark:bg-dark-surface hover:bg-surface2 dark:hover:bg-dark-surface2 transition-colors` button.
- **Mobile**: Hamburger `FiMenu` icon. On click, show a full-screen slide-down overlay with the same nav links stacked vertically. Animate with Framer Motion `AnimatePresence` + `y: -20 → 0, opacity: 0 → 1`.

---

## SECTION 2 — HERO

`id="hero"` — `min-h-screen flex items-center bg-bg dark:bg-dark-bg`

### Two-column layout: `grid grid-cols-1 md:grid-cols-2 gap-12 items-center`

**Left column:**

Animate each element with Framer Motion stagger on mount (`initial: {y: 60, opacity: 0}` → `animate: {y: 0, opacity: 1}` with `delay` increments of 0.1s):

1. Eyebrow tag: a pill badge — `inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface dark:bg-dark-surface border border-border dark:border-dark-border text-sm text-ink-muted dark:text-ink-muted-dark` — text: `"✦ Available for Freelance"`

2. Name heading:
```jsx
<h1 className="font-[family:var(--font-display)] font-bold text-5xl md:text-7xl leading-none tracking-tight text-ink dark:text-ink-on-dark">
  Raghul<br />
  <span className="text-coral">Ramakrishnan</span>
</h1>
```

3. Typewriter subtitle — cycles through `["Software Engineer", "Graphic Designer", "Freelancer", "Full-Stack Developer"]` using `useTypewriter` hook. Style: `text-xl md:text-2xl text-ink-muted dark:text-ink-muted-dark font-[family:var(--font-body)]` with a blinking cursor `|`.

4. About paragraph:
> *Software Engineer Level I at Algomox, building scalable full-stack applications and cross-platform mobile experiences. B.E. Computer Science from Government College of Engineering, Salem (2025). Alongside engineering, I craft visual identities, UI systems, and posters — currently open to freelance projects in web, mobile, and graphic design.*

Style: `text-base text-ink-muted dark:text-ink-muted-dark leading-relaxed max-w-lg`

5. CTA buttons row — `flex gap-4 flex-wrap`:
   - **Primary**: `"View Projects"` — `px-6 py-3 rounded-full bg-coral text-white font-semibold hover:bg-coral/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-coral/30 transition-all duration-200`
   - **Secondary**: `"Hire Me"` — `px-6 py-3 rounded-full border-2 border-coral text-coral font-semibold hover:bg-coral hover:text-white hover:-translate-y-0.5 transition-all duration-200`

6. Social icons row — `flex gap-4 pt-2`:
   - GitHub (`FiGithub`), LinkedIn (`FiLinkedin`), Email (`FiMail`)
   - Each: `p-2.5 rounded-full bg-surface dark:bg-dark-surface hover:bg-coral hover:text-white text-ink-muted dark:text-ink-muted-dark transition-all duration-200`
   - Links: leave as `href="#"` with `{/* TODO: Replace with real links */}` comment

**Right column:**

Centered profile image area. Stack layers using `relative`:

1. **Spinning gradient ring** — outer wrapper:
```jsx
<div className="relative w-72 h-72 mx-auto">
  <div
    className="absolute inset-0 rounded-full animate-spin"
    style={{
      background: 'conic-gradient(from 0deg, #E8603A, #38A3E8, #1DC98A, #F5B731, #8B7EF0, #E8603A)',
      animationDuration: '8s',
      padding: '3px',
    }}
  />
```
Add `@keyframes spin` override in globals.css for a slower 8s linear infinite spin.

2. **Profile image circle** — inside the ring wrapper:
```jsx
  <div className="absolute inset-[3px] rounded-full bg-surface dark:bg-dark-surface overflow-hidden flex items-center justify-center">
    <img
      src="/profile.jpg" {/* TODO: Replace with real photo */}
      alt="Raghul Ramakrishnan"
      className="w-full h-full object-cover"
      onError={(e) => { e.currentTarget.style.display='none' }}
    />
    {/* Fallback silhouette if no photo */}
    <FiUser className="text-8xl text-ink-muted/30 dark:text-ink-muted-dark/30" />
  </div>
</div>
```

3. **Floating accent blobs** — 3 small colored circles positioned absolutely around the image, animated with Framer Motion `animate={{ y: [0, -12, 0] }}` `transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}` with different delays:
```jsx
<motion.div animate={{y:[0,-12,0]}} transition={{repeat:Infinity,duration:3,delay:0}}
  className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-sky opacity-80" />
<motion.div animate={{y:[0,-10,0]}} transition={{repeat:Infinity,duration:4,delay:0.5}}
  className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full bg-mint opacity-80" />
<motion.div animate={{y:[0,-14,0]}} transition={{repeat:Infinity,duration:3.5,delay:1}}
  className="absolute top-1/2 -left-8 w-5 h-5 rounded-full bg-lemon opacity-80" />
```

---

## SECTION 3 — SKILLS

`id="skills"` — `py-24 bg-surface dark:bg-dark-surface`

**Heading area:**
```jsx
<p className="eyebrow">What I Work With</p>
<h2 className="section-heading">My Toolkit</h2>
```

### Grouped skill cards layout

Group skills into categories. Render each category with a label above and a flex-wrap row of skill pill cards below.

```ts
const skillGroups = [
  { label: "Frontend",        color: "coral",  skills: ["React","Angular","TypeScript","Bootstrap"] },
  { label: "Mobile",          color: "sky",    skills: ["Flutter"] },
  { label: "Backend",         color: "mint",   skills: ["Go","Java","Node.js","Python"] },
  { label: "Databases",       color: "lemon",  skills: ["PostgreSQL","MySQL","MongoDB"] },
  { label: "APIs & Tools",    color: "lilac",  skills: ["REST API","GraphQL","Postman"] },
  { label: "DevOps & Collab", color: "coral",  skills: ["Git","GitHub"] },
  { label: "Design",          color: "sky",    skills: ["Figma"] },
]
```

Each skill pill card:
```
┌─────────────────────┐
│  [SI Icon]  React   │
└─────────────────────┘
```
Tailwind classes:
```
flex items-center gap-2.5 px-4 py-2.5 rounded-xl
bg-bg dark:bg-dark-bg border border-border dark:border-dark-border
text-sm font-medium text-ink dark:text-ink-on-dark
hover:border-{accent} hover:shadow-md hover:shadow-{accent}/20
hover:-translate-y-1 transition-all duration-200 cursor-default
```

Use `react-icons/si` for each skill icon. Map skill name → correct SI icon. Icon color should be the group's candy accent color on hover.

Animate cards into view using Framer Motion `whileInView={{ opacity: 1, y: 0 }}` `initial={{ opacity: 0, y: 20 }}` with stagger using `transition={{ delay: index * 0.05 }}`. Use `viewport={{ once: true }}`.

Category label style: `text-xs font-semibold uppercase tracking-widest mb-3 text-{accent}` where accent matches the group color.

---

## SECTION 4 — EXPERIENCE

`id="experience"` — `py-24 bg-bg dark:bg-dark-bg`

**Heading:**
```jsx
<p className="eyebrow">Background</p>
<h2 className="section-heading">Journey</h2>
```

### Vertical Timeline Layout

Center a `2px` vertical line using: `absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-coral via-sky to-mint`

Cards alternate left/right on desktop (`md:w-5/12`), stack left-aligned on mobile.

Each card:
```
bg-surface dark:bg-dark-surface rounded-2xl p-6
border border-border dark:border-dark-border
shadow-sm hover:shadow-md transition-shadow duration-300
```

Timeline dot (centered on the line):
```
absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full
border-2 border-white dark:border-dark-bg
animate-pulse
```

**Timeline entries** (reverse-chronological):

**Entry 1 — Work:**
- Role: `Software Engineer Level I`
- Company: `Algomox`
- Date: `Sep 2025 – Present`
- Tag pill: `inline-flex px-3 py-1 rounded-full bg-mint/10 text-mint text-xs font-semibold` → "🟢 Current"
- Dot color: `bg-mint`
- Description: *Building scalable enterprise software solutions across the full stack. Collaborating with cross-functional teams to ship high-quality product features.*

**Entry 2 — Education:**
- Degree: `B.E. Computer Science Engineering`
- Institution: `Government College of Engineering, Salem`
- Date: `2021 – 2025`
- Tag pill: `bg-lilac/10 text-lilac` → "🎓 Graduated 2025"
- Dot color: `bg-lilac`
- Description: *Strong foundation in data structures, algorithms, system design, OOP, and software engineering principles.*

Animate each card: `whileInView={{ opacity:1, x:0 }}` from `initial={{ opacity:0, x: isLeft ? -60 : 60 }}` using `viewport={{ once: true }}`.

---

## SECTION 5 — PROJECTS

`id="projects"` — `py-24 bg-surface dark:bg-dark-surface`

**Heading:**
```jsx
<p className="eyebrow">Selected Work</p>
<h2 className="section-heading">Work I'm Proud Of</h2>
```

### Card Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

**Project card anatomy:**
```
┌──────────────────────────────────┐
│  [Image — 16:9, object-cover]    │
│  + gradient overlay at bottom    │
├──────────────────────────────────┤
│  Project Title  (text-xl bold)   │
│  Description    (2-3 lines, clamp│
│  -webkit-line-clamp: 3)          │
├──────────────────────────────────┤
│  [Tech] [Tech] [Tech]  (badges)  │
│  ________________                │
│  [GitHub ↗]     [Live Demo ↗]   │
└──────────────────────────────────┘
```

Card Tailwind classes:
```
group rounded-2xl overflow-hidden
bg-bg dark:bg-dark-bg border border-border dark:border-dark-border
hover:border-coral dark:hover:border-coral
hover:shadow-xl hover:shadow-coral/10
transition-all duration-300
```

Image wrapper: `relative aspect-video overflow-hidden`
Image: `w-full h-full object-cover group-hover:scale-105 transition-transform duration-500`
Gradient overlay: `absolute inset-0 bg-gradient-to-t from-black/40 to-transparent`

Tech badge: `px-2.5 py-1 text-xs rounded-full bg-surface dark:bg-dark-surface border border-border dark:border-dark-border text-ink-muted dark:text-ink-muted-dark`

GitHub button: `flex items-center gap-1.5 text-sm text-ink-muted dark:text-ink-muted-dark hover:text-coral transition-colors`
Live button: `flex items-center gap-1.5 text-sm font-semibold text-coral hover:text-coral/80 transition-colors`

If `live` URL is empty string, hide the live button entirely.

**Project data — `src/data/projects.ts`:**
```ts
// TODO: Replace with real project data, images, and URLs

export interface Project {
  id: number
  title: string
  description: string
  image: string
  tech: string[]
  github: string
  live: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: "AlgoMox Dashboard",
    description: "Enterprise-grade admin dashboard built with React and TypeScript. Features real-time data visualization, role-based access control, and a fully responsive design system.",
    image: "/projects/algomox.png",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    github: "https://github.com/raghulramakrishnan", // TODO: Replace
    live: "",
  },
  {
    id: 2,
    title: "RenderSpark Portfolio",
    description: "Personal portfolio website with smooth animations, clean visual hierarchy, and a focus on design craft. Built to showcase both engineering and design capabilities.",
    image: "/projects/renderspark.png",
    tech: ["React", "TypeScript", "Figma"],
    github: "https://github.com/raghulramakrishnan", // TODO: Replace
    live: "https://renderspark.vercel.app/",
  },
  {
    id: 3,
    title: "Flutter Commerce App",
    description: "Cross-platform mobile e-commerce application with product listings, cart management, and payment gateway integration — built with Flutter for iOS and Android.",
    image: "/projects/flutter-app.png",
    tech: ["Flutter", "Dart", "Firebase", "REST API"],
    github: "https://github.com/raghulramakrishnan", // TODO: Replace
    live: "",
  },
  {
    id: 4,
    title: "GraphQL API Gateway",
    description: "Scalable API gateway built with Node.js and GraphQL that consolidates multiple microservices behind a unified schema with JWT authentication and rate limiting.",
    image: "/projects/api-gateway.png",
    tech: ["Node.js", "GraphQL", "Go", "MongoDB"],
    github: "https://github.com/raghulramakrishnan", // TODO: Replace
    live: "",
  },
]
```

**Image fallback** — when image file doesn't exist, render a gradient placeholder div:
```jsx
<div className="w-full h-full flex items-center justify-center"
  style={{ background: `linear-gradient(135deg, var(--color-${accentForIndex}), var(--color-${accentForIndex2}))` }}>
  <span className="text-white/60 text-lg font-semibold">{project.title}</span>
</div>
```
Rotate accent pairs through: coral+sky, sky+mint, mint+lemon, lemon+lilac.

Animate each card: `whileInView={{ opacity:1, y:0 }}` from `initial={{ opacity:0, y:30 }}` with stagger `transition={{ delay: index * 0.1 }}`.

---

## SECTION 6 — CONTACT

`id="contact"` — `py-24 bg-bg dark:bg-dark-bg`

**Heading:**
```jsx
<p className="eyebrow">Get In Touch</p>
<h2 className="section-heading">Let's Build Something</h2>
```

### Two-column layout: `grid grid-cols-1 md:grid-cols-2 gap-12 items-start`

**Left column — info:**

Paragraph:
> *Whether you have a startup idea, need a website, a mobile app, or a brand identity — I'd love to hear about it. Available for freelance projects, collaborations, and full-time opportunities.*

Contact info rows — each row:
```jsx
<div className="flex items-center gap-4 p-4 rounded-xl bg-surface dark:bg-dark-surface border border-border dark:border-dark-border hover:border-coral transition-colors">
  <div className="w-10 h-10 rounded-full bg-coral/10 flex items-center justify-center text-coral">
    <FiMail size={18} />
  </div>
  <div>
    <p className="text-xs text-ink-muted dark:text-ink-muted-dark">Email</p>
    <p className="text-sm font-medium text-ink dark:text-ink-on-dark">
      {/* TODO: Replace with real email */}
      hello@raghulramakrishnan.com
    </p>
  </div>
</div>
```

Rows to include (with appropriate FI icons):
- Email → `FiMail` → `hello@raghulramakrishnan.com` ← TODO: replace
- LinkedIn → `FiLinkedin` → `linkedin.com/in/raghulramakrishnan` ← TODO: replace
- GitHub → `FiGithub` → `github.com/raghulramakrishnan` ← TODO: replace
- Portfolio → `FiGlobe` → `renderspark.vercel.app`

Icon accent colors rotate: coral, sky, mint, lilac.

**Right column — contact form:**

All inputs are React controlled components (no `<form>` submit — use `onSubmit={e => { e.preventDefault(); handleSubmit(); }}`).

Fields:
1. Name — `<input type="text" placeholder="Your name" />`
2. Email — `<input type="email" placeholder="your@email.com" />`
3. Subject — `<select>` with options:
   - `"Website Design"`
   - `"Mobile App Development"`
   - `"Poster / Graphic Design"`
   - `"Full-Stack Development"`
   - `"Other"`
4. Message — `<textarea rows={5} placeholder="Tell me about your project..." />`
5. Submit button — `"Send Message →"` — full width, coral filled, rounded-xl.

Input Tailwind classes:
```
w-full px-4 py-3 rounded-xl
bg-surface dark:bg-dark-surface
border border-border dark:border-dark-border
text-ink dark:text-ink-on-dark
placeholder:text-ink-muted dark:placeholder:text-ink-muted-dark
focus:outline-none focus:border-coral focus:ring-2 focus:ring-coral/20
transition-all duration-200
```

Validation: required fields + email format. Show inline error in `text-xs text-coral mt-1` below each field.

On successful submit: show a success toast notification (a fixed bottom-right div that fades in/out using Framer Motion AnimatePresence):
```jsx
<motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:20}}
  className="fixed bottom-6 right-6 px-6 py-4 rounded-xl bg-mint text-white font-semibold shadow-lg z-50">
  ✓ Message sent! I'll get back to you soon.
</motion.div>
```

Add `{/* TODO: Wire up to EmailJS or Formspree for real email delivery */}` comment in the submit handler.

---

## FOOTER

```jsx
<footer className="py-12 border-t border-border dark:border-dark-border bg-surface dark:bg-dark-surface">
  <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-6">

    {/* Monogram */}
    <span className="font-[family:var(--font-display)] font-bold text-3xl text-coral">RR</span>

    {/* Social icons row */}
    {/* FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiMail */}
    {/* Each: p-2.5 rounded-full bg-bg dark:bg-dark-bg hover:bg-coral hover:text-white transition-all */}

    {/* Copyright */}
    <p className="text-sm text-ink-muted dark:text-ink-muted-dark">
      © 2025 Raghul Ramakrishnan · Crafted with React & ♥
    </p>
    <p className="text-xs text-ink-muted/60 dark:text-ink-muted-dark/60">
      Open to freelance opportunities
    </p>

  </div>
</footer>
```

**Back-to-top button** — appears after scrolling 400px:
```jsx
<AnimatePresence>
  {showBackToTop && (
    <motion.button initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.8}}
      onClick={() => window.scrollTo({top:0,behavior:'smooth'})}
      className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-coral text-white flex items-center justify-center shadow-lg hover:bg-coral/90 hover:-translate-y-1 transition-all z-40">
      <FiArrowUp size={20} />
    </motion.button>
  )}
</AnimatePresence>
```

---

## ANIMATIONS SUMMARY

| Element | Framer Motion approach |
|---|---|
| Hero heading | `staggerChildren 0.1s`, `y: 60→0, opacity: 0→1` on mount |
| Hero subtitle typewriter | Custom `useTypewriter` hook with `setInterval` |
| Profile ring | CSS `@keyframes spin` 8s linear infinite |
| Floating blobs | `animate={{ y:[0,-12,0] }}` repeat Infinity |
| Skill cards | `whileInView y:20→0`, stagger per card |
| Timeline cards | `whileInView x:±60→0` per entry |
| Project cards | `whileInView y:30→0`, stagger per card |
| Nav link underline | CSS `after:w-0 hover:after:w-full transition-all` |
| Theme toggle icon | `whileTap={{ rotate: 180, scale: 0.9 }}` |
| Mobile menu | `AnimatePresence` + `y:-20→0, opacity:0→1` |
| Success toast | `AnimatePresence` + `y:20→0, opacity:0→1` |
| Back-to-top btn | `AnimatePresence` + `scale:0.8→1` |

---

## ACCESSIBILITY & CODE QUALITY

1. **Semantic HTML**: use `<main>`, `<section id="...">`, `<nav>`, `aria-label` on all icon-only buttons.
2. **TypeScript strict**: all props typed with `interface`, no `any`.
3. **Color contrast**: all text meets WCAG AA (≥4.5:1) against its background in both themes.
4. **Images**: `loading="lazy"`, `alt` text on all images.
5. **Focus styles**: `focus-visible:ring-2 focus-visible:ring-coral focus-visible:outline-none` on all interactive elements.
6. **Comments**: every component file starts with a JSDoc comment. All placeholder data marked `// TODO: Replace`.
7. **No hardcoded hex colors in JSX** — all colors via Tailwind utilities referencing the `@theme` tokens.

---

## RESPONSIVE BREAKPOINTS (Tailwind defaults)

| Breakpoint | Width | Behavior |
|---|---|---|
| default | <768px | Single column, stacked layout |
| `md:` | ≥768px | Two-column hero, timeline alternates |
| `lg:` | ≥1024px | Three-column projects grid |
| `xl:` | ≥1280px | Max content width enforced |

Key responsive behaviors:
- Hero: `grid-cols-1 md:grid-cols-2` — image below text on mobile
- Skills: `flex-wrap` — pills wrap naturally
- Projects: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Timeline: single left-aligned column on mobile via `md:` conditionals
- Navbar: hamburger on mobile, full links on `md:`

make this is mobile first approach.
---

## DELIVERABLE

Generate **every file** in the file structure above — complete, no truncation. Output each file with its path as a `###` heading followed by the full file content in a code block.

Order of output:
1. `vite.config.ts`
2. `src/globals.css`
3. `src/types/index.ts`
4. `src/data/projects.ts`
5. `src/hooks/useTheme.ts`
6. `src/hooks/useTypewriter.ts`
7. `src/hooks/useActiveSection.ts`
8. `src/components/Navbar.tsx`
9. `src/components/Hero.tsx`
10. `src/components/Skills.tsx`
11. `src/components/Experience.tsx`
12. `src/components/Projects.tsx`
13. `src/components/Contact.tsx`
14. `src/components/Footer.tsx`
15. `src/App.tsx`

The site must run with zero errors after:
```bash
npm install
npm run dev
```

---

*End of master prompt.*
