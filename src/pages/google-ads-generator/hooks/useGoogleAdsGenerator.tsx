
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { AlertCircle } from 'lucide-react';

// Cost per generation in credits
export const GENERATION_COST = 10;

interface FormData {
  productType: string;
  targetAudience: string;
  adStyle: string;
  keywords: string;
}

export interface AdOption {
  id: number;
  headline: string;
  description1: string;
  description2: string;
  callToAction: string;
}

export const useGoogleAdsGenerator = () => {
  const [formData, setFormData] = useState<FormData>({
    productType: '',
    targetAudience: '',
    adStyle: 'professional',
    keywords: '',
  });
  const [results, setResults] = useState<AdOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [insufficientCredits, setInsufficientCredits] = useState(false);
  const { toast } = useToast();
  const { user, profile } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!formData.productType || !formData.targetAudience) {
      toast({
        title: "Input required",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Check if user is logged in
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to generate Google ads.",
        variant: "destructive",
      });
      return;
    }

    // Check if user has enough credits
    if (profile && profile.credits < GENERATION_COST) {
      setInsufficientCredits(true);
      toast({
        title: "Insufficient credits",
        description: `You need ${GENERATION_COST} credits to generate Google ads.`,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setInsufficientCredits(false);
    
    try {
      console.log("Calling generate-google-ads function with:", {
        productType: formData.productType,
        targetAudience: formData.targetAudience,
        adStyle: formData.adStyle,
        keywords: formData.keywords,
        userId: user.id
      });
      
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('generate-google-ads', {
        body: {
          productType: formData.productType,
          targetAudience: formData.targetAudience,
          adStyle: formData.adStyle,
          keywords: formData.keywords,
          userId: user.id
        }
      });

      console.log("Edge function response:", data, error);

      if (error) {
        throw new Error(error.message);
      }

      if (!data || !data.adOptions || data.adOptions.length === 0) {
        throw new Error('Failed to generate Google ads');
      }

      setResults(data.adOptions);

      // Deduct credits
      if (profile) {
        const newCredits = profile.credits - GENERATION_COST;
        
        // Update the credits in the profiles table
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ credits: newCredits })
          .eq('id', user.id);
          
        if (updateError) {
          console.error('Error updating credits:', updateError);
          toast({
            title: "Error",
            description: "Failed to update credits. Please refresh the page.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Google ads generated!",
            description: `${GENERATION_COST} credits have been deducted from your account.`,
          });
        }
      }
      
      // Store the result in database
      const { error: saveError } = await supabase
        .from('ai_tool_results')
        .insert({
          user_id: user.id,
          tool_id: 'google-ads-generator',
          prompt: JSON.stringify(formData),
          result: JSON.stringify(data.adOptions)
        });
        
      if (saveError) {
        console.error('Error saving results:', saveError);
      }
    } catch (err: any) {
      console.error('Error generating Google ads:', err);
      setError("Failed to generate Google ads. Please try again.");
      toast({
        title: "Error",
        description: "Failed to generate Google ads. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Ad content copied to clipboard.",
    });
  };

  const resetForm = () => {
    setResults([]);
  };

  const renderCreditInfo = () => {
    if (!user) return <div className="text-sm text-amber-600">Login to generate Google ads</div>;
    
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
    results,
    isLoading,
    error,
    insufficientCredits,
    handleInputChange,
    handleSubmit,
    copyToClipboard,
    renderCreditInfo,
    resetForm
  };
};
