
import React from 'react';
import { Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ToolCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  linkTo: string;
}

const ToolCard = ({ title, description, icon, linkTo }: ToolCardProps) => {
  return (
    <Link 
      to={linkTo} 
      className="block bg-accent/50 p-6 rounded-xl transition-all hover:bg-accent/70"
    >
      <div className="bg-accent w-12 h-12 rounded-full flex items-center justify-center mb-4">
        {icon || <Briefcase className="text-primary" />}
      </div>
      
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      
      <span className="inline-flex items-center text-primary font-medium">
        Generate
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="ml-1"
        >
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </span>
    </Link>
  );
};

export default ToolCard;
