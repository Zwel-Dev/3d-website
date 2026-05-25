'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface Props {
  count?: number;
}

export function ParticleField({ count = 1500 }: Props) {
  const ref = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = Math.random() * 1.4 + 0.3;
    }
    return { positions, sizes };
  }, [count]);

  const mouse = useRef(new THREE.Vector2());

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.025;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
    mouse.current.lerp(state.pointer, 0.05);
    ref.current.position.x = mouse.current.x * 0.4;
    ref.current.position.y = mouse.current.y * 0.25;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={sizes.length}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        sizeAttenuation
        color="#f3d9b1"
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
