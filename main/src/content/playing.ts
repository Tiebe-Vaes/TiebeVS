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
      nl: "Mijn dagelijkse pair programmer in de terminal. Ik plan, bouw en review er hele features mee, deze site inbegrepen.",
      en: "My daily pair programmer in the terminal. I plan, build and review whole features with it, this site included.",
    },
    links: [{ label: "Claude Code", href: "https://code.claude.com/docs/en/overview" }],
    figure: "Terminal",
  },
  {
    name: "Obsidian",
    kind: { nl: "Notities", en: "Notes" },
    blurb: {
      nl: "Mijn second brain: notities, studie en projectcontext in gelinkte Markdown, die mijn agents ook kunnen lezen.",
      en: "My second brain: notes, study material and project context in linked Markdown that my agents can read too.",
    },
    links: [{ label: "Obsidian", href: "https://obsidian.md" }],
    figure: "Hub",
  },
  {
    name: "Next.js + React",
    kind: { nl: "Framework", en: "Framework" },
    blurb: {
      nl: "Mijn standaardstack voor het web. Deze portfolio draait op Next.js 16 met React 19.",
      en: "My default stack for the web. This portfolio runs on Next.js 16 with React 19.",
    },
    links: [{ label: "Next.js", href: "https://nextjs.org" }],
    figure: "Stack",
  },
  {
    name: "Superpowers",
    kind: agentSkills,
    blurb: {
      nl: "Een werkwijze voor agents: eerst brainstormen, dan een plan, dan test-first bouwen. Zo blijven grote taken beheersbaar.",
      en: "A way of working for agents: brainstorm first, then a plan, then build test-first. It keeps big tasks manageable.",
    },
    links: [{ label: "obra/superpowers", href: "https://github.com/obra/superpowers" }],
    figure: "Rebuild",
  },
  {
    name: "Matt Pocock skills",
    kind: agentSkills,
    blurb: {
      nl: "Skills om een plan kritisch te laten bevragen, er een spec en tickets van te maken en test-first te bouwen.",
      en: "Skills that grill a plan, turn it into a spec and tickets, and build it test-first.",
    },
    links: [{ label: "mattpocock/skills", href: "https://github.com/mattpocock/skills" }],
    figure: "Settle",
  },
  {
    name: "Impeccable",
    kind: { nl: "Design-skill", en: "Design skill" },
    blurb: {
      nl: "Design-reviews en afwerking voor interfaces. Deze site ging er sectie per sectie door.",
      en: "Design reviews and polish for interfaces. This site went through it section by section.",
    },
    links: [{ label: "pbakaus/impeccable", href: "https://github.com/pbakaus/impeccable" }],
    figure: "Exploded",
  },
  {
    name: "Caveman + Ponytail",
    kind: agentSkills,
    blurb: {
      nl: "Caveman houdt de antwoorden van een agent kort, Ponytail houdt zijn code klein. Minder tokens, minder code.",
      en: "Caveman keeps an agent's answers short, Ponytail keeps its code small. Fewer tokens, less code.",
    },
    links: [
      { label: "caveman", href: "https://github.com/JuliusBrussee/caveman" },
      { label: "ponytail", href: "https://github.com/DietrichGebert/ponytail" },
    ],
    figure: "Format",
  },
]
