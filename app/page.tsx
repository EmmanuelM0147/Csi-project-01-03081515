"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, BarChart3, Users2, Brain, Target, Globe, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChatBot } from "@/components/chat-bot";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { ServiceShowcase } from "@/components/service-showcase";
import { MethodologySection } from "@/components/home/methodology-section";
import { GlobalPresenceSection } from "@/components/home/global-presence-section";
import { useGeoLocation } from "@/hooks/use-geolocation";
import { useReferralSource } from "@/hooks/use-referral-source";

const getValueProps = (location: string, referralSource: string) => {
  const defaultProps = [
    "Transform Your Business with Strategic Innovation",
    "Drive Sustainable Growth with Data-Driven Solutions",
    "Unlock Your Potential with Expert Guidance",
    "Innovate and Scale with Proven Strategies"
  ];

  if (referralSource.includes('linkedin')) {
    defaultProps.unshift("Scale Your Professional Network and Business Growth");
  } else if (referralSource.includes('google')) {
    defaultProps.unshift("Optimize Your Business Strategy for Maximum ROI");
  }

  if (location) {
    defaultProps.unshift(`Grow Your Business in ${location} with Strategic Innovation`);
  }

  return defaultProps;
};

const baseStats = [
  { value: 47, label: "Clients Served", icon: Target, suffix: "+" },
  { value: 95, label: "Client Satisfaction", icon: Users2, suffix: "%" },
  { value: 151, label: "Average ROI", icon: BarChart3, suffix: "%" },
  { value: 78, label: "Client Retention", icon: Brain, suffix: "%" }
];

export default function Home() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showChatBot, setShowChatBot] = useState(false);
  const [availableSlots, setAvailableSlots] = useState(5);
  const [stats, setStats] = useState(baseStats);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  
  const { location } = useGeoLocation();
  const { referralSource } = useReferralSource();
  const valueProps = getValueProps(location, referralSource);

  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const springY = useSpring(y, springConfig);

  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let fadeTimer: NodeJS.Timeout;
    let phraseTimer: NodeJS.Timeout;

    if (!prefersReducedMotion) {
      fadeTimer = setInterval(() => {
        setIsVisible(false);
        phraseTimer = setTimeout(() => {
          setCurrentPhrase((prev) => (prev + 1) % valueProps.length);
          setIsVisible(true);
        }, 300);
      }, 4000);
    }

    return () => {
      if (fadeTimer) clearInterval(fadeTimer);
      if (phraseTimer) clearTimeout(phraseTimer);
    };
  }, [valueProps.length]);

  const Counter = ({ value, duration = 2, suffix = "" }: { value: number; duration?: number; suffix?: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let timer: NodeJS.Timeout;
      
      if (statsInView) {
        let start = 0;
        const increment = value / (duration * 60);
        
        timer = setInterval(() => {
          start += increment;
          if (start >= value) {
            setCount(value);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 1000 / 60);
      }

      return () => {
        if (timer) clearInterval(timer);
      };
    }, [value, duration, statsInView]);

    return <span>{count}{suffix}</span>;
  };

  return (
    <main className="flex min-h-screen flex-col">
      <motion.section 
        className="relative min-h-[90vh] flex items-center justify-center bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1606836576983-8b458e75221d?auto=format&fit=crop&q=80&w=1920")',
          y: springY,
        }}
      >
        <motion.div 
          className="absolute inset-0 bg-[#0A2240]/70"
          style={{ opacity }}
        />
        <motion.div 
          className="relative container mx-auto px-8 py-32 text-white text-center"
          style={{ scale }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Strategic Business
            <span className="block mt-2">Innovation</span>
          </motion.h1>
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentPhrase}
              className="h-16 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-2xl">
                {valueProps[currentPhrase]}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                onClick={() => router.push('/book-consultation')}
                className="bg-white text-black hover:bg-gray-100 group"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                variant="outline"
                className="bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground group"
                onClick={() => router.push("/services")}
              >
                Explore Services
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <section 
        ref={statsRef}
        className="py-12 px-8 bg-muted/50"
        role="region"
        aria-label="Company Statistics"
      >
        <div className="container mx-auto max-w-7xl">
          <div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            ref={statsRef}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className={`text-center transform transition-all duration-500 ${
                  statsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <stat.icon className="h-8 w-8 mb-2 mx-auto text-primary" />
                      <p className="text-3xl font-bold mb-1">
                        <Counter value={stat.value} suffix={stat.suffix} />
                      </p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <MethodologySection />
      
      <GlobalPresenceSection />
      
      <section className="py-24 px-8">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <ServiceShowcase />
        </div>
      </section>

      <section className="py-24 px-8 bg-muted/50">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12">Client Success Stories</h2>
          <TestimonialCarousel />
        </div>
      </section>

      <section className="py-24 px-8 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg mb-4">
              Only {availableSlots} consultation slots remaining this week
            </p>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Schedule a consultation today and let's discuss how we can help you achieve your business goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => router.push('/book-consultation')}
                  className="group"
                >
                  Book Your Free Strategy Session
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.open('https://wa.me/250796157413', '_blank')}
                  className="bg-[#25D366] text-white border-[#25D366] hover:bg-[#25D366]/90 hover:text-white group"
                >
                  Chat on WhatsApp
                  <MessageCircle className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <motion.div
        className="fixed bottom-6 right-24 z-40"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          size="lg"
          onClick={() => router.push('/book-consultation')}
          className="shadow-lg group relative"
        >
          <motion.span 
            className="absolute -inset-1 rounded-lg bg-primary/20"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <span className="relative">
            Book Strategy Session
            <Calendar className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
          </span>
        </Button>
      </motion.div>

      {showChatBot && <ChatBot />}
    </main>
  );
}