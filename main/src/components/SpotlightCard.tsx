'use client';

/**
 * Based on React Bits Spotlight Card (MIT, https://github.com/DavidHDev/react-bits).
 * Changed: the spotlight follows the pointer through CSS custom properties instead of
 * React state (no re-render per mouse move), uses the site's tokens, and only renders a glow
 * for fine pointers.
 */

import { useRef } from 'react';
import { cn } from '@/lib/utils';

export default function SpotlightCard({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onPointerMove={e => {
        if (e.pointerType !== 'mouse' || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        ref.current.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
        ref.current.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
      }}
      className={cn('group/spot relative isolate', className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 ease-out [@media(hover:hover)]:group-hover/spot:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in oklch, var(--primary) 22%, transparent), transparent 70%)'
        }}
      />
      {children}
    </div>
  );
}
