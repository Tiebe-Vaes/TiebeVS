import type { Localized } from "./types"

/** hairline figures used by the ranking; one per entry. */
export type FigureName = "Terminal" | "Hub" | "Stack" | "Rebuild" | "Settle" | "Exploded" | "Format"

export type PlayingItem = {
  name: string
  kind: Localized
  blurb: Localized
  links: { label: string; href: string }[]
  figure: FigureName
}

const agentSkills: Localized = { nl: "Agent-skills", en: "Agent skills" }

/** What Tiebe plays with most right now, most used first; one specimen card each. */
export const playing: PlayingItem[] = [
  {
    name: "Claude Code",
    kind: { nl: "AI-codeeragent", en: "AI coding agent" },
    blurb: {
      nl: "Dagelijkse pair programmer in de terminal. Plannen, bouwen en reviewen, ook voor deze site.",
      en: "Daily pair programmer in the terminal. Planning, building and reviewing, this site included.",
    },
    links: [{ label: "Claude Code", href: "https://code.claude.com/docs/en/overview" }],
    figure: "Terminal",
  },
  {
    name: "Obsidian",
    kind: { nl: "Notities", en: "Notes" },
    blurb: {
      nl: "Second brain in gelinkte Markdown. Notities, studie en projectcontext, leesbaar voor mijn agents.",
      en: "Second brain in linked Markdown. Notes, study and project context my agents can read.",
    },
    links: [{ label: "Obsidian", href: "https://obsidian.md" }],
    figure: "Hub",
  },
  {
    name: "Next.js + React",
    kind: { nl: "Framework", en: "Framework" },
    blurb: {
      nl: "Standaardstack voor het web. Deze site: Next.js 16 en React 19.",
      en: "Default web stack. This site: Next.js 16 and React 19.",
    },
    links: [{ label: "Next.js", href: "https://nextjs.org" }],
    figure: "Stack",
  },
  {
    name: "Superpowers",
    kind: agentSkills,
    blurb: {
      nl: "Werkwijze voor agents: brainstormen, plannen, test-first bouwen.",
      en: "Agent workflow: brainstorm, plan, build test-first.",
    },
    links: [{ label: "obra/superpowers", href: "https://github.com/obra/superpowers" }],
    figure: "Rebuild",
  },
  {
    name: "Matt Pocock skills",
    kind: agentSkills,
    blurb: {
      nl: "Plannen grillen, spec en tickets schrijven, test-first bouwen.",
      en: "Grill the plan, write the spec and tickets, build test-first.",
    },
    links: [{ label: "mattpocock/skills", href: "https://github.com/mattpocock/skills" }],
    figure: "Settle",
  },
  {
    name: "Impeccable",
    kind: { nl: "Design-skill", en: "Design skill" },
    blurb: {
      nl: "Design-review en afwerking. Elke sectie van deze site ging erdoor.",
      en: "Design review and polish. Every section of this site went through it.",
    },
    links: [{ label: "pbakaus/impeccable", href: "https://github.com/pbakaus/impeccable" }],
    figure: "Exploded",
  },
  {
    name: "Caveman + Ponytail",
    kind: agentSkills,
    blurb: {
      nl: "Kortere antwoorden, kleinere code.",
      en: "Shorter answers, smaller code.",
    },
    links: [
      { label: "caveman", href: "https://github.com/JuliusBrussee/caveman" },
      { label: "ponytail", href: "https://github.com/DietrichGebert/ponytail" },
    ],
    figure: "Format",
  },
]
