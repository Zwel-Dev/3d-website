'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { RevealText } from '@/components/ui/RevealText';
import { EASE, fadeUp, stagger } from '@/lib/animations';

const FACTS = [
  { label: 'Years coding', value: '05+' },
  { label: 'Primary stack', value: 'MERN' },
  { label: 'Disciplines bridged', value: '02' },
  // { label: 'Cups of coffee', value: '∞' },
];

const PRINCIPLES = [
  {
    title: 'Motion as language',
    body: 'Every transition earns its place. Movement reveals intent, hierarchy, and the relationship between things — never decoration.',
  },
  {
    title: 'Engineered for calm',
    body: 'Cinematic doesn\'t mean chaotic. Premium interfaces are quiet, generous, and confident in their pacing.',
  },
  {
    title: 'Performance is craft',
    body: 'A site that judders is a site that lies. I budget for the slowest device in the room and treat 60fps as a baseline.',
  },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.6]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full overflow-hidden py-32 md:py-48"
    >
      <motion.div
        aria-hidden
        style={{ y: y1 }}
        className="pointer-events-none absolute -left-32 top-10 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(91,141,239,0.18),transparent)] blur-3xl"
      />
      <motion.div
        aria-hidden
        style={{ y: y2 }}
        className="pointer-events-none absolute -right-40 bottom-0 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(212,163,115,0.18),transparent)] blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15%' }}
          className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-12"
        >
          <div className="md:col-span-4">
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <span className="h-px w-10 bg-accent-glow" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink-300">
                01 — About
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-8 font-display text-display text-ink-50 text-balance"
            >
              A studio of <em className="text-gradient-accent">one</em>, working the seam
              between <em className="text-gradient-accent">code</em> and{' '}
              <em className="text-gradient-accent">feel</em>.
            </motion.h2>
          </div>

          <motion.div
            variants={fadeUp}
            style={{ opacity }}
            className="md:col-span-7 md:col-start-6"
          >
            <p className="text-lg leading-relaxed text-ink-200 md:text-xl">
              I build interfaces that feel <em className="text-ink-50">considered</em> and run
              <em className="text-ink-50"> cheap</em> — React product surfaces on the front,
              Node.js, Express, and MongoDB on the back. I came to code through architecture,
              and that lineage still shapes how I think about hierarchy, spatial rhythm, and
              the weight of a single pixel.
            </p>
            <p className="mt-6 text-base leading-relaxed text-ink-300">
              Currently reading Computer Science (Hons) at British United College, with side
              quests through cybersecurity, AI, and Android. Outside of class I'm usually
              deep inside a React component, a Three.js scene, or a stubborn CSS bug.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4">
              {FACTS.map((f, i) => (
                <motion.div
                  key={f.label}
                  variants={fadeUp}
                  custom={i}
                  className="group"
                >
                  <div className="font-display text-3xl text-gradient md:text-4xl">
                    {f.value}
                  </div>
                  <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-400">
                    {f.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-28 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 1, ease: EASE, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass group relative overflow-hidden rounded-3xl p-8"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink-400">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-6 font-display text-2xl text-ink-50 md:text-3xl">
                {p.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-300">{p.body}</p>
              <span
                aria-hidden
                className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent-glow via-accent to-transparent transition-transform duration-700 ease-expo group-hover:scale-x-100"
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
