"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export function ProgressiveImage({
  src,
  alt,
  className,
  width,
  height
}: ProgressiveImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState('');

  useEffect(() => {
    // Generate low-quality placeholder
    const placeholder = `${src}?w=20&q=10`;
    
    // Load low quality version first
    const imgLow = new Image();
    imgLow.src = placeholder;
    imgLow.onload = () => {
      setCurrentSrc(placeholder);
      
      // Then load high quality version
      const imgHigh = new Image();
      imgHigh.src = src;
      imgHigh.onload = () => {
        setCurrentSrc(src);
        setIsLoading(false);
      };
    };
  }, [src]);

  return (
    <div
      className={cn(
        "overflow-hidden bg-muted",
        isLoading && "animate-pulse",
        className
      )}
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
      }}
    >
      {currentSrc && (
        <img
          src={currentSrc}
          alt={alt}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            isLoading ? "opacity-50" : "opacity-100"
          )}
          width={width}
          height={height}
        />
      )}
    </div>
  );
}