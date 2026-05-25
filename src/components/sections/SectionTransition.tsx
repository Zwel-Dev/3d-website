'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface Props {
  text: string;
}

export function SectionTransition({ text }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const x = useTransform(scrollYProgress, [0, 1], ['10%', '-40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.2, 1, 1, 0.2]);

  return (
    <div ref={ref} className="relative w-full overflow-hidden py-16 md:py-24">
      <motion.div
        style={{ x, opacity }}
        className="whitespace-nowrap font-display text-[14vw] uppercase leading-none tracking-tight text-white/[0.04]"
      >
        {text} · {text} · {text}
      </motion.div>
    </div>
  );
}
