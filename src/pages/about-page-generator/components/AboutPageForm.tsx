
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, AlertCircle, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GENERATION_COST } from '../hooks/useAboutPageGenerator';

interface AboutPageFormProps {
  formData: {
    businessName: string;
    industry: string;
    keyFeatures: string;
    tone: string;
  };
  isLoading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  insufficientCredits: boolean;
  renderCreditInfo: () => React.ReactNode;
  user: any;
  profile: any;
}

const tones = [
  "Professional",
  "Friendly",
  "Casual",
  "Formal",
  "Innovative",
  "Traditional",
  "Enthusiastic",
  "Authoritative"
];

const AboutPageForm: React.FC<AboutPageFormProps> = ({
  formData,
  isLoading,
  handleInputChange,
  handleSubmit,
  insufficientCredits,
  renderCreditInfo,
  user,
  profile
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Business Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
              placeholder="e.g., Acme Solutions"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              placeholder="e.g., Technology, Healthcare, Retail"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tone">Tone</Label>
            <Select
              name="tone"
              value={formData.tone}
              onValueChange={(value) => handleInputChange({
                target: { name: 'tone', value }
              } as React.ChangeEvent<HTMLSelectElement>)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a tone" />
              </SelectTrigger>
              <SelectContent>
                {tones.map((tone) => (
                  <SelectItem key={tone} value={tone.toLowerCase()}>
                    {tone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="keyFeatures">Key Features & Offerings (Optional)</Label>
            <Textarea
              id="keyFeatures"
              name="keyFeatures"
              value={formData.keyFeatures}
              onChange={handleInputChange}
              placeholder="Enter key features, services, or unique aspects of your business"
              rows={3}
            />
          </div>

          <div className="flex justify-between items-center pt-3">
            {renderCreditInfo()}
            
            {insufficientCredits && user && (
              <Button asChild variant="outline" size="sm" className="bg-amber-500 hover:bg-amber-600 text-white">
                <Link to="/premium">
                  <Coins className="mr-2 h-4 w-4" />
                  Get More Credits
                </Link>
              </Button>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading || insufficientCredits || !user}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                Generating About Page...
              </>
            ) : (
              'Generate About Page'
            )}
          </Button>

          {!user && (
            <div className="flex items-center gap-2 text-amber-600 border border-amber-200 p-3 rounded-md bg-amber-50">
              <AlertCircle className="h-4 w-4" />
              <span>Please <Link to="/login" className="underline font-medium">login</Link> to generate about page text</span>
            </div>
          )}
        </CardContent>
      </Card>
    </form>
  );
};

export default AboutPageForm;
