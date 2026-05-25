'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { skills } from '@/lib/data';
import { EASE, fadeUp, stagger } from '@/lib/animations';

const TechStack3D = dynamic(
  () => import('@/components/three/TechStack3D').then((m) => m.TechStack3D),
  { ssr: false, loading: () => null },
);

const MARQUEE = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Angular',
  'Tailwind',
  'Node.js',
  'Express',
  'MongoDB',
  'MySQL',
  'PostgreSQL',
  'Python',
  'Java',
  'Figma',
  'Postman',
  'Git',
];

function SkillCard({ skill, i }: { skill: typeof skills[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.9, ease: EASE, delay: i * 0.04 }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
        el.style.setProperty('--rx', `${-y}deg`);
        el.style.setProperty('--ry', `${x}deg`);
      }}
      onMouseLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.style.setProperty('--rx', `0deg`);
        el.style.setProperty('--ry', `0deg`);
      }}
      className="glass group relative overflow-hidden rounded-2xl p-5 transition-transform duration-500 ease-expo will-change-transform"
      style={{
        transform: 'perspective(800px) rotateX(var(--rx,0)) rotateY(var(--ry,0))',
      }}
      data-hover
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-base font-medium text-ink-50 md:text-lg">{skill.name}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-400">
          {skill.category}
        </span>
      </div>
      <div className="mt-6 h-px w-full overflow-hidden bg-ink-700/60">
        <motion.span
          className="block h-full origin-left bg-gradient-to-r from-accent-glow via-accent to-accent-muted"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: skill.level / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE, delay: i * 0.04 + 0.2 }}
        />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-500">
          Mastery
        </span>
        <span className="font-display text-sm text-ink-100">{skill.level}</span>
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl bg-[radial-gradient(closest-side,rgba(243,217,177,0.18),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
    </motion.div>
  );
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const x = useTransform(scrollYProgress, [0, 1], ['10%', '-30%']);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full overflow-hidden py-32 md:py-48"
    >
      <motion.div
        aria-hidden
        style={{ x }}
        className="pointer-events-none absolute -bottom-32 -left-32 right-0 select-none whitespace-nowrap font-display text-[18vw] uppercase leading-none tracking-tight text-white/[0.025]"
      >
        Toolkit · Toolkit · Toolkit
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15%' }}
          className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-end"
        >
          <div className="md:col-span-5">
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <span className="h-px w-10 bg-accent-glow" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink-300">
                02 — Toolkit
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-8 font-display text-display text-ink-50"
            >
              Tools that get out of <em className="text-gradient-accent">the way</em>.
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="text-base leading-relaxed text-ink-300 md:col-span-6 md:col-start-7 md:text-lg"
          >
            A pragmatic stack picked from years of shipping: strong types, expressive
            primitives, predictable motion. I treat tools as instruments — each chosen for
            a reason, each rehearsed.
          </motion.p>
        </motion.div>

        {/* 3D techstack — floating, lit cards with brand-coloured halos */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1.2, ease: EASE }}
          className="relative mt-20"
        >
          <TechStack3D className="aspect-square w-full md:aspect-[5/4]" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -bottom-px h-24 bg-gradient-to-b from-transparent to-ink-950"
          />
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} i={i} />
          ))}
        </div>
      </div>

      {/* Marquee strip */}
      <div className="relative mt-24 overflow-hidden border-y border-white/5 bg-ink-900/40 py-6">
        <div className="marquee flex w-max gap-12 whitespace-nowrap font-display text-3xl text-ink-200 md:text-5xl">
          {[...MARQUEE, ...MARQUEE].map((t, i) => (
            <span key={i} className="flex items-center gap-12">
              {t}
              <span className="text-accent-glow">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
