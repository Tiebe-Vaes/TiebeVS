/**
 * Based on Kokonut UI Slide Text Button (MIT, https://kokonutui.com),
 * restyled to the site's tokens; works for any anchor, including mailto: and tel:.
 */

import { cn } from "@/lib/utils"

export default function SlideTextButton({
  text,
  hoverText,
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { text: string; hoverText?: string }) {
  return (
    <a
      className={cn(
        "group relative inline-flex h-12 items-center overflow-hidden rounded-sm bg-primary-foreground px-6 font-semibold text-primary transition-colors hover:bg-primary-foreground/85",
        className,
      )}
      {...props}
    >
      <span className="relative inline-block transition-transform duration-300 ease-out group-hover:-translate-y-full motion-reduce:transition-none">
        <span className="block transition-opacity duration-300 group-hover:opacity-0">{text}</span>
        <span aria-hidden="true" className="absolute top-full left-0 block whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {hoverText ?? text}
        </span>
      </span>
    </a>
  )
}
