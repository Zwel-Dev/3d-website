'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef } from 'react';

const BackendMonolith3D = dynamic(
  () =>
    import('@/components/three/BackendMonolith3D').then(
      (m) => m.BackendMonolith3D,
    ),
  { ssr: false, loading: () => null },
);

export function SceneBackend() {
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
  const sceneOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.28, 0.78, 0.95],
    [0, 1, 1, 0.4],
  );

  return (
    <div ref={trackRef} className="relative h-[210vh]">
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        {/* Backdrop that masks the global Earth so the monolith reads cleanly */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-20 bg-ink-950/88"
        />

        {/* Ambient warm halo */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-[8%] top-1/2 -z-10 h-[42rem] w-[42rem] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(243,217,177,0.07),transparent)] blur-3xl"
        />

        <motion.div
          style={{ opacity, y }}
          className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-12 md:gap-16 md:px-12"
        >
          {/* Left — heading */}
          <div className="md:col-span-5">
            <div className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.45em] text-ink-400 md:mb-10">
              <span className="h-px w-12 bg-accent-glow/60" />
              Chapter IV — Real-time
            </div>

            <h3 className="font-display text-3xl leading-[1.05] text-balance md:text-5xl lg:text-6xl">
              <span className="text-gradient">Engineering </span>
              <span className="text-gradient-accent italic">scalable real-time systems</span>
              <span className="text-gradient"> behind every immersive surface.</span>
            </h3>

            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-300 md:mt-8 md:text-lg">
              The stack as a vertical totem — runtime, transport, ORM,
              persistence — each layer tethered out as a live readout. Slow
              sway, scan lines flowing down the face, every layer represented
              as a real piece of the build.
            </p>
          </div>

          {/* Right — monolith canvas owns the tech badges as in-scene HUD
               at every breakpoint (compact pills on mobile/tablet, full role
               subtitles on lg+). */}
          <div className="md:col-span-7">
            <motion.div
              style={{ opacity: sceneOpacity }}
              className="relative w-full"
            >
              <BackendMonolith3D className="relative aspect-square w-full lg:aspect-[4/3]" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
