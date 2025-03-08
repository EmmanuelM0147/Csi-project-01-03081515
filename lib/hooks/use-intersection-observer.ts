"use client";

import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = '0px',
  freezeOnceVisible = true,
}: UseIntersectionObserverProps = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const currentElement = useRef<Element | null>(null);

  const frozen = freezeOnceVisible && isVisible;

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    const isIntersecting = entry?.isIntersecting;
    if (isIntersecting) {
      setIsVisible(true);
      setHasBeenVisible(true);
    } else if (!freezeOnceVisible) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    const node = currentElement?.current;
    const hasSupport = !!window.IntersectionObserver;

    if (!hasSupport || frozen || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [currentElement, threshold, root, rootMargin, frozen]);

  return { ref: currentElement, isVisible, hasBeenVisible };
}