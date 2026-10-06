"use client"

import { createContext, use, useCallback, useEffect, useMemo, useState } from "react"
import type { Dictionary } from "@/content/dictionary"
import type { Locale, Project } from "@/content/types"
import { SpecSheet } from "./spec-sheet"

type CatalogueContextValue = { open: (slug: string) => void }

const CatalogueContext = createContext<CatalogueContextValue | null>(null)

export function useCatalogue() {
  const ctx = use(CatalogueContext)
  if (!ctx) throw new Error("useCatalogue must be used inside CatalogueProvider")
  return ctx
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  return target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)
}

export function CatalogueProvider({
  projects,
  locale,
  labels,
  children,
}: {
  projects: Project[]
  locale: Locale
  labels: { sheet: Dictionary["sheet"]; catalogue: Dictionary["catalogue"] }
  children: React.ReactNode
}) {
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const open = useCallback((slug: string) => setOpenSlug(slug), [])

  // Keys 1-9 open catalogue items 01-09 directly.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey || isTypingTarget(event.target)) return
      if (!/^[1-9]$/.test(event.key)) return
      const artNo = `0${event.key}`
      const match = projects.find((p) => p.artNo === artNo)
      if (match) setOpenSlug(match.slug)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [projects])

  const value = useMemo(() => ({ open }), [open])
  const active = openSlug ? (projects.find((p) => p.slug === openSlug) ?? null) : null

  return (
    <CatalogueContext value={value}>
      {children}
      <SpecSheet
        project={active}
        locale={locale}
        labels={labels}
        onOpenChange={(next) => {
          if (!next) setOpenSlug(null)
        }}
      />
    </CatalogueContext>
  )
}
