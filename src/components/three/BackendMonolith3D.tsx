'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Edges, Html, Line } from '@react-three/drei';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useInViewFrameloop } from '@/hooks/useInViewFrameloop';

/* ------------------------------------------------------------------------ */
/* Device hooks — Tailwind-aligned breakpoints                              */
/* ------------------------------------------------------------------------ */
function useViewport() {
  const [profile, setProfile] = useState<'mobile' | 'tablet' | 'desktop'>(
    'desktop',
  );
  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 767px)');
    const desktop = window.matchMedia('(min-width: 1024px)');
    const update = () => {
      if (mobile.matches) setProfile('mobile');
      else if (desktop.matches) setProfile('desktop');
      else setProfile('tablet');
    };
    update();
    mobile.addEventListener('change', update);
    desktop.addEventListener('change', update);
    return () => {
      mobile.removeEventListener('change', update);
      desktop.removeEventListener('change', update);
    };
  }, []);
  return profile;
}

function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);
  return isTouch;
}

/* ------------------------------------------------------------------------ */
/* HUD config — techs anchored at fixed heights around the monolith         */
/* ------------------------------------------------------------------------ */
type Side = 'left' | 'right';

interface HudItem {
  name: string;
  icon: string;
  role: string;
  side: Side;
  y: number;
}

const HUD: HudItem[] = [
  { name: 'Node.js',     icon: '/assets/tech/nodejs.png',     role: 'Runtime',    side: 'right', y:  1.45 },
  { name: 'Express',     icon: '/assets/tech/expressjs.png',  role: 'HTTP · API', side: 'right', y:  0.7  },
  { name: 'Socket.io',   icon: '/assets/tech/socket.io.webp', role: 'Realtime',   side: 'right', y: -0.05 },
  { name: 'Prisma',      icon: '/assets/tech/prisma.png',     role: 'ORM',        side: 'right', y: -0.8  },
  { name: 'MongoDB',     icon: '/assets/tech/mongo-db.png',   role: 'Document',   side: 'left',  y:  0.95 },
  { name: 'MySQL',       icon: '/assets/tech/mysql.png',      role: 'Relational', side: 'left',  y:  0.1  },
  { name: 'PostgreSQL',  icon: '/assets/tech/sql.png',        role: 'Relational', side: 'left',  y: -0.85 },
];

/* ------------------------------------------------------------------------ */
/* Scan line — bright additive plane that travels down the front face       */
/* ------------------------------------------------------------------------ */
function ScanLine({
  delay,
  speed = 1,
  color = '#f3d9b1',
  thickness = 0.04,
}: {
  delay: number;
  speed?: number;
  color?: string;
  thickness?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (!ref.current || !matRef.current) return;
    const cycle = 4.6 / speed;
    const t = ((state.clock.elapsedTime + delay) % cycle) / cycle;
    ref.current.position.y = 1.7 - t * 3.4;
    const fade = Math.min(t * 6, (1 - t) * 6, 1);
    matRef.current.opacity = Math.max(0, fade) * 0.85;
  });

  return (
    <mesh ref={ref} position={[0, 1.7, 0.256]}>
      <planeGeometry args={[0.92, thickness]} />
      <meshBasicMaterial
        ref={matRef}
        color={color}
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------------ */
/* HUD item — tether line from monolith edge + billboarded Html badge       */
/* `anchorX` is the world-x distance of the badge from the monolith centre. */
/* `compact` collapses the badge to icon + name (drops the role subtext).   */
/* ------------------------------------------------------------------------ */
function HudBadge({
  tech,
  anchorX,
  compact,
}: {
  tech: HudItem;
  anchorX: number;
  compact: boolean;
}) {
  const dir = tech.side === 'right' ? 1 : -1;
  const monolithEdge = 0.5 * dir;
  const badgeAnchor = anchorX * dir;

  const points = useMemo(
    () => [
      new THREE.Vector3(monolithEdge, tech.y, 0),
      new THREE.Vector3(badgeAnchor * 0.97, tech.y, 0),
    ],
    [monolithEdge, badgeAnchor, tech.y],
  );

  return (
    <group>
      <Line
        points={points}
        color="#f3d9b1"
        lineWidth={1}
        transparent
        opacity={0.32}
        depthWrite={false}
      />

      <mesh position={[monolithEdge, tech.y, 0.253]}>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshBasicMaterial color="#fef6e0" />
      </mesh>

      <mesh position={[badgeAnchor * 0.97, tech.y, 0]}>
        <sphereGeometry args={[compact ? 0.028 : 0.035, 12, 12]} />
        <meshBasicMaterial color="#f3d9b1" />
      </mesh>

      <Html
        position={[badgeAnchor, tech.y, 0]}
        center
        style={{ pointerEvents: 'none' }}
        zIndexRange={[10, 0]}
      >
        <div
          className={`flex items-center whitespace-nowrap rounded-full border border-white/15 bg-ink-950/85 backdrop-blur ${
            compact ? 'gap-1.5 px-2 py-1' : 'gap-2 px-3 py-1.5'
          }`}
          style={{
            transform: dir > 0
              ? `translateX(${compact ? 4 : 8}px)`
              : `translateX(-${compact ? 4 : 8}px)`,
          }}
        >
          <img
            src={tech.icon}
            alt=""
            loading="lazy"
            decoding="async"
            className={`shrink-0 object-contain ${
              compact ? 'h-7 w-7' : 'h-8 w-8'
            }`}
          />
          <div className="flex min-w-0 flex-col leading-tight">
            <span
              className={`font-mono uppercase tracking-[0.28em] text-ink-100 ${
                compact ? 'text-[9px]' : 'text-[10px]'
              }`}
            >
              {tech.name}
            </span>
            {!compact && (
              <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-ink-500">
                {tech.role}
              </span>
            )}
          </div>
        </div>
      </Html>
    </group>
  );
}

/* ------------------------------------------------------------------------ */
/* Monolith — slow sway + cursor tilt + optional in-scene HUD               */
/* ------------------------------------------------------------------------ */
function Monolith({
  tilt,
  sway,
  reducedFx,
  hudAnchorX,
  hudCompact,
}: {
  tilt: boolean;
  sway: boolean;
  reducedFx: boolean;
  hudAnchorX: number;
  hudCompact: boolean;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    if (sway) {
      // Gentler sway — HUD always in scene now, badges shouldn't drift far.
      ref.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.13) * 0.22;
    }
    if (tilt) {
      const targetX = state.pointer.y * 0.1;
      ref.current.rotation.x = THREE.MathUtils.lerp(
        ref.current.rotation.x,
        targetX,
        0.05,
      );
    }
  });

  return (
    <group ref={ref}>
      {/* Main monolith body */}
      <mesh castShadow>
        <boxGeometry args={[1, 3.4, 0.5]} />
        <meshPhysicalMaterial
          color="#08080c"
          metalness={0.92}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1}
        />
        <Edges threshold={15} color="#f3d9b1" />
      </mesh>

      {/* Scan lines on the front face */}
      <ScanLine delay={0} speed={1} color="#f3d9b1" />
      {!reducedFx && (
        <>
          <ScanLine delay={1.7} speed={1.25} color="#fef6e0" />
          <ScanLine delay={3.1} speed={0.8} color="#5b8def" thickness={0.025} />
        </>
      )}

      {/* Static horizontal grid lines on the front face */}
      {[-1.25, -0.6, 0.05, 0.7, 1.35].map((y, i) => (
        <mesh key={i} position={[0, y, 0.252]}>
          <planeGeometry args={[0.85, 0.004]} />
          <meshBasicMaterial
            color="#5b8def"
            transparent
            opacity={0.14}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* HUD — tethered tech badges arranged around the monolith */}
      {HUD.map((tech) => (
        <HudBadge
          key={tech.name}
          tech={tech}
          anchorX={hudAnchorX}
          compact={hudCompact}
        />
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------------ */
/* Lighting rig                                                              */
/* ------------------------------------------------------------------------ */
function CinematicLights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight
        position={[3, 3, 3]}
        intensity={3}
        color="#f3d9b1"
        distance={12}
        decay={2}
      />
      <pointLight
        position={[-3, -1, 3]}
        intensity={2}
        color="#5b8def"
        distance={10}
        decay={2}
      />
      <directionalLight position={[0, 5, 4]} intensity={0.4} color="#fef6e0" />
    </>
  );
}

interface Props {
  className?: string;
}

export function BackendMonolith3D({ className }: Props) {
  const { ref, inView } = useInViewFrameloop<HTMLDivElement>('300px');
  const profile = useViewport();
  const isTouch = useIsTouch();

  const isMobile = profile === 'mobile';
  const isTablet = profile === 'tablet';
  const isDesktop = profile === 'desktop';

  // Device-tuned render settings.
  // Mobile: pull camera way back + tight HUD + compact badges so the whole
  //   monolith + tethered chips fit a portrait viewport.
  // Tablet: middle-ground anchor / camera.
  // Desktop: full HUD with role subtitles, badges further out.
  const dprMax = isMobile ? 1.1 : isTablet ? 1.3 : 1.5;
  const cameraZ = isMobile ? 5.8 : isTablet ? 8.0 : 7.6;
  const fov = isMobile ? 45 : isTablet ? 48 : 44;
  const hudAnchorX = isMobile ? 1.45 : isTablet ? 1.75 : 1.95;
  const hudCompact = !isDesktop;

  return (
    <div ref={ref} className={className} aria-hidden>
      <Canvas
        frameloop={inView ? 'always' : 'never'}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        dpr={[1, dprMax]}
        camera={{ position: [0, 0.2, cameraZ], fov, near: 0.1, far: 50 }}
      >
        <CinematicLights />
        <Suspense fallback={null}>
          <Monolith
            tilt={!isTouch && isDesktop}
            sway={!isMobile}
            reducedFx={isMobile}
            hudAnchorX={hudAnchorX}
            hudCompact={hudCompact}
          />
        </Suspense>
        <EffectComposer>
          <Bloom
            intensity={isMobile ? 0.5 : 0.75}
            luminanceThreshold={0.4}
            luminanceSmoothing={0.5}
            mipmapBlur
            radius={isMobile ? 0.55 : 0.7}
          />
          <Vignette
            eskil={false}
            offset={0.22}
            darkness={isMobile ? 0.45 : 0.6}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
