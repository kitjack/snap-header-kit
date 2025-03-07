
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ClipboardCopy, Quote } from 'lucide-react';
import { Quote as QuoteType } from '../hooks/useQuoteGenerator';

interface ResultsDisplayProps {
  results: QuoteType[];
  isLoading: boolean;
  onReset: () => void;
  onCopy: (text: string) => void;
}

const ResultsDisplay = ({ results, isLoading, onReset, onCopy }: ResultsDisplayProps) => {
  const formatQuoteForCopy = (quote: QuoteType) => {
    return `"${quote.quote}"

- ${quote.author}

${quote.context}`;
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
              <div className="absolute top-3 left-3 text-indigo-400 opacity-20">
                <Quote size={32} />
              </div>
              
              <div className="pl-6">
                <p className="font-serif text-lg mb-2 italic">"{quote.quote}"</p>
                
                <p className="text-right font-medium text-muted-foreground">
                  — {quote.author}
                </p>
              </div>
              
              <div className="mt-4 pt-3 border-t border-border text-sm text-muted-foreground">
                <p>{quote.context}</p>
              </div>
              
              <div className="flex justify-end mt-3">
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
