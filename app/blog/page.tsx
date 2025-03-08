"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";

const faqs = [
  {
    question: "What's your biggest business challenge right now, and what's it costing you?",
    answer: "Many businesses struggle with operational inefficiencies, lack of automation, and weak online presence. These challenges can lead to lost revenue, wasted time, and missed growth opportunities. Our expertise helps identify and eliminate these roadblocks, maximizing your business potential.",
    ctaText: "Book Consultation",
    ctaLink: "/contact"
  },
  {
    question: "Are you confident that your current strategy will drive long-term growth?",
    answer: "Sustainable growth requires a scalable and adaptable strategy. If you're unsure whether your current approach will remain effective in the future, our strategic review process can help build a future-proof plan aligned with your business goals.",
    ctaText: "Schedule a Strategy Session",
    ctaLink: "/contact"
  },
  {
    question: "Where do you see hidden opportunities for revenue growth in your business?",
    answer: "Many businesses overlook potential revenue streams due to limited market insights or outdated strategies. Our comprehensive analysis helps uncover untapped opportunities and optimize your business model for higher profits.",
    ctaText: "Explore Growth Potential",
    ctaLink: "/contact"
  },
  {
    question: "What inefficiencies are slowing down your operations and cutting into profits?",
    answer: "Manual processes, outdated software, or workflow misalignment can significantly impact your bottom line. Our process audit identifies optimization opportunities and implements solutions for streamlined operations.",
    ctaText: "Get a Process Audit",
    ctaLink: "/contact"
  },
  {
    question: "Is your marketing strategy bringing in the right customers, or are you leaving money on the table?",
    answer: "Targeting the right audience with the right message is crucial for marketing ROI. We help craft results-driven marketing approaches that connect with your ideal customers and drive meaningful conversions.",
    ctaText: "Optimize Your Marketing",
    ctaLink: "/contact"
  },
  {
    question: "How prepared is your business for unexpected market changes and competition?",
    answer: "In today's fast-changing business environment, adaptability is crucial. We help future-proof your operations and strategy, ensuring your business remains competitive and resilient.",
    ctaText: "Build Business Resilience",
    ctaLink: "/contact"
  },
  {
    question: "Are you making data-driven decisions, or are you relying on guesswork?",
    answer: "While intuition has its place, data-driven strategies consistently outperform gut feelings. We help implement the right tools and analytics to empower informed decision-making.",
    ctaText: "Start Making Smarter Decisions",
    ctaLink: "/contact"
  },
  {
    question: "What's stopping your business from scaling to the next level?",
    answer: "Scaling requires the right combination of technology, team, and strategy. If growth feels stagnant, we can help analyze obstacles and implement solutions for smooth expansion.",
    ctaText: "Unlock Growth Potential",
    ctaLink: "/contact"
  },
  {
    question: "Are your employees and processes aligned with your business goals?",
    answer: "A company is only as strong as its team and processes. We help ensure everyone and everything is working efficiently towards your business objectives.",
    ctaText: "Improve Team & Process Efficiency",
    ctaLink: "/contact"
  },
  {
    question: "If you could fix one thing in your business today, what would it be?",
    answer: "Every business has its unique challenges. Whether it's customer retention, lead conversion, or automation, we can address your specific pain points with targeted solutions.",
    ctaText: "Let's Solve It Together",
    ctaLink: "/contact"
  }
];

export default function FAQPage() {
  const router = useRouter();
  const [openItems, setOpenItems] = useState<string[]>([]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq, index) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <main className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="relative min-h-[60vh] flex items-center justify-center bg-cover bg-center" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=2940")',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-black/50" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative container mx-auto px-6 text-white text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg">
            Find answers to common questions about business growth, strategy, and optimization. 
            Discover insights to help transform your business and achieve sustainable success.
          </p>
        </motion.div>
      </section>

      <section className="py-24 px-6 bg-muted/50">
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-6">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background rounded-lg border p-6"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <p className="mb-4 text-muted-foreground">{faq.answer}</p>
                  <Button
                    onClick={() => router.push(faq.ctaLink)}
                    className="w-full sm:w-auto"
                  >
                    {faq.ctaText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-24 px-6 bg-primary text-primary-foreground">
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
            onClick={() => router.push('/contact')}
          >
            Schedule a Free Consultation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </main>
  );
}