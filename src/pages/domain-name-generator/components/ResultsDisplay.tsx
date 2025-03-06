
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Copy, Loader2, ExternalLink } from 'lucide-react';

interface DomainResult {
  name: string;
  available?: boolean;
  extension: string;
}

interface ResultsDisplayProps {
  isLoading: boolean;
  results: DomainResult[];
  onCopy?: (domain: string) => void;
  onReset?: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  isLoading,
  results,
  onCopy,
  onReset
}) => {
  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-10">
          <Loader2 className="h-10 w-10 animate-spin text-primary mb-3" />
          <p className="text-muted-foreground">Generating domain names...</p>
        </div>
      ) : results && results.length > 0 ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-2">
            {results.map((domain, index) => (
              <Card key={index} className="border border-muted">
                <CardContent className="flex items-center justify-between p-3">
                  <div className="flex-1">
                    <p className="font-medium text-lg">{domain.name}{domain.extension}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => onCopy && onCopy(`${domain.name}${domain.extension}`)}
                      title="Copy to clipboard"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      asChild
                    >
                      <a 
                        href={`https://whois.domaintools.com/${domain.name}${domain.extension}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        title="Check availability"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Check
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {onReset && (
            <Button 
              variant="outline" 
              onClick={onReset} 
              className="w-full mt-4"
            >
              Reset
            </Button>
          )}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-sm text-muted-foreground">Domain suggestions will appear here</p>
        </div>
      )}
    </>
  );
};

export default ResultsDisplay;
