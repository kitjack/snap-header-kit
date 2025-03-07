
import React from 'react';
import Layout from '@/components/Layout';
import ToolCard from '@/components/ToolCard';
import { Sparkles } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-primary mb-4">AI-Powered Tools</h1>
          <p className="text-muted-foreground text-lg">
            Supercharge your productivity with our suite of AI tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </Layout>
  );
};

export default Index;
