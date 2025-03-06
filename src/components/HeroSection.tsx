
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="bg-teal-500 py-20 px-6 text-center text-white">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        The largest collection of free AI tools
      </h1>
      <p className="text-xl mb-8">
        Get 100 free credits every day for unlimited generation
      </p>
      <Button asChild className="bg-orange-400 hover:bg-orange-500 text-white font-medium px-8 py-6 rounded-md">
        <Link to="/premium">Unlock Premium</Link>
      </Button>
    </div>
  );
};

export default HeroSection;
