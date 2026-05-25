'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, useAnimations, useGLTF } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

useGLTF.preload('/assets/3d/earth_breathing.glb');

/* ------------------------------------------------------------------------ */
/* Earth — global ambient backdrop. Sits behind every section except Hero,  */
/* which renders its own opaque scene on top.                               */
/* ------------------------------------------------------------------------ */
function Earth() {
  const ref = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/assets/3d/earth_breathing.glb');
  const { actions } = useAnimations(animations, ref);

  // Play whatever built-in animation the GLB ships with (the "breathing").
  useEffect(() => {
    Object.values(actions).forEach((action) => {
      if (!action) return;
      action.reset();
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.play();
    });
  }, [actions]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.04;
  });

  return (
    <group ref={ref} scale={1.0} position={[0, -0.2, 0]}>
      <primitive object={scene} />
    </group>
  );
}

export function BackgroundCanvas() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 4;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const isSmall = window.innerWidth < 540;
    // Be conservative — Earth + animation is heavier than the old particle
    // scene, so fall back to a static gradient on weak / small devices.
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
        <fog attach="fog" args={['#050506', 7, 20]} />
        <ambientLight intensity={0.2} color="#1a2030" />
        <directionalLight
          position={[5, 4, 5]}
          intensity={1.2}
          color="#fef6e0"
        />
        <pointLight
          position={[-4, -2, 3]}
          intensity={3}
          color="#5b8def"
          distance={12}
          decay={2}
        />
        <Suspense fallback={null}>
          <Environment preset="night" />
          <Earth />
        </Suspense>
      </Canvas>
    </div>
  );
}
