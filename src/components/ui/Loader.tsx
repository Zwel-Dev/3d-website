'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { EASE } from '@/lib/animations';

// Keep the loader visible at least this long even if every asset is cached —
// avoids a single-frame flash that looks broken on fast reloads.
const MIN_DURATION = 1400;

// Safety net: if a 3D asset stalls (network drop, blocked domain, etc.),
// dismiss the loader anyway so the page is at least usable.
const MAX_DURATION = 8000;

export function Loader() {
  const [done, setDone] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);

  // drei's useProgress reads from Three.js's DefaultLoadingManager — every
  // useGLTF / useTexture in any Canvas pumps into it automatically. No
  // wiring needed inside HeroScene / BackgroundCanvas.
  const { progress, active, total } = useProgress();

  // Stash latest progress values in a ref so the RAF tick reads them without
  // re-running the effect (which would reset `start`).
  const stateRef = useRef({ progress, active, total });
  stateRef.current = { progress, active, total };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const start = performance.now();
    let raf = 0;

    const tick = () => {
      const elapsed = performance.now() - start;
      const { progress, active, total } = stateRef.current;

      // Bar advances on whichever is further along: time-based ramp or the
      // real asset progress. Means the bar never goes backwards and keeps
      // moving even before useGLTF reports anything.
      const timeProgress = Math.min(elapsed / MIN_DURATION, 1) * 100;
      const realProgress = total > 0 ? progress : 0;
      const next = Math.max(timeProgress, realProgress);
      setDisplayProgress(Math.round(Math.min(next, 100)));

      const minMet = elapsed >= MIN_DURATION;
      // Assets are ready when:
      //   - nothing's been loaded yet AND min duration is up (no 3D on this page), OR
      //   - the loader manager has nothing active and reports ≥99.9% complete
      const assetsReady =
        total === 0 ? minMet : !active && progress >= 99.9;
      const expired = elapsed >= MAX_DURATION;

      if ((minMet && assetsReady) || expired) {
        setDisplayProgress(100);
        // Tiny tail so the bar visibly hits 100 before exit animates.
        setTimeout(() => setDone(true), 220);
        return;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
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
                {String(displayProgress).padStart(3, '0')}
              </motion.span>
              <span className="text-3xl text-ink-400">%</span>
            </div>

            <div className="h-px w-[min(420px,72vw)] overflow-hidden bg-ink-700/60">
              <motion.div
                className="h-full origin-left bg-gradient-to-r from-accent-glow via-accent to-accent-muted"
                style={{ scaleX: displayProgress / 100 }}
              />
            </div>

            {/* Tiny readout — surfaces what's actually loading on slow networks
                so the wait feels intentional, not stuck. */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-500"
            >
              {total > 0 ? (
                <>
                  Loading scene · {Math.min(total, total)} asset
                  {total === 1 ? '' : 's'}
                </>
              ) : (
                <>Calibrating</>
              )}
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
