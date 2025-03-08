import { motion } from 'framer-motion';
import { staggerChildren, ANIMATION_CONFIG } from '@/lib/animations/constants';

interface AnimatedHeroProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function AnimatedHero({ title, subtitle, children }: AnimatedHeroProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerChildren}
    >
      <motion.h1
        variants={staggerChildren}
        className="text-4xl font-bold tracking-tight sm:text-6xl mb-6"
      >
        {title}
      </motion.h1>
      
      {subtitle && (
        <motion.p
          variants={staggerChildren}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
        >
          {subtitle}
        </motion.p>
      )}
      
      {children && (
        <motion.div
          variants={staggerChildren}
          transition={{ delay: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}