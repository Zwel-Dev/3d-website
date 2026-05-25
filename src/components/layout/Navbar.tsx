'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { navLinks } from '@/lib/data';
import { cn } from '@/lib/utils';
import { EASE } from '@/lib/animations';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: EASE, delay: 0.4 }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 transition-colors duration-500 md:px-12',
        scrolled && 'glass border-b border-white/5 backdrop-blur-xl',
      )}
    >
      <a href="#top" data-hover className="group flex items-center gap-3">
        <span className="relative inline-block h-2.5 w-2.5 rounded-full bg-accent-glow shadow-[0_0_18px_rgba(243,217,177,0.8)]">
          <span className="absolute inset-0 animate-ping rounded-full bg-accent-glow/60" />
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-ink-100 transition-colors group-hover:text-accent-glow">
          ZWE THUTA / Studio
        </span>
      </a>

      <nav className="hidden items-center gap-1 md:flex">
        {navLinks.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            data-hover
            className="group relative px-4 py-2 text-xs uppercase tracking-[0.25em] text-ink-300 transition-colors hover:text-ink-50"
          >
            <span className="mr-2 font-mono text-[10px] text-ink-500">
              0{i + 1}
            </span>
            {l.label}
            <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-accent-glow transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </a>
        ))}
      </nav>

      <a
        href="#contact"
        data-hover
        className="group hidden items-center gap-2 rounded-full border border-ink-700/80 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-ink-100 transition-colors hover:border-accent-glow/60 hover:text-accent-glow md:inline-flex"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(110,231,183,0.8)]" />
        Available for work
      </a>

      <a
        href="#contact"
        data-hover
        className="rounded-full border border-ink-700 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-ink-100 md:hidden"
      >
        Menu
      </a>
    </motion.header>
  );
}
