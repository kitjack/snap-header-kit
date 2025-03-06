
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Briefcase, Copy, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BusinessNameGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Input required",
        description: "Please describe your business to generate names.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      // Mock data for demonstration
      const mockNames = [
        `${prompt} Solutions`,
        `${prompt} Innovations`,
        `${prompt} Enterprises`,
        `${prompt} Global`,
        `${prompt} Tech`,
        `Next${prompt}`,
        `${prompt} Wave`,
        `${prompt} Hub`,
      ];
      
      setGeneratedNames(mockNames);
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Business name copied to clipboard.",
    });
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-accent w-12 h-12 rounded-full flex items-center justify-center">
            <Briefcase className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Business Name Generator</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form Section - Left Side */}
          <Card>
            <CardHeader>
              <CardTitle>Generate business names</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter description of your business (e.g., a tech startup focused on AI solutions for healthcare)"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[120px] mb-4"
              />
              
              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating || !prompt.trim()}
                className="w-full bg-teal-400 hover:bg-teal-500 text-white"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Names'
                )}
              </Button>
            </CardContent>
          </Card>
          
          {/* Results Section - Right Side */}
          <Card className={`h-fit ${generatedNames.length === 0 ? 'bg-accent/20' : ''}`}>
            <CardHeader>
              <CardTitle>Results</CardTitle>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <Loader2 className="h-10 w-10 animate-spin text-primary mb-3" />
                  <p className="text-muted-foreground">Generating creative names...</p>
                </div>
              ) : generatedNames.length > 0 ? (
                <div className="grid grid-cols-1 gap-2 w-full">
                  {generatedNames.map((name, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 bg-accent/30 rounded-md hover:bg-accent/50 transition-colors"
                    >
                      <span className="font-medium">{name}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => copyToClipboard(name)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  <p className="text-sm">Results will show here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default BusinessNameGenerator;
