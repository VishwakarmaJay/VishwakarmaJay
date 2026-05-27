import { useTypingEffect } from '../hooks/useTypingEffect'

export default function Hero() {
  const typingText = useTypingEffect()

  return (
    <div
      id="hero"
      className="min-h-screen flex flex-col justify-center px-6 pt-[100px] pb-[60px] max-w-[1100px] mx-auto relative"
    >
      {/* Phone mockup decoration */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block opacity-[0.07] pointer-events-none select-none"
        aria-hidden="true"
      >
        <svg width="180" height="340" viewBox="0 0 180 340" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="172" height="332" rx="28" stroke="#00d4ff" strokeWidth="2"/>
          <rect x="14" y="14" width="152" height="312" rx="20" stroke="#00d4ff" strokeWidth="1" strokeDasharray="4 4"/>
          <circle cx="90" cy="30" r="5" stroke="#00d4ff" strokeWidth="1.5"/>
          <rect x="30" y="60" width="120" height="8" rx="4" fill="#00d4ff"/>
          <rect x="30" y="80" width="80" height="6" rx="3" fill="#00d4ff" opacity="0.5"/>
          <rect x="30" y="106" width="120" height="60" rx="8" stroke="#00d4ff" strokeWidth="1"/>
          <rect x="30" y="180" width="55" height="55" rx="8" stroke="#00d4ff" strokeWidth="1"/>
          <rect x="95" y="180" width="55" height="55" rx="8" stroke="#00d4ff" strokeWidth="1"/>
          <rect x="30" y="248" width="120" height="8" rx="4" fill="#00d4ff" opacity="0.3"/>
          <rect x="30" y="264" width="90" height="6" rx="3" fill="#00d4ff" opacity="0.2"/>
          <circle cx="90" cy="310" r="10" stroke="#00d4ff" strokeWidth="1.5"/>
        </svg>
      </div>

      <p
        className="font-mono text-xs text-accent tracking-[3px] uppercase mb-5 opacity-0 animate-fadeUp"
        style={{ animationDelay: '0.2s' }}
      >
        hey, I build mobile apps 📱
      </p>

      <h1
        className="text-[clamp(52px,11vw,120px)] font-black leading-[0.9] tracking-[-3px] mb-4 opacity-0 animate-fadeUp"
        style={{ animationDelay: '0.35s' }}
      >
        Jay{' '}
        <span
          className="text-accent"
          style={{ textShadow: '0 0 40px rgba(0,212,255,0.4)' }}
        >
          Vishwakarma.
        </span>
      </h1>

      <p
        className="font-mono text-[clamp(14px,2.5vw,20px)] text-muted mb-8 opacity-0 animate-fadeUp"
        style={{ animationDelay: '0.5s' }}
      >
        <span className="text-accent2">{typingText}</span>
        <span className="text-muted animate-pulse">▊</span>
        <span className="text-muted"> — on Play Store & App Store</span>
      </p>

      <p
        className="max-w-[580px] text-[clamp(15px,1.8vw,18px)] leading-[1.7] text-[#8899aa] mb-12 opacity-0 animate-fadeUp"
        style={{ animationDelay: '0.65s' }}
      >
        I craft{' '}
        <strong className="text-text">production-ready Flutter apps</strong> for
        enterprise & FinTech. Currently at{' '}
        <span className="highlight-box">BlackCurrant Labs</span>, Mumbai —
        shipping real apps used by real people.{' '}
        <span className="text-accent">Clean arch</span>, offline-first, OTA
        updates. No prototype energy here.
      </p>

      <div
        className="flex gap-4 flex-wrap opacity-0 animate-fadeUp"
        style={{ animationDelay: '0.8s' }}
      >
        <a href="#projects" className="btn btn-primary">
          see my apps →
        </a>
        <a
          href="https://github.com/vishwakarmajay"
          target="_blank"
          rel="noreferrer"
          className="btn btn-ghost"
        >
          github ↗
        </a>
      </div>

      <div
        className="flex gap-5 mt-14 opacity-0 animate-fadeUp flex-wrap"
        style={{ animationDelay: '1s' }}
      >
        {[
          { label: 'LINKEDIN', href: 'https://linkedin.com/in/jayvishwakarma1206' },
          { label: 'GITHUB', href: 'https://github.com/vishwakarmajay' },
          { label: 'EMAIL', href: 'mailto:vishwakarmajay292@gmail.com' },
          { label: 'MUMBAI', href: '#contact' },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
            className="font-mono text-[11px] text-muted no-underline border-b border-transparent transition-colors duration-200 pb-0.5 tracking-[2px] hover:text-accent hover:border-accent"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}