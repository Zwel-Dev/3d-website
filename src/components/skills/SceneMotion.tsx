'use client';

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef } from 'react';

const MotionScene3D = dynamic(
  () =>
    import('@/components/three/MotionScene3D').then((m) => m.MotionScene3D),
  { ssr: false, loading: () => null },
);

const MOTION_STACK = [
  { name: 'Framer Motion', detail: 'UI choreography & gestures' },
  { name: 'GSAP', detail: 'Timeline-grade easing' },
  { name: 'Three.js', detail: 'Real-time WebGL primitives' },
  { name: 'React Three Fiber', detail: 'Declarative 3D in React' },
];

export function SceneMotion() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start end', 'end start'],
  });

  const headOpacity = useTransform(
    scrollYProgress,
    [0.18, 0.32, 0.7, 0.88],
    [0, 1, 1, 0],
  );
  const headY = useTransform(scrollYProgress, [0.2, 0.5, 0.88], [40, 0, -40]);
  const canvasOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.22, 0.78, 0.95],
    [0, 1, 1, 0.4],
  );

  return (
    <div ref={trackRef} className="relative h-[230vh]">
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        {/* WebGL scene fills the pinned viewport */}
        <motion.div
          style={{ opacity: canvasOpacity }}
          className="absolute inset-0"
        >
          <MotionScene3D className="absolute inset-0 h-full w-full" />
        </motion.div>

        {/* vignette to keep text legible */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(5,5,6,0.82)_85%)]"
        />

        <motion.div
          style={{ opacity: headOpacity, y: headY }}
          className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-16 px-6 md:grid-cols-12 md:gap-12 md:px-12"
        >
          <div className="md:col-span-7">
            <div className="mb-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.45em] text-ink-400">
              <span className="h-px w-12 bg-accent-glow/60" />
              Chapter III — Motion
            </div>

            <h3 className="font-display text-3xl leading-[1.05] text-balance md:text-5xl lg:text-6xl">
              <span className="text-gradient">Designing </span>
              <span className="text-gradient-accent italic">cinematic interactions</span>
              <span className="text-gradient"> through motion and </span>
              <span className="text-gradient-accent italic">immersive WebGL</span>
              <span className="text-gradient">.</span>
            </h3>

            <p className="mt-8 max-w-md text-base leading-relaxed text-ink-300 md:text-lg">
              The scene around you is rendered live — Three.js geometry, soft lighting, a
              drifting camera. The medium is the message.
            </p>
          </div>

          <div className="md:col-span-4 md:col-start-9 md:self-end">
            <div className="flex flex-col gap-6">
              {MOTION_STACK.map((item, i) => (
                <MotionRow
                  key={item.name}
                  name={item.name}
                  detail={item.detail}
                  index={i}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function MotionRow({
  name,
  detail,
  index,
  scrollYProgress,
}: {
  name: string;
  detail: string;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = 0.35 + index * 0.06;
  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.1, 0.72, 0.85],
    [0, 1, 1, 0],
  );
  const y = useTransform(scrollYProgress, [start, start + 0.1], [24, 0]);

  return (
    <motion.div style={{ opacity, y }} className="group flex flex-col">
      <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink-500">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="mt-2 font-display text-2xl leading-tight text-ink-50 md:text-3xl">
        {name}
      </span>
      <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-400">
        {detail}
      </span>
      <span
        aria-hidden
        className="mt-4 h-px w-12 origin-left bg-gradient-to-r from-accent-glow/70 to-transparent"
      />
    </motion.div>
  );
}
