'use client';

import { useEffect, useRef } from 'react';

interface Options {
  strength?: number;
  damping?: number;
  radius?: number;
}

export function useMagnetic<T extends HTMLElement>({
  strength = 0.35,
  damping = 0.18,
  radius = 140,
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const active = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * damping;
      current.current.y += (target.current.y - current.current.y) * damping;
      el.style.transform = `translate3d(${current.current.x.toFixed(2)}px, ${current.current.y.toFixed(2)}px, 0)`;
      if (
        active.current ||
        Math.abs(target.current.x - current.current.x) > 0.05 ||
        Math.abs(target.current.y - current.current.y) > 0.05
      ) {
        rafId.current = requestAnimationFrame(tick);
      } else {
        rafId.current = null;
      }
    };

    const start = () => {
      if (rafId.current === null) rafId.current = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < radius + Math.max(rect.width, rect.height) / 2) {
        active.current = true;
        target.current.x = dx * strength;
        target.current.y = dy * strength;
        start();
      } else if (active.current) {
        active.current = false;
        target.current.x = 0;
        target.current.y = 0;
        start();
      }
    };

    const onLeave = () => {
      active.current = false;
      target.current.x = 0;
      target.current.y = 0;
      start();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [strength, damping, radius]);

  return ref;
}
