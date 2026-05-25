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
  { name: 'TypeScript', icon: '/assets/tech/typescript.png', note: 'Type-safe surface area' },
  { name: 'JavaScript', icon: '/assets/tech/javascript.png', note: 'Browser-native craft' },
  { name: 'Tailwind CSS', icon: '/assets/tech/tailwind-css.png', note: 'Design tokens at the markup' },
  { name: 'Angular', icon: '/assets/tech/angular.png', note: 'Structured enterprise UI' },
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
    <div ref={trackRef} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
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
        className="h-9 w-9 shrink-0 object-contain"
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

function FloatingUI({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const opacity = useTransform(
    scrollYProgress,
    [0.2, 0.35, 0.65, 0.85],
    [0, 0.65, 0.65, 0],
  );
  const y1 = useTransform(scrollYProgress, [0, 1], [-30, 60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -40]);
  const y3 = useTransform(scrollYProgress, [0, 1], [10, -30]);

  return (
    <motion.div
      aria-hidden
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 hidden md:block"
    >
      {/* mock browser window */}
      <motion.div
        style={{ y: y1 }}
        className="absolute left-[6%] top-[12%] w-56 rotate-[-4deg]"
      >
        <div className="overflow-hidden rounded-xl border border-white/8 bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur">
          <div className="flex items-center gap-1.5 border-b border-white/5 p-3">
            <span className="h-2 w-2 rounded-full bg-red-400/40" />
            <span className="h-2 w-2 rounded-full bg-yellow-400/40" />
            <span className="h-2 w-2 rounded-full bg-green-400/40" />
            <span className="ml-3 h-1.5 w-24 rounded-full bg-white/8" />
          </div>
          <div className="space-y-2 p-4">
            <div className="h-2 w-3/4 rounded-full bg-white/10" />
            <div className="h-2 w-1/2 rounded-full bg-white/8" />
            <div className="mt-4 h-12 rounded-md bg-gradient-to-br from-accent/15 to-cobalt/10" />
            <div className="grid grid-cols-3 gap-1.5 pt-2">
              <div className="h-6 rounded bg-white/5" />
              <div className="h-6 rounded bg-white/5" />
              <div className="h-6 rounded bg-white/5" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* component card */}
      <motion.div
        style={{ y: y2 }}
        className="absolute right-[5%] top-[18%] w-44 rotate-[6deg]"
      >
        <div className="overflow-hidden rounded-xl border border-white/8 bg-gradient-to-br from-cobalt/10 to-transparent p-4 backdrop-blur">
          <div className="h-20 rounded-md bg-gradient-to-br from-white/8 to-white/[0.02]" />
          <div className="mt-3 space-y-1.5">
            <div className="h-1.5 w-full rounded-full bg-white/12" />
            <div className="h-1.5 w-2/3 rounded-full bg-white/8" />
          </div>
          <div className="mt-3 inline-flex h-5 items-center rounded-full bg-accent/30 px-2">
            <span className="h-1 w-8 rounded-full bg-white/40" />
          </div>
        </div>
      </motion.div>

      {/* metric tile */}
      <motion.div
        style={{ y: y3 }}
        className="absolute bottom-[14%] left-[10%] w-40 rotate-[3deg]"
      >
        <div className="overflow-hidden rounded-xl border border-white/8 bg-gradient-to-br from-white/[0.04] to-transparent p-4 backdrop-blur">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink-500">
            Lighthouse
          </span>
          <div className="mt-2 font-display text-3xl text-ink-50">98</div>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/5">
            <div className="h-full w-[96%] bg-gradient-to-r from-accent to-accent-glow" />
          </div>
        </div>
      </motion.div>

      {/* button-like fragment */}
      <motion.div
        style={{ y: y1 }}
        className="absolute bottom-[20%] right-[8%] rotate-[-2deg]"
      >
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-ink-900/60 px-4 py-2 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-200">
            shipped
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
