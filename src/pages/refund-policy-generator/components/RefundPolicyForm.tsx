
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

export const GENERATION_COST = 10;

interface RefundPolicyFormProps {
  formData: {
    businessName: string;
    productType: string;
    returnPeriod: string;
    refundMethod: string;
  };
  isLoading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  insufficientCredits: boolean;
  renderCreditInfo: () => React.ReactNode;
  user: any;
  profile: any;
}

const RefundPolicyForm = ({
  formData,
  isLoading,
  handleInputChange,
  handleSubmit,
  insufficientCredits,
  renderCreditInfo,
  user,
  profile
}: RefundPolicyFormProps) => {
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
            <Label htmlFor="productType">Product Type</Label>
            <Input
              id="productType"
              name="productType"
              value={formData.productType}
              onChange={handleInputChange}
              placeholder="e.g. physical products, digital goods, services"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="returnPeriod">Return Period</Label>
            <Input
              id="returnPeriod"
              name="returnPeriod"
              value={formData.returnPeriod}
              onChange={handleInputChange}
              placeholder="e.g. 30 days, 14 days, no returns"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="refundMethod">Refund Method</Label>
            <Textarea
              id="refundMethod"
              name="refundMethod"
              value={formData.refundMethod}
              onChange={handleInputChange}
              placeholder="e.g. original payment method, store credit, replacement"
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
              {isLoading ? 'Generating...' : 'Generate Refund Policy'}
            </Button>
            
            {!user && (
              <p className="text-sm text-center mt-2 text-amber-600">
                <Link to="/login" className="underline">
                  Login
                </Link> to generate refund policy
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

export default RefundPolicyForm;
