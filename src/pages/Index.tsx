
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      <div className="flex-grow">
        {/* Content area is now empty */}
      </div>
    </div>
  );
};

export default Index;
