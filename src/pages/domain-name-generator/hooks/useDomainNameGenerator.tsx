
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { GENERATION_COST } from '../components/DomainNameForm';
import { AlertCircle } from 'lucide-react';

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
    extensions: '.com,.net,.org,.io'
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

  const generateDomainNames = async () => {
    // This is a mock implementation. In a real app, you would call an API
    // or use a service to generate domain names and check availability
    const keywords = formData.keywords.split(/[\s,]+/).filter(k => k.length > 0);
    const extensions = formData.extensions.trim() 
      ? formData.extensions.split(/[\s,]+/).filter(e => e.startsWith('.'))
      : ['.com', '.net', '.org', '.io'];

    // Generate domains based on keywords
    const domains: DomainResult[] = [];
    
    // Add direct keyword domains
    keywords.forEach(keyword => {
      extensions.forEach(ext => {
        if (keyword.length > 2) {
          domains.push({
            name: keyword.toLowerCase().replace(/[^a-z0-9]/g, ''),
            extension: ext,
            available: Math.random() > 0.5 // Random availability for demo
          });
        }
      });
    });
    
    // Add keyword combinations
    if (keywords.length >= 2) {
      for (let i = 0; i < keywords.length; i++) {
        for (let j = i + 1; j < keywords.length; j++) {
          const combo = keywords[i] + keywords[j];
          if (combo.length > 3 && combo.length < 20) {
            domains.push({
              name: combo.toLowerCase().replace(/[^a-z0-9]/g, ''),
              extension: extensions[Math.floor(Math.random() * extensions.length)],
              available: Math.random() > 0.5
            });
          }
        }
      }
    }
    
    // Add industry-specific domains
    if (formData.industry) {
      const industryWord = formData.industry.toLowerCase().replace(/[^a-z0-9]/g, '');
      keywords.forEach(keyword => {
        if (keyword.length > 2) {
          domains.push({
            name: keyword.toLowerCase().replace(/[^a-z0-9]/g, '') + industryWord,
            extension: extensions[Math.floor(Math.random() * extensions.length)],
            available: Math.random() > 0.5
          });
          
          domains.push({
            name: industryWord + keyword.toLowerCase().replace(/[^a-z0-9]/g, ''),
            extension: extensions[Math.floor(Math.random() * extensions.length)],
            available: Math.random() > 0.5
          });
        }
      });
    }
    
    // Add some creative variations
    keywords.forEach(keyword => {
      if (keyword.length > 3) {
        ['my', 'get', 'the', 'top', 'best'].forEach(prefix => {
          domains.push({
            name: prefix + keyword.toLowerCase().replace(/[^a-z0-9]/g, ''),
            extension: extensions[Math.floor(Math.random() * extensions.length)],
            available: Math.random() > 0.5
          });
        });
      }
    });
    
    // Shuffle and limit results
    const shuffled = domains
      .sort(() => 0.5 - Math.random())
      .filter((domain, index, self) => 
        // Remove duplicates
        index === self.findIndex(d => d.name === domain.name && d.extension === domain.extension)
      )
      .slice(0, 10);
    
    return shuffled;
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

    setIsLoading(true);
    setError(null);
    
    try {
      const generatedDomains = await generateDomainNames();
      setResults(generatedDomains);
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
    handleSubmit,
    copyToClipboard,
    renderCreditInfo,
    resetForm
  };
};
