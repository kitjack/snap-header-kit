
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CoverLetter } from '../hooks/useCoverLetterGenerator';

interface ResultsDisplayProps {
  results: CoverLetter[];
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
  // Handle case where results might be malformed
  const validResults = Array.isArray(results) ? results : [];
  
  return (
    <div className="bg-accent/50 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Generated Cover Letters</h2>
      
      <div className="space-y-4 mb-6">
        {validResults.length > 0 ? (
          validResults.map((letter) => (
            <Card key={letter.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  Cover Letter Option {letter.id}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onCopy(letter.content)}
                    className="h-8 w-8 p-0"
                    title="Copy cover letter"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-line text-muted-foreground">
                  {letter.content}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="p-4 text-center text-muted-foreground">
            <p>No valid cover letters found. Please try generating again.</p>
          </Card>
        )}
      </div>
      
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          onClick={onReset}
          disabled={isLoading}
        >
          Generate New Cover Letters
        </Button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
