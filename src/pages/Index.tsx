import React from 'react';
import Layout from '@/components/Layout';
import HeroSection from './components/HeroSection';
import ToolCard from '@/components/ToolCard';
import { Briefcase, MessageSquare, Globe, ShoppingBag, Tag, Zap, GraduationCap, Feather, Quote } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <div className="py-12">
        {/* Hero Section */}
        <HeroSection />

        {/* Tools Section */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">AI Writing Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Business Name Generator */}
              <ToolCard 
                title="Business Name Generator" 
                description="Generate creative and memorable business names for your startup or company."
                linkTo="/tools/business-name-generator"
                icon={<Briefcase className="text-primary" />}
              />
              
              {/* Slogan Generator */}
              <ToolCard 
                title="Slogan Generator" 
                description="Create catchy, memorable slogans and taglines for your brand or product."
                linkTo="/tools/slogan-generator"
                icon={<MessageSquare className="text-primary" />}
              />
              
              {/* Domain Name Generator */}
              <ToolCard 
                title="Domain Name Generator" 
                description="Find available and brandable domain names for your business or project."
                linkTo="/tools/domain-name-generator"
                icon={<Globe className="text-primary" />}
              />

              {/* Etsy Shop Name Generator */}
              <ToolCard 
                title="Etsy Shop Name Generator" 
                description="Create a memorable and brandable name for your Etsy shop."
                linkTo="/tools/etsy-shop-name-generator"
                icon={<ShoppingBag className="text-primary" />}
              />

              {/* Etsy Tag Generator */}
              <ToolCard 
                title="Etsy Tag Generator" 
                description="Optimize your Etsy listings with SEO-friendly tags to increase visibility."
                linkTo="/tools/etsy-tag-generator"
                icon={<Tag className="text-primary" />}
              />

              {/* Prompt Enhancer */}
              <ToolCard 
                title="AI Prompt Enhancer" 
                description="Transform basic prompts into powerful, detailed instructions for better AI results."
                linkTo="/tools/prompt-enhancer"
                icon={<Zap className="text-primary" />}
              />

              {/* LinkedIn Bio Generator */}
              <ToolCard 
                title="LinkedIn Bio Generator" 
                description="Create professional and compelling LinkedIn bios to showcase your expertise."
                linkTo="/tools/linkedin-bio-generator"
                icon={<Briefcase className="text-primary" />}
              />

              {/* Social Media Bio Generator */}
              <ToolCard 
                title="Social Media Bio Generator" 
                description="Generate attention-grabbing bios for your social media profiles."
                linkTo="/tools/social-media-bio-generator"
                icon={<MessageSquare className="text-primary" />}
              />

              {/* Academic Project Generator */}
              <ToolCard
                title="Academic Project Generator"
                description="Generate innovative project ideas for academic research and coursework."
                linkTo="/tools/academic-project-generator"
                icon={<GraduationCap className="text-primary" />}
              />

              {/* Short Poem Generator */}
              <ToolCard
                title="Short Poem Generator"
                description="Create beautiful, meaningful poems on any topic in various styles."
                linkTo="/tools/short-poem-generator"
                icon={<Feather className="text-primary" />}
              />

              {/* Quote Generator */}
              <ToolCard
                title="Quote Generator"
                description="Generate inspirational and thoughtful quotes for speeches, social media, or personal reflection."
                linkTo="/tools/quote-generator"
                icon={<Quote className="text-primary" />}
              />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
