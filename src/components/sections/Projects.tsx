'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { projects } from '@/lib/data';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { EASE } from '@/lib/animations';
import { MagneticButton } from '@/components/ui/MagneticButton';

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], ['12%', '-12%']);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full overflow-hidden py-32 md:py-48"
    >
      {/* Heading band */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 1, ease: EASE }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-10 bg-accent-glow" />
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink-300">
            03 — Selected Work
          </span>
        </motion.div>

        <motion.h2
          style={{ y: headingY }}
          className="mt-8 font-display text-hero text-balance"
        >
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 1.1, ease: EASE }}
            className="block text-gradient"
          >
            Selected work,
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
            className="block italic text-gradient-accent"
          >
            shipped end-to-end.
          </motion.span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-ink-300 md:text-lg"
        >
          A short reel of recent work — products and portfolios I designed, built, and
          deployed, mostly solo across the full stack.
        </motion.p>
      </div>

      <div className="relative z-10 mx-auto mt-24 flex max-w-7xl flex-col gap-32 px-6 md:gap-48 md:px-12">
        {projects.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            index={i}
            reverse={i % 2 === 1}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto mt-32 flex max-w-7xl justify-center px-6 md:px-12">
        <MagneticButton href="#contact" variant="ghost">
          See full archive
        </MagneticButton>
      </div>
    </section>
  );
}
