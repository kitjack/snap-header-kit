import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import AuthRequiredNotice from '@/components/AuthRequiredNotice';
import { AlertCircle } from 'lucide-react';

export const GENERATION_COST = 10;

interface FormData {
  productDescription: string;
  category: string;
  keywords: string;
}

const initialFormState: FormData = {
  productDescription: '',
  category: '',
  keywords: '',
};

export const useEtsyTagGenerator = () => {
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [results, setResults] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [insufficientCredits, setInsufficientCredits] = useState(false);
  const { toast } = useToast();
  const { user, profile } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (profile && profile.credits < GENERATION_COST) {
        throw new Error('You need at least 10 credits to generate tags. Please upgrade to premium.');
      }

      const { data, error: functionError } = await supabase.functions.invoke('generate-etsy-tags', {
        body: {
          productDescription: formData.productDescription,
          category: formData.category,
          keywords: formData.keywords
        }
      });

      if (functionError) {
        throw new Error(functionError.message || 'Failed to generate tags');
      }

      if (!data || !data.tags) {
        throw new Error('No tags were generated. Please try again.');
      }

      setResults(data.tags);
      
      if (profile) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ credits: profile.credits - GENERATION_COST })
          .eq('id', profile.id);
          
        if (updateError) {
          console.error('Error updating credits:', updateError);
        }
      }
      
      toast({
        title: "Tags generated successfully!",
        description: "We've generated some perfect tags for your Etsy listing.",
      });
    } catch (err) {
      console.error('Error generating tags:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate tags. Please try again later.');
      
      toast({
        variant: "destructive",
        title: "Error",
        description: err instanceof Error ? err.message : "Something went wrong while generating tags.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setResults(null);
  };

  const renderCreditInfo = () => {
    if (!user) return <AuthRequiredNotice />;
    
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
    handleInputChange,
    handleSubmit,
    resetForm,
    renderCreditInfo,
    insufficientCredits
  };
};
