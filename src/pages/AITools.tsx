
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import AIToolCard from '@/components/AIToolCard';
import { useAuth } from '@/contexts/AuthContext';
import { Sparkles, TextCursorInput, MessageSquareText } from 'lucide-react';

const AITools = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-12">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <div className="py-12">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold mb-3">AI Tools</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Create content for your business with our AI-powered tools. Each tool uses 5 credits per generation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AIToolCard
            id="business-name"
            title="Business Name Generator"
            description="Generate unique and catchy business names for your brand"
            icon={<Sparkles className="h-5 w-5" />}
            placeholder="E.g., A sustainable clothing brand focusing on eco-friendly materials"
            inputLabel="Describe your business"
            useTextarea={true}
            creditCost={5}
          />
          
          <AIToolCard
            id="etsy-tags"
            title="Etsy Tag Generator"
            description="Create SEO-optimized tags to boost your Etsy listings"
            icon={<TextCursorInput className="h-5 w-5" />}
            placeholder="E.g., Handmade ceramic mug with floral design"
            inputLabel="Describe your product"
            useTextarea={true}
            creditCost={5}
          />
          
          <AIToolCard
            id="slogan"
            title="Slogan Generator"
            description="Create memorable slogans and taglines for your brand"
            icon={<MessageSquareText className="h-5 w-5" />}
            placeholder="E.g., A coffee shop that sources beans directly from farmers"
            inputLabel="Describe your business"
            useTextarea={true}
            creditCost={5}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AITools;
