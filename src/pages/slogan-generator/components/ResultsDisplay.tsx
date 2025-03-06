
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SloganResult {
  id: string;
  text: string;
}

interface ResultsDisplayProps {
  results: SloganResult[];
  isLoading: boolean;
  onReset: () => void;
}

const ResultsDisplay = ({ results, isLoading, onReset }: ResultsDisplayProps) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Slogan copied to clipboard",
    });
  };

  return (
    <div className="bg-accent/50 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Generated Slogans</h2>
      
      <div className="space-y-3 mb-6">
        {results.map((result) => (
          <div 
            key={result.id} 
            className="flex items-center justify-between p-3 bg-background rounded-md"
          >
            <p className="font-medium">{result.text}</p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => copyToClipboard(result.text)}
              title="Copy to clipboard"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          onClick={onReset}
          disabled={isLoading}
        >
          Create New Slogans
        </Button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
