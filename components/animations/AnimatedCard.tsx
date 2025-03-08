import { motion } from 'framer-motion';
import { cardHover } from '@/lib/animations/constants';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedCard({ children, className }: AnimatedCardProps) {
  return (
    <motion.div
      className={className}
      initial="rest"
      whileHover="hover"
      variants={cardHover}
    >
      {children}
    </motion.div>
  );
}