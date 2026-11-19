import type { Localized } from "./types"

export type WorkflowTool = { name: string; href?: string }

export type WorkflowStep = {
  title: Localized
  blurb: Localized
  tools: WorkflowTool[]
}

/** How Tiebe builds with AI agents, from idea to review; one stop each on the trail. */
export const workflow: WorkflowStep[] = [
  {
    title: { nl: "Idee scherpstellen", en: "Sharpen the idea" },
    blurb: {
      nl: "Eerst vragen, dan bouwen. De agent ondervraagt me tot doel, grenzen en randgevallen vastliggen.",
      en: "Questions first, code second. The agent grills me until the goal, limits and edge cases are settled.",
    },
    tools: [{ name: "Superpowers", href: "https://github.com/obra/superpowers" }, { name: "grill-me" }],
  },
  {
    title: { nl: "Spec en tickets", en: "Spec and tickets" },
    blurb: {
      nl: "Grotere apps krijgen een spec en losse tickets als GitHub-issues, zodat elk stuk werk in één sessie past.",
      en: "Bigger apps get a spec and separate tickets as GitHub issues, so every piece of work fits one session.",
    },
    tools: [{ name: "to-spec" }, { name: "to-tickets" }, { name: "wayfinder" }],
  },
  {
    title: { nl: "Bouwen", en: "Build" },
    blurb: {
      nl: "Claude Code in de terminal. Test-first, in kleine stappen, met de kleinste diff die werkt.",
      en: "Claude Code in the terminal. Test-first, in small steps, with the smallest diff that works.",
    },
    tools: [
      { name: "Claude Code", href: "https://code.claude.com/docs/en/overview" },
      { name: "TDD" },
      { name: "Ponytail", href: "https://github.com/DietrichGebert/ponytail" },
    ],
  },
  {
    title: { nl: "Design", en: "Design" },
    blurb: {
      nl: "Elke interface gaat door een design-review en een afwerkronde. Deze site ook.",
      en: "Every interface goes through a design review and a polish pass. This site included.",
    },
    tools: [
      { name: "Impeccable", href: "https://github.com/pbakaus/impeccable" },
      { name: "ui-ux-pro-max", href: "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill" },
    ],
  },
  {
    title: { nl: "Review", en: "Review" },
    blurb: {
      nl: "Een tweede model leest mee: Codex reviewt wat Claude bouwt.",
      en: "A second model reads along: Codex reviews what Claude builds.",
    },
    tools: [{ name: "Codex" }, { name: "claudex-loop", href: "https://github.com/chaseai-yt/claudex-loop" }],
  },
  {
    title: { nl: "Kennis en eigen skills", en: "Knowledge and own skills" },
    blurb: {
      nl: "Obsidian als second brain die mijn agents kunnen lezen. Wat ik vaak doe, wordt een eigen skill: een opgeslagen reel als notitie bewaren, mijn dag plannen, playlists bouwen.",
      en: "Obsidian as a second brain my agents can read. What I do often becomes my own skill: saving a reel as a note, planning my day, building playlists.",
    },
    tools: [
      { name: "Obsidian", href: "https://obsidian.md" },
      { name: "Playlist Builder", href: "https://github.com/Tiebe-Vaes/playlist-builder-for-spotify" },
    ],
  },
]
