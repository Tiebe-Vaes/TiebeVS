"use client"

/**
 * Based on Kokonut UI Switch Button (MIT, https://kokonutui.com),
 * restyled to the site's tokens and localized.
 */

import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const subscribe = () => () => {}

export default function SwitchButton({
  labels,
  className,
}: {
  labels: { toLight: string; toDark: string }
  className?: string
}) {
  const { resolvedTheme, setTheme } = useTheme()
  // Theme is only known on the client; render a neutral state until hydrated.
  const mounted = useSyncExternalStore(subscribe, () => true, () => false)
  const isDark = mounted && resolvedTheme === "dark"
  const label = isDark ? labels.toLight : labels.toDark

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      aria-label={label}
      title={label}
      className={cn("group", className)}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <SunIcon className="transition-transform duration-700 ease-out group-hover:rotate-180" />
      ) : (
        <MoonIcon className="transition-transform duration-500 ease-out group-hover:-rotate-12" />
      )}
    </Button>
  )
}
