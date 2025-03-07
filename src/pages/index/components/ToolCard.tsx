
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  isNew?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  icon: Icon,
  href,
  isNew = false
}) => {
  return (
    <Link to={href}>
      <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/30">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            {isNew && (
              <Badge variant="secondary" className="text-xs font-medium">
                New
              </Badge>
            )}
          </div>
          <h3 className="text-lg font-semibold mt-3 mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </CardContent>
        <CardFooter className="pt-0">
          <span className="text-xs text-primary font-medium flex items-center">
            Try it now
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
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ToolCard;
