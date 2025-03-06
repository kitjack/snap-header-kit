
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle, Coins, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GENERATION_COST } from '../hooks/useSocialMediaBioGenerator';

interface FormData {
  platform: string;
  purpose: string;
  tone: string;
  keywords: string;
}

interface BioFormProps {
  formData: FormData;
  isLoading: boolean;
  insufficientCredits: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  renderCreditInfo: () => React.ReactNode;
  user: any;
  profile: any;
}

const BioForm: React.FC<BioFormProps> = ({
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
      <h2 className="text-xl font-bold mb-4">Profile Details</h2>
      
      <div className="space-y-2">
        <Label htmlFor="platform">Platform <span className="text-destructive">*</span></Label>
        <Input
          id="platform"
          name="platform"
          placeholder="e.g. Instagram, Twitter, LinkedIn, TikTok"
          value={formData.platform}
          onChange={handleInputChange}
          className="focus-visible:ring-1"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="purpose">Purpose <span className="text-destructive">*</span></Label>
        <Input
          id="purpose"
          name="purpose"
          placeholder="e.g. Personal branding, Business promotion, Creative showcasing"
          value={formData.purpose}
          onChange={handleInputChange}
          className="focus-visible:ring-1"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="tone">Tone</Label>
        <select
          id="tone"
          name="tone"
          value={formData.tone}
          onChange={handleInputChange}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="professional">Professional</option>
          <option value="casual">Casual</option>
          <option value="friendly">Friendly</option>
          <option value="humorous">Humorous</option>
          <option value="inspirational">Inspirational</option>
          <option value="authoritative">Authoritative</option>
        </select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="keywords">Keywords (Separated by commas)</Label>
        <Textarea
          id="keywords"
          name="keywords"
          placeholder="e.g. creative, passionate, innovative, expert"
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
        disabled={isLoading || !user || !formData.platform || !formData.purpose}
        className="w-full bg-teal-500 hover:bg-teal-600 text-white mt-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <MessageSquare className="mr-2 h-4 w-4" />
            Generate Bios
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

export default BioForm;
