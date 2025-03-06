
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResultsDisplayProps {
  results: string[];
  isLoading: boolean;
  onReset: () => void;
}

const ResultsDisplay = ({ results, isLoading, onReset }: ResultsDisplayProps) => {
  const { toast } = useToast();
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);
  const [copiedAll, setCopiedAll] = React.useState<boolean>(false);

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

  const copyAllToClipboard = () => {
    navigator.clipboard.writeText(results.join(', '));
    setCopiedAll(true);
    
    toast({
      title: "All tags copied!",
      description: "All tags have been copied to your clipboard.",
    });
    
    setTimeout(() => {
      setCopiedAll(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Your Optimized Etsy Tags</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={copyAllToClipboard}>
            {copiedAll ? (
              <>
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Copied All
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy All
              </>
            )}
          </Button>
          <Button variant="outline" onClick={onReset}>
            <RefreshCw className="h-4 w-4 mr-2" />
            New Tags
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map((tag, index) => (
          <Card key={index} className="p-3 flex justify-between items-center hover:bg-accent/50 transition-colors">
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

      <div className="text-sm text-muted-foreground bg-accent/30 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Tips for using these tags:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Add all 13 tags to maximize your listing's visibility</li>
          <li>Place the most important tags first</li>
          <li>Combine tags with good titles and descriptions for best results</li>
          <li>Update tags periodically based on seasonal trends</li>
          <li>Consider analyzing which tags perform best for future listings</li>
        </ul>
      </div>
    </div>
  );
};

export default ResultsDisplay;
