"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { Search, Lightbulb, Rocket, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const steps = [
  {
    icon: Search,
    title: "Discovery",
    description: "Research & Client Insights",
  },
  {
    icon: Lightbulb,
    title: "Strategy Development",
    description: "Tailored Solutions",
  },
  {
    icon: Rocket,
    title: "Implementation",
    description: "Execution & Optimization",
  },
  {
    icon: TrendingUp,
    title: "Scaling & Innovation",
    description: "Long-term Growth",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 2.5,
    }
  },
};

export function MethodologySection() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const variants = shouldReduceMotion 
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
      }
    : itemVariants;

  return (
    <section className="w-full py-24 bg-background" aria-labelledby="methodology-title">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            <motion.h2
              id="methodology-title"
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Transforming Ideas into Scalable Innovation
            </motion.h2>
            <motion.p
              className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              At Carlora, we empower businesses with tailored strategies, data-driven insights, 
              and scalable solutions to unlock their full potential. Partner with us to unlock growth, optimize performance, and drive sustainable success through data-driven strategies and innovative solutions.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                size="lg"
                onClick={() => router.push('/services')}
                className="group"
              >
                Discover Our Approach
                <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
              </Button>
            </motion.div>
          </div>

          {/* Right Column - Animated Infographic */}
          <motion.div
            className="grid grid-cols-2 gap-4 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            aria-label="Methodology steps"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="flex flex-col items-center text-center p-4 bg-muted rounded-lg"
                variants={variants}
                custom={index}
                role="article"
                aria-label={`Step ${index + 1}: ${step.title}`}
              >
                <div className="mb-4 p-3 bg-primary/10 rounded-full">
                  <step.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}