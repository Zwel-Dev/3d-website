'use client';

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useRef } from 'react';

interface Node {
  name: string;
  icon: string | null;
  x: number;
  y: number;
  central?: boolean;
}

// Coordinates are percentages within a square container.
const NODES: Node[] = [
  { name: 'Node.js',    icon: '/assets/tech/nodejs.png',     x: 50, y: 50, central: true },
  { name: 'Express',    icon: '/assets/tech/expressjs.png',  x: 50, y: 14 },
  { name: 'MongoDB',    icon: '/assets/tech/mongo-db.png',   x: 84, y: 32 },
  { name: 'MySQL',      icon: '/assets/tech/mysql.png',      x: 84, y: 70 },
  { name: 'PostgreSQL', icon: '/assets/tech/sql.png',        x: 50, y: 86 },
  { name: 'Socket.io',  icon: '/assets/tech/socket.io.webp',  x: 16, y: 70 },
  { name: 'Prisma',     icon: '/assets/tech/prisma.png',     x: 16, y: 32 },
];

const EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [0, 6],
];

// viewBox units of clearance so lines stop before they overlap the pills.
const OUTER_PAD = 8;
const CENTRAL_PAD = 12;

/** Returns the point on the segment (anchor → towards) that sits `pad` units
 *  away from `towards`. Use it to trim a line so its end lands on the edge of
 *  the target node's pill instead of underneath it. */
function trim(
  anchor: { x: number; y: number },
  towards: { x: number; y: number },
  pad: number,
) {
  const dx = towards.x - anchor.x;
  const dy = towards.y - anchor.y;
  const dist = Math.hypot(dx, dy) || 1;
  const ratio = (dist - pad) / dist;
  return {
    x: anchor.x + dx * ratio,
    y: anchor.y + dy * ratio,
  };
}

export function SceneBackend() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0.18, 0.32, 0.7, 0.88],
    [0, 1, 1, 0],
  );
  const y = useTransform(scrollYProgress, [0.2, 0.5, 0.88], [40, 0, -40]);

  return (
    <div ref={trackRef} className="relative h-[210vh]">
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        {/* Backdrop that masks the global Earth so the network reads cleanly. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-20 bg-ink-950/88"
        />

        {/* ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-[10%] top-1/2 -z-10 h-[40rem] w-[40rem] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(243,217,177,0.1),transparent)] blur-3xl"
        />

        <motion.div
          style={{ opacity, y }}
          className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-12 md:gap-16 md:px-12"
        >
          <div className="md:col-span-5">
            <div className="mb-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.45em] text-ink-400">
              <span className="h-px w-12 bg-accent-glow/60" />
              Chapter IV — Real-time
            </div>

            <h3 className="font-display text-3xl leading-[1.05] text-balance md:text-5xl lg:text-6xl">
              <span className="text-gradient">Engineering </span>
              <span className="text-gradient-accent italic">scalable real-time systems</span>
              <span className="text-gradient"> behind every immersive surface.</span>
            </h3>

            <p className="mt-8 max-w-md text-base leading-relaxed text-ink-300 md:text-lg">
              MERN at the core. WebSockets for live state. SQL when relations matter,
              Mongo when shape matters. Each piece chosen for the system — not the trend.
            </p>
          </div>

          <div className="md:col-span-7">
            <BackendNetwork scrollYProgress={scrollYProgress} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function BackendNetwork({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-xl">
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id="net-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f3d9b1" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#5b8def" stopOpacity="0.5" />
          </linearGradient>
          <radialGradient id="net-pulse" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#f3d9b1" stopOpacity="1" />
            <stop offset="100%" stopColor="#f3d9b1" stopOpacity="0" />
          </radialGradient>
        </defs>

        {EDGES.map(([a, b], i) => (
          <Edge
            key={i}
            from={NODES[a]}
            to={NODES[b]}
            index={i}
            scrollYProgress={scrollYProgress}
          />
        ))}

        {/* Pulses traveling along each edge */}
        {EDGES.map(([a, b], i) => (
          <Pulse
            key={`p-${i}`}
            from={NODES[a]}
            to={NODES[b]}
            delay={i * 0.4}
          />
        ))}
      </svg>

      {NODES.map((node, i) => (
        <NetworkNode
          key={node.name}
          node={node}
          index={i}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}

function Edge({
  from,
  to,
  index,
  scrollYProgress,
}: {
  from: Node;
  to: Node;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = 0.32 + index * 0.03;
  const pathLength = useTransform(
    scrollYProgress,
    [start, start + 0.15],
    [0, 1],
  );
  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.05, 0.75, 0.85],
    [0, 0.45, 0.45, 0],
  );

  // Pull each endpoint back so the line lands on the pill's edge instead of
  // passing through it. The central node uses a larger pad because its pill
  // is physically bigger.
  const fromPad = from.central ? CENTRAL_PAD : OUTER_PAD;
  const toPad = to.central ? CENTRAL_PAD : OUTER_PAD;
  const a = trim(to, from, fromPad);
  const b = trim(from, to, toPad);

  return (
    <motion.line
      x1={a.x}
      y1={a.y}
      x2={b.x}
      y2={b.y}
      stroke="url(#net-line)"
      strokeWidth={0.18}
      strokeLinecap="round"
      style={{ pathLength, opacity }}
    />
  );
}

function Pulse({
  from,
  to,
  delay,
}: {
  from: Node;
  to: Node;
  delay: number;
}) {
  // Pulse travels the same trimmed segment as the line above.
  const fromPad = from.central ? CENTRAL_PAD : OUTER_PAD;
  const toPad = to.central ? CENTRAL_PAD : OUTER_PAD;
  const a = trim(to, from, fromPad);
  const b = trim(from, to, toPad);

  return (
    <motion.circle
      r={0.7}
      fill="url(#net-pulse)"
      initial={{ cx: a.x, cy: a.y, opacity: 0 }}
      animate={{
        cx: [a.x, b.x],
        cy: [a.y, b.y],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 2.4,
        delay,
        repeat: Infinity,
        repeatDelay: 1.4,
        ease: 'easeInOut',
      }}
    />
  );
}

function NetworkNode({
  node,
  index,
  scrollYProgress,
}: {
  node: Node;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = 0.3 + index * 0.045;
  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.1, 0.75, 0.85],
    [0, 1, 1, 0],
  );
  const scale = useTransform(
    scrollYProgress,
    [start, start + 0.12],
    [0.6, 1],
  );

  return (
    <motion.div
      style={{
        opacity,
        scale,
        left: `${node.x}%`,
        top: `${node.y}%`,
      }}
      className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-full border ${
        node.central
          ? 'border-accent-glow/30 bg-ink-900/85 px-5 py-3 shadow-[0_0_40px_rgba(243,217,177,0.25)]'
          : 'border-white/10 bg-ink-900/75 px-3.5 py-2 backdrop-blur'
      }`}
    >
      {node.icon ? (
        <img
          src={node.icon}
          alt={node.name}
          loading="lazy"
          decoding="async"
          className={`shrink-0 object-contain ${
            node.central ? 'h-8 w-8' : 'h-6 w-6'
          }`}
        />
      ) : (
        <span
          className={`block rounded-full bg-accent-glow/80 ${
            node.central ? 'h-2 w-2' : 'h-1.5 w-1.5'
          }`}
        />
      )}

      <span
        className={`whitespace-nowrap font-mono uppercase tracking-[0.3em] ${
          node.central
            ? 'text-xs text-ink-50'
            : 'text-[10px] text-ink-200'
        }`}
      >
        {node.name}
      </span>
    </motion.div>
  );
}
