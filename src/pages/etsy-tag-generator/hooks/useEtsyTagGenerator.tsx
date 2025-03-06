
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Mock API call - In a real implementation, this would call an API endpoint
      // For now, we'll simulate a response after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockTags = generateMockTags(formData);
      setResults(mockTags);
      
      toast({
        title: "Tags generated successfully!",
        description: "We've generated some perfect tags for your Etsy listing.",
      });
    } catch (err) {
      console.error('Error generating tags:', err);
      setError('Failed to generate tags. Please try again later.');
      
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong while generating tags.",
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

// Helper function to generate mock tags based on the input
const generateMockTags = (formData: FormData): string[] => {
  const { productDescription, category, keywords } = formData;
  
  const baseTags = [
    "handmade",
    "custom",
    "unique",
    "personalized",
    "gift idea",
    "trending",
    "bestseller"
  ];
  
  // Generate category-specific tags
  const categoryTags = category
    ? [category.toLowerCase(), `${category.toLowerCase()} gift`, `handmade ${category.toLowerCase()}`]
    : [];
  
  // Extract keywords from product description
  const descriptionWords = productDescription
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 3)
    .slice(0, 5)
    .map(word => word.replace(/[^a-z0-9]/g, ''));
  
  // Process additional keywords
  const additionalKeywords = keywords
    ? keywords.toLowerCase().split(/[,\s]+/).filter(k => k.length > 0)
    : [];
  
  // Combine all tags and remove duplicates
  const allTags = [...new Set([
    ...baseTags,
    ...categoryTags,
    ...descriptionWords,
    ...additionalKeywords
  ])].slice(0, 13); // Etsy allows max 13 tags
  
  return allTags;
};
