
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { GENERATION_COST } from '../components/BusinessDescriptionForm';

interface FormData {
  description: string;
  industry: string;
  keywords: string;
}

export const useBusinessNameGenerator = () => {
  const [formData, setFormData] = useState<FormData>({
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

  return {
    formData,
    generatedNames,
    isGenerating,
    insufficientCredits,
    handleInputChange,
    handleGenerate,
    copyToClipboard,
    renderCreditInfo
  };
};
