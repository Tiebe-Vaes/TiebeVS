export const locales = ["nl", "en"] as const
export type Locale = (typeof locales)[number]

export type Localized = Record<Locale, string>

export type ProjectStatus = "shipped" | "in-development"

export type ProjectKind = "web" | "mobile" | "other"

export type Project = {
  /** Stable catalogue number, also the keyboard shortcut (1 to 9). */
  artNo: string
  slug: string
  name: string
  kind: ProjectKind
  category: Localized
  status: ProjectStatus
  years?: string
  team?: Localized
  summary: Localized
  details: Localized
  /** Tiebe's own part, shown on team projects. */
  role?: Localized
  tech: string[]
  /** Screenshots in /public. Without them the catalogue shows the project's technical drawing. */
  images?: string[]
  repoUrl?: string
  liveUrl?: string
}
