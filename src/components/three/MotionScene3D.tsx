'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, useGLTF } from '@react-three/drei';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useInViewFrameloop } from '@/hooks/useInViewFrameloop';

// Helmet is heavy (~1.3 MB) and only loads when Chapter III mounts. No preload.

function AstronautHelmet() {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/assets/3d/astronaut_helmet.glb');

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.18;
    ref.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.35) * 0.12;
  });

  return (
    <Float speed={0.9} floatIntensity={0.6} rotationIntensity={0}>
      <group ref={ref} scale={1.4}>
        <primitive object={scene} />
      </group>
    </Float>
  );
}

function Orbitals() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.045;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.06;
  });

  return (
    <group ref={groupRef}>
      <AstronautHelmet />

      <Float speed={0.9} floatIntensity={0.7} rotationIntensity={0.55}>
        <mesh position={[2.8, -0.4, -1.4]} scale={0.42}>
          <torusKnotGeometry args={[0.8, 0.24, 128, 16]} />
          <meshStandardMaterial
            color="#5b8def"
            metalness={0.85}
            roughness={0.22}
            emissive="#5b8def"
            emissiveIntensity={0.55}
          />
        </mesh>
      </Float>

      <Float speed={1.6} floatIntensity={1} rotationIntensity={0.6}>
        <mesh position={[-2.6, 0.9, -1.6]} scale={0.35}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#d4a373"
            metalness={0.95}
            roughness={0.18}
            emissive="#d4a373"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>

      <Float speed={1.1} floatIntensity={0.55} rotationIntensity={0.3}>
        <mesh position={[1.9, 1.9, -0.6]} scale={0.22}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.9}
            roughness={0.2}
            emissive="#5b8def"
            emissiveIntensity={0.35}
          />
        </mesh>
      </Float>

      <Float speed={1.4} floatIntensity={0.8} rotationIntensity={0.5}>
        <mesh position={[-1.6, -1.8, -0.5]} scale={0.25}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#f3d9b1"
            metalness={0.9}
            roughness={0.25}
            emissive="#a98467"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>
    </group>
  );
}

function Particles({ count = 320 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#f3d9b1"
        transparent
        opacity={0.55}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CameraDrift() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(t * 0.12) * 0.4;
    state.camera.position.y = Math.cos(t * 0.16) * 0.25;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

interface Props {
  className?: string;
}

export function MotionScene3D({ className }: Props) {
  const { ref, inView } = useInViewFrameloop<HTMLDivElement>('300px');

  return (
    <div ref={ref} className={className} aria-hidden>
      <Canvas
        frameloop={inView ? 'always' : 'never'}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6.5], fov: 42, near: 0.1, far: 50 }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 3, 4]} intensity={1.3} color="#f3d9b1" />
        <pointLight position={[-4, -2, 3]} intensity={0.7} color="#5b8def" />
        <directionalLight position={[0, 6, 4]} intensity={0.45} />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <Orbitals />
          <Particles />
        </Suspense>
        <CameraDrift />
      </Canvas>
    </div>
  );
}
