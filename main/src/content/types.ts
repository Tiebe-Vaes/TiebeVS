export const locales = ["nl", "en"] as const
export type Locale = (typeof locales)[number]

export type Localized = Record<Locale, string>

export type ProjectKind = "web" | "mobile" | "other"

/** Figures from @lucasmarkes/hairline that the site uses. */
export type LibraryFigure =
  | "Terminal"
  | "Hub"
  | "Stack"
  | "Rebuild"
  | "Settle"
  | "Loupe"
  | "Format"
  | "Drawer"
  | "Sieve"
  | "Exploded"
  | "Phosphor"
  | "Plot"
  | "Basket"
  | "Laptop"
  | "Phone"
  | "Lockers"

/** Figures drawn for this site in the hairline style (components/site/figures). */
export type OwnFigure = "StartGate" | "Teapot" | "FlipClock" | "Kart"

/** Every line figure on the site: one per project and one per "Werkwijze" card. */
export type FigureName = LibraryFigure | OwnFigure

export type Project = {
  /** Stable catalogue number, also the keyboard shortcut (1 to 9). */
  artNo: string
  slug: string
  name: string
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
  /** Screenshots in /public, shown below the figure in the spec sheet. */
  images?: string[]
  repoUrl?: string
  liveUrl?: string
}
