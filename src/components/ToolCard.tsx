
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
      </span>
    </Link>
  );
};

export default ToolCard;
