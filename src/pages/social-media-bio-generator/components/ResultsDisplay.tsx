
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BioResult {
  id: number;
  bio: string;
}

interface ResultsDisplayProps {
  results: BioResult[];
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
      <h2 className="text-xl font-bold mb-4">Generated Bios</h2>
      
      <div className="space-y-4 mb-6">
        {results.map((result) => (
          <Card key={result.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                Option {result.id}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onCopy(result.bio)}
                  className="h-8 w-8 p-0"
                  title="Copy to clipboard"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{result.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          onClick={onReset}
          disabled={isLoading}
        >
          Generate New Bios
        </Button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
