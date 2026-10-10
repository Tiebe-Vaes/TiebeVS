"use client"

import { useEffect, useMemo, useRef } from "react"
import {
  HeatmapCells,
  HeatmapChart,
  HeatmapInteractionBoundary,
  HeatmapInteractionProvider,
  HeatmapLegend,
  HeatmapTooltip,
  HeatmapXAxis,
  HeatmapYAxis,
} from "@/components/charts/heatmap"
import type { HeatmapColumn } from "@/components/charts/heatmap/heatmap-context"

/** days: [isoDate, count, weekday (0 = Sunday), week index] */
export type HeatmapDay = [string, number, number, number]

export type HeatmapLabels = { less: string; more: string; one: string; many: string }

const CELL = 19
const MARGIN = { top: 28, right: 8, bottom: 0, left: 40 }

function toColumns(days: HeatmapDay[]): HeatmapColumn[] {
  const weeks = new Map<number, HeatmapColumn>()
  for (const [iso, count, weekday, week] of days) {
    const [y, m, d] = iso.split("-").map(Number)
    const column = weeks.get(week) ?? { bin: week, bins: [] }
    column.bins.push({ bin: weekday, count, date: new Date(y, m - 1, d) })
    weeks.set(week, column)
  }
  return [...weeks.values()].toSorted((a, b) => a.bin - b.bin)
}

export default function GithubHeatmap({
  days,
  locale,
  labels,
}: {
  days: HeatmapDay[]
  locale: string
  labels: HeatmapLabels
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const data = useMemo(() => toColumns(days), [days])
  const fmt = useMemo(
    () => ({
      date: new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }),
      weekday: new Intl.DateTimeFormat(locale, { weekday: "long" }),
      // Sunday-first short weekday names: 2023-01-01 was a Sunday.
      days: Array.from({ length: 7 }, (_, i) =>
        new Intl.DateTimeFormat(locale, { weekday: "short" }).format(new Date(2023, 0, 1 + i)),
      ),
    }),
    [locale],
  )

  // On narrow screens the grid scrolls; start at the most recent months.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollLeft = el.scrollWidth
  }, [])

  // Fixed cell size: the grid width follows from the data, not from a measured container.
  const width = data.length * CELL + MARGIN.left + MARGIN.right

  return (
    <div ref={scrollRef} className="overflow-x-auto">
      <div className="mx-auto" style={{ width }}>
        <HeatmapInteractionProvider>
          <HeatmapInteractionBoundary>
            <div className="flex w-full flex-col items-stretch gap-3">
              <HeatmapChart
                className="w-full"
                data={data}
                layout="fluid"
                animate={false}
                binSize={CELL}
                gap={3}
                margin={MARGIN}
              >
                <HeatmapCells />
                <HeatmapXAxis locale={locale} />
                <HeatmapYAxis dayLabels={fmt.days} />
                <HeatmapTooltip
                  formatDate={(d) => fmt.date.format(d)}
                  formatWeekday={(d) => fmt.weekday.format(d)}
                  formatLabel={(count) => `${count} ${count === 1 ? labels.one : labels.many}`}
                />
              </HeatmapChart>
              <HeatmapLegend lessLabel={labels.less} moreLabel={labels.more} />
            </div>
          </HeatmapInteractionBoundary>
        </HeatmapInteractionProvider>
      </div>
    </div>
  )
}
