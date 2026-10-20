import {
  siAndroid,
  siAngular,
  siClaude,
  siClaudecode,
  siCss,
  siDart,
  siDocker,
  siDotnet,
  siDrizzle,
  siElectron,
  siExpo,
  siExpress,
  siFirebase,
  siFlutter,
  siGit,
  siGithub,
  siGithubactions,
  siGitlab,
  siGooglegemini,
  siGooglemaps,
  siHibernate,
  siHtml5,
  siJavascript,
  siJenkins,
  siJetpackcompose,
  siJest,
  siJunit5,
  siKotlin,
  siLinux,
  siMongodb,
  siMonogame,
  siMui,
  siMysql,
  siNestjs,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siPython,
  siRabbitmq,
  siRadixui,
  siReact,
  siRedis,
  siShadcnui,
  siSpotify,
  siSpringboot,
  siSpringsecurity,
  siTailwindcss,
  siTanstack,
  siTestinglibrary,
  siTraefikproxy,
  siTypescript,
  siVercel,
  siVitest,
  type SimpleIcon,
} from "simple-icons"
import { BracesIcon, DatabaseIcon, FlaskConicalIcon, HashIcon, PlugZapIcon, WaypointsIcon, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const ICONS: Record<string, SimpleIcon> = {
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  Java: siOpenjdk,
  ".NET": siDotnet,
  Dart: siDart,
  MySQL: siMysql,
  HTML: siHtml5,
  CSS: siCss,
  React: siReact,
  "React Native": siReact,
  "Next.js": siNextdotjs,
  Angular: siAngular,
  "Tailwind CSS": siTailwindcss,
  "shadcn/ui": siShadcnui,
  Expo: siExpo,
  Flutter: siFlutter,
  "Spring Boot": siSpringboot,
  "Node.js": siNodedotjs,
  Express: siExpress,
  PostgreSQL: siPostgresql,
  Firebase: siFirebase,
  Docker: siDocker,
  Traefik: siTraefikproxy,
  Git: siGit,
  GitHub: siGithub,
  GitLab: siGitlab,
  "GitLab CI": siGitlab,
  MUI: siMui,
  Vercel: siVercel,
  "JUnit 5": siJunit5,
  Jest: siJest,
  Vitest: siVitest,
  Drizzle: siDrizzle,
  "Google Maps": siGooglemaps,
  Electron: siElectron,
  "Radix UI": siRadixui,
  Gemini: siGooglegemini,
  "TanStack Start": siTanstack,
  MonoGame: siMonogame,
  Kotlin: siKotlin,
  Python: siPython,
  "Jetpack Compose": siJetpackcompose,
  Android: siAndroid,
  "Spring Security": siSpringsecurity,
  Hibernate: siHibernate,
  NestJS: siNestjs,
  "ASP.NET Core": siDotnet,
  MongoDB: siMongodb,
  Redis: siRedis,
  RabbitMQ: siRabbitmq,
  "Docker Swarm": siDocker,
  Nginx: siNginx,
  Linux: siLinux,
  "GitHub Actions": siGithubactions,
  Jenkins: siJenkins,
  "React Testing Library": siTestinglibrary,
  "Claude Skills": siClaude,
  "Claude Code plugin": siClaudecode,
  "Spotify connector": siSpotify,
}

// No brand mark in simple-icons (C#, SQL Server, Mockito, ...): a plain glyph for what it is.
const GLYPHS: Record<string, LucideIcon> = {
  "C#": HashIcon,
  SQL: DatabaseIcon,
  "Microsoft SQL Server": DatabaseIcon,
  Mockito: FlaskConicalIcon,
  WebSocket: PlugZapIcon,
  Riverpod: WaypointsIcon,
}

export function techIconPath(name: string) {
  return ICONS[name]?.path
}

/** Brand mark when simple-icons has the right one; otherwise a plain glyph, never a stand-in brand. */
export function TechIcon({ name, className }: { name: string; className?: string }) {
  const icon = ICONS[name]
  if (!icon) {
    const Glyph = GLYPHS[name] ?? BracesIcon
    return <Glyph aria-hidden="true" className={cn("size-3.5 shrink-0", className)} />
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-3.5 shrink-0 fill-current", className)}>
      <path d={icon.path} />
    </svg>
  )
}

/** LinkedIn is no longer in simple-icons; authored mark. */
export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-4 shrink-0 fill-current", className)}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}
