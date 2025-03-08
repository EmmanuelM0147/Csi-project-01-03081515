"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BarChart, Brain, Users, Target, LineChart, Workflow } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const services = [
  {
    icon: Target,
    title: "Strategic Planning",
    description: "Develop comprehensive business strategies aligned with your goals and market opportunities.",
    link: "/services/strategic-planning"
  },
  {
    icon: BarChart,
    title: "Performance Optimization",
    description: "Enhance operational efficiency and maximize business performance through data-driven insights.",
    link: "/services/performance-optimization"
  },
  {
    icon: Brain,
    title: "Innovation Consulting",
    description: "Transform your business through cutting-edge technologies and innovative solutions.",
    link: "/services/innovation-consulting"
  },
  {
    icon: Users,
    title: "Team Development",
    description: "Build and nurture high-performing teams through expert training and development programs.",
    link: "/services/team-development"
  },
  {
    icon: LineChart,
    title: "Market Analysis",
    description: "Gain competitive advantage through comprehensive market research and analysis.",
    link: "/services/market-analysis"
  },
  {
    icon: Workflow,
    title: "Process Optimization",
    description: "Streamline operations and improve efficiency through advanced process engineering.",
    link: "/services/process-optimization"
  }
];

export function ServiceShowcase() {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
        >
          <Card className="h-full cursor-pointer" onClick={() => router.push(service.link)}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {<service.icon className={`h-5 w-5 transition-colors duration-300 ${
                  hoveredIndex === index ? "text-primary" : ""
                }`} />}
                {service.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              <Button 
                variant="outline" 
                className="w-full group"
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}