"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categories = ["All", "Technology", "Finance", "Healthcare", "Retail"];

const caseStudies = [
  {
    title: "Digital Transformation Success",
    category: "Technology",
    impact: "200% increase in efficiency",
    description: "Helped a leading tech company modernize their legacy systems and implement AI-driven solutions.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80"
  },
  {
    title: "Financial Services Innovation",
    category: "Finance",
    impact: "45% cost reduction",
    description: "Streamlined operations for a major bank through process automation and data analytics.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&auto=format&fit=crop&q=80"
  },
  {
    title: "Healthcare Operations Optimization",
    category: "Healthcare",
    impact: "30% improved patient satisfaction",
    description: "Implemented smart scheduling and resource management systems for a hospital network.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80"
  },
  {
    title: "Retail Experience Transformation",
    category: "Retail",
    impact: "150% increase in online sales",
    description: "Developed an omnichannel strategy for a retail chain, boosting both online and offline revenue.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80"
  }
];

export function CaseStudyGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredStudies = caseStudies.filter(
    study => selectedCategory === "All" || study.category === selectedCategory
  );

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredStudies.map((study, index) => (
          <motion.div
            key={study.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <div 
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${study.image})` }}
              />
              <CardHeader>
                <CardTitle>{study.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{study.category}</span>
                  <span className="text-sm font-semibold text-primary">{study.impact}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{study.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}