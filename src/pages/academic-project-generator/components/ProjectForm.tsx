
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
import { Loader2, AlertCircle, Coins, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GENERATION_COST } from '../hooks/useAcademicProjectGenerator';

interface FormData {
  fieldOfStudy: string;
  academicLevel: string;
  interests: string;
  keywords: string;
}

interface ProjectFormProps {
  formData: FormData;
  isLoading: boolean;
  insufficientCredits: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  renderCreditInfo: () => React.ReactNode;
  user: any;
  profile: any;
}

const academicLevelOptions = [
  "High School",
  "Undergraduate",
  "Masters",
  "PhD",
  "Postdoctoral"
];

const ProjectForm: React.FC<ProjectFormProps> = ({
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
      <h2 className="text-xl font-bold mb-4">Project Details</h2>
      
      <div className="space-y-2">
        <Label htmlFor="fieldOfStudy">Field of Study*</Label>
        <Input
          id="fieldOfStudy"
          name="fieldOfStudy"
          placeholder="e.g. Computer Science, Biology, Economics"
          value={formData.fieldOfStudy}
          onChange={handleInputChange}
          className="focus-visible:ring-1"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="academicLevel">Academic Level</Label>
        <Select
          value={formData.academicLevel}
          onValueChange={(value) => handleInputChange({
            target: { name: 'academicLevel', value }
          } as React.ChangeEvent<HTMLSelectElement>)}
        >
          <SelectTrigger className="focus-visible:ring-1 w-full">
            <SelectValue placeholder="Select your academic level" />
          </SelectTrigger>
          <SelectContent>
            {academicLevelOptions.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="interests">Research Interests</Label>
        <Textarea
          id="interests"
          name="interests"
          placeholder="e.g. AI, sustainable energy, behavioral economics"
          value={formData.interests}
          onChange={handleInputChange}
          className="min-h-[80px] resize-none focus-visible:ring-1"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="keywords">Keywords (Separated by commas)</Label>
        <Input
          id="keywords"
          name="keywords"
          placeholder="e.g. innovation, sustainability, theory, practical"
          value={formData.keywords}
          onChange={handleInputChange}
          className="focus-visible:ring-1"
        />
      </div>
      
      <div className="py-1">
        {renderCreditInfo()}
      </div>
      
      <Button 
        type="submit"
        disabled={isLoading || !user || !formData.fieldOfStudy}
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white mt-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <GraduationCap className="mr-2 h-4 w-4" />
            Generate Project Topics
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

export default ProjectForm;
