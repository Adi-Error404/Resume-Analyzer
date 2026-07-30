"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, FileText, BarChart, BrainCircuit } from "lucide-react";
import { COMPANIES } from "@/constants/companies";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-24 md:py-32 lg:py-48 flex flex-col items-center text-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10 bg-gradient-premium opacity-50 blur-3xl"></div>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="container px-4 md:px-6 flex flex-col items-center"
        >
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            AI-Powered Resume Analysis
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl">
            Land Your Dream Job at <br className="hidden md:block"/>
            <span className="text-gradient">Top Tier Companies</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl">
            Upload your resume, select your target role and company, and get an instant ATS score, missing keywords, and actionable AI feedback.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/upload">
              <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 shadow-xl shadow-primary/25 rounded-full">
                Upload Resume <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 bg-muted/30 border-y border-border/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Everything you need to stand out</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Our advanced AI algorithms analyze every aspect of your resume to ensure it passes the ATS and impresses human recruiters.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<BarChart className="h-10 w-10 text-primary" />}
              title="ATS Scoring"
              description="Get a precise ATS score calculated using TF-IDF and Cosine Similarity against actual company job descriptions."
            />
            <FeatureCard 
              icon={<FileText className="h-10 w-10 text-primary" />}
              title="Keyword Optimization"
              description="Discover missing keywords and skills required for your target role and company to beat the resume screening bots."
            />
            <FeatureCard 
              icon={<BrainCircuit className="h-10 w-10 text-primary" />}
              title="AI Feedback"
              description="Receive qualitative, human-like feedback on your grammar, phrasing, and overall impact from advanced LLMs."
            />
          </div>
        </div>
      </section>

      {/* Supported Companies */}
      <section className="w-full py-20 relative overflow-hidden">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Tailored for Top Tech Giants</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {COMPANIES.map(company => (
              <div key={company.id} className="glass px-6 py-3 rounded-full font-semibold text-lg hover:bg-primary/5 transition-colors cursor-default">
                {company.name}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card p-8 rounded-2xl flex flex-col items-start"
    >
      <div className="mb-6 p-4 bg-primary/10 rounded-2xl">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}
