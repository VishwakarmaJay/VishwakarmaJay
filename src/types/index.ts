export interface Project {
  title: string
  emoji: string
  description: string
  tags: string[]
  playStoreUrl?: string
  appStoreUrl?: string
  githubUrl?: string
  liveUrl?: string
}

export interface Experience {
  company: string
  period: string
  stack: string
  title: string
  location: string
  description: string
  bullets: string[]
}

export interface ContactLink {
  icon: string
  label: string
  value: string
  href: string
  external?: boolean
}