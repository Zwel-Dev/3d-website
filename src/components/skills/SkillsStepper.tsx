'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '@/lib/animations';

interface Chapter {
  id: string;
  roman: string;
  label: string;
}

const CHAPTERS: Chapter[] = [
  { id: 'chapter-intro',    roman: 'I',   label: 'Premise' },
  { id: 'chapter-frontend', roman: 'II',  label: 'Frontend' },
  { id: 'chapter-motion',   roman: 'III', label: 'Motion' },
  { id: 'chapter-backend',  roman: 'IV',  label: 'Real-time' },
  { id: 'chapter-ai',       roman: 'V',   label: 'Intelligence' },
];

export function SkillsStepper() {
  const [active, setActive] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const elements = CHAPTERS.map((c) => ({
      id: c.id,
      el: document.getElementById(c.id),
    })).filter((c): c is { id: string; el: HTMLElement } => c.el !== null);

    if (elements.length === 0) return;

    // Active: the chapter whose track intersects the centre 10% of the
    // viewport. Each chapter pin is ~200vh tall, so as the user scrolls
    // through one, its centre line passes through the viewport centre and
    // that chapter "wins."
    const activeObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    // Visibility: stepper appears while ANY chapter is even partially in
    // viewport, hides everywhere else (no clutter over About / Projects).
    const intersecting = new Set<string>();
    const visObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) intersecting.add(entry.target.id);
          else intersecting.delete(entry.target.id);
        });
        setVisible(intersecting.size > 0);
      },
      { rootMargin: '0px', threshold: 0 },
    );

    elements.forEach(({ el }) => {
      activeObs.observe(el);
      visObs.observe(el);
    });

    return () => {
      activeObs.disconnect();
      visObs.disconnect();
    };
  }, []);

  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -60, duration: 1.0 });
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          key="skills-stepper"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 16 }}
          transition={{ duration: 0.5, ease: EASE }}
          aria-label="Skills chapter navigation"
          className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 md:block lg:right-8"
        >
          <ol className="flex flex-col items-end gap-5">
            {CHAPTERS.map((ch) => {
              const isActive = active === ch.id;
              return (
                <li key={ch.id}>
                  <button
                    type="button"
                    onClick={() => jumpTo(ch.id)}
                    data-hover
                    aria-label={`Jump to chapter ${ch.roman} — ${ch.label}`}
                    aria-current={isActive ? 'true' : undefined}
                    className="group flex items-center gap-3 outline-none"
                  >
                    <span
                      className={`pointer-events-none whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.3em] transition-all duration-500 ease-out ${
                        isActive
                          ? 'translate-x-0 text-accent-glow opacity-100'
                          : '-translate-x-1 text-ink-400 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                      }`}
                    >
                      {ch.roman} · {ch.label}
                    </span>

                    <span className="relative flex h-3 w-3 items-center justify-center">
                      {/* outer ring — only on active */}
                      <span
                        aria-hidden
                        className={`absolute inset-0 rounded-full border transition-all duration-500 ease-out ${
                          isActive
                            ? 'scale-100 border-accent-glow/60 opacity-100'
                            : 'scale-50 border-transparent opacity-0'
                        }`}
                      />
                      {/* dot */}
                      <span
                        aria-hidden
                        className={`block rounded-full transition-all duration-500 ease-out ${
                          isActive
                            ? 'h-1.5 w-1.5 bg-accent-glow shadow-[0_0_10px_rgba(243,217,177,0.7)]'
                            : 'h-1 w-1 bg-ink-400/60 group-hover:bg-ink-100'
                        }`}
                      />
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
