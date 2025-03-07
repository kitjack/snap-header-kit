
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
import { Loader2, AlertCircle, Coins, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GENERATION_COST } from '../hooks/useCoverLetterGenerator';

interface FormData {
  jobTitle: string;
  jobDescription: string;
  workExperience: string;
  skills: string;
  tone: string;
}

interface CoverLetterFormProps {
  formData: FormData;
  isLoading: boolean;
  insufficientCredits: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  renderCreditInfo: () => React.ReactNode;
  user: any;
  profile: any;
}

const toneOptions = [
  "professional",
  "conversational",
  "enthusiastic",
  "confident",
  "formal"
];

const CoverLetterForm: React.FC<CoverLetterFormProps> = ({
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
      <h2 className="text-xl font-bold mb-4">Cover Letter Details</h2>
      
      <div className="space-y-2">
        <Label htmlFor="jobTitle">Job Title*</Label>
        <Input
          id="jobTitle"
          name="jobTitle"
          placeholder="e.g. Software Engineer, Marketing Manager"
          value={formData.jobTitle}
          onChange={handleInputChange}
          className="focus-visible:ring-1"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="jobDescription">Job Description</Label>
        <Textarea
          id="jobDescription"
          name="jobDescription"
          placeholder="Paste the job description here..."
          value={formData.jobDescription}
          onChange={handleInputChange}
          className="min-h-[100px] resize-none focus-visible:ring-1"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="workExperience">Your Work Experience*</Label>
        <Textarea
          id="workExperience"
          name="workExperience"
          placeholder="Summarize your relevant work experience..."
          value={formData.workExperience}
          onChange={handleInputChange}
          className="min-h-[100px] resize-none focus-visible:ring-1"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="skills">Key Skills</Label>
        <Textarea
          id="skills"
          name="skills"
          placeholder="List your relevant skills..."
          value={formData.skills}
          onChange={handleInputChange}
          className="min-h-[80px] resize-none focus-visible:ring-1"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="tone">Tone</Label>
        <Select
          value={formData.tone}
          onValueChange={(value) => handleInputChange({
            target: { name: 'tone', value }
          } as React.ChangeEvent<HTMLSelectElement>)}
        >
          <SelectTrigger className="focus-visible:ring-1 w-full">
            <SelectValue placeholder="Select tone style" />
          </SelectTrigger>
          <SelectContent>
            {toneOptions.map((tone) => (
              <SelectItem key={tone} value={tone}>
                {tone.charAt(0).toUpperCase() + tone.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="py-1">
        {renderCreditInfo()}
      </div>
      
      <Button 
        type="submit"
        disabled={isLoading || !user || !formData.jobTitle || !formData.workExperience}
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white mt-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <FileText className="mr-2 h-4 w-4" />
            Generate Cover Letters
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

export default CoverLetterForm;
