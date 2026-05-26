'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ContactForm } from '@/components/ui/ContactForm';
import { RevealText } from '@/components/ui/RevealText';
import { socials } from '@/lib/data';
import { EASE } from '@/lib/animations';

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], ['-40%', '20%']);
  const glowScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.3]);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative w-full overflow-hidden pb-12 pt-20 md:pb-20 md:pt-32 lg:pt-48"
    >
      <motion.div
        aria-hidden
        style={{ y: glowY, scale: glowScale }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[60rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(243,217,177,0.18),transparent_70%)] blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 1, ease: EASE }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-10 bg-accent-glow" />
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink-300">
            05 — Let's talk
          </span>
        </motion.div>

        <h2 className="mt-8 font-display text-[clamp(2.75rem,11vw,12rem)] leading-[0.9] tracking-[-0.04em] text-balance md:mt-10">
          <span className="block">
            <RevealText text="Have an" className="text-gradient mr-4" />
            <RevealText text="idea?" className="text-gradient-accent italic" delay={0.1} />
          </span>
          <span className="block">
            <RevealText text="Let's make" className="text-gradient mr-4" delay={0.2} />
            <RevealText text="it real." className="text-gradient italic" delay={0.3} />
          </span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-12"
        >
          {/* Left — context + direct contact details for users who prefer email */}
          <div className="md:col-span-5">
            <p className="max-w-md text-lg leading-relaxed text-ink-200 md:text-xl">
              Open to freelance, full-time, and collaboration on ambitious web
              work — marketing sites, MERN-stack products, and motion-led
              experiences. If your team values{' '}
              <em className="text-ink-50">craft</em> and{' '}
              <em className="text-ink-50">considered motion</em>, I&apos;d love
              to hear from you.
            </p>

            <a
              href="mailto:zwethuta1998@gmail.com"
              data-hover
              className="mt-10 block font-display text-2xl text-ink-50 transition-colors hover:text-accent-glow md:text-3xl lg:text-4xl"
            >
              zwethuta1998@gmail.com
              <span className="ml-3 inline-block translate-y-[-4px] text-accent-glow">↗</span>
            </a>

            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.3em] text-ink-400">
              Mingaladon, Yangon · Myanmar
            </p>

            <div className="glass-strong relative mt-10 overflow-hidden rounded-3xl p-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink-400">
                Elsewhere
              </span>
              <ul className="mt-4 divide-y divide-white/5">
                {socials.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-hover
                      className="group flex items-center justify-between py-3 text-ink-100 transition-colors hover:text-accent-glow"
                    >
                      <span className="text-sm">{s.label}</span>
                      <span className="inline-block translate-x-0 text-accent-glow opacity-60 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — the working contact form */}
          <div className="md:col-span-6 md:col-start-7">
            <div className="glass rounded-3xl border border-white/8 p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-ink-300">
                <span className="h-px w-8 bg-accent-glow/60" />
                Send a message
              </div>
              <ContactForm />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
