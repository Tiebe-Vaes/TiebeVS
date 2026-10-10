"use client"

import { useRef, useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

const HOLD_MS = 700

/**
 * Hold to copy: a fill runs while the pointer is held and the text is copied when it completes;
 * letting go early cancels. Keyboard users copy straight away with Enter or Space.
 */
export function HoldToCopy({ text, label, done }: { text: string; label: string; done: string }) {
  const [holding, setHolding] = useState(false)
  const [copied, setCopied] = useState(false)
  const timer = useRef<number>(undefined)

  async function copy() {
    setHolding(false)
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked (insecure context or denied): the address stays visible to copy by hand.
    }
  }

  function cancel() {
    window.clearTimeout(timer.current)
    setHolding(false)
  }

  return (
    <button
      type="button"
      onPointerDown={(e) => {
        if (e.button !== 0) return
        setHolding(true)
        timer.current = window.setTimeout(copy, HOLD_MS)
      }}
      onPointerUp={cancel}
      onPointerLeave={cancel}
      onPointerCancel={cancel}
      // detail is 0 for a click from the keyboard; pointer clicks go through the hold above.
      onClick={(e) => e.detail === 0 && copy()}
      className="relative inline-flex touch-none items-center gap-1.5 overflow-hidden rounded-sm border border-primary-foreground/40 px-2.5 py-1 font-mono text-xs uppercase select-none"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 origin-left bg-primary-foreground/20 ease-linear"
        style={{ scale: holding ? "1 1" : "0 1", transition: `scale ${holding ? HOLD_MS : 150}ms` }}
      />
      {copied ? <CheckIcon className="relative size-3.5" /> : <CopyIcon className="relative size-3.5" />}
      <span className="relative" aria-live="polite">
        {copied ? done : label}
      </span>
    </button>
  )
}
