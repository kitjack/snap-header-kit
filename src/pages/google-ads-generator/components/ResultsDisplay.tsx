
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, RotateCcw } from 'lucide-react';
import { AdOption } from '../hooks/useGoogleAdsGenerator';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';

interface ResultsDisplayProps {
  results: AdOption[];
  isLoading: boolean;
  onReset: () => void;
  onCopy: (text: string) => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, isLoading, onReset, onCopy }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Generating Google Ads...</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-36 w-full" />
          <Skeleton className="h-36 w-full" />
        </CardContent>
      </Card>
    );
  }

  const formatAdText = (ad: AdOption) => {
    return `Headline: ${ad.headline}\n\nDescription Line 1: ${ad.description1}\n\nDescription Line 2: ${ad.description2}\n\nCall to Action: ${ad.callToAction}`;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Google Ad Options</CardTitle>
        <Button variant="ghost" size="sm" onClick={onReset}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {results.map((result) => (
          <div key={result.id} className="space-y-2">
            <h3 className="font-medium">Option {result.id}</h3>
            <Textarea 
              value={formatAdText(result)}
              readOnly
              className="min-h-[200px] font-normal"
            />
            <Button 
              onClick={() => onCopy(formatAdText(result))}
              size="sm"
              className="mt-2"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Ad
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
