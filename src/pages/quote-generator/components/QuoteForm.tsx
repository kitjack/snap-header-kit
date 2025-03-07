
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle, Coins, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GENERATION_COST } from '../hooks/useQuoteGenerator';

interface FormData {
  topic: string;
  style: string;
  keywords: string;
}

interface QuoteFormProps {
  formData: FormData;
  isLoading: boolean;
  insufficientCredits: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  renderCreditInfo: () => React.ReactNode;
  user: any;
  profile: any;
}

const QuoteForm: React.FC<QuoteFormProps> = ({
  formData,
  isLoading,
  insufficientCredits,
  handleInputChange,
  handleSubmit,
  renderCreditInfo,
  user,
  profile
}) => {
  const hasLowCredits = profile && profile.credits < GENERATION_COST;
  
  return (
    <form onSubmit={handleSubmit} className="bg-accent/50 p-6 rounded-lg space-y-4">
      <h2 className="text-xl font-bold mb-4">Quote Details</h2>
      
      <div className="space-y-2">
        <Label htmlFor="topic">Topic or Theme</Label>
        <Input
          id="topic"
          name="topic"
          placeholder="e.g. Success, Perseverance, Happiness, Love"
          value={formData.topic}
          onChange={handleInputChange}
          className="focus-visible:ring-1"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="style">Style (Optional)</Label>
        <Input
          id="style"
          name="style"
          placeholder="e.g. Motivational, Philosophical, Poetic, Humorous"
          value={formData.style}
          onChange={handleInputChange}
          className="focus-visible:ring-1"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="keywords">Keywords (Optional, separated by commas)</Label>
        <Textarea
          id="keywords"
          name="keywords"
          placeholder="e.g. inspiration, courage, journey, wisdom"
          value={formData.keywords}
          onChange={handleInputChange}
          className="min-h-[100px] resize-none focus-visible:ring-1"
        />
      </div>
      
      <div className="py-1">
        {renderCreditInfo()}
      </div>
      
      <Button 
        type="submit"
        disabled={isLoading || !user || !formData.topic}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mt-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Quote className="mr-2 h-4 w-4" />
            Generate Quotes
          </>
        )}
      </Button>
      
      {hasLowCredits && (
        <div className="mt-3">
          <div className="flex items-center gap-1 text-sm text-destructive mb-2">
            <AlertCircle className="h-4 w-4" />
            <span>Insufficient credits for generation</span>
          </div>
          <Button 
            asChild
            className="w-full bg-amber-500 hover:bg-amber-600 text-white"
          >
            <Link to="/premium">
              <Coins className="mr-2 h-4 w-4" />
              Top Up Credits
            </Link>
          </Button>
        </div>
      )}
    </form>
  );
};

export default QuoteForm;
