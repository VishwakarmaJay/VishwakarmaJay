import { useScrollReveal } from '../hooks/useScrollReveal'
import type { Experience as ExperienceType } from '../types'

const experiences: ExperienceType[] = [
  {
    company: 'BLACKCURRANT LABS',
    period: 'Jan 2025 — Present',
    stack: 'Flutter · Dart\nRiverpod · AutoRoute\nDio · Shorebird\nOpenAPI · Firebase',
    title: 'Flutter Developer',
    location: 'Malad, Mumbai',
    description:
      'Building and maintaining production-grade cross-platform mobile applications for enterprise and FinTech clients. Shipped to both Google Play Store and Apple App Store.',
    bullets: [
      'Designed & maintained Flutter apps using clean architecture and modular code practices',
      'Riverpod state management for scalable feature development and improved testability',
      'Automated REST API integration via OpenAPI (Swagger) — type-safe models, zero manual errors',
      'Complex navigation with nested routing + AutoRoute for multi-role user flows',
      'Centralized networking via Dio: error handling, interceptors, token-based auth',
      'Offline-first functionality with local persistence and sync for low-connectivity environments',
      'Shorebird OTA updates — instant bug fixes & feature rollouts, no App Store wait',
    ],
  },
]

function ExpItem({ exp }: { exp: ExperienceType }) {
  const ref = useScrollReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className="reveal grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 mb-14 pb-14 border-b border-border last:border-b-0"
    >
      <div className="font-mono text-xs text-muted">
        <div
          className="text-accent mb-1.5 text-[13px] font-semibold"
          style={{ textShadow: '0 0 20px rgba(0,212,255,0.3)' }}
        >
          {exp.company}
        </div>
        <div className="text-[#556677] mb-2">{exp.location}</div>
        <div className="leading-[1.8] whitespace-pre-line text-[#445566]">
          {exp.period}
          {'\n\n'}
          {exp.stack}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
        <span
          className="font-mono text-[11px] px-2.5 py-[3px] rounded-sm inline-block mb-4 text-accent border border-accent"
          style={{ background: 'rgba(0,212,255,0.06)' }}
        >
          currently here
        </span>
        <p className="text-[15px] text-[#8899aa] leading-[1.7] mb-4">{exp.description}</p>
        <ul className="list-none p-0">
          {exp.bullets.map((bullet, bi) => (
            <li
              key={bi}
              className="text-sm text-[#667788] py-1.5 border-b border-[rgba(255,255,255,0.04)] pl-5 relative"
            >
              <span className="absolute left-0 text-accent font-mono text-xs">→</span>
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="max-w-[1100px] mx-auto px-6 py-[100px] border-t border-border"
    >
      <div className="section-label">02 — EXPERIENCE</div>
      {experiences.map((exp, i) => (
        <ExpItem key={i} exp={exp} />
      ))}
    </section>
  )
}