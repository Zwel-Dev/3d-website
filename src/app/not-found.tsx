import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Signal lost · 404',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[90svh] w-full items-center overflow-hidden pb-16 pt-32 md:pt-30">
      {/* Atmospheric orbs — match the rest of the site without re-launching a Canvas */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[18%] top-[28%] h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(243,217,177,0.15),transparent)] blur-3xl" />
        <div className="absolute bottom-[22%] right-[18%] h-96 w-96 translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(91,141,239,0.12),transparent)] blur-3xl" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      {/* Left-side darkening for legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/40 via-transparent to-ink-950/60"
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 md:px-12">
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow */}
          <div className="mb-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.5em] text-ink-400">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.8)]" />
            <span className="h-px w-12 bg-red-400/50" />
            Chapter ∞ — Signal Lost
            <span className="h-px w-12 bg-red-400/50" />
          </div>

          {/* The 404 */}
          <h1 className="font-display italic leading-[0.9] tracking-[-0.04em] text-[clamp(7rem,22vw,18rem)]">
            <span className="text-gradient">4</span>
            <span className="text-gradient-accent">0</span>
            <span className="text-gradient">4</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-xl font-display text-2xl italic leading-tight text-ink-100 md:text-3xl">
            <span className="text-gradient-accent">No signal</span>{' '}
            <span className="text-gradient">at this frequency.</span>
          </p>

          {/* Body */}
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink-300">
            The page you&apos;re looking for has drifted off-map — maybe it&apos;s
            gone, maybe the link decayed, maybe a character got typed wrong on
            the way in.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              data-hover
              className="group inline-flex items-center gap-2 rounded-full bg-ink-50 px-7 py-3 text-sm font-medium uppercase tracking-[0.2em] text-ink-950 shadow-[0_10px_40px_-10px_rgba(243,217,177,0.45)] transition-colors duration-500 hover:bg-accent-glow"
            >
              Return home
              <span
                aria-hidden
                className="transition-transform duration-500 ease-out group-hover:translate-x-1"
              >
                ↗
              </span>
            </Link>
            <Link
              href="/#work"
              data-hover
              className="inline-flex items-center gap-2 rounded-full border border-ink-700/80 bg-ink-900/30 px-7 py-3 text-sm font-medium uppercase tracking-[0.2em] text-ink-100 backdrop-blur transition-colors duration-500 hover:border-accent-glow/60 hover:text-accent-glow"
            >
              Selected work
            </Link>
          </div>

          {/* Telemetry — mission-control readout */}
          {/* <div className="mt-16 inline-block rounded-2xl border border-white/10 bg-ink-900/60 px-7 py-5 text-left backdrop-blur-md">
            <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.4em] text-ink-400">
              <span className="block h-1.5 w-1.5 rounded-full bg-red-400/80 shadow-[0_0_8px_rgba(248,113,113,0.7)]" />
              Telemetry
            </div>
            <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-[0.28em]">
              <dt className="text-ink-500">Status</dt>
              <dd className="text-red-300">Link severed</dd>
              <dt className="text-ink-500">Frequency</dt>
              <dd className="text-ink-200">2.4 GHz · faint</dd>
              <dt className="text-ink-500">Origin</dt>
              <dd className="text-ink-200">zwethutaminthein.com</dd>
              <dt className="text-ink-500">Recovery</dt>
              <dd className="text-emerald-300">Re-route via /</dd>
            </dl>
          </div> */}
        </div>
      </div>
    </section>
  );
}
