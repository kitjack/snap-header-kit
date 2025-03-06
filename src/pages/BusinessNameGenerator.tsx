
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Briefcase, Copy, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BusinessNameGenerator = () => {
  const [formData, setFormData] = useState({
    description: '',
    industry: '',
    keywords: '',
  });
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenerate = async () => {
    if (!formData.description.trim()) {
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
      const { description, industry, keywords } = formData;
      const keywordsArray = keywords.split(',').map(k => k.trim()).filter(k => k);
      
      let mockNames = [
        `${description} Solutions`,
        `${description} Innovations`,
        `${description} Enterprises`,
        `${description} Global`,
      ];
      
      // Add industry-based names if provided
      if (industry) {
        mockNames.push(`${industry} ${description}`);
        mockNames.push(`${description} ${industry}`);
      }
      
      // Add keyword-based names if provided
      if (keywordsArray.length > 0) {
        keywordsArray.forEach(keyword => {
          mockNames.push(`${keyword} ${description}`);
        });
      }
      
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
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-accent/50 w-12 h-12 rounded-full flex items-center justify-center">
            <Briefcase className="text-primary h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold">Business Name Generator</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6 space-y-4">
              <div>
                <Label htmlFor="description" className="mb-1.5 block">Business Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="What does your business do?"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="min-h-[100px] resize-none focus-visible:ring-1"
                />
              </div>
              
              <div>
                <Label htmlFor="industry" className="mb-1.5 block">Industry</Label>
                <Input
                  id="industry"
                  name="industry"
                  placeholder="Tech, Healthcare, Finance, etc."
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="focus-visible:ring-1"
                />
              </div>
              
              <div>
                <Label htmlFor="keywords" className="mb-1.5 block">Keywords</Label>
                <Input
                  id="keywords"
                  name="keywords"
                  placeholder="Enter keywords, separated by commas"
                  value={formData.keywords}
                  onChange={handleInputChange}
                  className="focus-visible:ring-1"
                />
              </div>
              
              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating || !formData.description.trim()}
                className="w-full bg-teal-400 hover:bg-teal-500 text-white mt-2"
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
          
          {/* Results Section */}
          <Card className={`border-0 shadow-sm ${generatedNames.length === 0 ? 'bg-accent/10' : ''}`}>
            <CardHeader className="pb-0">
              <CardTitle className="text-xl">Results</CardTitle>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <Loader2 className="h-10 w-10 animate-spin text-primary mb-3" />
                  <p className="text-muted-foreground">Generating names...</p>
                </div>
              ) : generatedNames.length > 0 ? (
                <div className="grid grid-cols-1 gap-2 w-full">
                  {generatedNames.map((name, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 bg-accent/20 rounded-md hover:bg-accent/30 transition-colors"
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
                <div className="text-center py-16">
                  <p className="text-sm text-muted-foreground">Results will show here</p>
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
