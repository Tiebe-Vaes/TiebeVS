import type { Localized } from "./types"

/** hairline figures used by the ranking; one per entry. */
export type FigureName =
  | "Terminal"
  | "Hub"
  | "Stack"
  | "Rebuild"
  | "Exploded"
  | "Branches"
  | "Relay"
  | "Settle"
  | "Format"
  | "Keyboard"
  | "Laptop"
  | "Terrain"

export type PlayingItem = {
  name: string
  kind: Localized
  blurb: Localized
  links: { label: string; href: string }[]
  figure: FigureName
}

const agentSkills: Localized = { nl: "Agent-skills", en: "Agent skills" }

/** What Tiebe plays with most right now, most used first. */
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
    name: "Subagents",
    kind: { nl: "Werkwijze", en: "Workflow" },
    blurb: {
      nl: "Agents die parallel werken, elk met een eigen taak en verse context, en een aparte reviewer die het resultaat nakijkt.",
      en: "Agents working in parallel, each with its own task and fresh context, and a separate reviewer that checks the result.",
    },
    links: [{ label: "Subagents", href: "https://code.claude.com/docs/en/sub-agents" }],
    figure: "Branches",
  },
  {
    name: "Agent Skills",
    kind: agentSkills,
    blurb: {
      nl: "Engineering-skills van Addy Osmani, van spec tot livegang: performance, security, code review en meer.",
      en: "Engineering skills by Addy Osmani, from spec to launch: performance, security, code review and more.",
    },
    links: [{ label: "addyosmani/agent-skills", href: "https://github.com/addyosmani/agent-skills" }],
    figure: "Relay",
  },
  {
    name: "Matt Pocock skills",
    kind: agentSkills,
    blurb: {
      nl: "Skills om een plan kritisch te laten bevragen, er specs en tickets van te maken en test-first te bouwen.",
      en: "Skills that grill a plan, turn it into specs and tickets, and build it test-first.",
    },
    links: [{ label: "mattpocock/skills", href: "https://github.com/mattpocock/skills" }],
    figure: "Settle",
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
  {
    name: "Make Interfaces Feel Better",
    kind: { nl: "Design-skill", en: "Design skill" },
    blurb: {
      nl: "De kleine details die een interface af doen voelen: animaties, schaduwen, typografie.",
      en: "The small details that make an interface feel finished: animation, shadows, typography.",
    },
    links: [{ label: "make-interfaces-feel-better", href: "https://github.com/jakubkrehel/make-interfaces-feel-better" }],
    figure: "Keyboard",
  },
  {
    name: "React Bits + hairline",
    kind: { nl: "UI-bibliotheken", en: "UI libraries" },
    blurb: {
      nl: "De carrousel, de fjord onderaan en de figuur hiernaast komen hier vandaan.",
      en: "The carousel, the fjord at the bottom and the figure next to this list come from here.",
    },
    links: [
      { label: "React Bits", href: "https://reactbits.dev" },
      { label: "hairline", href: "https://hairline.lucasmarkes.com" },
    ],
    figure: "Laptop",
  },
  {
    name: "GSAP skills",
    kind: agentSkills,
    blurb: {
      nl: "De officiële GSAP-skills, zodat agents animaties schrijven zoals GreenSock ze bedoelt.",
      en: "The official GSAP skills, so agents write animation the way GreenSock intends.",
    },
    links: [{ label: "greensock/gsap-skills", href: "https://github.com/greensock/gsap-skills" }],
    figure: "Terrain",
  },
]
