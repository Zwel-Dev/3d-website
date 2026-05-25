'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { EASE } from '@/lib/animations';

export function Loader() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock scroll while loading
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const start = performance.now();
    const total = 1600; // ms minimum
    let raf = 0;

    const tick = () => {
      const elapsed = performance.now() - start;
      const p = Math.min(elapsed / total, 1);
      setProgress(Math.round(p * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 250);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = '';
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: EASE } }}
        >
          <motion.div
            className="absolute inset-0 origin-top bg-ink-950"
            exit={{ scaleY: 0, transition: { duration: 1.1, ease: EASE } }}
            style={{ transformOrigin: 'top' }}
          />
          <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
            <motion.span
              className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink-300"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              Booting experience
            </motion.span>

            <div className="flex items-baseline gap-2 font-display text-[clamp(3rem,8vw,6rem)] leading-none">
              <motion.span
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
                className="text-gradient"
              >
                {String(progress).padStart(3, '0')}
              </motion.span>
              <span className="text-ink-400 text-3xl">%</span>
            </div>

            <div className="h-px w-[min(420px,72vw)] overflow-hidden bg-ink-700/60">
              <motion.div
                className="h-full origin-left bg-gradient-to-r from-accent-glow via-accent to-accent-muted"
                style={{ scaleX: progress / 100 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
