import { motion } from 'framer-motion';
import { fadeInUp, ANIMATION_CONFIG } from '@/lib/animations/constants';
import { useScrollAnimation } from '@/lib/animations/hooks';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
  const { isVisible, shouldReduceMotion } = useScrollAnimation();

  // Respect reduced motion preferences
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{
        delay,
        duration: ANIMATION_CONFIG.duration.macro,
        ease: ANIMATION_CONFIG.ease
      }}
    >
      {children}
    </motion.div>
  );
}