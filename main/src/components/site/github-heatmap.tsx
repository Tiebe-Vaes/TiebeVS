"use client"

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

export default function GithubHeatmap({ days }: { days: HeatmapDay[] }) {
  const data = toColumns(days)
  return (
    <HeatmapInteractionProvider>
      <HeatmapInteractionBoundary>
        <div className="flex w-full flex-col items-stretch gap-3">
          <HeatmapChart className="w-full" data={data} layout="fluid" gap={3}>
            <HeatmapCells />
            <HeatmapXAxis />
            <HeatmapYAxis />
            <HeatmapTooltip />
          </HeatmapChart>
          <HeatmapLegend />
        </div>
      </HeatmapInteractionBoundary>
    </HeatmapInteractionProvider>
  )
}
