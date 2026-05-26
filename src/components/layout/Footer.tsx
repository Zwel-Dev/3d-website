import { socials } from '@/lib/data';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-white/5 bg-ink-950/80 px-6 py-10 md:px-12 md:py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink-400">
            © {year} — Zwe Thuta
          </span>
          <span className="max-w-xs text-sm text-ink-300 md:max-w-none">
            Designed &amp; engineered with care. Built in Yangon · Available worldwide.
          </span>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2 md:gap-6">
          {socials.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="group relative text-xs uppercase tracking-[0.3em] text-ink-300 transition-colors hover:text-accent-glow"
            >
              {s.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent-glow transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
