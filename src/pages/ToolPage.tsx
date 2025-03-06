
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import AIToolCard from '@/components/AIToolCard';
import { useAuth } from '@/contexts/AuthContext';
import { Briefcase, Tag, MessageSquare } from 'lucide-react';

// Define the tools configuration
const tools = {
  'business-name': {
    id: 'business-name',
    title: 'Business Name Generator',
    description: 'Generate unique and catchy business names for your brand',
    icon: <Briefcase className="h-5 w-5" />,
    placeholder: 'E.g., A sustainable clothing brand focusing on eco-friendly materials',
    inputLabel: 'Describe your business',
    useTextarea: true,
    creditCost: 10 // Updated to 10 credits
  },
  'etsy-tags': {
    id: 'etsy-tags',
    title: 'Etsy Tag Generator',
    description: 'Create SEO-optimized tags to boost your Etsy listings',
    icon: <Tag className="h-5 w-5" />,
    placeholder: 'E.g., Handmade ceramic mug with floral design',
    inputLabel: 'Describe your product',
    useTextarea: true,
    creditCost: 10 // Updated to 10 credits
  },
  'slogan': {
    id: 'slogan',
    title: 'Slogan Generator',
    description: 'Create memorable slogans and taglines for your brand',
    icon: <MessageSquare className="h-5 w-5" />,
    placeholder: 'E.g., A coffee shop that sources beans directly from farmers',
    inputLabel: 'Describe your business',
    useTextarea: true,
    creditCost: 10 // Updated to 10 credits
  }
};

const ToolPage = () => {
  const { toolId } = useParams();
  const { user, loading } = useAuth();
  
  // If tool ID doesn't exist, redirect to tools page
  if (!toolId || !tools[toolId]) {
    return <Navigate to="/" />;
  }
  
  const tool = tools[toolId];

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
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-3">{tool.title}</h1>
          <p className="text-muted-foreground">
            {tool.description}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <AIToolCard
            id={tool.id}
            title={tool.title}
            description={tool.description}
            icon={tool.icon}
            placeholder={tool.placeholder}
            inputLabel={tool.inputLabel}
            useTextarea={tool.useTextarea}
            creditCost={tool.creditCost}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ToolPage;
