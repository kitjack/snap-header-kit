
import React from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ToolCard from './index/components/ToolCard';
import { 
  Type, 
  Tag, 
  MessageSquare, 
  Globe, 
  Store, 
  Zap, 
  Linkedin, 
  Users, 
  Lightbulb, 
  BookOpen, 
  Quote, 
  FileText, 
  Dumbbell,
  Utensils, 
  Facebook, 
  Search, 
  Mail,
  Map
} from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="text-center max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">
          AI Tools for Content Generation
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Create high-quality content in seconds with our collection of AI-powered tools
        </p>
        
        {!user && (
          <div className="flex justify-center space-x-4 mb-12">
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-white">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
              <Link to="/register">Get Started for Free</Link>
            </Button>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold mb-6">Popular Tools</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ToolCard
            title="Business Name Generator"
            description="Generate creative and memorable business names for your startup or company."
            icon={Type}
            href="/tools/business-name-generator"
          />
          
          <ToolCard
            title="Etsy Tag Generator"
            description="Create optimized tags for your Etsy listings to improve visibility and sales."
            icon={Tag}
            href="/tools/etsy-tag-generator"
          />
          
          <ToolCard
            title="Domain Name Generator"
            description="Discover available and catchy domain names for your website or business."
            icon={Globe}
            href="/tools/domain-name-generator"
          />
          
          <ToolCard
            title="Slogan Generator"
            description="Create catchy, memorable slogans and taglines for your brand or business."
            icon={MessageSquare}
            href="/tools/slogan-generator"
          />
          
          <ToolCard
            title="LinkedIn Bio Generator"
            description="Create a professional and engaging LinkedIn profile biography."
            icon={Linkedin}
            href="/tools/linkedin-bio-generator"
          />
          
          <ToolCard
            title="Etsy Shop Name Generator"
            description="Generate unique and appealing shop names for your Etsy store."
            icon={Store}
            href="/tools/etsy-shop-name-generator"
          />
          
          <ToolCard
            title="Prompt Enhancer"
            description="Improve your AI prompts to get better results from AI tools and chatbots."
            icon={Zap}
            href="/tools/prompt-enhancer"
          />
          
          <ToolCard
            title="Travel Itinerary Generator"
            description="Create personalized travel plans with daily activities, accommodations, and budget estimates."
            icon={Map}
            href="/tools/travel-itinerary-generator"
            isNew={true}
          />
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-6">All Tools</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ToolCard
            title="Social Media Bio Generator"
            description="Create engaging bios for your social media profiles."
            icon={Users}
            href="/tools/social-media-bio-generator"
          />
          
          <ToolCard
            title="Academic Project Generator"
            description="Generate research project ideas for academic assignments and papers."
            icon={Lightbulb}
            href="/tools/academic-project-generator"
          />
          
          <ToolCard
            title="Short Poem Generator"
            description="Create beautiful poems on any topic in various styles."
            icon={BookOpen}
            href="/tools/short-poem-generator"
          />
          
          <ToolCard
            title="Quote Generator"
            description="Generate inspiring quotes and sayings for any occasion."
            icon={Quote}
            href="/tools/quote-generator"
          />
          
          <ToolCard
            title="Horror Story Generator"
            description="Create spine-chilling short horror stories with a single prompt."
            icon={FileText}
            href="/tools/horror-story-generator"
          />
          
          <ToolCard
            title="Workout Routine Generator"
            description="Create personalized workout plans based on your fitness goals."
            icon={Dumbbell}
            href="/tools/workout-routine-generator"
          />
          
          <ToolCard
            title="Diet Meal Plan Generator"
            description="Generate healthy meal plans tailored to your dietary preferences."
            icon={Utensils}
            href="/tools/diet-meal-plan-generator"
          />
          
          <ToolCard
            title="Facebook Ads Generator"
            description="Create compelling Facebook ad copy that converts."
            icon={Facebook}
            href="/tools/facebook-ads-generator"
          />
          
          <ToolCard
            title="Google Ads Generator"
            description="Generate effective Google Ads copy to improve your PPC campaigns."
            icon={Search}
            href="/tools/google-ads-generator"
          />
          
          <ToolCard
            title="Newsletter Generator"
            description="Create engaging newsletters for your email marketing campaigns."
            icon={Mail}
            href="/tools/newsletter-generator"
          />
          
          <ToolCard
            title="Travel Itinerary Generator"
            description="Create personalized travel plans with daily activities, accommodations, and budget estimates."
            icon={Map}
            href="/tools/travel-itinerary-generator"
            isNew={true}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
