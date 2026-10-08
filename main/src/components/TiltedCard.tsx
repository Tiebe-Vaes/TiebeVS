'use client';

/**
 * Based on React Bits Tilted Card (MIT, https://github.com/DavidHDev/react-bits).
 * Changed: wraps any children instead of a single image, drops the mobile warning and
 * tooltip, tilts only for a real mouse and stays still under reduced motion.
 */

import type { SpringOptions } from 'motion/react';
import { motion, useReducedMotion, useSpring } from 'motion/react';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2
};

export default function TiltedCard({
  children,
  className,
  scaleOnHover = 1.04,
  rotateAmplitude = 8
}: {
  children: React.ReactNode;
  className?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(0, springValues);
  const rotateY = useSpring(0, springValues);
  const scale = useSpring(1, springValues);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || e.pointerType !== 'mouse' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);
  }

  function handleEnter(e: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || e.pointerType !== 'mouse') return;
    scale.set(scaleOnHover);
  }

  function handleLeave() {
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div
      ref={ref}
      className={cn('[perspective:800px]', className)}
      onPointerMove={handleMove}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
    >
      <motion.div className="size-full [transform-style:preserve-3d]" style={{ rotateX, rotateY, scale }}>
        {children}
      </motion.div>
    </div>
  );
}
