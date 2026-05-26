'use client';

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useMemo, useRef } from 'react';

const AI_STACK = [
  { name: 'Python', icon: '/assets/tech/python.png' as string | null },
  { name: 'AssemblyAI', icon: null },
  { name: 'WebSockets', icon: null },
  { name: 'Real-time AI', icon: null },
];

export function SceneAI() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0.18, 0.32, 0.7, 0.88],
    [0, 1, 1, 0],
  );
  const y = useTransform(scrollYProgress, [0.2, 0.5, 0.88], [40, 0, -40]);

  return (
    <div ref={trackRef} className="relative md:h-[210vh]">
      <div className="relative flex w-full justify-center overflow-hidden py-24 md:sticky md:top-0 md:h-screen md:items-center md:py-0">
        <Waveform scrollYProgress={scrollYProgress} />

        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(91,141,239,0.16),transparent)] blur-3xl"
        />

        <motion.div
          style={{ opacity, y }}
          className="relative z-10 mx-auto max-w-5xl px-6 text-center md:px-12"
        >
          <div className="mb-10 flex items-center justify-center gap-4 font-mono text-[10px] uppercase tracking-[0.5em] text-ink-400">
            <span className="h-px w-12 bg-accent-glow/60" />
            Chapter V — Intelligence
            <span className="h-px w-12 bg-accent-glow/60" />
          </div>

          <h3 className="font-display text-3xl leading-[1.05] text-balance md:text-6xl lg:text-7xl">
            <span className="text-gradient">Exploring </span>
            <span className="text-gradient-accent italic">intelligent systems</span>
            <span className="text-gradient"> and </span>
            <span className="text-gradient-accent italic">AI-powered workflows</span>
            <span className="text-gradient">.</span>
          </h3>

          <p className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-ink-300 md:text-lg">
            Real-time transcription. Live meeting minutes. Intelligent summarisation —
            with Python at the heart of the workflow and AssemblyAI streaming over
            WebSockets, shipped into{' '}
            <a
              href="https://intelliz-ai.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="border-b border-accent-glow/40 text-ink-50 transition-colors hover:text-accent-glow"
            >
              IntelliZ&nbsp;AI
            </a>
            .
          </p>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {AI_STACK.map((item, i) => (
              <AIChip
                key={item.name}
                name={item.name}
                icon={item.icon}
                index={i}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function AIChip({
  name,
  icon,
  index,
}: {
  name: string;
  icon: string | null;
  index: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '0px 0px -15% 0px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 + index * 0.08 }}
      className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-ink-900/70 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.3em] text-ink-100 backdrop-blur"
    >
      {icon && (
        <img
          src={icon}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-4 w-4 object-contain"
        />
      )}
      {name}
    </motion.span>
  );
}

function Waveform({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const opacity = useTransform(
    scrollYProgress,
    [0.18, 0.35, 0.7, 0.88],
    [0, 1, 1, 0],
  );

  // Pre-generate static waveform paths (cheap; no JS animation of `d` attr).
  // Coordinates are rounded to 2dp so they hydrate identically across JS engines —
  // raw Math.sin can differ by 1 ULP between Node V8 (SSR) and browser V8 (hydration),
  // which React flags as a `d` attribute mismatch.
  const paths = useMemo(() => {
    const round = (n: number) => Math.round(n * 100) / 100;
    const make = (phase: number, amp: number) => {
      const pts: string[] = [];
      for (let x = 0; x <= 1600; x += 16) {
        const y = round(
          300 +
            Math.sin(x * 0.012 + phase) *
              amp *
              (0.6 + Math.sin(x * 0.004) * 0.4),
        );
        pts.push(x === 0 ? `M ${x} ${y}` : `L ${x} ${y}`);
      }
      return pts.join(' ');
    };
    return [make(0, 80), make(1.1, 60), make(2.3, 95), make(3.7, 45)];
  }, []);

  return (
    <motion.div
      aria-hidden
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 flex items-center overflow-hidden"
    >
      {paths.map((d, i) => (
        <motion.div
          key={i}
          animate={{ x: ['-12%', '0%', '-12%'] }}
          transition={{
            duration: 9 + i * 1.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-y-0 w-[140%]"
          style={{ opacity: 0.35 - i * 0.07 }}
        >
          <svg
            viewBox="0 0 1600 600"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <defs>
              <linearGradient
                id={`wave-${i}`}
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#5b8def" stopOpacity="0" />
                <stop offset="50%" stopColor="#5b8def" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#5b8def" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={d}
              stroke={`url(#wave-${i})`}
              strokeWidth={1.4 - i * 0.2}
              fill="none"
            />
          </svg>
        </motion.div>
      ))}
    </motion.div>
  );
}
