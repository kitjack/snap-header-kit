
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SimpleToolCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const SimpleToolCard = ({
  id,
  title,
  description,
  icon
}: SimpleToolCardProps) => {
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="text-primary">
            {icon}
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* No content here, just spacing */}
      </CardContent>
      <CardFooter>
        <Button asChild className="text-white bg-primary hover:bg-primary/90 w-full">
          <Link to={`/tool/${id}`}>
            Try Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SimpleToolCard;
