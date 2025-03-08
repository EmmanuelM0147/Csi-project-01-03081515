// Core animation configuration
export const ANIMATION_CONFIG = {
  duration: {
    micro: 0.3, // 300ms
    macro: 0.5, // 500ms
  },
  ease: [0.4, 0, 0.2, 1], // Smooth cubic-bezier
  viewport: {
    threshold: 0.2,
    rootMargin: "50px",
  }
};

// Shared animation variants
export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 20,
    transition: { duration: 0.3 }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

export const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export const cardHover = {
  rest: {
    scale: 1,
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

export const accordionAnimation = {
  open: { 
    height: "auto",
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  closed: { 
    height: 0,
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};