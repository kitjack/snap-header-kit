
import { useState } from 'react';

interface FormData {
  businessDescription: string;
  industry: string;
  tone: string;
}

interface SloganResult {
  id: string;
  text: string;
}

export const useSloganGenerator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    businessDescription: '',
    industry: '',
    tone: 'professional'
  });
  const [results, setResults] = useState<SloganResult[] | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock results
      const generatedSlogans = [
        { id: '1', text: `${formData.industry} excellence, delivered daily.` },
        { id: '2', text: `Your ${formData.industry} journey starts here.` },
        { id: '3', text: `Reimagining ${formData.industry} for tomorrow.` },
        { id: '4', text: `${formData.industry} solutions that make sense.` },
        { id: '5', text: `Building a better ${formData.industry} experience.` }
      ];
      
      setResults(generatedSlogans);
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

  return {
    isLoading,
    error,
    formData,
    results,
    handleInputChange,
    handleSubmit,
    resetForm
  };
};
