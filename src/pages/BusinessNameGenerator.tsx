
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Briefcase, Copy, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

// Cost per generation in credits
const GENERATION_COST = 10;

const BusinessNameGenerator = () => {
  const [formData, setFormData] = useState({
    description: '',
    industry: '',
    keywords: '',
  });
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [insufficientCredits, setInsufficientCredits] = useState(false);
  const { toast } = useToast();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    // Reset insufficient credits state when profile changes
    if (profile && profile.credits >= GENERATION_COST) {
      setInsufficientCredits(false);
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const deductCredits = async () => {
    if (!user) return false;
    
    try {
      // Check if user has enough credits
      if (!profile || profile.credits < GENERATION_COST) {
        setInsufficientCredits(true);
        return false;
      }

      // Update credits in database
      const { error } = await supabase
        .from('profiles')
        .update({ credits: profile.credits - GENERATION_COST })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating credits:', error);
        toast({
          title: "Error",
          description: "Failed to update credits. Please try again.",
          variant: "destructive",
        });
        return false;
      }

      // Success
      return true;
    } catch (error) {
      console.error('Error in deductCredits:', error);
      return false;
    }
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

    // Check if user is logged in
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to generate business names.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Call the OpenAI function to generate names
      const { data: generationData, error: generationError } = await supabase.functions.invoke(
        'generate-business-names',
        {
          body: {
            description: formData.description,
            industry: formData.industry,
            keywords: formData.keywords,
            userId: user.id
          }
        }
      );

      if (generationError) {
        console.error('Error calling function:', generationError);
        toast({
          title: "Generation Failed",
          description: "Failed to generate business names. Please try again.",
          variant: "destructive",
        });
        setIsGenerating(false);
        return;
      }

      // Make sure we have results
      if (!generationData || !generationData.businessNames || generationData.businessNames.length === 0) {
        toast({
          title: "No Results",
          description: "No business names were generated. Please try a different description.",
          variant: "destructive",
        });
        setIsGenerating(false);
        return;
      }

      // We have successful results, now deduct credits
      const deductionSuccessful = await deductCredits();
      if (!deductionSuccessful) {
        setIsGenerating(false);
        if (!insufficientCredits) {
          toast({
            title: "Error",
            description: "Failed to process credits. Please try again.",
            variant: "destructive",
          });
        }
        return;
      }

      // Store result in database
      const { error: saveError } = await supabase.from('ai_tool_results').insert({
        user_id: user.id,
        tool_id: 'business-name-generator',
        prompt: JSON.stringify({
          description: formData.description,
          industry: formData.industry,
          keywords: formData.keywords,
          openAiPrompt: generationData.prompt
        }),
        result: JSON.stringify(generationData.businessNames)
      });

      if (saveError) {
        console.error('Error saving result:', saveError);
      }

      // Update UI with generated names
      setGeneratedNames(generationData.businessNames);
    } catch (error) {
      console.error('Error in handleGenerate:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Business name copied to clipboard.",
    });
  };

  const renderCreditInfo = () => {
    if (loading) return <div className="text-sm text-muted-foreground">Loading credits...</div>;
    
    if (!user) return <div className="text-sm text-amber-600">Login to generate names</div>;
    
    if (insufficientCredits) {
      return (
        <div className="flex items-center gap-1 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          <span>Insufficient credits</span>
        </div>
      );
    }
    
    return (
      <div className="text-sm text-muted-foreground">
        Cost: <span className="font-semibold text-secondary">{GENERATION_COST} credits</span> | 
        Available: <span className="font-semibold text-secondary">{profile?.credits || 0} credits</span>
      </div>
    );
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
              
              <div className="py-1">
                {renderCreditInfo()}
              </div>
              
              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating || !formData.description.trim() || !user || (profile && profile.credits < GENERATION_COST)}
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
