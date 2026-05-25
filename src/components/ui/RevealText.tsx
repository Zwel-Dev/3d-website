'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { EASE } from '@/lib/animations';

interface Props {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  splitBy?: 'word' | 'char';
}

export function RevealText({
  text,
  className,
  delay = 0,
  stagger = 0.04,
  splitBy = 'word',
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  const parts = splitBy === 'word' ? text.split(/(\s+)/) : Array.from(text);

  return (
    <span
      ref={ref}
      className={cn('inline-block leading-[1.05]', className)}
      aria-label={text}
    >
      {parts.map((part, i) => {
        if (/^\s+$/.test(part)) return <span key={i}>{part}</span>;
        return (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom"
            aria-hidden
          >
            <motion.span
              className="inline-block will-change-transform"
              initial={{ y: '110%' }}
              animate={inView ? { y: '0%' } : { y: '110%' }}
              transition={{ duration: 1, delay: delay + i * stagger, ease: EASE }}
            >
              {part}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
