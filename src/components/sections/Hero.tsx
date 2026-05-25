'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { RevealText } from '@/components/ui/RevealText';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { EASE } from '@/lib/animations';

const HeroScene = dynamic(
  () => import('@/components/three/HeroScene').then((m) => m.HeroScene),
  { ssr: false, loading: () => null },
);

export function Hero() {
  const wrapRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!wrapRef.current) return;
        const y = window.scrollY;
        wrapRef.current.style.setProperty('--py', `${y * 0.15}px`);
        wrapRef.current.style.setProperty('--py-slow', `${y * 0.05}px`);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="top"
      ref={wrapRef}
      className="relative flex min-h-[100svh] w-full items-end overflow-hidden pb-20 pt-32 md:pb-28 md:pt-36"
    >
      {/* 3D scene */}
      <HeroScene className="absolute inset-0 -z-10" />

      {/* gradient overlays */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_30%,rgba(243,217,177,0.12),transparent_50%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-b from-transparent to-ink-950"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.8 }}
          className="mb-8 flex items-center gap-3"
          style={{ transform: 'translateY(calc(var(--py-slow,0px) * -1))' }}
        >
          {/* <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(110,231,183,0.8)]" /> */}
          {/* <span className="font-mono text-[10px] uppercase tracking-[0.45em] text-ink-300">
            Portfolio · 2025 Edition
          </span> */}
        </motion.div>

        <h1 className="font-display text-[clamp(2.5rem,9vw,10rem)] leading-[0.9] tracking-[-0.04em] text-balance">
          <RevealText
            text="Frontend-first"
            className="text-gradient mr-4 italic"
            splitBy="word"
            immediate
          />
          <RevealText
            text="full-stack"
            className="text-gradient"
            splitBy="word"
            delay={0.1}
            immediate
          />
          <br />
          <RevealText
            text="developer."
            className="text-gradient-accent italic"
            splitBy="word"
            delay={0.2}
            immediate
          />
        </h1>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1.1 }}
            className="md:col-span-5"
          >
            <p className="max-w-md text-base leading-relaxed text-ink-200 md:text-lg">
              I'm <span className="text-ink-50">Zwe Thuta</span> — a frontend-focused
              full-stack developer building dynamic, user-friendly products with React,
              Next.js, and a MERN backbone. An architect-turned-engineer who treats every
              pixel like a blueprint.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1.25 }}
            className="md:col-span-4 md:col-start-9"
          >
            <div className="flex flex-col gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-ink-400">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-ink-100">Yangon, Myanmar · GMT+6:30</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-ink-100">Full-stack · MERN · Motion</span>
              </div>
              <div className="flex items-center justify-between pb-1">
                <span className="text-emerald-300">Open for new work</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.4 }}
          className="mt-14 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href="#work" variant="primary">
            See selected work
          </MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            Start a project
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 1.8 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.45em] text-ink-400">
          Scroll
        </span>
        <span className="relative block h-10 w-[1px] overflow-hidden bg-ink-700">
          <motion.span
            className="absolute left-0 top-0 block h-3 w-px bg-accent-glow"
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  );
}
