'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';
import { frame, cancelFrame } from 'framer-motion';
import { prefersReducedMotion } from '@/lib/utils';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    // Touch devices already have great native inertia — Lenis tends to fight it.
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.5,
      syncTouch: false,
      infinite: false,
    });

    window.__lenis = lenis;

    // Share framer-motion's RAF so Lenis, scroll-bound transforms, and every
    // useScroll subscriber tick on the same frame — eliminates desync jitter.
    const update = (data: { timestamp: number }) => {
      lenis.raf(data.timestamp);
    };
    frame.update(update, true);

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id) as HTMLElement | null;
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -60, duration: 1.2 });
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      cancelFrame(update);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
