'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'ghost';
  ariaLabel?: string;
}

export function MagneticButton({
  children,
  href,
  onClick,
  className,
  variant = 'primary',
  ariaLabel,
}: Props) {
  const base =
    'group relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3 text-sm font-medium uppercase tracking-[0.2em] transition-colors duration-500';
  const variants = {
    primary:
      'bg-ink-50 text-ink-950 hover:bg-accent-glow hover:text-ink-950 shadow-[0_10px_40px_-10px_rgba(243,217,177,0.45)]',
    ghost:
      'border border-ink-700/80 text-ink-100 hover:border-accent-glow/60 hover:text-accent-glow bg-ink-900/30 backdrop-blur',
  } as const;

  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 translate-y-full bg-gradient-to-b from-accent to-accent-muted transition-transform duration-700 ease-out group-hover:translate-y-0"
      />
    </>
  );

  const sharedClass = cn(base, variants[variant], className);

  if (href) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        data-hover
        className={sharedClass}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      data-hover
      className={sharedClass}
    >
      {inner}
    </button>
  );
}
