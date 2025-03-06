
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ClipboardCopy, ArrowLeft, ThumbsUp } from 'lucide-react';

interface Bio {
  id: number;
  bio: string;
}

interface ResultsDisplayProps {
  results: Bio[];
  isLoading: boolean;
  onReset: () => void;
  onCopy: (text: string) => void;
}

const ResultsDisplay = ({ results, isLoading, onReset, onCopy }: ResultsDisplayProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Generating LinkedIn bios...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Generated LinkedIn Bios</h3>
          <Button variant="outline" size="sm" onClick={onReset}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>

        <div className="space-y-6">
          {results.map((result) => (
            <div key={result.id} className="bg-accent/20 p-4 rounded-lg relative group">
              <p className="whitespace-pre-line mb-4">{result.bio}</p>
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onCopy(result.bio)}
                  className="text-xs"
                >
                  <ClipboardCopy className="h-3.5 w-3.5 mr-1" />
                  Copy
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
