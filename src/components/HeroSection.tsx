
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Sparkles } from 'lucide-react';

const HeroSection = () => {
  const { user } = useAuth();
  
  return (
    <div className="bg-primary py-20 px-6 text-center text-white rounded-xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        The largest collection of free AI tools
      </h1>
      <p className="text-xl mb-8">
        Get 100 free credits every day for unlimited generation
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {user ? (
          <Button asChild className="bg-secondary hover:bg-secondary/90 text-white font-medium px-8 py-6 rounded-lg">
            <Link to="/tool/business-name">
              <Sparkles className="mr-2 h-5 w-5" />
              Try AI Tools
            </Link>
          </Button>
        ) : (
          <Button asChild className="bg-secondary hover:bg-secondary/90 text-white font-medium px-8 py-6 rounded-lg">
            <Link to="/register">
              <Sparkles className="mr-2 h-5 w-5" />
              Get Started
            </Link>
          </Button>
        )}
        <Button asChild variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 font-medium px-8 py-6 rounded-lg">
          <Link to="/premium">Unlock Premium</Link>
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
