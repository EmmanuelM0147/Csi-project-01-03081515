// Breakpoint types and utilities
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export const breakpoints = {
  xs: 480,
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1440,
  '2xl': 1536,
};

// Media query helper
export const mediaQuery = (breakpoint: Breakpoint, type: 'min' | 'max' = 'min') => 
  `@media (${type}-width: ${breakpoints[breakpoint]}px)`;

// Touch target utilities
export const touchTargetStyles = {
  minHeight: '48px',
  minWidth: '48px',
  padding: '8px',
  margin: '8px',
};

// Fluid typography calculator
export const fluidClamp = (minSize: number, maxSize: number, minWidth = 480, maxWidth = 1440) => {
  const slope = (maxSize - minSize) / (maxWidth - minWidth);
  const yAxisIntersection = -minWidth * slope + minSize;
  
  return `clamp(${minSize}rem, ${yAxisIntersection}rem + ${slope * 100}vw, ${maxSize}rem)`;
};

// Progressive image loading utility
export const progressiveImageLoad = async (
  src: string,
  lowQualitySrc: string,
  onLoad?: () => void
) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      onLoad?.();
      resolve(img);
    };
    img.onerror = reject;
  });
};

// Performance monitoring
export const measurePerformance = () => {
  if (typeof window === 'undefined') return null;
  
  const performance = window.performance;
  const timing = performance.timing;
  
  return {
    loadTime: timing.loadEventEnd - timing.navigationStart,
    domReady: timing.domContentLoadedEventEnd - timing.navigationStart,
    firstPaint: performance.getEntriesByType('paint')[0],
    firstContentfulPaint: performance.getEntriesByType('paint')[1],
  };
};

// Intersection Observer utility for lazy loading
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0,
  }
) => {
  if (typeof window === 'undefined') return null;
  
  return new IntersectionObserver(callback, options);
};

// Grid system configuration
export const gridConfig = {
  columns: 12,
  gutter: 8, // 8px baseline grid
  container: {
    maxWidth: 1440,
    padding: {
      xs: 16,
      sm: 24,
      md: 32,
      lg: 48,
      xl: 64,
      '2xl': 80,
    },
  },
};