
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, RotateCcw } from 'lucide-react';
import { Newsletter } from '../hooks/useNewsletterGenerator';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ResultsDisplayProps {
  results: Newsletter[];
  isLoading: boolean;
  onReset: () => void;
  onCopy: (text: string) => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, isLoading, onReset, onCopy }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Generating Newsletters...</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-36 w-full" />
          <Skeleton className="h-36 w-full" />
        </CardContent>
      </Card>
    );
  }

  const formatNewsletterText = (newsletter: Newsletter) => {
    return `Subject: ${newsletter.subjectLine}\n\n${newsletter.body}\n\nDesign Notes: ${newsletter.designNotes}`;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Newsletter Options</CardTitle>
        <Button variant="ghost" size="sm" onClick={onReset}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="1">
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="1" className="flex-1">Option 1</TabsTrigger>
            <TabsTrigger value="2" className="flex-1">Option 2</TabsTrigger>
          </TabsList>
          
          {results.map((result) => (
            <TabsContent key={result.id} value={result.id.toString()} className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Subject Line</h3>
                <div className="bg-accent/10 p-3 rounded-md">{result.subjectLine}</div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Body Content</h3>
                <Textarea 
                  value={result.body}
                  readOnly
                  className="min-h-[300px] font-normal"
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Design Notes</h3>
                <div className="bg-accent/10 p-3 rounded-md">{result.designNotes}</div>
              </div>
              
              <Button 
                onClick={() => onCopy(formatNewsletterText(result))}
                className="mt-4"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Newsletter
              </Button>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
