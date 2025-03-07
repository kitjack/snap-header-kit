
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { AlertCircle, Shield } from 'lucide-react';

export const GENERATION_COST = 10;

interface PrivacyPolicyFormProps {
  formData: {
    businessName: string;
    websiteUrl: string;
    dataCollected: string;
    thirdParties: string;
  };
  isLoading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  insufficientCredits: boolean;
  renderCreditInfo: () => React.ReactNode;
  user: any;
  profile: any;
}

const PrivacyPolicyForm = ({
  formData,
  isLoading,
  handleInputChange,
  handleSubmit,
  insufficientCredits,
  renderCreditInfo,
  user,
  profile
}: PrivacyPolicyFormProps) => {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name <span className="text-destructive">*</span></Label>
            <Input
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
              placeholder="e.g. Acme Corporation"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="websiteUrl">Website URL</Label>
            <Input
              id="websiteUrl"
              name="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleInputChange}
              placeholder="e.g. https://www.acmecorp.com"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dataCollected">Data Collected</Label>
            <Textarea
              id="dataCollected"
              name="dataCollected"
              value={formData.dataCollected}
              onChange={handleInputChange}
              placeholder="e.g. name, email, IP address, cookies, usage data"
              rows={3}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="thirdParties">Third Party Data Sharing</Label>
            <Textarea
              id="thirdParties"
              name="thirdParties"
              value={formData.thirdParties}
              onChange={handleInputChange}
              placeholder="e.g. payment processors, analytics providers, marketing partners"
              rows={3}
              disabled={isLoading}
            />
          </div>

          <div className="mt-4 flex justify-between items-center px-4 py-2 bg-accent/50 rounded-md">
            {renderCreditInfo()}
          </div>

          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || insufficientCredits || !user}
            >
              {isLoading ? 'Generating...' : 'Generate Privacy Policy'}
            </Button>
            
            {!user && (
              <p className="text-sm text-center mt-2 text-amber-600">
                <Link to="/login" className="underline">
                  Login
                </Link> to generate privacy policy
              </p>
            )}
            
            {insufficientCredits && user && (
              <div className="flex justify-center mt-2">
                <Button asChild variant="outline" size="sm" className="bg-amber-500 hover:bg-amber-600 text-white">
                  <Link to="/premium">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Get More Credits
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PrivacyPolicyForm;
