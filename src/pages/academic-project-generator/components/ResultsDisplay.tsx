
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ProjectTopic } from '../hooks/useAcademicProjectGenerator';

interface ResultsDisplayProps {
  results: ProjectTopic[];
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
  const copyFullTopic = (topic: ProjectTopic) => {
    const fullText = `
Title: ${topic.title}

Description: ${topic.description}

Approach: ${topic.approach}

Significance: ${topic.significance}
    `.trim();
    
    onCopy(fullText);
  };
  
  return (
    <div className="bg-accent/50 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Generated Project Topics</h2>
      
      <div className="space-y-4 mb-6">
        {results.map((topic) => (
          <Card key={topic.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                {topic.title}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => copyFullTopic(topic)}
                  className="h-8 w-8 p-0"
                  title="Copy full topic details"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="text-sm font-medium">Description:</h4>
                <p className="text-sm text-muted-foreground">{topic.description}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium">Research Approach:</h4>
                <p className="text-sm text-muted-foreground">{topic.approach}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium">Significance:</h4>
                <p className="text-sm text-muted-foreground">{topic.significance}</p>
              </div>
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
          Generate New Topics
        </Button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
