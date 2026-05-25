'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial } from '@react-three/drei';
import { Suspense, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useInViewFrameloop } from '@/hooks/useInViewFrameloop';

function HeroOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const pointer = useRef(new THREE.Vector2());

  useFrame((state, delta) => {
    pointer.current.lerp(state.pointer, 0.05);
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.18;
      meshRef.current.rotation.x = pointer.current.y * 0.4;
      meshRef.current.position.x = pointer.current.x * 0.25;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.6 + 0.3;
      ringRef.current.rotation.z += delta * 0.08;
    }
    if (haloRef.current) {
      haloRef.current.rotation.z -= delta * 0.04;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.6) * 0.02;
      haloRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      <Float speed={1.3} rotationIntensity={0.45} floatIntensity={1.2}>
        <mesh ref={meshRef} castShadow receiveShadow>
          <icosahedronGeometry args={[1.25, 6]} />
          <MeshTransmissionMaterial
            samples={4}
            resolution={256}
            transmission={0.92}
            thickness={1.4}
            roughness={0.12}
            ior={1.45}
            chromaticAberration={0.07}
            backside
            anisotropicBlur={0.15}
            distortion={0.25}
            distortionScale={0.4}
            temporalDistortion={0.12}
            color="#f3d9b1"
            attenuationColor="#d4a373"
            attenuationDistance={1.6}
          />
        </mesh>
      </Float>

      <Float speed={0.7} rotationIntensity={0.6} floatIntensity={0.5}>
        <mesh ref={ringRef}>
          <torusGeometry args={[2, 0.012, 24, 200]} />
          <meshStandardMaterial
            color="#f3d9b1"
            metalness={1}
            roughness={0.2}
            emissive="#d4a373"
            emissiveIntensity={1}
          />
        </mesh>
      </Float>

      <mesh ref={haloRef}>
        <ringGeometry args={[2.4, 2.42, 200]} />
        <meshBasicMaterial
          color="#5b8def"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      <Float speed={1.6} rotationIntensity={0.8} floatIntensity={1.6}>
        <mesh position={[2, 1.2, -1]}>
          <octahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial color="#fff" metalness={0.9} roughness={0.2} emissive="#fff" emissiveIntensity={0.3} />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh position={[-1.8, -1.4, 0.4]}>
          <icosahedronGeometry args={[0.14, 0]} />
          <meshStandardMaterial color="#d4a373" metalness={0.9} roughness={0.3} emissive="#d4a373" emissiveIntensity={0.4} />
        </mesh>
      </Float>
    </group>
  );
}

function HeroLights() {
  const a = useRef<THREE.PointLight>(null);
  const b = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (a.current) {
      a.current.position.x = Math.sin(t * 0.45) * 3;
      a.current.position.y = Math.cos(t * 0.6) * 1.6;
    }
    if (b.current) {
      b.current.position.x = Math.cos(t * 0.3) * -3;
      b.current.position.z = Math.sin(t * 0.4) * 2 + 1;
    }
  });
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight ref={a} position={[3, 2, 4]} intensity={24} color="#f3d9b1" />
      <pointLight ref={b} position={[-4, -1, 2]} intensity={18} color="#5b8def" />
      <directionalLight position={[0, 6, 5]} intensity={0.6} />
    </>
  );
}

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
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 5], fov: 38, near: 0.1, far: 50 }}
      >
        <HeroLights />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <HeroOrb />
        </Suspense>
      </Canvas>
    </div>
  );
}
