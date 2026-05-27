import { useScrollReveal } from '../hooks/useScrollReveal'
import type { ContactLink } from '../types'

const links: ContactLink[] = [
  {
    icon: '📧',
    label: 'EMAIL',
    value: 'vishwakarmajay292@gmail.com',
    href: 'mailto:vishwakarmajay292@gmail.com',
  },
  {
    icon: '💼',
    label: 'LINKEDIN',
    value: '/in/jayvishwakarma1206',
    href: 'https://linkedin.com/in/jayvishwakarma1206',
    external: true,
  },
  {
    icon: '📞',
    label: 'PHONE',
    value: '+91 9372454445',
    href: 'tel:+919372454445',
  },
  {
    icon: '📍',
    label: 'LOCATION',
    value: 'Mumbai, India',
    href: '#',
  },
]

export default function Contact() {
  const headingRef = useScrollReveal<HTMLDivElement>()
  const linksRef = useScrollReveal<HTMLDivElement>()

  return (
    <section
      id="contact"
      className="max-w-[1100px] mx-auto px-6 py-[100px] border-t border-border"
    >
      <div className="section-label">04 — CONTACT</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] items-center">
        <div ref={headingRef} className="reveal">
          <h2 className="text-[clamp(32px,6vw,64px)] font-extrabold leading-[1.1]">
            let's build something{' '}
            <span
              className="text-accent"
              style={{ textShadow: '0 0 30px rgba(0,212,255,0.4)' }}
            >
              that ships.
            </span>
          </h2>
          <p className="text-[#667788] text-[15px] mt-5 leading-[1.7]">
            Open to Flutter roles, mobile consulting, and interesting problems. If you
            have an app idea that needs clean architecture and a developer who's already
            navigated Play Store + App Store review cycles — that's me.
          </p>
        </div>
        <div ref={linksRef} className="reveal flex flex-col gap-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noreferrer' : undefined}
              className="flex items-center gap-4 no-underline text-text px-5 py-4 border border-border rounded-sm transition-all duration-200 text-sm hover:border-accent"
              style={{
                background: 'rgba(13,18,32,0.8)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 20px rgba(0,212,255,0.1)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = ''
              }}
            >
              <span className="text-xl w-8 shrink-0">{link.icon}</span>
              <div>
                <span className="font-mono text-[10px] text-muted block tracking-widest">
                  {link.label}
                </span>
                <span className="text-[15px] text-text">{link.value}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}