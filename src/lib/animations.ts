import type { Variants } from 'framer-motion';

export const EASE = [0.16, 1, 0.3, 1] as const;
export const EASE_SMOOTH = [0.65, 0, 0.35, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.07, ease: EASE },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.2, ease: EASE },
  },
};

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const lineReveal: Variants = {
  hidden: { y: '110%' },
  visible: (i: number = 0) => ({
    y: '0%',
    transition: { duration: 1, delay: 0.05 + i * 0.06, ease: EASE },
  }),
};

export const scaleFade: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: EASE },
  },
};
