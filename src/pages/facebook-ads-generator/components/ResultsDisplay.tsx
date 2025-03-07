
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, RotateCcw, ThumbsUp, Bell, ShoppingBag, ArrowRight } from 'lucide-react';
import { AdOption } from '../hooks/useFacebookAdsGenerator';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface ResultsDisplayProps {
  results: AdOption[];
  isLoading: boolean;
  onReset: () => void;
  onCopy: (text: string) => void;
}

const getCTAIcon = (cta: string) => {
  switch (cta.toLowerCase()) {
    case 'learn more':
      return <ArrowRight className="h-4 w-4" />;
    case 'shop now':
      return <ShoppingBag className="h-4 w-4" />;
    case 'sign up':
      return <Bell className="h-4 w-4" />;
    default:
      return <ThumbsUp className="h-4 w-4" />;
  }
};

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
              <div className="bg-accent/10 p-5 rounded-lg space-y-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Headline</div>
                  <div className="font-bold text-lg">{result.headline}</div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => onCopy(result.headline)}
                    className="h-6 px-2"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    <span className="text-xs">Copy</span>
                  </Button>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Primary Text</div>
                  <div>{result.primaryText}</div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => onCopy(result.primaryText)}
                    className="h-6 px-2"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    <span className="text-xs">Copy</span>
                  </Button>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Description</div>
                  <div className="text-sm">{result.description}</div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => onCopy(result.description)}
                    className="h-6 px-2"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    <span className="text-xs">Copy</span>
                  </Button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Call to Action</div>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {getCTAIcon(result.cta)}
                      {result.cta}
                    </Badge>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => onCopy(result.cta)}
                    className="h-6 px-2"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    <span className="text-xs">Copy</span>
                  </Button>
                </div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900 p-5 rounded-lg">
                <div className="text-sm text-muted-foreground mb-2">Suggested Image</div>
                <p className="text-sm italic">{result.imageDescription}</p>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => onCopy(result.imageDescription)}
                  className="h-6 px-2 mt-2"
                >
                  <Copy className="h-3 w-3 mr-1" />
                  <span className="text-xs">Copy</span>
                </Button>
              </div>
              
              <Button 
                onClick={() => onCopy(`Headline: ${result.headline}\nPrimary Text: ${result.primaryText}\nDescription: ${result.description}\nCTA: ${result.cta}\nImage: ${result.imageDescription}`)}
                className="w-full mt-4"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy All Content
              </Button>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
