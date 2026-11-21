export const locales = ["nl", "en"] as const
export type Locale = (typeof locales)[number]

export type Localized = Record<Locale, string>

export type ProjectKind = "web" | "mobile" | "other"

/** Figures from @lucasmarkes/hairline that the site uses. */
export type LibraryFigure =
  | "Drawer"
  | "Sieve"
  | "Plot"
  | "Riffle"
  | "Turntable"

/** Figures drawn for this site in the hairline style (components/site/figures). */
export type OwnFigure = "StartGate" | "Teapot"

/** Every line figure on the site: one per project. */
export type FigureName = LibraryFigure | OwnFigure

export type Project = {
  /** Stable catalogue number, also the keyboard shortcut (1 to 9, 0 for 10). */
  artNo: string
  slug: string
  name: string
  /** Shown large above the other projects (Tiebe's pick, 2026-11-20). */
  featured?: boolean
  kind: ProjectKind
  category: Localized
  years?: string
  team?: Localized
  summary: Localized
  details: Localized
  /** Tiebe's own part, shown on team projects. */
  role?: Localized
  tech: string[]
  /** Line figure shown on the card and first in the spec sheet. */
  figure: FigureName
  /** How the spec sheet presents the screenshots. Defaults: mobile projects in a phone, the rest in a laptop. */
  frame?: "laptop" | "phone" | "sheet"
  /** Screenshots in /public, shown below the figure in the spec sheet. A .mp4 plays as a clip, with the same-named .webp as poster. */
  images?: string[]
  repoUrl?: string
  liveUrl?: string
  /** Attribution shown under the images, e.g. for licensed music in a clip. */
  credit?: Localized
  /** A playable build served from /public, opened in a new tab. */
  demoUrl?: string
}
