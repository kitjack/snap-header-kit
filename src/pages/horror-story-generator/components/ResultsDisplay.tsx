
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, RotateCcw } from 'lucide-react';
import { Story } from '../hooks/useHorrorStoryGenerator';

interface ResultsDisplayProps {
  results: Story[];
  isLoading: boolean;
  onReset: () => void;
  onCopy: (text: string) => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ 
  results, 
  isLoading,
  onReset,
  onCopy
}) => {
  if (!results || results.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Generated Horror Stories</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onReset} 
          disabled={isLoading}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          New Horror Story
        </Button>
      </div>

      <div className="space-y-4">
        {results.map((story) => (
          <Card key={story.id} className="overflow-hidden border shadow hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold text-primary">{story.title}</h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onCopy(`${story.title}\n\n${story.content}`)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                
                <p className="text-md text-muted-foreground whitespace-pre-line leading-relaxed">
                  {story.content}
                </p>

                {story.tags && story.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {story.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-accent text-accent-foreground rounded-md text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ResultsDisplay;
