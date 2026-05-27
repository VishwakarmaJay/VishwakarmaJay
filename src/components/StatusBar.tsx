import { useVisitorCounter } from '../hooks/useVisitorCounter'

export default function StatusBar() {
  const visits = useVisitorCounter()

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-6 py-3 border-b border-border bg-[rgba(8,12,20,0.85)] backdrop-blur-[12px] font-mono text-[11px] text-muted">
      <div className="hidden md:flex gap-6 items-center">
        <span className="text-accent font-medium tracking-widest">JRV.DEV</span>
        <span className="opacity-40">|</span>
        <span>
          👁 visitor #
          <span className="text-accent font-bold">
            {visits > 0 ? visits.toLocaleString() : '—'}
          </span>
        </span>
        <span className="opacity-40 hidden lg:inline">shipping apps to play store & app store</span>
      </div>
      <nav className="flex gap-5">
        {['about', 'experience', 'projects', 'contact'].map((s) => (
          <a
            key={s}
            href={`#${s}`}
            className="text-muted no-underline transition-colors duration-200 hover:text-accent tracking-widest uppercase text-[10px]"
          >
            {s}
          </a>
        ))}
      </nav>
    </div>
  )
}