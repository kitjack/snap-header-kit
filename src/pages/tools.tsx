import React from 'react';
import Layout from '@/components/Layout';
import ToolCard from '@/components/ToolCard';
import { Briefcase, Lightbulb, FileText, BookOpen, Wand2, ImageIcon, LayoutDashboard } from 'lucide-react';

const tools = [
  {
    title: "Project Topic Generator",
    description: "Generate innovative project ideas tailored to your field",
    icon: Lightbulb,
    href: "/tools/project-topic-generator"
  },
  {
    title: "Business Name Generator",
    description: "Find the perfect name for your startup or company",
    icon: Briefcase,
    href: "/tools/business-name-generator"
  },
  {
    title: "Slogan Generator",
    description: "Create catchy slogans that capture your brand's essence",
    icon: Wand2,
    href: "/tools/slogan-generator"
  },
  {
    title: "Cover Letter Generator",
    description: "Craft compelling cover letters that highlight your skills",
    icon: FileText,
    href: "/tools/cover-letter-generator"
  },
  {
    title: "Academic Project Generator",
    description: "Generate innovative academic project ideas",
    icon: BookOpen,
    href: "/tools/academic-project-generator"
  },
  {
    title: "Social Media Bio Generator",
    description: "Create engaging bios for your social media profiles",
    icon: LayoutDashboard,
    href: "/tools/social-media-bio-generator"
  },
  {
    title: "Prompt Enhancer",
    description: "Enhance your AI prompts for better results",
    icon: Wand2,
    href: "/tools/prompt-enhancer"
  },
  {
    title: "Google Ads Generator",
    description: "Generate effective Google Ads for your products or services",
    icon: ImageIcon,
    href: "/tools/google-ads-generator"
  },
  {
    title: "Facebook Ads Generator",
    description: "Generate compelling Facebook Ads for your business",
    icon: ImageIcon,
    href: "/tools/facebook-ads-generator"
  },
  {
    title: "Etsy Shop Name Generator",
    description: "Generate creative names for your Etsy shop",
    icon: Briefcase,
    href: "/tools/etsy-shop-name-generator"
  },
  {
    title: "Horror Story Generator",
    description: "Generate spooky and thrilling horror stories",
    icon: BookOpen,
    href: "/tools/horror-story-generator"
  },
  {
    title: "About Page Generator",
    description: "Create professional and engaging about pages for your business",
    icon: FileText,
    href: "/tools/about-page-generator"
  },
];

const ToolsPage: React.FC = () => {
  return (
    <Layout>
      <div className="container max-w-[1200px] mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">AI Tools</h1>
        <p className="text-center text-muted-foreground mb-8">
          Explore our suite of AI-powered tools to boost your productivity and creativity
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <ToolCard
              key={index}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              href={`/tools${tool.href}`}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ToolsPage;
