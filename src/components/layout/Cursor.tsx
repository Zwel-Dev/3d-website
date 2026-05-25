'use client';

import { useEffect, useRef } from 'react';

export function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: pos.x, y: pos.y };
    let dotX = pos.x;
    let dotY = pos.y;

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
    };

    const tick = () => {
      // Skip DOM writes when nothing has changed — avoids style invalidations during idle.
      if (dotX !== pos.x || dotY !== pos.y) {
        dotX = pos.x;
        dotY = pos.y;
        dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      }
      const nx = ringPos.x + (pos.x - ringPos.x) * 0.18;
      const ny = ringPos.y + (pos.y - ringPos.y) * 0.18;
      if (Math.abs(nx - ringPos.x) > 0.05 || Math.abs(ny - ringPos.y) > 0.05) {
        ringPos.x = nx;
        ringPos.y = ny;
        ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    let raf = requestAnimationFrame(tick);

    const hoverables = 'a, button, [data-hover], input, textarea, [role="button"]';

    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest(hoverables)) ring.classList.add('is-hover');
    };
    const onOut = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest(hoverables)) ring.classList.remove('is-hover');
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerout', onOut);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
}
