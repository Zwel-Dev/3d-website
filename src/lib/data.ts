export interface Project {
  id: string;
  title: string;
  client: string;
  year: string;
  role: string;
  tags: string[];
  description: string;
  cover: string;
  accent: string;
  link?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  stack: string[];
}

export const projects: Project[] = [
  {
    id: 'intelliz-ai',
    title: 'IntelliZ AI',
    client: 'Personal Project',
    year: '2025',
    role: 'Full-Stack Developer',
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    description:
      'AI-powered meeting assistant with real-time transcription, live minutes, and automatic summaries. Upload audio or record live, then get transcripts, key points, decisions, and action items — synced over WebSockets with AssemblyAI under the hood.',
    cover: '/assets/projects/intelliz-ai.webp',
    accent: '#5b8def',
    link: 'https://intelliz-ai.onrender.com',
  },
  {
    id: 'trendhaven',
    title: 'TrendHaven',
    client: 'Academic Project',
    year: '2024',
    role: 'Full-Stack Developer',
    tags: ['React', 'PHP', 'MySQL', 'Tailwind'],
    description:
      'A full-featured online marketplace for sellers and buyers — product listings, a dynamic shopping cart, an admin panel, and a seller dashboard for managing inventory end-to-end.',
    cover: '/assets/projects/trendhaven.webp',
    accent: '#d4a373',
    link: 'https://github.com/ZweThuta/MarketPlace-Website',
  },
  {
    id: 'khin-htet-hlaing',
    title: 'Khin Htet Hlaing — Portfolio',
    client: 'Khin Htet Hlaing',
    year: '2024',
    role: 'Frontend Developer',
    tags: ['React', 'JavaScript', 'Tailwind'],
    description:
      'A portfolio site for a graphic designer — built to let the work breathe. Clean typography, restrained motion, and a structure that scales as the body of work grows.',
    cover: '/assets/projects/graphic-design.webp',
    accent: '#e0928d',
    link: 'https://khinhtethlaing.com',
  },
];

export const experience: ExperienceItem[] = [
  {
    id: 'buc',
    company: 'British United College',
    role: 'B.Sc. (HONS) Computer Science',
    period: '2025 — 2026',
    location: 'Yangon, MM',
    description:
      'Currently reading advanced Computer Science with a focus on Cybersecurity, AI, and Data Technologies. Exploring Android development on the side and leading an academic computing project aimed at solving real-world problems with practical, opinionated tooling.',
    stack: ['Cybersecurity', 'AI', 'Data', 'Android'],
  },
  {
    id: 'imc-hnd',
    company: 'Info Myanmar College',
    role: 'Higher National Diploma — Computing',
    period: '2024 — 2025',
    location: 'Yangon, MM',
    description:
      'Deepened my full-stack practice around the MERN stack while branching into data science and big-data visualisation. Final-year project: an AI-driven application built end-to-end, from data plumbing to a React front-end.',
    stack: ['MERN', 'Data Science', 'Visualisation', 'AI'],
  },
  {
    id: 'imc-hnc',
    company: 'Info Myanmar College',
    role: 'Higher National Certificate — Computing',
    period: '2023 — 2024',
    location: 'Yangon, MM',
    description:
      'Laid down the foundations: HTML, CSS, JavaScript, and Java. Spent most of my time on front-end craft — UI/UX, responsive layout, and the small details that decide whether an interface feels considered or careless.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Java'],
  },
  {
    id: 'self-learning',
    company: 'Self-directed Study',
    role: 'Programming, from the ground up',
    period: '2020 — 2022',
    location: 'Anywhere with Wi-Fi',
    description:
      'Taught myself to code during the pandemic — HTML, CSS, JavaScript, then responsive design, modern UI frameworks, and eventually a backend. YouTube tutorials, free courses, and a lot of late-night personal projects.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Self-taught'],
  },
  {
    id: 'tuh-architecture',
    company: 'Technology University, Hmawbi',
    role: 'Architecture',
    period: '2017 — 2020',
    location: 'Hmawbi, MM',
    description:
      'Three years of architecture — AutoCAD, SketchUp, Lumion — training my eye for proportion, spatial rhythm, and the weight of a single line. COVID closed the university, and that detour quietly became the foundation of how I now think about UI.',
    stack: ['AutoCAD', 'SketchUp', 'Lumion', 'Design'],
  },
];

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const socials = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Email', href: 'mailto:zwethuta1998@gmail.com' },
  { label: 'Call · +95 9 766135388', href: 'tel:+959766135388' },
];
