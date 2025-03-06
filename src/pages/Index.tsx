
import React from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import SimpleToolCard from '@/components/SimpleToolCard';
import { Briefcase, Tag, MessageSquare } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <div className="mt-12 py-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-3">AI Tools</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Create content for your business with our AI-powered tools
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SimpleToolCard
            id="business-name"
            title="Business Name Generator"
            description="Generate creative and unique business names instantly"
            icon={<Briefcase className="h-5 w-5" />}
          />
          
          <SimpleToolCard
            id="etsy-tags"
            title="Etsy Tag Generator"
            description="Optimize your Etsy listings with perfect tags"
            icon={<Tag className="h-5 w-5" />}
          />
          
          <SimpleToolCard
            id="slogan"
            title="Slogan Generator"
            description="Create memorable slogans for your business"
            icon={<MessageSquare className="h-5 w-5" />}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
