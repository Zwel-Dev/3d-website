'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { EASE } from '@/lib/animations';

interface WordProps {
  text: string;
  delay: number;
  italic?: boolean;
}

function Word({ text, delay, italic }: WordProps) {
  return (
    <motion.span
      initial={{ opacity: 0.18 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className={italic ? 'text-gradient-accent italic' : 'text-gradient'}
    >
      {text}
    </motion.span>
  );
}

export function SceneIntro() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={trackRef} className="relative md:h-[200vh]">
      <div className="flex w-full flex-col items-center justify-center overflow-hidden py-20 md:sticky md:top-0 md:h-screen md:flex-row md:py-0">
        {/* atmospheric orbs */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 1.2, ease: EASE }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -left-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(243,217,177,0.16),transparent)] blur-3xl" />
          <div className="absolute -right-40 bottom-1/4 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(closest-side,rgba(91,141,239,0.14),transparent)] blur-3xl" />
        </motion.div>

        {/* subtle drifting dot field */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:32px_32px]"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative z-10 mx-auto max-w-5xl px-6 text-center md:px-12"
        >
          <div className="mb-10 flex items-center justify-center gap-4 font-mono text-[10px] uppercase tracking-[0.5em] text-ink-400">
            <span className="h-px w-12 bg-accent-glow/60" />
            Chapter I — Premise
            <span className="h-px w-12 bg-accent-glow/60" />
          </div>

          <h2 className="font-display text-3xl leading-[1.05] text-balance md:text-6xl lg:text-7xl">
            <Word
              text="Modern digital experiences are built through "
              delay={0.2}
            />
            <Word text="motion" delay={0.55} italic />
            <Word text=", " delay={0.7} />
            <Word text="interaction" delay={0.85} italic />
            <Word text=", and " delay={1.05} />
            <Word text="engineering precision" delay={1.2} italic />
            <Word text="." delay={1.5} />
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.8 }}
            className="mx-auto mt-12 max-w-xl text-sm leading-relaxed text-ink-400 md:text-base"
          >
            What follows is the stack — not as a list, as a sequence of scenes.
          </motion.p>
        </motion.div>

        <ScrollHint />
      </div>
    </div>
  );
}

function ScrollHint() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, margin: '0px 0px -15% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay: 1.4 }}
      aria-hidden
      className="absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink-500">
        Scroll
      </span>
      <span className="relative block h-12 w-px overflow-hidden bg-ink-700/60">
        <motion.span
          className="absolute left-0 top-0 block h-3 w-px bg-accent-glow"
          animate={{ y: ['-100%', '100%'] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </span>
    </motion.div>
  );
}
