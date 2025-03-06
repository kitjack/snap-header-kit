
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';

// Cost per generation in credits
export const GENERATION_COST = 10;

interface FormData {
  description: string;
  industry: string;
  keywords: string;
}

interface BusinessDescriptionFormProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleGenerate: () => Promise<void>;
  isGenerating: boolean;
  insufficientCredits: boolean;
  renderCreditInfo: () => React.ReactNode;
  user: any;
  profile: any;
}

const BusinessDescriptionForm: React.FC<BusinessDescriptionFormProps> = ({
  formData,
  handleInputChange,
  handleGenerate,
  isGenerating,
  insufficientCredits,
  renderCreditInfo,
  user,
  profile
}) => {
  const hasLowCredits = profile && profile.credits < GENERATION_COST;
  
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="description" className="mb-1.5 block">Business Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="What does your business do?"
          value={formData.description}
          onChange={handleInputChange}
          className="min-h-[100px] resize-none focus-visible:ring-1"
        />
      </div>
      
      <div>
        <Label htmlFor="industry" className="mb-1.5 block">Industry</Label>
        <Input
          id="industry"
          name="industry"
          placeholder="Tech, Healthcare, Finance, etc."
          value={formData.industry}
          onChange={handleInputChange}
          className="focus-visible:ring-1"
        />
      </div>
      
      <div>
        <Label htmlFor="keywords" className="mb-1.5 block">Keywords</Label>
        <Input
          id="keywords"
          name="keywords"
          placeholder="Enter keywords, separated by commas"
          value={formData.keywords}
          onChange={handleInputChange}
          className="focus-visible:ring-1"
        />
      </div>
      
      <div className="py-1">
        {renderCreditInfo()}
      </div>
      
      <Button 
        onClick={handleGenerate} 
        disabled={isGenerating || !formData.description.trim() || !user}
        className="w-full bg-teal-400 hover:bg-teal-500 text-white mt-2"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          'Generate Names'
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
    </div>
  );
};

export default BusinessDescriptionForm;
