import type { Metadata, Viewport } from 'next';
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { Cursor } from '@/components/layout/Cursor';
import { GrainOverlay } from '@/components/ui/GrainOverlay';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { Navbar } from '@/components/layout/Navbar';
import { Loader } from '@/components/ui/Loader';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const display = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#050506',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://zwethutaminthein.com'),
  title: {
    default: 'Zwe Thuta — Frontend-first Full-Stack Developer',
    template: '%s · Zwe Thuta',
  },
  description:
    'Portfolio of Zwe Thuta — a frontend-focused full-stack developer building dynamic, user-friendly web products with React, Next.js, and the MERN stack. Based in Yangon, Myanmar.',
  keywords: [
    'full stack developer',
    'frontend developer',
    'MERN stack',
    'React',
    'Next.js',
    'Node.js',
    'MongoDB',
    'Yangon',
    'Myanmar',
    'portfolio',
  ],
  authors: [{ name: 'Zwe Thuta' }],
  openGraph: {
    title: 'Zwe Thuta — Frontend-first Full-Stack Developer',
    description:
      'Portfolio of Zwe Thuta — React, Next.js, and MERN-stack development with an architect\'s eye for design.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zwe Thuta — Frontend-first Full-Stack Developer',
    description:
      'Portfolio of Zwe Thuta — React, Next.js, and MERN-stack development with an architect\'s eye for design.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-ink-950 text-ink-50 antialiased">
        <Loader />
        <SmoothScroll>
          <Cursor />
          <GrainOverlay />
          <ScrollProgress />
          <Navbar />
          <main className="relative z-10">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
