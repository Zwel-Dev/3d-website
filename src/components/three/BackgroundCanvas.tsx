'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { ParticleField } from './ParticleField';
import { AmbientLights } from './AmbientLights';
import { FloatingGeometry } from './FloatingGeometry';

export function BackgroundCanvas() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 4;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const isSmall = window.innerWidth < 540;
    // Be more aggressive: fall back to gradient on any low-end or small touch device.
    if (cores < 4 || (isCoarse && isSmall)) setEnabled(false);
  }, []);

  if (!enabled) {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(212,163,115,0.08),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(91,141,239,0.06),transparent_55%)]"
      />
    );
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
    >
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 45, near: 0.1, far: 100 }}
      >
        <color attach="background" args={['#050506']} />
        <fog attach="fog" args={['#050506', 6, 18]} />
        <AmbientLights />
        <Suspense fallback={null}>
          <FloatingGeometry />
          <ParticleField count={900} />
        </Suspense>
      </Canvas>
    </div>
  );
}
