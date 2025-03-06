
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { GENERATION_COST } from '../components/DomainNameForm';
import { AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface FormData {
  keywords: string;
  industry: string;
  extensions: string;
}

interface DomainResult {
  name: string;
  available?: boolean;
  extension: string;
}

export const useDomainNameGenerator = () => {
  const [formData, setFormData] = useState<FormData>({
    keywords: '',
    industry: '',
    extensions: 'All Popular Extensions'
  });
  const [results, setResults] = useState<DomainResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [insufficientCredits, setInsufficientCredits] = useState(false);
  const { toast } = useToast();
  const { user, profile } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.keywords.trim()) {
      toast({
        title: "Input required",
        description: "Please enter keywords to generate domain names.",
        variant: "destructive",
      });
      return;
    }

    // Check if user is logged in
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to generate domain names.",
        variant: "destructive",
      });
      return;
    }

    // Check if user has enough credits
    if (profile && profile.credits < GENERATION_COST) {
      setInsufficientCredits(true);
      toast({
        title: "Insufficient credits",
        description: `You need ${GENERATION_COST} credits to generate domain names.`,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setInsufficientCredits(false);
    
    try {
      console.log("Calling generate-domain-names function with:", {
        keywords: formData.keywords,
        industry: formData.industry,
        extensions: formData.extensions,
        userId: user.id
      });
      
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('generate-domain-names', {
        body: {
          keywords: formData.keywords,
          industry: formData.industry,
          extensions: formData.extensions,
          userId: user.id
        }
      });

      console.log("Edge function response:", data, error);

      if (error) {
        throw new Error(error.message);
      }

      if (!data || !data.domains) {
        throw new Error('Failed to generate domain names');
      }

      setResults(data.domains);

      // Deduct credits - using direct Supabase update instead of updateUserProfile
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
            title: "Credits used",
            description: `${GENERATION_COST} credits have been deducted from your account.`,
          });
        }
      }
    } catch (err) {
      console.error('Error generating domain names:', err);
      setError("Failed to generate domain names. Please try again.");
      toast({
        title: "Error",
        description: "Failed to generate domain names. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (domain: string) => {
    navigator.clipboard.writeText(domain);
    toast({
      title: "Copied!",
      description: "Domain name copied to clipboard.",
    });
  };

  const resetForm = () => {
    setResults([]);
  };

  const renderCreditInfo = () => {
    if (!user) return <div className="text-sm text-amber-600">Login to generate domain names</div>;
    
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
    handleSelectChange,
    handleSubmit,
    copyToClipboard,
    renderCreditInfo,
    resetForm
  };
};
