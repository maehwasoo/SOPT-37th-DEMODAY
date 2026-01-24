'use client';

import type { ReactNode } from 'react';
import { useRef } from 'react';

import { motion, useInView } from 'motion/react';

type FadeInViewProps = {
  children: ReactNode;
  className?: string;
  distance?: number;
  duration?: number;
  delay?: number;
  amount?: number;
};

export default function FadeInView({
  children,
  className,
  distance = 30,
  duration = 0.6,
  delay = 0,
  amount = 0.2,
}: FadeInViewProps) {
  // intersection ref
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: distance }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
