import type { Localized } from "./types"

/** One line in a Claude Code transcript: the prompt, a tool or subagent call (optionally linked), its result, or the closing check. */
export type TerminalLine =
  | { kind: "prompt"; text: Localized }
  | { kind: "tool"; text: string; href?: string; model?: "haiku" | "sonnet" | "opus" }
  | { kind: "result"; text: Localized }
  | { kind: "done"; text: Localized }

export type TerminalSession = { label: Localized; cwd: string; lines: TerminalLine[] }

const L = (nl: string, en: string): Localized => ({ nl, en })

const SUPERPOWERS = "https://github.com/obra/superpowers"
const SUBAGENTS = "https://code.claude.com/docs/en/sub-agents"

/** How Tiebe works, as generic Claude Code sessions; one tab each in the Werkwijze terminal. */
export const sessions: TerminalSession[] = [
  {
    label: L("Nieuwe feature", "New feature"),
    cwd: "~/projects/shop",
    lines: [
      { kind: "prompt", text: L("Voeg een verlanglijst toe aan de productpagina", "Add a wishlist to the product page") },
      { kind: "tool", text: "Skill(brainstorming)", href: SUPERPOWERS },
      { kind: "result", text: L("Vragen tot doel, grenzen en randgevallen vastliggen", "Questions until goal, limits and edge cases are settled") },
      { kind: "tool", text: "Skill(writing-plans)", href: SUPERPOWERS },
      { kind: "result", text: L("Plan in kleine taken, elk met een test", "Plan in small tasks, each with a test") },
      { kind: "tool", text: "Skill(test-driven-development)", href: SUPERPOWERS },
      { kind: "result", text: L("Eerst rood, dan groen", "Red first, then green") },
      { kind: "tool", text: "Skill(impeccable)", href: "https://github.com/pbakaus/impeccable" },
      { kind: "result", text: L("Design-critique en afwerking", "Design critique and polish") },
      { kind: "tool", text: "Task(Browser check)", href: SUBAGENTS, model: "sonnet" },
      { kind: "result", text: L("Gsm en desktop, licht en donker, console schoon", "Phone and desktop, light and dark, clean console") },
      { kind: "tool", text: "Task(Review the branch)", href: SUBAGENTS, model: "opus" },
      { kind: "done", text: L("test · lint · build groen", "test · lint · build green") },
    ],
  },
  {
    label: L("Bugfix", "Bug fix"),
    cwd: "~/projects/api",
    lines: [
      { kind: "prompt", text: L("Het totaal van een bestelling klopt niet na een korting", "An order total is wrong after a discount") },
      { kind: "tool", text: "Skill(systematic-debugging)", href: SUPERPOWERS },
      { kind: "result", text: L("Eerst de oorzaak, geen gok", "Root cause first, no guessing") },
      { kind: "tool", text: "Task(Find every caller)", href: SUBAGENTS, model: "haiku" },
      { kind: "result", text: L("Alle plaatsen die het totaal berekenen", "Every place that computes the total") },
      { kind: "tool", text: "Local model(Ollama)", href: "https://ollama.com" },
      { kind: "result", text: L("Lange testlog samengevat tot een foutenlijst", "Long test log boiled down to a list of failures") },
      { kind: "tool", text: "Update(src/orders/total.ts)" },
      { kind: "result", text: L("Test die de bug vangt, dan de fix in de gedeelde code", "A test that catches the bug, then the fix in shared code") },
      { kind: "done", text: L("tests groen · klaar voor review", "tests green · ready for review") },
    ],
  },
  {
    label: L("Hackathon", "Hackathon"),
    cwd: "~/projects/prototype",
    lines: [
      { kind: "prompt", text: L("Een werkende demo in twee uur", "A working demo in two hours") },
      { kind: "tool", text: "Skill(ponytail)", href: "https://github.com/DietrichGebert/ponytail" },
      { kind: "result", text: L("Kleinste versie die de demo draagt", "Smallest version that carries the demo") },
      { kind: "tool", text: "Skill(incremental-implementation)" },
      { kind: "result", text: L("Dunne stukjes, elk meteen zichtbaar", "Thin slices, each visible right away") },
      { kind: "tool", text: "Task(Click through the demo)", href: SUBAGENTS, model: "sonnet" },
      { kind: "result", text: L("Werkt van begin tot eind", "Works end to end") },
      { kind: "done", text: L("Klaar voor de pitch", "Ready for the pitch") },
    ],
  },
  {
    label: L("Overdracht", "Handoff"),
    cwd: "~/projects/shop",
    lines: [
      { kind: "prompt", text: L("Bewaar wat we beslist hebben", "Save what we decided") },
      { kind: "tool", text: "Skill(obsidian-markdown)", href: "https://github.com/kepano/obsidian-skills" },
      { kind: "result", text: L("Beslissingen en volgende stappen als gelinkte notitie", "Decisions and next steps as a linked note") },
      { kind: "tool", text: "Skill(handoff)" },
      { kind: "result", text: L("Overdracht voor de volgende sessie, met open punten", "A handoff for the next session, with open items") },
      { kind: "done", text: L("Volgende sessie start met de juiste context", "The next session starts with the right context") },
    ],
  },
]
