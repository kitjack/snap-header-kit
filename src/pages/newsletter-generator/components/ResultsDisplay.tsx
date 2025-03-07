
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, RotateCcw, Mail } from 'lucide-react';
import { Newsletter } from '../hooks/useNewsletterGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const [activeTab, setActiveTab] = useState('preview');
  
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
        <Tabs defaultValue="preview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">HTML Format</TabsTrigger>
          </TabsList>
          
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
              
              <TabsContent value="preview" className="mt-0">
                <div className="p-4 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Subject Line</h4>
                    <p className="text-primary text-lg font-medium">{newsletter.subject}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Content</h4>
                    <div className="bg-background p-3 rounded border whitespace-pre-line">
                      {newsletter.content}
                    </div>
                  </div>
                  
                  {newsletter.cta && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Call to Action</h4>
                      <p className="font-medium">{newsletter.cta}</p>
                    </div>
                  )}
                  
                  {newsletter.imageRecommendations && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Recommended Images</h4>
                      <p className="text-muted-foreground italic">{newsletter.imageRecommendations}</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="code" className="mt-0">
                <div className="p-4">
                  <pre className="bg-muted p-3 rounded-md text-xs overflow-auto max-h-[400px]">
                    <code>
{`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${newsletter.subject}</title>
  <style>
    body { 
      font-family: Arial, sans-serif; 
      line-height: 1.6; 
      margin: 0; 
      padding: 0; 
      color: #333; 
    }
    .container { 
      max-width: 600px; 
      margin: 0 auto; 
      padding: 20px; 
    }
    .header { 
      text-align: center; 
      padding: 20px 0; 
    }
    .content { 
      padding: 20px 0; 
    }
    .footer { 
      text-align: center; 
      padding: 20px 0; 
      font-size: 12px; 
      color: #666; 
    }
    .cta-button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${newsletter.subject}</h1>
    </div>
    <div class="content">
      ${newsletter.content.split('\n').map(paragraph => 
        `<p>${paragraph}</p>`
      ).join('')}
      
      ${newsletter.cta ? 
        `<div style="text-align: center">
          <a href="#" class="cta-button">${newsletter.cta}</a>
        </div>` : ''}
    </div>
    <div class="footer">
      <p>© 2024 Your Company. All rights reserved.</p>
      <p><a href="#">Unsubscribe</a> | <a href="#">View in browser</a></p>
    </div>
  </div>
</body>
</html>`}
                    </code>
                  </pre>
                </div>
              </TabsContent>
            </div>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
