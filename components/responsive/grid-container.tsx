"use client";

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GridContainerProps {
  children: ReactNode;
  className?: string;
  columns?: number;
  gap?: number;
}

export function GridContainer({
  children,
  className,
  columns = 12,
  gap = 8,
}: GridContainerProps) {
  return (
    <div
      className={cn(
        "grid",
        `grid-cols-${columns}`,
        `gap-[${gap}px]`,
        "w-full max-w-[1440px]",
        "mx-auto px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </div>
  );
}