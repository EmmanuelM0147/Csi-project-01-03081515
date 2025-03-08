"use client";

import { ArrowRight, Shield, Clock, Users, Trophy, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const benefits = [
  {
    title: "Expert Guidance",
    description: "Our experienced team provides strategic direction to navigate complex business challenges.",
    icon: Shield,
  },
  {
    title: "Immediate Action",
    description: "Quick response and implementation of recovery strategies when time is critical.",
    icon: Clock,
  },
  {
    title: "Tailored Solutions",
    description: "Customized approaches that consider your unique business circumstances.",
    icon: Trophy,
  },
];

const teamMembers = [
  {
    name: "Precious Idemudia",
    role: "Lead Business Rescue Specialist",
    bio: "With over 15 years of experience in business recovery and turnaround strategies, Precious leads our Business Rescue division with expertise and dedication.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&auto=format&fit=crop",
    linkedin: "https://linkedin.com/in/precious-idemudia",
  },
  {
    name: "David Anderson",
    role: "Financial Restructuring Expert",
    bio: "Specializing in financial analysis and debt restructuring, David brings valuable insights to complex recovery situations.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&auto=format&fit=crop",
    linkedin: "https://linkedin.com",
  },
];

const faqs = [
  {
    question: "What is Business Rescue?",
    answer: "Business Rescue is a process designed to help companies in financial distress restructure their affairs, business, property, debt, and other liabilities, providing them with temporary supervision and management to give them the best chance of recovery.",
  },
  {
    question: "When should I consider Business Rescue?",
    answer: "You should consider Business Rescue when your company is experiencing financial distress but has reasonable prospects of recovery. Early intervention typically leads to better outcomes.",
  },
  {
    question: "How long does the Business Rescue process take?",
    answer: "The duration varies depending on the complexity of the situation, but typically ranges from 3-6 months. We work efficiently to implement solutions while ensuring thorough attention to all aspects of the recovery plan.",
  },
];

export default function BusinessRescue() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-background py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              Business Rescue
              <span className="text-primary block">Your Partner in Recovery and Growth</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              We provide expert guidance and strategic solutions to help businesses overcome financial challenges and return to prosperity.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg">
                Contact Us Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-muted/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Why Choose Carlora
            </h2>
            <p className="text-lg text-muted-foreground">
              Expert solutions for business recovery and sustainable growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {<benefit.icon className="h-5 w-5" />}
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-lg text-muted-foreground">
              Dedicated professionals committed to your business success
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {teamMembers.map((member, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="text-center md:text-left">
                      <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                      <p className="text-muted-foreground mb-2">{member.role}</p>
                      <p className="text-sm mb-4">{member.bio}</p>
                      <Button variant="outline" size="sm" asChild>
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          View LinkedIn Profile
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-muted/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Common questions about our Business Rescue services
            </p>
          </div>

          <div className="grid gap-8 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Ready to Take Action?
            </h2>
            <p className="mx-auto max-w-2xl text-lg mb-8">
              Don't wait until it's too late. Contact our team today for a confidential consultation about your business rescue needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <Phone className="mr-2 h-4 w-4" />
                Call Us Now
              </Button>
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <MessageCircle className="mr-2 h-4 w-4" />
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}