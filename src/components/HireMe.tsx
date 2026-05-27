import { useScrollReveal } from '../hooks/useScrollReveal'

export default function HireMe() {
  const ref = useScrollReveal<HTMLDivElement>()

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/Jay_Resume.pdf'
    link.download = 'Jay_Vishwakarma_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className="max-w-[1100px] mx-auto px-6 py-[80px]">
      <div
        ref={ref}
        className="reveal bg-surface border border-border rounded-sm p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
        style={{ boxShadow: '0 0 60px rgba(0,212,255,0.04)' }}
      >
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)' }} />

        <div className="relative z-10 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            wanna{' '}
            <span
              className="text-accent"
              style={{ textShadow: '0 0 20px rgba(0,212,255,0.4)' }}
            >
              hire me?
            </span>
          </h2>
          <p className="text-muted text-sm leading-relaxed max-w-md">
            I'm a{' '}
            <strong className="text-accent">Flutter & Full Stack Developer</strong>{' '}
            open to full-time roles, contract work, and interesting projects.
            1.5+ years production experience. Apps already live on both stores.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row gap-4">
          <button onClick={handleDownload} className="btn btn-primary">
            <span>📄</span> download resume
          </button>
          <a
            href="mailto:vishwakarmajay292@gmail.com?subject=Job Opportunity"
            className="btn btn-ghost"
          >
            <span>✉️</span> let's talk
          </a>
        </div>
      </div>
    </section>
  )
}