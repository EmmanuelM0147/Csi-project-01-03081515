"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc",
    content: "Working with this team transformed our business approach completely. Their strategic insights helped us achieve 200% growth in just 18 months.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&auto=format&fit=crop",
    metrics: "200% Growth in 18 Months",
    industry: "Technology"
  },
  {
    name: "Michael Chen",
    role: "Director, Global Solutions",
    content: "Their performance optimization strategies helped us reduce operational costs by 40% while improving service quality. Exceptional results!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&auto=format&fit=crop",
    metrics: "40% Cost Reduction",
    industry: "Manufacturing"
  },
  {
    name: "Emma Davis",
    role: "Founder, Innovation Labs",
    content: "The team's innovative approach to problem-solving and dedication to our success made all the difference. Highly recommended!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&auto=format&fit=crop",
    metrics: "150% Revenue Growth",
    industry: "Healthcare"
  }
];

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [autoplay]);

  const next = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-background overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/3 flex flex-col items-center">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage src={testimonials[current].image} alt={testimonials[current].name} />
                    <AvatarFallback>{testimonials[current].name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <div className="font-semibold text-lg">{testimonials[current].name}</div>
                    <div className="text-sm text-muted-foreground mb-2">{testimonials[current].role}</div>
                    <div className="text-sm text-primary font-medium">{testimonials[current].industry}</div>
                  </div>
                </div>
                <div className="w-full md:w-2/3">
                  <div className="text-2xl font-medium text-primary mb-4">
                    {testimonials[current].metrics}
                  </div>
                  <blockquote className="text-lg mb-4 italic">
                    "{testimonials[current].content}"
                  </blockquote>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12"
        onClick={prev}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12"
        onClick={next}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}