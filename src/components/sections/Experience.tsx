'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { experience } from '@/lib/data';
import { EASE, fadeUp, stagger } from '@/lib/animations';

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 70%', 'end 30%'],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full overflow-hidden py-20 md:py-32 lg:py-48"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15%' }}
          className="grid grid-cols-1 gap-10 md:grid-cols-12"
        >
          <div className="md:col-span-5">
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <span className="h-px w-10 bg-accent-glow" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink-300">
                04 — Trajectory
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-8 font-display text-display text-ink-50 text-balance"
            >
              From <em className="text-gradient-accent">drafting board</em> to{' '}
              <em className="text-gradient-accent">dev console</em>.
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="text-base leading-relaxed text-ink-300 md:col-span-6 md:col-start-7 md:text-lg"
          >
            Started in architecture, pivoted into code during the pandemic, and have been
            building ever since — through self-study, an HNC, an HND, and now an Honours
            programme. Each stop pushed the same instinct: make things that feel
            considered, and ship them.
          </motion.p>
        </motion.div>

        <div ref={trackRef} className="relative mt-16 md:mt-24">
          {/* Track line */}
          <div className="absolute left-3 top-0 h-full w-px bg-white/5 md:left-1/2" />
          <motion.div
            style={{ scaleY }}
            className="absolute left-3 top-0 h-full w-px origin-top bg-gradient-to-b from-accent-glow via-accent to-transparent md:left-1/2"
          />

          <ul className="space-y-14 md:space-y-24 lg:space-y-32">
            {experience.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-15%' }}
                  transition={{ duration: 1, ease: EASE, delay: i * 0.05 }}
                  className="relative grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16"
                >
                  {/* Node */}
                  <span
                    aria-hidden
                    className="absolute left-3 top-3 -translate-x-1/2 md:left-1/2"
                  >
                    <span className="relative block h-3 w-3 rounded-full bg-accent-glow shadow-[0_0_18px_rgba(243,217,177,0.8)]">
                      <span className="absolute inset-0 animate-ping rounded-full bg-accent-glow/40" />
                    </span>
                  </span>

                  <div
                    className={
                      isLeft
                        ? 'pl-10 md:pl-0 md:pr-12 md:text-right'
                        : 'pl-10 md:order-2 md:pl-12'
                    }
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink-400">
                      {item.period} · {item.location}
                    </span>
                    <h3 className="mt-3 font-display text-3xl text-ink-50 md:text-4xl">
                      {item.role}
                    </h3>
                    <p
                      className={`mt-1 font-mono text-sm uppercase tracking-[0.25em] text-accent-glow`}
                    >
                      @ {item.company}
                    </p>
                  </div>

                  <div
                    className={
                      isLeft
                        ? 'pl-10 md:order-2 md:pl-12'
                        : 'pl-10 md:pl-0 md:pr-12 md:text-right'
                    }
                  >
                    <p className="text-base leading-relaxed text-ink-300">{item.description}</p>
                    <div
                      className={`mt-5 flex flex-wrap gap-2 ${
                        isLeft ? '' : 'md:justify-end'
                      }`}
                    >
                      {item.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-white/10 bg-ink-900/40 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-ink-200 backdrop-blur"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
