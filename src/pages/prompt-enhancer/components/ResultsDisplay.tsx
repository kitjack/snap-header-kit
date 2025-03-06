
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, CheckCircle, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface EnhancedPrompt {
  id: string;
  enhancedPrompt: string;
  explanation: string;
  rating: number;
}

interface ResultsDisplayProps {
  results: EnhancedPrompt[];
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
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  // Sort results by rating (highest first)
  const sortedResults = [...results].sort((a, b) => b.rating - a.rating);
  
  return (
    <div className="bg-accent/50 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Enhanced Prompts</h2>
      
      <div className="space-y-4 mb-6">
        {sortedResults.map((result) => {
          const isExpanded = expandedId === result.id;
          
          return (
            <div 
              key={result.id} 
              className="bg-background rounded-md overflow-hidden transition-all"
            >
              <div 
                className="p-3 border-b cursor-pointer hover:bg-muted/10"
                onClick={() => toggleExpand(result.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold">Enhanced Prompt</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="success" className="flex items-center gap-1">
                      <span>Rating: {result.rating}/10</span>
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        onCopy(result.enhancedPrompt);
                      }}
                      className="h-8 w-8 p-0"
                      title="Copy to clipboard"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-2 text-sm">
                  <p className={`${isExpanded ? '' : 'line-clamp-2'}`}>
                    {result.enhancedPrompt}
                  </p>
                </div>
              </div>
              
              {isExpanded && (
                <div className="p-3 text-sm text-muted-foreground bg-accent/10 border-t">
                  <h4 className="font-medium text-foreground mb-1">Why this works better:</h4>
                  <p>{result.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          onClick={onReset}
          disabled={isLoading}
        >
          Enhance Another Prompt
        </Button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
