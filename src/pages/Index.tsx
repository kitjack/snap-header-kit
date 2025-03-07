import React from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import ToolCard from '@/components/ToolCard';
import { Briefcase, Tags, Type, Globe, Store, Zap, Linkedin, MessageSquare, GraduationCap, ShoppingBag, Feather } from 'lucide-react';

const tools = [
  {
    title: "Business Name Generator",
    description: "Generate creative and memorable business names based on your description and industry.",
    icon: <Briefcase className="text-primary" />,
    linkTo: "/tools/business-name-generator"
  },
  {
    title: "Domain Name Generator",
    description: "Find the perfect domain name for your business or project with our AI-powered generator.",
    icon: <Globe className="text-primary" />,
    linkTo: "/tools/domain-name-generator"
  },
  {
    title: "Etsy Shop Name Generator",
    description: "Create a catchy and unique name for your Etsy shop that will help you stand out.",
    icon: <ShoppingBag className="text-primary" />,
    linkTo: "/tools/etsy-shop-name-generator"
  },
  {
    title: "Etsy Tag Generator",
    description: "Optimize your Etsy listings with AI-generated SEO tags to increase visibility and sales.",
    icon: <Tags className="text-primary" />,
    linkTo: "/tools/etsy-tag-generator"
  },
  {
    title: "Slogan Generator",
    description: "Create memorable slogans that capture the essence of your business.",
    icon: <MessageSquare className="text-primary" />,
    linkTo: "/tools/slogan-generator"
  },
  {
    title: "Prompt Enhancer",
    description: "Transform your basic AI prompts into powerful, detailed instructions that get better results from any AI system.",
    icon: <Zap className="text-primary" />,
    linkTo: "/tools/prompt-enhancer"
  },
  {
    title: "LinkedIn Bio Generator",
    description: "Create professional and compelling LinkedIn bios that highlight your expertise and career achievements.",
    icon: <Briefcase className="text-primary" />,
    linkTo: "/tools/linkedin-bio-generator"
  },
  {
    title: "Social Media Bio Generator",
    description: "Create compelling social media bios that showcase your personality and purpose across different platforms.",
    icon: <MessageSquare className="text-primary" />,
    linkTo: "/tools/social-media-bio-generator"
  },
  {
    title: "Academic Project Generator",
    description: "Generate innovative and focused academic project topics tailored to your field of study and interests.",
    icon: <GraduationCap className="text-primary" />,
    linkTo: "/tools/academic-project-generator"
  },
  {
    title: "Short Poem Generator",
    description: "Create beautiful, meaningful poems on any topic in a variety of styles - perfect for personal reflection or sharing.",
    icon: <Feather className="text-primary" />,
    linkTo: "/tools/short-poem-generator"
  }
];

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <div className="flex-grow mt-12">
        <h2 className="text-2xl font-bold mb-6">Popular Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <ToolCard 
              key={index}
              title={tool.title} 
              description={tool.description}
              icon={tool.icon}
              linkTo={tool.linkTo}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
