
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, RotateCcw } from 'lucide-react';
import { AdOption } from '../hooks/useFacebookAdsGenerator';
import { Skeleton } from '@/components/ui/skeleton';

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
          <CardTitle className="text-xl">Generating Facebook Ads...</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-36 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-10 w-48" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Facebook Ad Options</CardTitle>
        <Button variant="ghost" size="sm" onClick={onReset}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={results[0]?.id.toString()}>
          <TabsList className="w-full">
            {results.map((result) => (
              <TabsTrigger 
                key={result.id} 
                value={result.id.toString()}
                className="flex-1"
              >
                Option {result.id}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {results.map((result) => (
            <TabsContent key={result.id} value={result.id.toString()} className="space-y-4 pt-4">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="text-gray-500">Headline</div>
                  <div className="text-xl font-bold">{result.headline}</div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => onCopy(result.headline)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <div className="text-gray-500">Primary Text</div>
                  <div className="text-base">{result.primaryText}</div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => onCopy(result.primaryText)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <div className="text-gray-500">Description</div>
                  <div className="text-base">{result.description}</div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => onCopy(result.description)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <div className="text-gray-500">Call to Action</div>
                  <div className="text-base">{result.cta}</div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => onCopy(result.cta)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                
                <div className="space-y-2 bg-green-50 dark:bg-green-950/20 p-4 rounded-md">
                  <div className="text-gray-500">Suggested Image</div>
                  <div className="text-base italic">{result.imageDescription}</div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => onCopy(result.imageDescription)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                
                <Button 
                  onClick={() => onCopy(`Headline: ${result.headline}\nPrimary Text: ${result.primaryText}\nDescription: ${result.description}\nCTA: ${result.cta}\nImage: ${result.imageDescription}`)}
                  className="w-full mt-6"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy All Content
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
