'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Project } from '@/lib/data';
import { cn } from '@/lib/utils';
import { EASE } from '@/lib/animations';

interface Props {
  project: Project;
  index: number;
  reverse?: boolean;
}

export function ProjectCard({ project, index, reverse }: Props) {
  const ref = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0.4, 1, 1, 0.4]);

  return (
    <motion.article
      ref={ref}
      style={{ opacity }}
      className={cn(
        'group relative grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16',
        reverse && 'md:[&>*:first-child]:order-2',
      )}
      onMouseMove={(e) => {
        const el = imgRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
        el.style.setProperty('--rx', `${-y}deg`);
        el.style.setProperty('--ry', `${x}deg`);
      }}
      onMouseLeave={() => {
        const el = imgRef.current;
        if (!el) return;
        el.style.setProperty('--rx', `0deg`);
        el.style.setProperty('--ry', `0deg`);
      }}
    >
      {/* Visual */}
      <motion.div
        style={{ y: imgY }}
        className="md:col-span-7"
      >
        <div
          ref={imgRef}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/5 transition-transform duration-700 ease-expo will-change-transform"
          style={{
            transform: 'perspective(1000px) rotateX(var(--rx,0)) rotateY(var(--ry,0))',
          }}
          data-hover
        >
          {project.video?.provider === 'vimeo' ? (
            <iframe
              src={`https://player.vimeo.com/video/${project.video.id}?autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0`}
              title={project.title}
              loading="lazy"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <motion.img
              src={project.cover}
              alt={project.title}
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: EASE }}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.06]"
              loading="lazy"
            />
          )}
          <div
            className="absolute inset-0 mix-blend-overlay opacity-50 transition-opacity duration-700 group-hover:opacity-30"
            style={{
              background: `radial-gradient(ellipse at 30% 30%, ${project.accent}40, transparent 60%)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />

          <div className="absolute left-6 top-6 flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: project.accent, boxShadow: `0 0 12px ${project.accent}` }}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-ink-100">
              {String(index + 1).padStart(2, '0')} · {project.year}
            </span>
          </div>

          <div className="absolute bottom-6 right-6 inline-flex items-center gap-2 rounded-full bg-ink-950/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-ink-100 backdrop-blur-md ring-1 ring-white/10 transition-transform duration-500 group-hover:-translate-y-1">
            View case
            <span aria-hidden>→</span>
          </div>
        </div>
      </motion.div>

      {/* Body */}
      <motion.div style={{ y }} className="md:col-span-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink-400">
          {project.client} · {project.role}
        </span>
        <motion.h3
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1, ease: EASE }}
          className="mt-4 font-display text-4xl text-ink-50 md:text-6xl"
        >
          {project.title}
        </motion.h3>
        <p className="mt-5 max-w-md text-base leading-relaxed text-ink-300">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-ink-900/40 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-ink-200 backdrop-blur"
            >
              {t}
            </span>
          ))}
        </div>

        <a
          href={project.link ?? '#'}
          target={project.link ? '_blank' : undefined}
          rel={project.link ? 'noopener noreferrer' : undefined}
          data-hover
          className="mt-8 inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.3em] text-ink-100 transition-colors hover:text-accent-glow"
        >
          <span className="inline-block h-px w-10 origin-left bg-ink-100 transition-all duration-500 group-hover/link:w-16 group-hover/link:bg-accent-glow" />
          Visit project ↗
        </a>
      </motion.div>
    </motion.article>
  );
}
