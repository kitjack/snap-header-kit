
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, AlertCircle, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GENERATION_COST } from '../hooks/useGoogleAdsGenerator';

interface GoogleAdsFormProps {
  formData: {
    productType: string;
    targetAudience: string;
    adStyle: string;
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

const adStyles = [
  "Professional",
  "Casual",
  "Luxury",
  "Promotional",
  "Educational",
  "Informative",
  "Urgent",
  "Persuasive"
];

const GoogleAdsForm: React.FC<GoogleAdsFormProps> = ({
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
            <Label htmlFor="productType">Product or Service Type</Label>
            <Input
              id="productType"
              name="productType"
              value={formData.productType}
              onChange={handleInputChange}
              placeholder="e.g., Online course, Fitness app, Organic skincare"
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
              placeholder="e.g., Working professionals, College students, Parents"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="adStyle">Ad Style</Label>
            <Select
              name="adStyle"
              value={formData.adStyle}
              onValueChange={(value) => handleInputChange({
                target: { name: 'adStyle', value }
              } as React.ChangeEvent<HTMLSelectElement>)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a style" />
              </SelectTrigger>
              <SelectContent>
                {adStyles.map((style) => (
                  <SelectItem key={style} value={style.toLowerCase()}>
                    {style}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords & Features (Optional)</Label>
            <Textarea
              id="keywords"
              name="keywords"
              value={formData.keywords}
              onChange={handleInputChange}
              placeholder="Enter keywords, features, or unique selling points of your product or service"
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
              'Generate Google Ads'
            )}
          </Button>

          {!user && (
            <div className="flex items-center gap-2 text-amber-600 border border-amber-200 p-3 rounded-md bg-amber-50">
              <AlertCircle className="h-4 w-4" />
              <span>Please <Link to="/login" className="underline font-medium">login</Link> to generate Google ads</span>
            </div>
          )}
        </CardContent>
      </Card>
    </form>
  );
};

export default GoogleAdsForm;
