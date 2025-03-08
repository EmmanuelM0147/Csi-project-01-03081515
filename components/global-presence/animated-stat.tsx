"use client";

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface AnimatedStatProps {
  label: string;
  value: string;
  delay?: number;
}

export function AnimatedStat({ label, value, delay = 0 }: AnimatedStatProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <Card className="bg-background/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <motion.p
            className="text-2xl font-bold text-primary"
            initial={{ scale: 0.5 }}
            animate={hasAnimated ? { scale: 1 } : {}}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 10,
              delay: delay + 0.2
            }}
          >
            {value}
          </motion.p>
          <p className="text-sm text-muted-foreground">
            {label.replace(/([A-Z])/g, ' $1').trim()}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}