
import React from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <div className="flex-grow">
        {/* Content area is now empty */}
      </div>
    </Layout>
  );
};

export default Index;
