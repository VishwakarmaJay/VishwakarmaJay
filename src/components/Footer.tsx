import { useVisitorCounter } from '../hooks/useVisitorCounter'

export default function Footer() {
  const visits = useVisitorCounter()

  return (
    <footer className="border-t border-border px-6 py-7 flex justify-between items-center font-mono text-[11px] text-muted flex-wrap gap-3">
      <span>jay vishwakarma © 2025 — built with flutter energy & chai</span>
      <span>
        visitor #
        <span className="text-accent">
          {visits > 0 ? visits.toLocaleString() : '—'}
        </span>{' '}
        | thanks for stopping by
      </span>
      <a
        href="https://linkedin.com/in/jayvishwakarma1206"
        target="_blank"
        rel="noreferrer"
        className="text-muted no-underline hover:text-accent transition-colors"
      >
        linkedin ↗
      </a>
    </footer>
  )
}