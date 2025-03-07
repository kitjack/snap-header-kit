
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, RotateCcw } from 'lucide-react';
import { Newsletter } from '../hooks/useNewsletterGenerator';

interface ResultsDisplayProps {
  results: Newsletter[];
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
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Generating Newsletters...</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">This may take a moment</p>
        </CardContent>
      </Card>
    );
  }

  if (!results || results.length === 0) return null;

  const formatNewsletterForCopy = (newsletter: Newsletter) => {
    let text = `Subject: ${newsletter.subject}\n\n`;
    text += `${newsletter.content}\n\n`;
    
    if (newsletter.cta) {
      text += `Call to Action: ${newsletter.cta}\n\n`;
    }
    
    if (newsletter.imageRecommendations) {
      text += `Recommended Images: ${newsletter.imageRecommendations}`;
    }
    
    return text;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Newsletter Options</CardTitle>
        <Button variant="ghost" size="sm" onClick={onReset}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Create New
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {results.map((newsletter) => (
          <div key={newsletter.id} className="mt-6 border rounded-lg overflow-hidden">
            <div className="bg-muted/30 p-3 border-b flex justify-between items-center">
              <h3 className="font-medium">Option {newsletter.id}</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onCopy(formatNewsletterForCopy(newsletter))}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Subject Line</h4>
                <p className="text-primary text-lg font-medium">{newsletter.subject}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Content</h4>
                <div className="bg-background p-3 rounded border">
                  {/* Strip any markdown formatting by rendering plain text */}
                  {newsletter.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-2">{paragraph.replace(/\*\*/g, '')}</p>
                  ))}
                </div>
              </div>
              
              {newsletter.cta && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Call to Action</h4>
                  <p className="font-medium">{newsletter.cta.replace(/\*\*/g, '')}</p>
                </div>
              )}
              
              {newsletter.imageRecommendations && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Recommended Images</h4>
                  <p className="text-muted-foreground italic">{newsletter.imageRecommendations.replace(/\*\*/g, '')}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
