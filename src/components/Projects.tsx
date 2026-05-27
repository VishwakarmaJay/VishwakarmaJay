import { useScrollReveal } from '../hooks/useScrollReveal'
import type { Project } from '../types'

const projectList: Project[] = [
  {
    title: 'Stulz Service Automation',
    emoji: '🛠️',
    description:
      'Offline-first enterprise field service app for HVAC technicians. Manage tickets, daily service reports with digital signatures, inventory/spares, geolocation tracking, and role-based access — all while offline. Syncs when connectivity returns.',
    tags: ['Flutter', 'Dart', 'Drift/SQLite', 'Riverpod', 'Dio', 'Express', 'Angular', 'SQL', 'Google APIs', 'Firebase'],
    playStoreUrl: 'https://play.google.com/store',
  },
  {
    title: 'Hedged',
    emoji: '📈',
    description:
      'High-performance FinTech app for retail investors. Real-time trading signals, live P&L tracking, one-click trade execution via Kotak, Groww & Upstox APIs, interactive dashboards, and rich media educational content.',
    tags: ['Flutter', 'Dart', 'Riverpod', 'AutoRoute', 'Dio', 'Shorebird', 'Firebase', 'Express', 'SQL'],
    playStoreUrl: 'https://play.google.com/store',
    appStoreUrl: 'https://apps.apple.com',
  },
]

function ProjectCard({ project }: { project: Project }) {
  const ref = useScrollReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className="reveal card-glow bg-surface border border-border rounded-sm p-7 transition-all duration-300 relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,212,255,0.03)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Store badges */}
      <div className="flex gap-2 mb-4 relative z-10">
        {project.playStoreUrl && (
          <span className="font-mono text-[9px] px-2 py-[3px] rounded-sm bg-[rgba(16,185,129,0.1)] text-accent4 border border-[rgba(16,185,129,0.2)]">
            ▶ PLAY STORE
          </span>
        )}
        {project.appStoreUrl && (
          <span className="font-mono text-[9px] px-2 py-[3px] rounded-sm bg-[rgba(0,212,255,0.08)] text-accent border border-[rgba(0,212,255,0.15)]">
            ◆ APP STORE
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold mb-2 relative z-10">
        {project.title} {project.emoji}
      </h3>
      <p className="text-[13px] text-[#667788] leading-[1.7] mb-5 relative z-10">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-5 relative z-10">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] px-2 py-[3px] rounded-sm bg-[rgba(255,255,255,0.03)] text-muted border border-border"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-4 relative z-10">
        {project.playStoreUrl && (
          <a
            href={project.playStoreUrl}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[11px] text-accent4 no-underline border-b border-transparent pb-px transition-colors duration-200 hover:border-accent4"
          >
            play store ↗
          </a>
        )}
        {project.appStoreUrl && (
          <a
            href={project.appStoreUrl}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[11px] text-accent no-underline border-b border-transparent pb-px transition-colors duration-200 hover:border-accent"
          >
            app store ↗
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[11px] text-muted no-underline border-b border-transparent pb-px transition-colors duration-200 hover:text-accent hover:border-accent"
          >
            github ↗
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[11px] text-muted no-underline border-b border-transparent pb-px transition-colors duration-200 hover:text-accent2 hover:border-accent2"
          >
            live ↗
          </a>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  const introRef = useScrollReveal<HTMLParagraphElement>()

  return (
    <section
      id="projects"
      className="max-w-[1100px] mx-auto px-6 py-[100px] border-t border-border"
    >
      <div className="section-label">03 — PROJECTS</div>
      <p ref={introRef} className="reveal text-[#667788] text-[15px] mb-10 max-w-[500px]">
        apps shipped to production. live. on real stores. used by real people.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projectList.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  )
}