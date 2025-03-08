"use client";

import { ArrowRight, Lightbulb, Target, Rocket, BarChart2, Users2, Brain, Briefcase, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const innovationAreas = [
  {
    icon: Brain,
    title: "Digital Transformation",
    description: "Leveraging cutting-edge technologies to revolutionize business processes and customer experiences.",
  },
  {
    icon: Briefcase,
    title: "Business Model Innovation",
    description: "Developing and implementing novel approaches to value creation and capture.",
  },
  {
    icon: LineChart,
    title: "Market Expansion",
    description: "Identifying and capitalizing on new market opportunities through innovative strategies.",
  },
];

const caseStudies = [
  {
    title: "FinTech Revolution",
    industry: "Financial Services",
    impact: "200% increase in digital adoption",
    description: "Transformed a traditional bank's digital services, resulting in improved customer satisfaction and operational efficiency.",
  },
  {
    title: "Supply Chain Optimization",
    industry: "Manufacturing",
    impact: "40% reduction in logistics costs",
    description: "Implemented innovative supply chain solutions using IoT and predictive analytics.",
  },
  {
    title: "Customer Experience Transformation",
    industry: "Retail",
    impact: "85% increase in customer retention",
    description: "Developed an omnichannel strategy that revolutionized the customer journey.",
  },
];

const innovationProcess = [
  {
    icon: Lightbulb,
    title: "Discovery",
    description: "Comprehensive analysis of your current state, challenges, and opportunities through stakeholder engagement and market research.",
  },
  {
    icon: Target,
    title: "Strategy Development",
    description: "Creating tailored innovation roadmaps aligned with your business objectives and market dynamics.",
  },
  {
    icon: Rocket,
    title: "Implementation",
    description: "Executing strategic initiatives with precision, supported by our expert team and proven methodologies.",
  },
];

export default function StrategicInnovation() {
  return (
    <main className="flex min-h-screen flex-col" role="main" aria-labelledby="page-title">
      <section 
        className="relative min-h-[60vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2940")',
          backgroundAttachment: 'fixed'
        }}
        role="banner"
      >
        <div className="absolute inset-0 bg-black/60" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative container mx-auto px-6 text-white text-center"
        >
          <h1 id="page-title" className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            Transforming Business Through
            <span className="block text-white font-extrabold mix-blend-difference">Strategic Innovation</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg">
            We help organizations embrace change, drive innovation, and achieve sustainable growth through our comprehensive strategic innovation framework.
          </p>
        </motion.div>
      </section>

      {/* Innovation Areas */}
      <section className="py-24 px-6 bg-muted/50" role="region" aria-labelledby="areas-title">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 id="areas-title" className="text-3xl font-bold tracking-tight mb-4">Key Innovation Areas</h2>
            <p className="text-lg text-muted-foreground mb-12">
              Focused expertise in critical areas of business transformation
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {innovationAreas.map((area, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <area.icon className="h-5 w-5" aria-hidden="true" />
                      {area.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{area.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6" role="region" aria-labelledby="process-title">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 id="process-title" className="text-3xl font-bold tracking-tight mb-4">Our Innovation Process</h2>
            <p className="text-lg text-muted-foreground mb-12">
              A systematic approach to driving transformative change
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {innovationProcess.map((step, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <step.icon className="h-5 w-5" aria-hidden="true" />
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 px-6 bg-muted/50" role="region" aria-labelledby="cases-title">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 id="cases-title" className="text-3xl font-bold tracking-tight mb-4">Success Stories</h2>
            <p className="text-lg text-muted-foreground mb-12">
              Real results from our strategic innovation partnerships
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {caseStudies.map((study, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-2">{study.title}</h3>
                    <div className="text-sm text-muted-foreground mb-4">
                      <p className="font-medium">{study.industry}</p>
                      <p className="text-primary font-bold mt-1">{study.impact}</p>
                    </div>
                    <p className="text-muted-foreground">{study.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-primary text-primary-foreground" role="region" aria-labelledby="cta-title">
        <div className="mx-auto max-w-7xl text-center">
          <h2 id="cta-title" className="text-3xl font-bold tracking-tight mb-6">Ready to Innovate?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Let's work together to unlock your organization's full potential through strategic innovation.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            aria-label="Schedule a consultation"
          >
            Schedule a Consultation
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </section>
    </main>
  );
}