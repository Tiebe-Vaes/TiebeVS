import type { Localized } from "./types"

/** One line in a Claude Code transcript: the user's prompt, a tool or subagent call, its result, or the closing check. */
export type TerminalLine =
  | { kind: "prompt"; text: Localized }
  | { kind: "tool"; text: string; model?: "haiku" | "sonnet" | "opus" }
  | { kind: "result"; text: Localized }
  | { kind: "done"; text: Localized }

export type TerminalSession = { label: Localized; cwd: string; lines: TerminalLine[] }

const L = (nl: string, en: string): Localized => ({ nl, en })

/** How Tiebe works, as Claude Code sessions; one tab each in the Werkwijze terminal. */
export const sessions: TerminalSession[] = [
  {
    label: L("Nieuwe feature", "New feature"),
    cwd: "~/dev/vinylytics",
    lines: [
      { kind: "prompt", text: L("Voeg een deelkaart per album toe", "Add a share card per album") },
      { kind: "tool", text: "Skill(brainstorming)" },
      { kind: "result", text: L("Vragen tot doel, grenzen en randgevallen vastliggen", "Questions until goal, limits and edge cases are settled") },
      { kind: "tool", text: "Skill(writing-plans)" },
      { kind: "result", text: L("Plan in kleine taken, elk met een test", "Plan in small tasks, each with a test") },
      { kind: "tool", text: "Skill(test-driven-development)" },
      { kind: "result", text: L("Eerst rood, dan groen", "Red first, then green") },
      { kind: "tool", text: "Skill(impeccable)" },
      { kind: "result", text: L("Design-critique en afwerking", "Design critique and polish") },
      { kind: "tool", text: "Task(Browsercheck)", model: "sonnet" },
      { kind: "result", text: L("Gsm en desktop, licht en donker, console schoon", "Phone and desktop, light and dark, clean console") },
      { kind: "tool", text: "Task(Review van de branch)", model: "opus" },
      { kind: "done", text: L("test · lint · build groen", "test · lint · build green") },
    ],
  },
  {
    label: L("Bugfix", "Bug fix"),
    cwd: "~/dev/antwerp-bmx",
    lines: [
      { kind: "prompt", text: L("De uitslag zet C-finalisten op de verkeerde plaats", "The results rank C-finalists in the wrong place") },
      { kind: "tool", text: "Skill(systematic-debugging)" },
      { kind: "result", text: L("Eerst de oorzaak, geen gok", "Root cause first, no guessing") },
      { kind: "tool", text: "Task(Zoek elke aanroep)", model: "haiku" },
      { kind: "result", text: L("Alle plaatsen die de ranking gebruiken", "Every place that uses the ranking") },
      { kind: "tool", text: "Lokaal model(Ollama)" },
      { kind: "result", text: L("Lange testlog samengevat tot een foutenlijst", "Long test log boiled down to a list of failures") },
      { kind: "tool", text: "Edit(ranking)" },
      { kind: "result", text: L("Test die de bug vangt, dan de fix in de gedeelde logica", "A test that catches the bug, then the fix in the shared logic") },
      { kind: "done", text: L("mvn test groen · merge request klaar", "mvn test green · merge request ready") },
    ],
  },
  {
    label: L("Hackathon", "Hackathon"),
    cwd: "~/dev/ripple",
    lines: [
      { kind: "prompt", text: L("Prototype: scoor bronnen op betrouwbaarheid", "Prototype: score sources on trust") },
      { kind: "tool", text: "Skill(ponytail)" },
      { kind: "result", text: L("Kleinste versie die de demo draagt", "Smallest version that carries the demo") },
      { kind: "tool", text: "Skill(incremental-implementation)" },
      { kind: "result", text: L("Dunne stukjes, elk meteen zichtbaar", "Thin slices, each visible right away") },
      { kind: "tool", text: "Task(Demo doorklikken)", model: "sonnet" },
      { kind: "result", text: L("Werkt van begin tot eind", "Works end to end") },
      { kind: "done", text: L("Klaar voor de pitch", "Ready for the pitch") },
    ],
  },
  {
    label: L("Mijn dag", "My day"),
    cwd: "~/notes",
    lines: [
      { kind: "prompt", text: L("/today", "/today") },
      { kind: "tool", text: "Skill(today)" },
      { kind: "result", text: L("Lessen, deadlines en taken in de dagnotitie in Obsidian", "Classes, deadlines and tasks in the daily note in Obsidian") },
      { kind: "prompt", text: L("/process-saved", "/process-saved") },
      { kind: "tool", text: "Task(Opgeslagen reels)", model: "sonnet" },
      { kind: "result", text: L("Elke reel een notitie met de repo's en links uit het beeld", "Every reel a note with the repos and links from the frames") },
      { kind: "done", text: L("Klaar voor de dag", "Ready for the day") },
    ],
  },
]

/** The tools behind the sessions, linked below the terminal. */
export const workflowLinks: { label: string; href: string }[] = [
  { label: "Claude Code", href: "https://code.claude.com/docs/en/overview" },
  { label: "Superpowers", href: "https://github.com/obra/superpowers" },
  { label: "Impeccable", href: "https://github.com/pbakaus/impeccable" },
  { label: "Ponytail", href: "https://github.com/DietrichGebert/ponytail" },
  { label: "Obsidian", href: "https://obsidian.md" },
  { label: "Playlist Builder", href: "https://github.com/Tiebe-Vaes/playlist-builder-for-spotify" },
]
