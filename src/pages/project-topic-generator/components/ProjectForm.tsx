
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
import { Loader2, AlertCircle, Coins, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GENERATION_COST } from '../hooks/useProjectTopicGenerator';

interface FormData {
  field: string;
  scope: string;
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

const scopeOptions = [
  "small",
  "medium",
  "large"
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
        <Label htmlFor="field">Field/Industry*</Label>
        <Input
          id="field"
          name="field"
          placeholder="e.g. Web Development, Marketing, Education"
          value={formData.field}
          onChange={handleInputChange}
          className="focus-visible:ring-1"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="scope">Project Scope</Label>
        <Select
          value={formData.scope}
          onValueChange={(value) => handleInputChange({
            target: { name: 'scope', value }
          } as React.ChangeEvent<HTMLSelectElement>)}
        >
          <SelectTrigger className="focus-visible:ring-1 w-full">
            <SelectValue placeholder="Select project scope" />
          </SelectTrigger>
          <SelectContent>
            {scopeOptions.map((scope) => (
              <SelectItem key={scope} value={scope}>
                {scope.charAt(0).toUpperCase() + scope.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="keywords">Keywords (Separated by commas)</Label>
        <Input
          id="keywords"
          name="keywords"
          placeholder="e.g. innovation, sustainability, automation"
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
        disabled={isLoading || !user || !formData.field}
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white mt-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Lightbulb className="mr-2 h-4 w-4" />
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
