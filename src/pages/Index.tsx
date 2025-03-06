
import React from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import { Card } from '@/components/ui/card';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <div className="flex-grow mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg mb-2">Business Tools</h3>
            <p className="text-gray-600">Generate business names, slogans, and more with our AI-powered tools.</p>
          </Card>
          
          <Card className="p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg mb-2">Social Media</h3>
            <p className="text-gray-600">Create engaging content for your social media channels.</p>
          </Card>
          
          <Card className="p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg mb-2">Lifestyle</h3>
            <p className="text-gray-600">Enhance your creativity with our AI-powered lifestyle tools.</p>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
