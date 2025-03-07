
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ClipboardCopy } from 'lucide-react';
import { Poem } from '../hooks/useShortPoemGenerator';

interface ResultsDisplayProps {
  results: Poem[];
  isLoading: boolean;
  onReset: () => void;
  onCopy: (text: string) => void;
}

const ResultsDisplay = ({ results, isLoading, onReset, onCopy }: ResultsDisplayProps) => {
  const formatPoemForCopy = (poem: Poem) => {
    return `${poem.title}

${poem.content}

Style: ${poem.style}
${poem.analysis}`;
  };
  
  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Crafting your poems...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Your Generated Poems</h3>
          <Button variant="outline" size="sm" onClick={onReset}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>

        <div className="space-y-6">
          {results.map((poem) => (
            <div key={poem.id} className="bg-accent/20 p-4 rounded-lg relative group">
              <h4 className="font-semibold text-lg mb-2">{poem.title}</h4>
              <div className="whitespace-pre-line mb-4">{poem.content}</div>
              
              <div className="text-sm text-muted-foreground mb-2">
                <span className="font-medium">Style:</span> {poem.style}
              </div>
              
              <div className="text-sm text-muted-foreground mb-4">
                <span className="font-medium">Analysis:</span> {poem.analysis}
              </div>
              
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onCopy(formatPoemForCopy(poem))}
                  className="text-xs"
                >
                  <ClipboardCopy className="h-3.5 w-3.5 mr-1" />
                  Copy Poem
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
