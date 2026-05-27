import { useScrollReveal } from '../hooks/useScrollReveal'
import { useVisitorCounter } from '../hooks/useVisitorCounter'

const skills = [
  { label: 'Flutter', color: '' },
  { label: 'Dart', color: '' },
  { label: 'Riverpod', color: '' },
  { label: 'Provider', color: '' },
  { label: 'Clean Arch', color: '' },
  { label: 'MVVM', color: '' },
  { label: 'AutoRoute', color: '' },
  { label: 'Dio', color: '' },
  { label: 'Shorebird', color: '' },
  { label: 'OpenAPI', color: '' },
  { label: 'Angular', color: 'purple' },
  { label: 'TypeScript', color: 'purple' },
  { label: 'Express.js', color: 'purple' },
  { label: 'Spring Boot', color: 'purple' },
  { label: 'PostgreSQL', color: 'green' },
  { label: 'MongoDB', color: 'green' },
  { label: 'MySQL', color: 'green' },
  { label: 'Firebase', color: '' },
  { label: 'Docker', color: '' },
  { label: 'Git / GitHub', color: '' },
]

const facts = [
  { icon: '📍', label: 'Based in', value: 'Mumbai, India' },
  { icon: '🎓', label: 'B.Tech IT — Thakur College of Engineering', value: '8.8 CGPA' },
  { icon: '📱', label: 'Apps on', value: 'Play Store & App Store' },
  { icon: '⚙️', label: 'Obsessed with', value: 'Clean Architecture & offline-first UX' },
  { icon: '🔄', label: 'OTA updates via', value: 'Shorebird — no App Store wait' },
  { icon: '🕵️', label: 'Secret', value: 'try ↑↑↓↓←→←→BA on this page...' },
]

export default function About() {
  const textRef = useScrollReveal<HTMLDivElement>()
  const sideRef = useScrollReveal<HTMLDivElement>()
  const visits = useVisitorCounter()

  return (
    <section id="about" className="max-w-[1100px] mx-auto px-6 py-[100px]">
      <div className="section-label">01 — ABOUT</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] items-start">
        <div ref={textRef} className="reveal">
          <p className="text-[17px] leading-[1.8] text-[#8899aa] mb-6">
            I'm a <strong className="text-text">Flutter Developer</strong> at BlackCurrant Labs,
            building production-grade cross-platform mobile apps for enterprise and FinTech clients.
            I obsess over{' '}
            <span className="text-accent">architecture that scales</span> — clean layers,
            modular code, apps that don't break when the WiFi does.
          </p>
          <p className="text-[17px] leading-[1.8] text-[#8899aa] mb-6">
            Right now I'm working on{' '}
            <strong className="text-text">Hedged</strong> (FinTech trading signals on Play &
            App Store) and{' '}
            <strong className="text-text">Stulz Service Automation</strong> — an
            offline-first enterprise field app for HVAC technicians. Both live. Both
            used by real people. Both with enough Riverpod to give me opinions at
            dinner parties.
          </p>
          <p className="text-[17px] leading-[1.8] text-[#8899aa] mb-6">
            I also do backend (Express, Spring Boot) and frontend (Angular) when the
            project needs it. The full picture matters. When I'm not shipping code, I'm
            thinking about how to make apps feel <span className="text-accent2">instant</span> — even offline.
          </p>

          <div className="mt-8">
            <div className="section-label" style={{ fontSize: '10px', marginBottom: '16px' }}>
              SKILLS
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.label}
                  className={`skill-tag ${skill.color}`}
                >
                  {skill.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div ref={sideRef} className="reveal flex flex-col gap-4">
          <div className="bg-surface border border-border rounded-sm p-7">
            <h3 className="font-mono text-xs text-accent tracking-[3px] mb-5 uppercase">
              // profile.json
            </h3>
            {facts.map((fact, i) => (
              <div key={i} className="flex gap-3 mb-4 text-sm leading-[1.5]">
                <span className="text-lg shrink-0">{fact.icon}</span>
                <div>
                  <strong className="text-muted font-mono text-[11px] block uppercase tracking-wider">
                    {fact.label}
                  </strong>
                  <span className="text-text text-[14px]">{fact.value}</span>
                </div>
              </div>
            ))}
          </div>

          <div
            className="bg-surface border border-border rounded-sm p-7 text-center"
            style={{ boxShadow: 'inset 0 0 40px rgba(0,212,255,0.03)' }}
          >
            <div
              className="font-mono text-[clamp(40px,10vw,80px)] font-bold text-accent leading-none"
              style={{ textShadow: '0 0 40px rgba(0,212,255,0.4)' }}
            >
              {visits > 0 ? visits.toLocaleString() : '—'}
            </div>
            <div className="font-mono text-xs text-muted tracking-[3px] mt-2">
              VISITORS SO FAR
              <br />
              <span className="text-accent2">GLAD YOU'RE HERE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}