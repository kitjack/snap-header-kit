
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, CheckCircle, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ShopNameResult {
  name: string;
  available: boolean;
  description: string;
}

interface ResultsDisplayProps {
  results: ShopNameResult[];
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
  return (
    <div className="bg-accent/50 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Generated Shop Names</h2>
      
      <div className="space-y-3 mb-6">
        {results.map((result, index) => (
          <div 
            key={index} 
            className="bg-background rounded-md overflow-hidden"
          >
            <div className="flex items-center justify-between p-3 border-b">
              <h3 className="font-semibold">{result.name}</h3>
              <div className="flex items-center gap-2">
                <Badge variant={result.available ? "success" : "destructive"} className="flex items-center gap-1">
                  {result.available ? (
                    <>
                      <CheckCircle className="h-3 w-3" />
                      <span>Likely Available</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-3 w-3" />
                      <span>May Be Taken</span>
                    </>
                  )}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onCopy(result.name)}
                  className="h-8 w-8 p-0"
                  title="Copy to clipboard"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-3 text-sm text-muted-foreground">
              {result.description}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          onClick={onReset}
          disabled={isLoading}
        >
          Generate New Names
        </Button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
