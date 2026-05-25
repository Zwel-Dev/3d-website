'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export function AmbientLights() {
  const keyRef = useRef<THREE.PointLight>(null);
  const fillRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (keyRef.current) {
      keyRef.current.position.x = Math.cos(t * 0.25) * 4;
      keyRef.current.position.y = Math.sin(t * 0.3) * 2.2;
      keyRef.current.intensity = 18 + Math.sin(t * 0.8) * 4;
    }
    if (fillRef.current) {
      fillRef.current.position.x = Math.sin(t * 0.2) * -5;
      fillRef.current.position.y = Math.cos(t * 0.27) * -2.8;
    }
  });

  return (
    <>
      <ambientLight intensity={0.18} color="#f6f6f7" />
      <pointLight
        ref={keyRef}
        position={[3, 2, 4]}
        intensity={22}
        color="#f3d9b1"
        distance={14}
        decay={2}
      />
      <pointLight
        ref={fillRef}
        position={[-4, -2, 2]}
        intensity={14}
        color="#5b8def"
        distance={12}
        decay={2}
      />
      <directionalLight position={[0, 5, 5]} intensity={0.4} color="#ffffff" />
    </>
  );
}
