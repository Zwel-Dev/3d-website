'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, useGLTF } from '@react-three/drei';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useInViewFrameloop } from '@/hooks/useInViewFrameloop';

useGLTF.preload('/assets/3d/robo_probe.glb');

/* ------------------------------------------------------------------------ */
/* Robo probe — the only object in the scene. Slow rotation + Float drift.  */
/* ------------------------------------------------------------------------ */
function RoboProbe() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/assets/3d/robo_probe.glb');

  // Probe just rotates on its own axis. Pointer-driven parallax is owned by
  // the camera (see CameraDrift) so the subject stays put while the world
  // appears to orbit around it — feels more cinematic than the probe and the
  // camera both reacting to the cursor.
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.18;
  });

  return (
    <Float speed={0.8} floatIntensity={0.5} rotationIntensity={0}>
      <group ref={groupRef} position={[1.6, -1.0, 0]} scale={1.6}>
        <primitive object={scene} />
      </group>
    </Float>
  );
}

/* ------------------------------------------------------------------------ */
/* Lights — restrained, cinematic                                           */
/* ------------------------------------------------------------------------ */
function CinematicLights() {
  return (
    <>
      <ambientLight intensity={0.25} color="#1a2030" />
      <directionalLight position={[3, 4, 5]} intensity={1.1} color="#fef6e0" />
      <pointLight
        position={[-4, -1, 3]}
        intensity={4}
        color="#5b8def"
        distance={12}
        decay={2}
      />
      <pointLight
        position={[5, 2, -2]}
        intensity={3}
        color="#f3d9b1"
        distance={10}
        decay={2}
      />
    </>
  );
}

/* ------------------------------------------------------------------------ */
/* Camera drift — smoothed pointer parallax + slow ambient breathing.       */
/* The raw `state.pointer` jumps frame-to-frame with the mouse; we lerp it  */
/* into a separate vector so quick cursor flicks ease in instead of snap.   */
/* ------------------------------------------------------------------------ */
// Camera frames the centre of the viewport (origin). The probe sits off-axis
// at [1.6, -1.0, 0], so it lands in the right-bottom quadrant instead of being
// re-centred by the camera every frame.
const LOOK_AT = new THREE.Vector3(0, 0, 0);
const PARALLAX_X = 0.85;
const PARALLAX_Y = 0.45;
const POINTER_EASE = 0.06;

function CameraDrift() {
  const eased = useRef(new THREE.Vector2());

  useFrame((state) => {
    // Smooth the cursor input — small lerp factor = more inertia.
    eased.current.lerp(state.pointer, POINTER_EASE);

    const t = state.clock.elapsedTime;
    state.camera.position.x =
      eased.current.x * PARALLAX_X + Math.sin(t * 0.13) * 0.12;
    state.camera.position.y =
      eased.current.y * PARALLAX_Y + Math.cos(t * 0.16) * 0.08;
    state.camera.position.z = 5.6 + Math.sin(t * 0.18) * 0.18;
    state.camera.lookAt(LOOK_AT);
  });
  return null;
}

/* ------------------------------------------------------------------------ */
/* Public component                                                         */
/* ------------------------------------------------------------------------ */
interface Props {
  className?: string;
}

export function HeroScene({ className }: Props) {
  const [ready, setReady] = useState(false);
  const { ref, inView } = useInViewFrameloop<HTMLDivElement>('400px');
  useEffect(() => setReady(true), []);
  if (!ready) return null;

  return (
    <div ref={ref} className={className} aria-hidden>
      <Canvas
        frameloop={inView ? 'always' : 'never'}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 5.6], fov: 38, near: 0.1, far: 80 }}
      >
        <color attach="background" args={['#02030a']} />
        <fog attach="fog" args={['#02030a', 9, 24]} />
        <CinematicLights />
        <Suspense fallback={null}>
          <Environment preset="night" />
          <RoboProbe />
        </Suspense>
        <CameraDrift />
        <EffectComposer>
          <Bloom
            intensity={0.6}
            luminanceThreshold={0.6}
            luminanceSmoothing={0.5}
            mipmapBlur
            radius={0.7}
          />
          <Vignette eskil={false} offset={0.18} darkness={0.78} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
