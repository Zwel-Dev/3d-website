import { socials } from '@/lib/data';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-white/5 bg-ink-950/80 px-6 py-12 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink-400">
            © {year} — Zwe Thuta
          </span>
          <span className="text-sm text-ink-300">
            Designed & engineered with care. Built in Yangon · Available worldwide.
          </span>
        </div>

        <div className="flex flex-wrap gap-6">
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
