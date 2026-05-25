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
  /**
   * When true, the reveal animates on mount instead of waiting for the element
   * to scroll into view. Use this in sections visible at initial page load
   * (the hero) where the in-view observer can race with the loader overlay
   * and leave the text stuck below its mask.
   */
  immediate?: boolean;
}

export function RevealText({
  text,
  className,
  delay = 0,
  stagger = 0.04,
  splitBy = 'word',
  immediate = false,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const shouldReveal = immediate || inView;

  const parts = splitBy === 'word' ? text.split(/(\s+)/) : Array.from(text);

  // Strip layout/spacing classes (margin, padding) so they don't double up on
  // every word's motion.span. Text-styling classes (text-gradient, italic,
  // color) stay on the motion.span — they MUST sit on the same element as the
  // text itself, because Chrome won't extend an ancestor's
  // `background-clip: text` into a transformed descendant (and these spans are
  // animated via `transform: translateY(...)`).
  const innerClass = stripLayoutClasses(className);

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
              className={cn(
                'inline-block will-change-transform',
                innerClass,
              )}
              initial={{ y: '110%' }}
              animate={shouldReveal ? { y: '0%' } : { y: '110%' }}
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

function stripLayoutClasses(className: string | undefined): string {
  if (!className) return '';
  return className
    .split(/\s+/)
    .filter((c) => c && !/^-?(m|p)[trblxyse]?-/.test(c))
    .join(' ');
}
