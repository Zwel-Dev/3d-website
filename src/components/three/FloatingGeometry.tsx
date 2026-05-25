'use client';

import { Float, MeshDistortMaterial } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export function FloatingGeometry() {
  const groupRef = useRef<THREE.Group>(null);
  const orbRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const cubeRef = useRef<THREE.Mesh>(null);
  const pointer = useRef(new THREE.Vector2());
  const { viewport } = useThree();

  useFrame((state, delta) => {
    pointer.current.lerp(state.pointer, 0.06);
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.04;
      groupRef.current.position.x = pointer.current.x * 0.3;
      groupRef.current.position.y = pointer.current.y * 0.18;
    }
    if (orbRef.current) {
      orbRef.current.rotation.x += delta * 0.18;
      orbRef.current.rotation.z += delta * 0.06;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
      ringRef.current.rotation.y += delta * 0.25;
    }
    if (cubeRef.current) {
      cubeRef.current.rotation.x += delta * 0.12;
      cubeRef.current.rotation.y += delta * 0.18;
    }
  });

  // Scale slightly down on small viewports
  const scale = Math.min(1, viewport.width / 8);

  return (
    <group ref={groupRef} position={[1.4, -0.3, 0]} scale={scale}>
      <Float speed={1.4} rotationIntensity={0.45} floatIntensity={1.1}>
        <mesh ref={orbRef} position={[0, 0, 0]} castShadow>
          <icosahedronGeometry args={[1.1, 12]} />
          <MeshDistortMaterial
            color="#f3d9b1"
            metalness={0.6}
            roughness={0.18}
            distort={0.32}
            speed={1.4}
            emissive="#a98467"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      <Float speed={0.9} rotationIntensity={0.6} floatIntensity={0.8}>
        <mesh ref={ringRef} position={[0, 0, 0]}>
          <torusGeometry args={[1.7, 0.018, 32, 200]} />
          <meshStandardMaterial
            color="#d4a373"
            metalness={1}
            roughness={0.15}
            emissive="#d4a373"
            emissiveIntensity={0.6}
          />
        </mesh>
      </Float>

      <Float speed={1.1} rotationIntensity={0.8} floatIntensity={1.4}>
        <mesh ref={cubeRef} position={[-2.6, 1.1, -1.2]}>
          <boxGeometry args={[0.32, 0.32, 0.32]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.7}
            roughness={0.2}
            emissive="#5b8def"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      <Float speed={1.6} rotationIntensity={1} floatIntensity={1.6}>
        <mesh position={[2.4, -1.2, -1.6]}>
          <octahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial
            color="#f3d9b1"
            metalness={0.9}
            roughness={0.25}
            emissive="#f3d9b1"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>

      <Float speed={0.7} rotationIntensity={0.4} floatIntensity={0.9}>
        <mesh position={[-2.1, -1.4, 0.6]}>
          <torusKnotGeometry args={[0.18, 0.05, 80, 16]} />
          <meshStandardMaterial
            color="#9bb1c9"
            metalness={0.8}
            roughness={0.25}
          />
        </mesh>
      </Float>
    </group>
  );
}
