"use client";

import { useState, useEffect } from 'react';
import { breakpoints, Breakpoint } from '../responsive-design';

export function useMediaQuery(breakpoint: Breakpoint, type: 'min' | 'max' = 'min') {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Skip if window is not available (SSR)
    if (typeof window === 'undefined') {
      return;
    }
    
    const query = `(${type}-width: ${breakpoints[breakpoint]}px)`;
    const mediaQuery = window.matchMedia(query);
    
    const updateMatches = (e: MediaQueryListEvent | MediaQueryList) => {
      setMatches(e.matches);
    };

    updateMatches(mediaQuery);
    
    // Use the correct event listener based on browser support
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateMatches);
      return () => mediaQuery.removeEventListener('change', updateMatches);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(updateMatches);
      return () => mediaQuery.removeListener(updateMatches);
    }
  }, [breakpoint, type]);

  return matches;
}