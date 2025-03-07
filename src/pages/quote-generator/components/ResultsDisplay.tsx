
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ClipboardCopy } from 'lucide-react';
import { Quote } from '../hooks/useQuoteGenerator';
import { Badge } from '@/components/ui/badge';

interface ResultsDisplayProps {
  results: Quote[];
  isLoading: boolean;
  onReset: () => void;
  onCopy: (text: string) => void;
}

const ResultsDisplay = ({ results, isLoading, onReset, onCopy }: ResultsDisplayProps) => {
  const formatQuoteForCopy = (quote: Quote) => {
    return `"${quote.text}"
- ${quote.author}

Tags: ${quote.tags.join(', ')}`;
  };
  
  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Crafting your quotes...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Your Generated Quotes</h3>
          <Button variant="outline" size="sm" onClick={onReset}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>

        <div className="space-y-6">
          {results.map((quote) => (
            <div key={quote.id} className="bg-accent/20 p-4 rounded-lg relative group">
              <div className="text-lg font-serif italic mb-2">"{quote.text}"</div>
              
              <div className="text-right text-sm font-medium mb-4">
                — {quote.author}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {quote.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs bg-accent/30">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onCopy(formatQuoteForCopy(quote))}
                  className="text-xs"
                >
                  <ClipboardCopy className="h-3.5 w-3.5 mr-1" />
                  Copy Quote
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
