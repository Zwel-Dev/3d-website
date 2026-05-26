'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { navLinks, socials } from '@/lib/data';
import { cn } from '@/lib/utils';
import { EASE } from '@/lib/animations';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock scroll + close on Esc while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  // Close menu when navigating to a section so the destination is visible.
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.4 }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 transition-colors duration-500 md:px-12',
          scrolled && !menuOpen && 'glass border-b border-white/5 backdrop-blur-xl',
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

        {/* Mobile menu trigger — real button, opens overlay below */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          data-hover
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="relative z-[101] inline-flex items-center gap-2.5 rounded-full border border-ink-700 bg-ink-950/60 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.25em] text-ink-100 backdrop-blur transition-colors hover:border-accent-glow/60 md:hidden"
        >
          {/* Two-line "hamburger" that morphs to an X when open */}
          <span
            aria-hidden
            className="relative block h-3 w-4"
          >
            <span
              className={cn(
                'absolute left-0 top-1 block h-px w-4 bg-current transition-transform duration-300 ease-out',
                menuOpen && 'top-1.5 rotate-45',
              )}
            />
            <span
              className={cn(
                'absolute left-0 top-2 block h-px w-4 bg-current transition-transform duration-300 ease-out',
                menuOpen && 'top-1.5 -rotate-45',
              )}
            />
          </span>
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </motion.header>

      <AnimatePresence>
        {menuOpen && <MobileMenuOverlay onClose={closeMenu} />}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------------------------------------------------ */
/* Fullscreen mobile menu overlay                                           */
/* ------------------------------------------------------------------------ */
function MobileMenuOverlay({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      key="mobile-menu"
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Main navigation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="fixed inset-0 z-[100] flex flex-col bg-ink-950/96 backdrop-blur-2xl md:hidden"
    >
      {/* Atmospheric warm halo top-right — same accent vibe as the rest of the site */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(243,217,177,0.14),transparent)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(closest-side,rgba(91,141,239,0.12),transparent)] blur-3xl"
      />

      {/* Top eyebrow inside the menu (the close button stays in the navbar header) */}
      <div className="relative z-10 px-6 pt-24">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.45em] text-ink-400">
          <span className="h-px w-10 bg-accent-glow/60" />
          Navigate
        </div>
      </div>

      {/* Nav links — large, tappable, staggered in */}
      <nav className="relative z-10 flex flex-1 flex-col justify-center px-6">
        <ul className="flex flex-col">
          {navLinks.map((link, i) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24, transition: { duration: 0.2 } }}
              transition={{
                duration: 0.55,
                ease: EASE,
                delay: 0.12 + i * 0.07,
              }}
            >
              <a
                href={link.href}
                onClick={onClose}
                data-hover
                className="group flex items-baseline gap-4 border-b border-white/5 py-5 active:opacity-70"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-ink-500">
                  0{i + 1}
                </span>
                <span className="font-display text-3xl italic text-ink-50 transition-colors group-hover:text-accent-glow">
                  {link.label}
                </span>
                <span
                  aria-hidden
                  className="ml-auto text-2xl text-accent-glow opacity-60 transition-transform duration-500 ease-out group-active:translate-x-1"
                >
                  →
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Footer — availability CTA + socials */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16, transition: { duration: 0.2 } }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.45 }}
        className="relative z-10 border-t border-white/5 px-6 py-6"
      >
        <a
          href="#contact"
          onClick={onClose}
          data-hover
          className="inline-flex items-center gap-3 rounded-full border border-emerald-400/30 bg-emerald-400/[0.06] px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-200 transition-colors active:bg-emerald-400/10"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(110,231,183,0.8)]" />
          Available for work
        </a>

        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-300">
          {socials.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                onClick={onClose}
                className="transition-colors hover:text-accent-glow active:text-accent-glow"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
