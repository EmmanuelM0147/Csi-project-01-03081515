import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

// Hook to manage performance monitoring
export const usePerformanceMonitor = () => {
  const [fps, setFps] = useState(0);
  const [paintTiming, setPaintTiming] = useState(0);

  useEffect(() => {
    let frame = 0;
    let lastTime = performance.now();
    
    const checkPerformance = () => {
      const time = performance.now();
      frame++;
      
      if (time > lastTime + 1000) {
        setFps(Math.round((frame * 1000) / (time - lastTime)));
        frame = 0;
        lastTime = time;
      }
      
      requestAnimationFrame(checkPerformance);
    };

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const paintEntry = entries[entries.length - 1];
      setPaintTiming(paintEntry.startTime);
    });

    observer.observe({ entryTypes: ['paint'] });
    requestAnimationFrame(checkPerformance);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { fps, paintTiming };
};

// Hook to manage scroll-based animations
export const useScrollAnimation = (threshold = 0.2) => {
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin: '50px',
      }
    );

    return () => observer.disconnect();
  }, [threshold]);

  return { isVisible, shouldReduceMotion };
};