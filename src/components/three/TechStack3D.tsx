'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Html, RoundedBox, Environment } from '@react-three/drei';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useInViewFrameloop } from '@/hooks/useInViewFrameloop';

interface TechItem {
  name: string;
  slug: string;
  color: string;
}

const TECH: TechItem[] = [
  { name: 'JavaScript', slug: 'javascript',  color: '#F7DF1E' },
  { name: 'TypeScript', slug: 'typescript',  color: '#3178C6' },
  { name: 'React',      slug: 'react',       color: '#61DAFB' },
  { name: 'Next.js',    slug: 'nextdotjs',   color: '#FFFFFF' },
  { name: 'Angular',    slug: 'angular',     color: '#DD0031' },
  { name: 'Tailwind',   slug: 'tailwindcss', color: '#06B6D4' },
  { name: 'Node.js',    slug: 'nodedotjs',   color: '#5FA04E' },
  { name: 'Express',    slug: 'express',     color: '#FFFFFF' },
  { name: 'MongoDB',    slug: 'mongodb',     color: '#47A248' },
  { name: 'MySQL',      slug: 'mysql',       color: '#4479A1' },
  { name: 'PostgreSQL', slug: 'postgresql',  color: '#4169E1' },
  { name: 'Python',     slug: 'python',      color: '#3776AB' },
  { name: 'Java',       slug: 'openjdk',     color: '#ED8B00' },
  { name: 'Figma',      slug: 'figma',       color: '#F24E1E' },
  { name: 'Git',        slug: 'git',         color: '#F05032' },
  { name: 'Postman',    slug: 'postman',     color: '#FF6C37' },
];

const CARD_SIZE = 1.25;
const CARD_DEPTH = 0.22;
const GAP = 0.45;
const STEP = CARD_SIZE + GAP;

function TechCard({
  item,
  position,
  delay,
}: {
  item: TechItem;
  position: [number, number, number];
  delay: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  // Hover lives in a ref so it doesn't trigger React re-renders inside the scene.
  const hovered = useRef(false);

  useFrame((state) => {
    const t = state.clock.elapsedTime + delay;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.32;
      const targetScale = hovered.current ? 1.12 : 1;
      const next = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.14);
      groupRef.current.scale.setScalar(next);
    }
    if (haloRef.current) {
      const mat = haloRef.current.material as THREE.MeshBasicMaterial;
      const targetOpacity = hovered.current ? 0.5 : 0.22;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, 0.12);
    }
  });

  return (
    <Float speed={1} floatIntensity={0.35} rotationIntensity={0}>
      <group
        ref={groupRef}
        position={position}
        onPointerOver={(e) => {
          e.stopPropagation();
          hovered.current = true;
        }}
        onPointerOut={() => {
          hovered.current = false;
        }}
      >
        {/* brand-color halo behind the card */}
        <mesh ref={haloRef} position={[0, 0, -CARD_DEPTH / 2 - 0.02]}>
          <planeGeometry args={[CARD_SIZE * 1.4, CARD_SIZE * 1.4]} />
          <meshBasicMaterial color={item.color} transparent opacity={0.22} />
        </mesh>

        {/* glass card */}
        <RoundedBox
          args={[CARD_SIZE, CARD_SIZE, CARD_DEPTH]}
          radius={0.16}
          smoothness={4}
        >
          <meshPhysicalMaterial
            color="#0c0c10"
            metalness={0.4}
            roughness={0.32}
            clearcoat={0.6}
            clearcoatRoughness={0.35}
            reflectivity={0.4}
          />
        </RoundedBox>

        {/* thin emissive rim — picks up the brand color subtly */}
        <mesh position={[0, 0, CARD_DEPTH / 2 + 0.001]}>
          <planeGeometry args={[CARD_SIZE * 0.98, CARD_SIZE * 0.98]} />
          <meshBasicMaterial color={item.color} transparent opacity={0.06} />
        </mesh>

        {/* icon — single Html overlay per card, stays sharp under 3D transform */}
        <Html
          transform
          position={[0, 0, CARD_DEPTH / 2 + 0.015]}
          distanceFactor={2.4}
          center
          pointerEvents="none"
        >
          <img
            src={`https://cdn.simpleicons.org/${item.slug}/white`}
            alt={item.name}
            draggable={false}
            style={{
              width: 64,
              height: 64,
              userSelect: 'none',
              filter: `drop-shadow(0 0 14px ${item.color}66)`,
            }}
          />
        </Html>
      </group>
    </Float>
  );
}

function TechGrid() {
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef(new THREE.Vector2());
  const { viewport } = useThree();

  useFrame((state) => {
    pointer.current.lerp(state.pointer, 0.04);
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.current.x * 0.18,
        0.08,
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.current.y * 0.12,
        0.08,
      );
    }
  });

  const items = useMemo(() => {
    const cols = 4;
    const rows = Math.ceil(TECH.length / cols);
    return TECH.map((item, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = (col - (cols - 1) / 2) * STEP;
      const y = -(row - (rows - 1) / 2) * STEP;
      return {
        item,
        position: [x, y, 0] as [number, number, number],
        delay: i * 0.18,
      };
    });
  }, []);

  const scale = THREE.MathUtils.clamp(viewport.width / 8, 0.7, 1.1);

  return (
    <group ref={groupRef} scale={scale}>
      {items.map(({ item, position, delay }) => (
        <TechCard
          key={item.slug}
          item={item}
          position={position}
          delay={delay}
        />
      ))}
    </group>
  );
}

interface Props {
  className?: string;
}

export function TechStack3D({ className }: Props) {
  const { ref, inView } = useInViewFrameloop<HTMLDivElement>('300px');

  return (
    <div ref={ref} className={className} aria-hidden>
      <Canvas
        frameloop={inView ? 'always' : 'never'}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8.5], fov: 38, near: 0.1, far: 50 }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 6, 5]} intensity={1.1} />
        <pointLight position={[-6, -3, 4]} intensity={0.7} color="#5b8def" />
        <pointLight position={[6, 4, -3]} intensity={0.5} color="#d4a373" />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <TechGrid />
        </Suspense>
      </Canvas>
    </div>
  );
}
