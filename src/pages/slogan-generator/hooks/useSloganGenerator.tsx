
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface FormData {
  businessDescription: string;
  industry: string;
  tone: string;
}

interface SloganResult {
  id: string;
  text: string;
}

// Cost per generation in credits
export const GENERATION_COST = 5;

export const useSloganGenerator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    businessDescription: '',
    industry: '',
    tone: 'professional'
  });
  const [results, setResults] = useState<SloganResult[] | null>(null);
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const [insufficientCredits, setInsufficientCredits] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
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
        toast({
          title: "Insufficient Credits",
          description: `You need ${GENERATION_COST} credits to generate slogans. Please upgrade your plan.`,
          variant: "destructive",
        });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Check if user is logged in
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to generate slogans.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Call the Edge Function to generate slogans
      const { data: generationData, error: generationError } = await supabase.functions.invoke(
        'generate-slogans',
        {
          body: {
            businessDescription: formData.businessDescription,
            industry: formData.industry,
            tone: formData.tone,
            userId: user.id
          }
        }
      );

      if (generationError) {
        console.error('Error calling function:', generationError);
        toast({
          title: "Generation Failed",
          description: "Failed to generate slogans. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Make sure we have results
      if (!generationData || !generationData.slogans || generationData.slogans.length === 0) {
        toast({
          title: "No Results",
          description: "No slogans were generated. Please try a different description.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // We have successful results, now deduct credits
      const deductionSuccessful = await deductCredits();
      if (!deductionSuccessful) {
        setIsLoading(false);
        return;
      }

      // Store result in database
      const { error: saveError } = await supabase.from('ai_tool_results').insert({
        user_id: user.id,
        tool_id: 'slogan-generator',
        prompt: JSON.stringify({
          businessDescription: formData.businessDescription,
          industry: formData.industry,
          tone: formData.tone
        }),
        result: JSON.stringify(generationData.slogans)
      });

      if (saveError) {
        console.error('Error saving result:', saveError);
      }

      // Update UI with generated slogans
      setResults(generationData.slogans);
    } catch (err) {
      setError('Failed to generate slogans. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      businessDescription: '',
      industry: '',
      tone: 'professional'
    });
    setResults(null);
  };

  const renderCreditInfo = () => {
    if (!user) return <div className="text-sm text-amber-600">Login to generate slogans</div>;
    
    if (insufficientCredits) {
      return (
        <div className="flex items-center gap-1 text-sm text-destructive">
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
    isLoading,
    error,
    formData,
    results,
    insufficientCredits,
    handleInputChange,
    handleSubmit,
    resetForm,
    renderCreditInfo
  };
};
