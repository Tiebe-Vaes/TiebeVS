"use client"

import { useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

/** Copies `text` to the clipboard and confirms for two seconds. */
export function CopyButton({ text, label, done }: { text: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked (insecure context or denied): the address stays visible to copy by hand.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-sm border border-primary-foreground/40 px-2.5 py-1 font-mono text-xs uppercase transition-colors hover:bg-primary-foreground/10"
    >
      {copied ? <CheckIcon className="size-3.5" aria-hidden="true" /> : <CopyIcon className="size-3.5" aria-hidden="true" />}
      <span aria-live="polite">{copied ? done : label}</span>
    </button>
  )
}
