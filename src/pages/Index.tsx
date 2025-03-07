import React from 'react';
import Layout from '@/components/Layout';
import ToolCard from '@/components/ToolCard';
import HeroSection from '@/components/HeroSection';
import { Sparkles, Lightbulb, FileText, Edit, Shield, FileCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { user, profile, loading } = useAuth();

  return (
    <Layout>
      <div className="container max-w-[1200px] mx-auto px-4 py-8">
        <div className="mb-12">
          <HeroSection />
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-primary mb-4">AI-Powered Tools</h1>
          <p className="text-muted-foreground text-lg">
            Supercharge your productivity with our suite of AI tools.
          </p>
        </div>

        <section className="py-10">
          <h2 className="text-2xl font-bold mb-6">Popular AI Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ToolCard
              title="About Page Generator"
              description="Create professional about pages for your business or personal website"
              icon={Edit}
              href="/tools/about-page-generator"
            />
            <ToolCard
              title="Privacy Policy Generator"
              description="Create comprehensive privacy policies for your website or app"
              icon={Shield}
              href="/tools/privacy-policy-generator"
            />
            <ToolCard
              title="Refund Policy Generator"
              description="Create clear and professional refund policies for your business"
              icon={FileCheck}
              href="/tools/refund-policy-generator"
            />
            <ToolCard
              title="Business Name Generator"
              description="Generate creative business names."
              href="/tools/business-name-generator"
              icon={Sparkles}
            />
            <ToolCard
              title="Etsy Tag Generator"
              description="Generate optimized Etsy tags for your products."
              href="/tools/etsy-tag-generator"
              icon={Sparkles}
            />
            <ToolCard
              title="Slogan Generator"
              description="Create catchy slogans for your brand."
              href="/tools/slogan-generator"
              icon={Sparkles}
            />
            <ToolCard
              title="Domain Name Generator"
              description="Find available domain names for your business."
              href="/tools/domain-name-generator"
              icon={Sparkles}
            />
            <ToolCard
              title="Etsy Shop Name Generator"
              description="Generate unique Etsy shop names."
              href="/tools/etsy-shop-name-generator"
              icon={Sparkles}
            />
            <ToolCard
              title="Prompt Enhancer"
              description="Enhance your prompts for better AI results."
              href="/tools/prompt-enhancer"
              icon={Sparkles}
            />
            <ToolCard
              title="LinkedIn Bio Generator"
              description="Generate professional LinkedIn bios."
              href="/tools/linkedin-bio-generator"
              icon={Sparkles}
            />
            <ToolCard
              title="Social Media Bio Generator"
              description="Generate engaging social media bios."
              href="/tools/social-media-bio-generator"
              icon={Sparkles}
            />
            <ToolCard
              title="Academic Project Generator"
              description="Generate innovative academic project ideas."
              href="/tools/academic-project-generator"
              icon={Sparkles}
            />
            <ToolCard
              title="Project Topic Generator"
              description="Generate detailed project ideas for any field."
              href="/tools/project-topic-generator"
              icon={Lightbulb}
            />
            <ToolCard
              title="Cover Letter Generator"
              description="Create tailored cover letters for job applications."
              href="/tools/cover-letter-generator"
              icon={FileText}
            />
            <ToolCard
              title="Short Poem Generator"
              description="Generate beautiful short poems."
              href="/tools/short-poem-generator"
              icon={Sparkles}
            />
            <ToolCard
              title="Quote Generator"
              description="Generate inspirational quotes."
              href="/tools/quote-generator"
              icon={Sparkles}
            />
            <ToolCard
              title="Horror Story Generator"
              description="Generate spooky horror stories."
              href="/tools/horror-story-generator"
              icon={Sparkles}
            />
            <ToolCard
              title="Workout Routine Generator"
              description="Generate personalized workout routines."
              href="/tools/workout-routine-generator"
              icon={Sparkles}
            />
            <ToolCard
              title="Diet Meal Plan Generator"
              description="Generate customized diet meal plans."
              href="/tools/diet-meal-plan-generator"
              icon={Sparkles}
            />
            <ToolCard
              title="Facebook Ads Generator"
              description="Generate effective Facebook ad copy."
              href="/tools/facebook-ads-generator"
              icon={Sparkles}
            />
            <ToolCard
              title="Google Ads Generator"
              description="Generate compelling Google ad copy."
              href="/tools/google-ads-generator"
              icon={Sparkles}
            />
            <ToolCard
              title="Newsletter Generator"
              description="Generate professional newsletters."
              href="/tools/newsletter-generator"
              icon={Sparkles}
            />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
