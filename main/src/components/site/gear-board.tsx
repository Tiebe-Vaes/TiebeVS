import { TechIcon } from "./tech-icon"

type Group = { label: string; items: string[] }

// Topographic relief behind the patches: nested, slightly irregular rings.
const RINGS = [1, 0.82, 0.64, 0.47, 0.31, 0.16].map((k) => {
  const pts = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2
    const wobble = 1 + 0.08 * Math.sin(i * 2.3) + 0.05 * Math.cos(i * 3.7)
    return [500 + Math.cos(a) * 470 * k * wobble, 260 + Math.sin(a) * 240 * k * wobble]
  })
  return `M${pts.map(([x, y]) => `${x.toFixed(0)} ${y.toFixed(0)}`).join(" L")} Z`
})

export function GearBoard({ groups }: { groups: Group[] }) {
  return (
    <div className="relative overflow-hidden rounded-sm border bg-card px-5 py-8 sm:px-8 sm:py-10">
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 520"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 size-full text-line opacity-40 dark:opacity-60"
      >
        {RINGS.map((d) => (
          <path key={d} d={d} fill="none" stroke="currentColor" strokeWidth="1.2" />
        ))}
      </svg>

      <div className="relative flex flex-col gap-7">
        {groups.map((group, gi) => (
          <div key={group.label} className="grid gap-3 sm:grid-cols-[9rem_1fr] sm:items-center">
            <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">{group.label}</span>
            <ul className="flex flex-wrap gap-2.5">
              {group.items.map((item, ii) => (
                <li
                  key={item}
                  // Patches sit slightly crooked, as if sewn on by hand.
                  style={{ rotate: `${((gi * 7 + ii * 3) % 5) - 2}deg` }}
                  className="stitch-sewn flex items-center gap-2 rounded-sm bg-background px-3.5 py-2.5 text-sm font-semibold text-foreground"
                >
                  <TechIcon name={item} className="size-4" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
