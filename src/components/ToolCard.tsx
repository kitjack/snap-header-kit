
import React from 'react';
import { Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ToolCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  linkTo: string;
}

const ToolCard = ({ title, description, icon, linkTo }: ToolCardProps) => {
  return (
    <div className="bg-accent/50 p-6 rounded-xl hover:shadow-md transition-all">
      <div className="bg-accent w-12 h-12 rounded-full flex items-center justify-center mb-4">
        {icon || <Briefcase className="text-primary" />}
      </div>
      
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      
      <Button asChild variant="outline" className="text-primary border-primary hover:bg-primary/10">
        <Link to={linkTo}>Try Now</Link>
      </Button>
    </div>
  );
};

export default ToolCard;
