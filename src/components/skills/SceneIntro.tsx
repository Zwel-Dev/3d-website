'use client';

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useRef } from 'react';

interface WordProps {
  text: string;
  start: number;
  scrollYProgress: MotionValue<number>;
  italic?: boolean;
}

function Word({ text, start, scrollYProgress, italic }: WordProps) {
  const opacity = useTransform(scrollYProgress, [start, start + 0.06], [0.18, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={italic ? 'text-gradient-accent italic' : 'text-gradient'}
    >
      {text}
    </motion.span>
  );
}

export function SceneIntro() {
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
  const y = useTransform(scrollYProgress, [0.2, 0.5, 0.88], [60, 0, -40]);
  const blur = useTransform(scrollYProgress, [0.2, 0.32, 0.7, 0.88], [10, 0, 0, 8]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  const atmosphereOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.3, 0.7, 0.95],
    [0, 1, 1, 0],
  );
  const orbY1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <div ref={trackRef} className="relative md:h-[200vh]">
      <div className="flex w-full flex-col items-center justify-center overflow-hidden py-20 md:sticky md:top-0 md:h-screen md:flex-row md:py-0">
        {/* atmospheric orbs */}
        <motion.div
          aria-hidden
          style={{ opacity: atmosphereOpacity }}
          className="pointer-events-none absolute inset-0"
        >
          <motion.div
            style={{ y: orbY1 }}
            className="absolute -left-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(243,217,177,0.16),transparent)] blur-3xl"
          />
          <motion.div
            style={{ y: orbY2 }}
            className="absolute -right-40 bottom-1/4 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(closest-side,rgba(91,141,239,0.14),transparent)] blur-3xl"
          />
        </motion.div>

        {/* subtle drifting dot field */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:32px_32px]"
        />

        <motion.div
          style={{ opacity, y, filter }}
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
              start={0.28}
              scrollYProgress={scrollYProgress}
            />
            <Word
              text="motion"
              start={0.36}
              scrollYProgress={scrollYProgress}
              italic
            />
            <Word
              text=", "
              start={0.4}
              scrollYProgress={scrollYProgress}
            />
            <Word
              text="interaction"
              start={0.44}
              scrollYProgress={scrollYProgress}
              italic
            />
            <Word
              text=", and "
              start={0.48}
              scrollYProgress={scrollYProgress}
            />
            <Word
              text="engineering precision"
              start={0.52}
              scrollYProgress={scrollYProgress}
              italic
            />
            <Word
              text="."
              start={0.58}
              scrollYProgress={scrollYProgress}
            />
          </h2>

          <motion.p
            style={{
              opacity: useTransform(scrollYProgress, [0.55, 0.65], [0, 1]),
            }}
            className="mx-auto mt-12 max-w-xl text-sm leading-relaxed text-ink-400 md:text-base"
          >
            What follows is the stack — not as a list, as a sequence of scenes.
          </motion.p>
        </motion.div>

        <ScrollHint scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}

function ScrollHint({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const opacity = useTransform(scrollYProgress, [0.3, 0.45, 0.55], [0, 1, 0]);
  return (
    <motion.div
      style={{ opacity }}
      aria-hidden
      className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
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
