'use client';

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useRef } from 'react';

interface TechItem {
  name: string;
  icon: string;
  note: string;
}

const FRONTEND: TechItem[] = [
  { name: 'React', icon: '/assets/tech/reactjs.png', note: 'Component model & state' },
  { name: 'Next.js', icon: '/assets/tech/nextjs.png', note: 'App Router · RSC · routing' },
  { name: 'Angular', icon: '/assets/tech/angular.png', note: 'Structured enterprise UI' },
  { name: 'TypeScript', icon: '/assets/tech/typescript.png', note: 'Type-safe surface area' },
  { name: 'JavaScript', icon: '/assets/tech/javascript.png', note: 'Browser-native craft' },
  { name: 'Tailwind CSS', icon: '/assets/tech/tailwind-css.png', note: 'Design tokens at the markup' },
];

export function SceneFrontend() {
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
    <div ref={trackRef} className="relative md:h-[200vh]">
      <div className="flex w-full overflow-hidden py-20 md:sticky md:top-0 md:h-screen md:items-center md:py-0">
        {/* faint grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:80px_80px]"
        />

        {/* drifting UI fragments — hidden on small screens to avoid clutter */}
        {/* <FloatingUI scrollYProgress={scrollYProgress} /> */}

        <motion.div
          style={{ opacity, y }}
          className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-16 md:px-12"
        >
          <div className="md:col-span-6">
            <div className="mb-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.45em] text-ink-400">
              <span className="h-px w-12 bg-accent-glow/60" />
              Chapter II — Frontend Craft
            </div>

            <h3 className="font-display text-3xl leading-[1.05] text-balance md:text-5xl lg:text-6xl">
              <span className="text-gradient">Crafting </span>
              <span className="text-gradient-accent italic">fluid modern interfaces</span>
              <span className="text-gradient"> with </span>
              <span className="text-gradient-accent italic">scalable architecture</span>
              <span className="text-gradient">.</span>
            </h3>

            <p className="mt-8 max-w-md text-base leading-relaxed text-ink-300 md:text-lg">
              Every layout choreographed, every transition deliberate. Built around the
              React ecosystem and a TypeScript spine — Tailwind for the surface, Next.js
              for the bones.
            </p>
          </div>

          <div className="md:col-span-6">
            <ul className="flex flex-col">
              {FRONTEND.map((item, i) => (
                <FrontendRow
                  key={item.name}
                  item={item}
                  index={i}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function FrontendRow({
  item,
  index,
  scrollYProgress,
}: {
  item: TechItem;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = 0.32 + index * 0.045;
  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.1, 0.72, 0.85],
    [0, 1, 1, 0],
  );
  const x = useTransform(scrollYProgress, [start, start + 0.1], [40, 0]);

  return (
    <motion.li
      style={{ opacity, x }}
      className="group relative flex items-center gap-5 border-b border-white/5 py-5 last:border-b-0"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-ink-500">
        {String(index + 1).padStart(2, '0')}
      </span>

      <img
        src={item.icon}
        alt={item.name}
        loading="lazy"
        decoding="async"
        className="h-12 w-12 shrink-0 object-contain drop-shadow-[0_0_18px_rgba(91,141,239,0.35)] transition-transform duration-500 ease-expo group-hover:scale-110"
      />

      <div className="flex flex-1 items-baseline justify-between gap-4">
        <span className="font-display text-2xl text-ink-50 md:text-3xl">
          {item.name}
        </span>
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-ink-500 md:inline">
          {item.note}
        </span>
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent-glow/60 via-accent/40 to-transparent transition-transform duration-700 ease-expo group-hover:scale-x-100"
      />
    </motion.li>
  );
}

