'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useMagnetic } from '@/hooks/useMagnetic';

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'ghost';
  strength?: number;
  ariaLabel?: string;
}

export function MagneticButton({
  children,
  href,
  onClick,
  className,
  variant = 'primary',
  strength = 0.3,
  ariaLabel,
}: Props) {
  const wrapperRef = useMagnetic<HTMLDivElement>({ strength, damping: 0.18, radius: 120 });
  const contentRef = useMagnetic<HTMLSpanElement>({
    strength: strength * 0.45,
    damping: 0.22,
    radius: 120,
  });

  const base =
    'relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3 text-sm font-medium uppercase tracking-[0.2em] transition-colors duration-500';
  const variants = {
    primary:
      'bg-ink-50 text-ink-950 hover:bg-accent-glow hover:text-ink-950 shadow-[0_10px_40px_-10px_rgba(243,217,177,0.45)]',
    ghost:
      'border border-ink-700/80 text-ink-100 hover:border-accent-glow/60 hover:text-accent-glow bg-ink-900/30 backdrop-blur',
  } as const;

  const inner = (
    <>
      <span ref={contentRef} className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 translate-y-full bg-gradient-to-b from-accent to-accent-muted transition-transform duration-700 ease-out group-hover:translate-y-0"
      />
    </>
  );

  return (
    <div ref={wrapperRef} className={cn('inline-block will-change-transform', className)}>
      {href ? (
        <a
          href={href}
          aria-label={ariaLabel}
          data-hover
          className={cn('group', base, variants[variant])}
        >
          {inner}
        </a>
      ) : (
        <button
          type="button"
          onClick={onClick}
          aria-label={ariaLabel}
          data-hover
          className={cn('group', base, variants[variant])}
        >
          {inner}
        </button>
      )}
    </div>
  );
}
