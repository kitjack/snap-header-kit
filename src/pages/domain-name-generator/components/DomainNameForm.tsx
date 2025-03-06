
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
  keywords: string;
  industry: string;
  extensions: string;
}

interface DomainNameFormProps {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: () => Promise<void>;
  isLoading: boolean;
  insufficientCredits?: boolean;
  renderCreditInfo?: () => React.ReactNode;
  user?: any;
  profile?: any;
}

const DomainNameForm: React.FC<DomainNameFormProps> = ({
  formData,
  onChange,
  onSubmit,
  isLoading,
  insufficientCredits,
  renderCreditInfo,
  user,
  profile
}) => {
  const hasLowCredits = profile && profile?.credits < GENERATION_COST;
  
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="keywords" className="mb-1.5 block">Keywords</Label>
        <Textarea
          id="keywords"
          name="keywords"
          placeholder="Enter keywords that describe your website or business"
          value={formData.keywords}
          onChange={onChange}
          className="min-h-[100px] resize-none focus-visible:ring-1"
        />
      </div>
      
      <div>
        <Label htmlFor="industry" className="mb-1.5 block">Industry</Label>
        <Input
          id="industry"
          name="industry"
          placeholder="Technology, Healthcare, Education, etc."
          value={formData.industry}
          onChange={onChange}
          className="focus-visible:ring-1"
        />
      </div>
      
      <div>
        <Label htmlFor="extensions" className="mb-1.5 block">Domain Extensions</Label>
        <Input
          id="extensions"
          name="extensions"
          placeholder=".com, .io, .net, .org (comma separated)"
          value={formData.extensions}
          onChange={onChange}
          className="focus-visible:ring-1"
        />
        <p className="text-xs text-muted-foreground mt-1">Leave empty to include all popular extensions</p>
      </div>
      
      {renderCreditInfo && (
        <div className="py-1">
          {renderCreditInfo()}
        </div>
      )}
      
      <Button 
        onClick={onSubmit} 
        disabled={isLoading || !formData.keywords.trim() || (user && insufficientCredits)}
        className="w-full bg-teal-400 hover:bg-teal-500 text-white mt-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          'Generate Domain Names'
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

export default DomainNameForm;
