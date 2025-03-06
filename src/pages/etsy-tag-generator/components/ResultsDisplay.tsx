
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResultsDisplayProps {
  results: string[];
  isLoading: boolean;
  onReset: () => void;
}

const ResultsDisplay = ({ results, isLoading, onReset }: ResultsDisplayProps) => {
  const { toast } = useToast();
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    
    toast({
      title: "Copied to clipboard!",
      description: `"${text}" has been copied to your clipboard.`,
    });
    
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Suggested Etsy Tags</h2>
        <Button variant="outline" onClick={onReset}>
          Generate New Tags
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map((tag, index) => (
          <Card key={index} className="p-3 flex justify-between items-center">
            <span className="font-medium">{tag}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => copyToClipboard(tag, index)}
            >
              {copiedIndex === index ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </Card>
        ))}
      </div>

      <div className="text-sm text-muted-foreground">
        <p>Use these tags in your Etsy listings to improve visibility. Etsy allows up to 13 tags per listing.</p>
      </div>
    </div>
  );
};

export default ResultsDisplay;
