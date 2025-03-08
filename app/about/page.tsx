"use client";

import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart,
  Brain,
  Target,
  LineChart,
  Workflow,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const services = [
  {
    icon: Target,
    title: "Growth Opportunity Analysis",
    description: "Identify and capitalize on market opportunities through comprehensive analysis and strategic implementation.",
    details: [
      "Market penetration strategies",
      "Competitive positioning",
      "Growth roadmap development",
      "ROI optimization"
    ]
  },
  {
    icon: BarChart,
    title: "Performance Optimization",
    description: "Enhance operational efficiency and maximize business performance through data-driven insights.",
    details: [
      "Process optimization",
      "Resource allocation",
      "Cost reduction strategies",
      "Performance metrics"
    ]
  },
  {
    icon: Workflow,
    title: "Strategic Change Management",
    description: "Guide organizations through transformational change with proven methodologies and expert support.",
    details: [
      "Change readiness assessment",
      "Stakeholder management",
      "Implementation planning",
      "Training and support"
    ]
  },
  {
    icon: LineChart,
    title: "Data Analytics",
    description: "Transform raw data into actionable insights for informed decision-making and competitive advantage.",
    details: [
      "Data strategy development",
      "Analytics implementation",
      "Predictive modeling",
      "Performance tracking"
    ]
  },
  {
    icon: Brain,
    title: "Business Process Transformation",
    description: "Redesign and optimize core business processes to improve efficiency and drive growth.",
    details: [
      "Process mapping",
      "Digital transformation",
      "Automation solutions",
      "Quality management"
    ]
  },
  {
    icon: Award,
    title: "Sustainable Growth Strategy",
    description: "Develop long-term strategies that balance growth with sustainability and social responsibility.",
    details: [
      "Sustainability assessment",
      "ESG integration",
      "Long-term planning",
      "Impact measurement"
    ]
  }
];

const stats = [
  { value: "50+", label: "Clients Served" },
  { value: "95%", label: "Client Satisfaction" },
  { value: "$21K+", label: "Revenue Impact" },
  { value: "3+", label: "Years Experience" }
];

export default function About() {
  const router = useRouter();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <main className="flex min-h-screen flex-col" role="main">
      <section 
        className="relative min-h-[60vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=1920")',
          backgroundAttachment: 'fixed'
        }}
        role="banner"
        aria-labelledby="hero-title"
      >
        <div className="absolute inset-0 bg-[#0A2240]/70" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative container mx-auto px-6 text-white text-center"
        >
          <h1 
            id="hero-title"
            className="text-4xl font-bold tracking-tight sm:text-6xl mb-6"
            style={{ fontFamily: "Helvetica Neue, sans-serif" }}
          >
            Driving Business Excellence Through
Strategic Innovation
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-2xl font-light"
             style={{ fontFamily: "Helvetica Neue, sans-serif" }}>
           We are committed to delivering data-driven solutions that transform businesses and create lasting value through innovative methodologies.
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section 
        ref={ref}
        className="py-12 px-6 bg-muted/50"
        role="region"
        aria-label="Company Statistics"
      >
        <div className="mx-auto max-w-7xl">
          <div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            ref={ref}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className={`text-center transform transition-all duration-500 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        className="py-24 px-6"
        role="region"
        aria-labelledby="services-title"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 
              id="services-title"
              className="text-3xl font-bold tracking-tight mb-4"
            >
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Comprehensive solutions tailored to your business needs
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card 
                  key={index}
                  className="transform transition-all duration-300 hover:scale-105"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {<service.icon className="h-5 w-5" aria-hidden="true" />}
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <Accordion type="single" collapsible>
                      <AccordionItem value="details">
                        <AccordionTrigger>View Details</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc list-inside space-y-2">
                            {service.details.map((detail, idx) => (
                              <li key={idx}>{detail}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-24 px-6 bg-primary text-primary-foreground"
        role="region"
        aria-label="Call to Action"
      >
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Let's work together to unlock your organization's full potential and drive sustainable growth.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            onClick={() => router.push("/contact")}
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