
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

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
  const { toast } = useToast();
  const { profile } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Check if user has enough credits (if authenticated)
      if (profile && profile.credits < 10) {
        throw new Error('You need at least 10 credits to generate tags. Please upgrade to premium.');
      }

      // Call the Supabase Edge Function
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
      
      // Deduct credits if user is authenticated
      if (profile) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ credits: profile.credits - 10 })
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

  return {
    formData,
    results,
    isLoading,
    error,
    handleInputChange,
    handleSubmit,
    resetForm
  };
};
