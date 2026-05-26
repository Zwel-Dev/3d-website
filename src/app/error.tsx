'use client';

import { useEffect } from 'react';
import Link from 'next/link';

// App Router runtime-error boundary. Must be a client component because it
// receives the error + reset function from React's error boundary system.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Caught by app error boundary:', error);
  }, [error]);

  return (
    <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden pb-16 pt-32 md:pt-40">
      {/* Atmospheric tinted red — system-fault palette */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[22%] top-[30%] h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(248,113,113,0.16),transparent)] blur-3xl" />
        <div className="absolute bottom-[26%] right-[20%] h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgba(243,217,177,0.10),transparent)] blur-3xl" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/40 via-transparent to-ink-950/60"
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center md:px-12">
        <div className="mb-10 flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.5em] text-ink-400">
          <span className="h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.8)]" />
          <span className="h-px w-12 bg-red-400/50" />
          System fault
          <span className="h-px w-12 bg-red-400/50" />
        </div>

        <h1 className="font-display text-4xl italic leading-tight md:text-6xl lg:text-7xl">
          <span className="text-gradient">Telemetry </span>
          <span className="text-gradient-accent">interrupted.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-ink-300 md:text-lg">
          Something failed on our end — the signal cut out before the page
          could finish drawing. Hit re-establish and we&apos;ll try again.
        </p>

        {/* In dev, surface the actual error so you can fix it.
            In prod, this block stays hidden and visitors see the friendly copy. */}
        {process.env.NODE_ENV === 'development' && (
          <pre className="mx-auto mt-6 max-w-xl overflow-x-auto rounded-xl border border-red-400/25 bg-red-950/30 p-4 text-left font-mono text-[11px] leading-relaxed text-red-200">
            {error.message}
            {error.digest && (
              <>
                {'\n\n'}
                <span className="text-red-400/70">digest: {error.digest}</span>
              </>
            )}
          </pre>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            data-hover
            className="group inline-flex items-center gap-2 rounded-full bg-ink-50 px-7 py-3 text-sm font-medium uppercase tracking-[0.2em] text-ink-950 shadow-[0_10px_40px_-10px_rgba(243,217,177,0.45)] transition-colors duration-500 hover:bg-accent-glow"
          >
            Re-establish link
            <span
              aria-hidden
              className="transition-transform duration-500 ease-out group-hover:rotate-180"
            >
              ↻
            </span>
          </button>
          <Link
            href="/"
            data-hover
            className="inline-flex items-center gap-2 rounded-full border border-ink-700/80 bg-ink-900/30 px-7 py-3 text-sm font-medium uppercase tracking-[0.2em] text-ink-100 backdrop-blur transition-colors duration-500 hover:border-accent-glow/60 hover:text-accent-glow"
          >
            Return home
          </Link>
        </div>
      </div>
    </section>
  );
}
