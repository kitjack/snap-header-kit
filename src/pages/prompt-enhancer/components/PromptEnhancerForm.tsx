
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, AlertCircle, Coins, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GENERATION_COST } from '../hooks/usePromptEnhancer';

interface FormData {
  originalPrompt: string;
  promptType: string;
  toneStyle: string;
  additionalContext: string;
}

interface PromptEnhancerFormProps {
  formData: FormData;
  isLoading: boolean;
  insufficientCredits: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  renderCreditInfo: () => React.ReactNode;
  user: any;
  profile: any;
}

const promptTypes = [
  "General",
  "Creative Writing",
  "Technical",
  "Business",
  "Academic",
  "Marketing",
  "Coding",
  "Art Direction",
  "Conversational"
];

const toneStyles = [
  "Neutral",
  "Professional",
  "Friendly",
  "Authoritative",
  "Creative",
  "Technical",
  "Concise",
  "Detailed"
];

const PromptEnhancerForm: React.FC<PromptEnhancerFormProps> = ({
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
  
  const handleTypeChange = (value: string) => {
    const event = {
      target: {
        name: 'promptType',
        value
      }
    } as React.ChangeEvent<HTMLInputElement>;
    handleInputChange(event);
  };

  const handleToneChange = (value: string) => {
    const event = {
      target: {
        name: 'toneStyle',
        value
      }
    } as React.ChangeEvent<HTMLInputElement>;
    handleInputChange(event);
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-accent/50 p-6 rounded-lg space-y-4">
      <h2 className="text-xl font-bold mb-4">Prompt Details</h2>
      
      <div className="space-y-2">
        <Label htmlFor="originalPrompt">Your Original Prompt</Label>
        <Textarea
          id="originalPrompt"
          name="originalPrompt"
          placeholder="Enter the prompt you want to enhance..."
          value={formData.originalPrompt}
          onChange={handleInputChange}
          className="min-h-[100px] resize-none focus-visible:ring-1"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="promptType">Prompt Type</Label>
        <Select
          value={formData.promptType}
          onValueChange={handleTypeChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select prompt type" />
          </SelectTrigger>
          <SelectContent>
            {promptTypes.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="toneStyle">Desired Tone</Label>
        <Select
          value={formData.toneStyle}
          onValueChange={handleToneChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select tone style" />
          </SelectTrigger>
          <SelectContent>
            {toneStyles.map((tone) => (
              <SelectItem key={tone} value={tone}>{tone}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="additionalContext">Additional Context (Optional)</Label>
        <Textarea
          id="additionalContext"
          name="additionalContext"
          placeholder="Any additional context to help refine the prompts..."
          value={formData.additionalContext}
          onChange={handleInputChange}
          className="min-h-[80px] resize-none focus-visible:ring-1"
        />
      </div>
      
      <div className="py-1">
        {renderCreditInfo()}
      </div>
      
      <Button 
        type="submit"
        disabled={isLoading || !user || !formData.originalPrompt}
        className="w-full bg-teal-500 hover:bg-teal-600 text-white mt-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enhancing...
          </>
        ) : (
          <>
            <Zap className="mr-2 h-4 w-4" />
            Enhance Prompt
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

export default PromptEnhancerForm;
