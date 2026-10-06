export type ContributionDay = { date: string; count: number; weekday: number; week: number }

export type ContributionYear = { days: ContributionDay[]; total: number; activeDays: number }

const DAY_RE = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*?id="contribution-day-component-(\d+)-(\d+)"/g
const TIP_RE = /for="contribution-day-component-(\d+)-(\d+)"[^>]*>(No|\d+) contributions? on/g

/**
 * Public contribution calendar of a GitHub user (last 12 months), parsed from the
 * same HTML fragment github.com renders on the profile page. No token needed.
 * Refreshed at most once a day. Returns null when GitHub is unreachable.
 */
export async function getContributions(username: string): Promise<ContributionYear | null> {
  try {
    const res = await fetch(`https://github.com/users/${username}/contributions`, {
      next: { revalidate: 86_400 },
    })
    if (!res.ok) return null
    const html = await res.text()

    const counts = new Map<string, number>()
    for (const [, row, col, n] of html.matchAll(TIP_RE)) {
      counts.set(`${row}-${col}`, n === "No" ? 0 : Number(n))
    }
    const days: ContributionDay[] = []
    for (const [, date, row, col] of html.matchAll(DAY_RE)) {
      days.push({ date, weekday: Number(row), week: Number(col), count: counts.get(`${row}-${col}`) ?? 0 })
    }
    if (!days.length) return null

    return {
      days,
      total: days.reduce((sum, d) => sum + d.count, 0),
      activeDays: days.filter((d) => d.count > 0).length,
    }
  } catch {
    return null
  }
}
