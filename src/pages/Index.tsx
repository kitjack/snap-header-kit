
import React from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import ToolCard from '@/components/ToolCard';
import { Briefcase, Tags, Type, Globe, Store, Zap, Linkedin, MessageSquare } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <div className="flex-grow mt-12">
        <h2 className="text-2xl font-bold mb-6">Popular Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ToolCard 
            title="Business Name Generator" 
            description="Generate creative and unique business names instantly"
            icon={<Briefcase className="text-primary" />}
            linkTo="/tools/business-name-generator"
          />
          <ToolCard 
            title="Etsy Tag Generator" 
            description="Optimize your Etsy listings with perfect tags"
            icon={<Tags className="text-primary" />}
            linkTo="/tools/etsy-tag-generator"
          />
          <ToolCard 
            title="Slogan Generator" 
            description="Create memorable slogans for your business"
            icon={<Type className="text-primary" />}
            linkTo="/tools/slogan-generator"
          />
          <ToolCard 
            title="Domain Name Generator" 
            description="Find the perfect domain name for your website"
            icon={<Globe className="text-primary" />}
            linkTo="/tools/domain-name-generator"
          />
          <ToolCard 
            title="Etsy Shop Name Generator" 
            description="Create a memorable name for your Etsy shop"
            icon={<Store className="text-primary" />}
            linkTo="/tools/etsy-shop-name-generator"
          />
          <ToolCard 
            title="AI Prompt Enhancer" 
            description="Improve your AI prompts for better results"
            icon={<Zap className="text-primary" />}
            linkTo="/tools/prompt-enhancer"
          />
          <ToolCard 
            title="LinkedIn Bio Generator" 
            description="Create professional LinkedIn bios that stand out"
            icon={<Linkedin className="text-primary" />}
            linkTo="/tools/linkedin-bio-generator"
          />
          <ToolCard 
            title="Social Media Bio Generator" 
            description="Craft engaging bios for all your social profiles"
            icon={<MessageSquare className="text-primary" />}
            linkTo="/tools/social-media-bio-generator"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
