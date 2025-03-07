
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, AlertCircle, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GENERATION_COST } from '../hooks/useFacebookAdsGenerator';

interface FacebookAdsFormProps {
  formData: {
    businessType: string;
    targetAudience: string;
    objective: string;
    keywords: string;
  };
  isLoading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  insufficientCredits: boolean;
  renderCreditInfo: () => React.ReactNode;
  user: any;
  profile: any;
}

const adObjectives = [
  "Brand Awareness",
  "Reach",
  "Traffic",
  "Engagement",
  "App Installs",
  "Video Views",
  "Lead Generation",
  "Conversions",
  "Product Catalog Sales",
  "Store Traffic"
];

const FacebookAdsForm: React.FC<FacebookAdsFormProps> = ({
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
          <CardTitle className="text-xl">Ad Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="businessType">Business Type</Label>
            <Input
              id="businessType"
              name="businessType"
              value={formData.businessType}
              onChange={handleInputChange}
              placeholder="e.g., E-commerce store, SaaS product, Local restaurant"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAudience">Target Audience</Label>
            <Input
              id="targetAudience"
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleInputChange}
              placeholder="e.g., Men 25-35 interested in fitness, Parents with young children"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="objective">Ad Objective</Label>
            <Select
              name="objective"
              value={formData.objective}
              onValueChange={(value) => handleInputChange({
                target: { name: 'objective', value }
              } as React.ChangeEvent<HTMLSelectElement>)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an objective" />
              </SelectTrigger>
              <SelectContent>
                {adObjectives.map((objective) => (
                  <SelectItem key={objective} value={objective}>
                    {objective}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords & Unique Selling Points (Optional)</Label>
            <Textarea
              id="keywords"
              name="keywords"
              value={formData.keywords}
              onChange={handleInputChange}
              placeholder="Enter keywords, unique selling points, or important information about your product/service"
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
                Generating Ads...
              </>
            ) : (
              'Generate Facebook Ads'
            )}
          </Button>

          {!user && (
            <div className="flex items-center gap-2 text-amber-600 border border-amber-200 p-3 rounded-md bg-amber-50">
              <AlertCircle className="h-4 w-4" />
              <span>Please <Link to="/login" className="underline font-medium">login</Link> to generate Facebook ads</span>
            </div>
          )}
        </CardContent>
      </Card>
    </form>
  );
};

export default FacebookAdsForm;
