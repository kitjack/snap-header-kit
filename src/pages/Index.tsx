
import React from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import ToolCard from '@/components/ToolCard';
import { 
  MessageSquare, 
  ShoppingBag, 
  Hash, 
  Briefcase, 
  Globe, 
  PenTool, 
  Feather, 
  GraduationCap, 
  Quote, 
  Skull,
  Dumbbell
} from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Our AI Tools</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ToolCard 
            title="Business Name Generator" 
            description="Generate creative, memorable business names for your startup or company."
            icon={<Briefcase className="text-primary" />}
            linkTo="/tools/business-name-generator"
          />
          
          <ToolCard 
            title="Etsy Tag Generator" 
            description="Optimize your Etsy listings with targeted, high-traffic tags."
            icon={<Hash className="text-primary" />}
            linkTo="/tools/etsy-tag-generator"
          />
          
          <ToolCard 
            title="Slogan Generator" 
            description="Create catchy, memorable slogans for your business or product."
            icon={<PenTool className="text-primary" />}
            linkTo="/tools/slogan-generator"
          />
          
          <ToolCard 
            title="Domain Name Generator" 
            description="Discover available domain names for your business or project."
            icon={<Globe className="text-primary" />}
            linkTo="/tools/domain-name-generator"
          />
          
          <ToolCard 
            title="Etsy Shop Name Generator" 
            description="Create a memorable and brandable name for your Etsy shop."
            icon={<ShoppingBag className="text-primary" />}
            linkTo="/tools/etsy-shop-name-generator"
          />
          
          <ToolCard 
            title="Prompt Enhancer" 
            description="Improve your AI prompts for better, more detailed responses."
            icon={<MessageSquare className="text-primary" />}
            linkTo="/tools/prompt-enhancer"
          />
          
          <ToolCard 
            title="LinkedIn Bio Generator" 
            description="Create professional and compelling LinkedIn bios."
            icon={<Briefcase className="text-primary" />}
            linkTo="/tools/linkedin-bio-generator"
          />
          
          <ToolCard 
            title="Social Media Bio Generator" 
            description="Generate engaging bios for various social media platforms."
            icon={<MessageSquare className="text-primary" />}
            linkTo="/tools/social-media-bio-generator"
          />
          
          <ToolCard 
            title="Academic Project Generator" 
            description="Generate innovative project ideas for academic research."
            icon={<GraduationCap className="text-primary" />}
            linkTo="/tools/academic-project-generator"
          />
          
          <ToolCard 
            title="Short Poem Generator" 
            description="Create beautiful, meaningful poems on any topic."
            icon={<Feather className="text-primary" />}
            linkTo="/tools/short-poem-generator"
          />
          
          <ToolCard 
            title="Quote Generator" 
            description="Generate inspirational and thought-provoking quotes."
            icon={<Quote className="text-primary" />}
            linkTo="/tools/quote-generator"
          />
          
          <ToolCard 
            title="Horror Story Generator" 
            description="Create chilling short horror stories with customizable themes."
            icon={<Skull className="text-primary" />}
            linkTo="/tools/horror-story-generator"
          />
          
          <ToolCard 
            title="Workout Routine Generator" 
            description="Create personalized workout routines based on your fitness goals."
            icon={<Dumbbell className="text-primary" />}
            linkTo="/tools/workout-routine-generator"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
