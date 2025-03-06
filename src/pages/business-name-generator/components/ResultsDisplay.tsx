
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Loader2 } from 'lucide-react';

interface ResultsDisplayProps {
  isGenerating: boolean;
  generatedNames: string[];
  copyToClipboard: (text: string) => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  isGenerating,
  generatedNames,
  copyToClipboard
}) => {
  return (
    <>
      {isGenerating ? (
        <div className="flex flex-col items-center justify-center py-10">
          <Loader2 className="h-10 w-10 animate-spin text-primary mb-3" />
          <p className="text-muted-foreground">Generating names...</p>
        </div>
      ) : generatedNames.length > 0 ? (
        <div className="grid grid-cols-1 gap-2 w-full">
          {generatedNames.map((name, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-3 bg-accent/20 rounded-md hover:bg-accent/30 transition-colors"
            >
              <span className="font-medium">{name}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => copyToClipboard(name)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-sm text-muted-foreground">Results will show here</p>
        </div>
      )}
    </>
  );
};

export default ResultsDisplay;
