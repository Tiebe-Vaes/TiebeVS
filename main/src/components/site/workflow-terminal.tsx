"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import type { Dictionary } from "@/content/dictionary";
import type { TerminalLine, TerminalSession } from "@/content/playing";
import type { Locale } from "@/content/types";
import { cn } from "@/lib/utils";

// The site's night palette: fjord ground, mist text, the amber tag and the aurora green. The terminal stays dark in both themes.
const INK = {
  bg: "oklch(0.235 0.035 245)",
  bar: "oklch(0.27 0.045 245)",
  strip: "oklch(0.3 0.045 245)",
  rule: "oklch(1 0 0 / 14%)",
  text: "oklch(0.95 0.01 220)",
  dim: "oklch(0.76 0.03 230)",
  amber: "oklch(0.84 0.14 80)",
  green: "oklch(0.86 0.16 160)",
};

const lineText = (line: TerminalLine, locale: Locale) =>
  typeof line.text === "string" ? line.text : line.text[locale];

/** One line drawn the way Claude Code draws it; `text` may be cut short while it is being typed. */
function Line({
  line,
  text,
  newTab,
}: {
  line: TerminalLine;
  text: string;
  newTab: string;
}) {
  switch (line.kind) {
    case "prompt":
      return (
        <p
          className="mt-3 -mx-2 px-2 py-0.5 first:mt-0"
          style={{ background: INK.strip, color: INK.text }}
        >
          <span style={{ color: INK.dim }}>&gt; </span>
          {text}
        </p>
      );
    case "tool": {
      const typed = text.length === line.text.length;
      return (
        <p className="mt-3" style={{ color: INK.text }}>
          <span style={{ color: INK.green }}>⏺ </span>
          {line.href && typed ? (
            <a
              href={line.href}
              target="_blank"
              rel="noreferrer"
              className="font-semibold underline decoration-1 underline-offset-4 hover:decoration-2"
              style={{ textDecorationColor: INK.amber }}
            >
              {text}
              <span className="sr-only"> {newTab}</span>
            </a>
          ) : (
            <span className="font-semibold">{text}</span>
          )}
          {line.model && typed && (
            <span style={{ color: INK.dim }}> ({line.model})</span>
          )}
        </p>
      );
    }
    case "result":
      return (
        <p className="pl-2" style={{ color: INK.dim }}>
          <span aria-hidden="true">⎿&nbsp; </span>
          {text}
        </p>
      );
    case "done":
      return (
        <p className="mt-3" style={{ color: INK.text }}>
          <span style={{ color: INK.text }}>⏺ </span>
          {text}
        </p>
      );
  }
}

/** The active session, typed line by line once the terminal is in view. Keyed by tab, so a new tab starts over. */
function Transcript({
  session,
  locale,
  play,
  reduced,
  newTab,
}: {
  session: TerminalSession;
  locale: Locale;
  play: boolean;
  reduced: boolean;
  newTab: string;
}) {
  const [at, setAt] = useState({ line: 0, char: 0 });
  const lines = session.lines;
  const finished = reduced || at.line >= lines.length;

  useEffect(() => {
    if (!play || finished) return;
    const full = lineText(lines[at.line], locale);
    const lineDone = at.char >= full.length;
    const id = setTimeout(
      () =>
        setAt(
          lineDone
            ? { line: at.line + 1, char: 0 }
            : { line: at.line, char: at.char + 2 },
        ),
      lineDone ? 260 : 16,
    );
    return () => clearTimeout(id);
  }, [at, play, finished, lines, locale]);

  const shown = finished ? lines.length : at.line + 1;

  return (
    <div aria-busy={!finished}>
      {lines.slice(0, shown).map((line, i) => {
        const full = lineText(line, locale);
        return (
          <Line
            key={i}
            line={line}
            text={finished || i < at.line ? full : full.slice(0, at.char)}
            newTab={newTab}
          />
        );
      })}
      {!finished && (
        <p aria-hidden="true" className="mt-3" style={{ color: INK.amber }}>
          <span className="inline-block animate-pulse">✻</span> Thinking…{" "}
          <span style={{ color: INK.dim }}>(esc to interrupt)</span>
        </p>
      )}
    </div>
  );
}

/** Werkwijze as a Claude Code terminal: each tab replays one kind of session, skills and subagents linked. */
export function WorkflowTerminal({
  sessions,
  locale,
  t,
}: {
  sessions: TerminalSession[];
  locale: Locale;
  t: Dictionary["playing"];
}) {
  const [tab, setTab] = useState(0);
  const frame = useRef<HTMLDivElement>(null);
  const inView = useInView(frame, { once: true, margin: "0px 0px -25% 0px" });
  const reduced = useReducedMotion() ?? false;
  const session = sessions[tab];

  return (
    <div
      ref={frame}
      className="overflow-hidden rounded-sm border"
      style={{ background: INK.bg, borderColor: INK.rule }}
    >
      <div
        className="flex items-end gap-1 overflow-x-auto px-2 pt-2"
        style={{ background: INK.bar }}
      >
        <div role="tablist" aria-label={t.tabsLabel} className="flex">
          {sessions.map((s, i) => (
            <button
              key={s.label.en}
              role="tab"
              type="button"
              aria-selected={i === tab}
              onClick={() => setTab(i)}
              className={cn(
                "shrink-0 rounded-t-sm px-3 pt-1.5 pb-2 font-mono text-xs whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring pointer-coarse:py-3",
              )}
              style={
                i === tab
                  ? { background: INK.bg, color: INK.text }
                  : { color: INK.dim }
              }
            >
              {s.label[locale]}
            </button>
          ))}
        </div>
      </div>

      <div
        role="tabpanel"
        className="flex h-[38rem] flex-col p-4 font-mono text-[13px] leading-relaxed sm:h-[32rem] sm:p-5 sm:text-sm"
      >
        {/* Like a real terminal: new lines push the oldest, welcome box included, off the top. */}
        <div className="flex min-h-0 flex-1 flex-col justify-end overflow-hidden">
          <div
            className="mb-4 max-w-md shrink-0 rounded-md border px-3 py-2"
            style={{ borderColor: INK.amber, color: INK.text }}
          >
            <p>
              <span style={{ color: INK.amber }}>✻</span> Welcome to{" "}
              <span className="font-semibold">Claude Code</span>!
            </p>
            <p className="mt-2 pl-3" style={{ color: INK.dim }}>
              /help for help, /status for your current setup
            </p>
            <p className="mt-2 pl-3" style={{ color: INK.dim }}>
              cwd: {session.cwd}
            </p>
          </div>

          <Transcript
            key={tab}
            session={session}
            locale={locale}
            play={inView}
            reduced={reduced}
            newTab={t.newTab}
          />
        </div>

        <div aria-hidden="true">
          <div
            className="mt-3 rounded-md border px-3 py-1.5"
            style={{ borderColor: INK.rule, color: INK.dim }}
          >
            &gt;{" "}
            <span
              className="inline-block h-4 w-2 translate-y-0.5 animate-pulse"
              style={{ background: INK.dim }}
            />
          </div>
          <p className="mt-1 px-3 text-xs" style={{ color: INK.dim }}>
            ? for shortcuts
          </p>
        </div>
      </div>
    </div>
  );
}
