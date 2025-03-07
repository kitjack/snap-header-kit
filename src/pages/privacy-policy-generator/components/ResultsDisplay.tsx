
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, RotateCcw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';

interface ResultsDisplayProps {
  result: string;
  isLoading: boolean;
  onReset: () => void;
  onCopy: (text: string) => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, isLoading, onReset, onCopy }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Generating Privacy Policy...</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Privacy Policy Text</CardTitle>
        <Button variant="ghost" size="sm" onClick={onReset}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea 
          value={result}
          readOnly
          className="min-h-[300px] font-normal"
        />
        <Button 
          onClick={() => onCopy(result)}
          size="sm"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy Text
        </Button>
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
