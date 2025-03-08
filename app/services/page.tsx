"use client";

import { ArrowRight, BarChart3, Building2, Users, Code, LineChart, Brain, Target, BarChartIcon as ChartBarIcon, Users2, BarChart2, Rocket, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const services = [
  {
    icon: Building2,
    title: "Business Strategy",
    description: "Develop comprehensive business strategies aligned with your goals and market opportunities.",
  },
  {
    icon: BarChart3,
    title: "Performance Optimization",
    description: "Enhance operational efficiency and maximize business performance through data-driven insights.",
  },
  {
    icon: Users,
    title: "Team Development",
    description: "Build and nurture high-performing teams through expert training and development programs.",
  },
  {
    icon: Code,
    title: "Digital Transformation",
    description: "Guide your organization through digital transformation with cutting-edge solutions.",
  },
  {
    icon: LineChart,
    title: "Market Analysis",
    description: "In-depth market research and competitive analysis to inform strategic decisions.",
  },
  {
    icon: Brain,
    title: "Innovation Consulting",
    description: "Foster innovation and creative problem-solving within your organization.",
  },
];

const strategicQuestions = [
  {
    icon: Target,
    question: "What are the primary challenges preventing your business from reaching its goals?",
    explanation: "We help identify and overcome obstacles standing between you and success.",
  },
  {
    icon: BarChart2,
    question: "How do you measure the success of your business?",
    explanation: "Define and track meaningful KPIs that align with your business objectives.",
  },
  {
    icon: Users2,
    question: "What is your customer acquisition strategy?",
    explanation: "Develop effective approaches to attract and retain your ideal customers.",
  },
  {
    icon: BarChart2,
    question: "Where do you see the greatest potential for growth?",
    explanation: "Identify and capitalize on opportunities in your market.",
  },
  {
    icon: Rocket,
    question: "How prepared is your business for future market changes?",
    explanation: "Build resilience and adaptability into your business model.",
  },
];

const improvementSteps = [
  {
    icon: Brain,
    title: "Strategic Analysis",
    description: "In-depth evaluation of your current business position",
  },
  {
    icon: Target,
    title: "Goal Setting",
    description: "Define clear, measurable objectives for success",
  },
  {
    icon: CheckCircle2,
    title: "Implementation",
    description: "Execute strategies with precision and adaptability",
  },
];

export default function Services() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-cover bg-center" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&q=80&w=1920")',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-black/60" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative container mx-auto px-6 text-white text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            Our Services
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg">
            Comprehensive consulting solutions to drive your business forward through innovative strategies and proven methodologies.
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {<service.icon className="h-5 w-5" />}
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {service.description}
                    </p>
                    <Button variant="outline" className="w-full">Learn More</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Approach Section */}
      <section className="py-24 px-6 bg-muted/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight mb-4"
            >
              We Ask the Right Questions to Drive Your Business Forward
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Our consultations go beyond surface-level discussions to uncover the real challenges and opportunities in your business.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {strategicQuestions.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <item.icon className="h-5 w-5 text-primary" />
                      {item.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.explanation}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              onClick={() => router.push('/contact')}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Get a Full Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Continuous Improvement Section */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight mb-4"
            >
              How We Ensure Continuous Improvement
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Our process doesn't end with strategy—we refine, adapt, and innovate based on real results and feedback.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {improvementSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <step.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline"
              size="lg" 
              onClick={() => router.push('/contact')}
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}