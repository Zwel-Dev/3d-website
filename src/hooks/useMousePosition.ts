'use client';

import { useEffect, useRef, useState } from 'react';

export interface MousePosition {
  x: number;
  y: number;
  nx: number; // normalized -1..1
  ny: number;
}

export function useMousePosition(): MousePosition {
  const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0, nx: 0, ny: 0 });
  const raf = useRef<number | null>(null);
  const latest = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      latest.current.x = e.clientX;
      latest.current.y = e.clientY;
      if (raf.current !== null) return;
      raf.current = requestAnimationFrame(() => {
        const { innerWidth: w, innerHeight: h } = window;
        const x = latest.current.x;
        const y = latest.current.y;
        setPos({
          x,
          y,
          nx: (x / w) * 2 - 1,
          ny: -((y / h) * 2 - 1),
        });
        raf.current = null;
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return pos;
}
