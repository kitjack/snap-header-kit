
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User } from '@supabase/supabase-js';
import { Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface FormData {
  businessName: string;
  productType: string;
  returnPeriod: string;
  refundMethod: string;
}

interface RefundPolicyFormProps {
  formData: FormData;
  isLoading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  insufficientCredits: boolean;
  renderCreditInfo: () => React.ReactNode;
  user: User | null;
  profile: any;
}

const RefundPolicyForm: React.FC<RefundPolicyFormProps> = ({
  formData,
  isLoading,
  handleInputChange,
  handleSubmit,
  insufficientCredits,
  renderCreditInfo,
  user,
  profile
}) => {
  const handleSelectChange = (name: string, value: string) => {
    const changeEvent = {
      target: { name, value }
    } as React.ChangeEvent<HTMLSelectElement>;
    
    handleInputChange(changeEvent);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Refund Policy Details</CardTitle>
        <CardDescription>
          Enter your business details to generate a comprehensive refund policy
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name<span className="text-destructive">*</span></Label>
            <Input
              id="businessName"
              name="businessName"
              placeholder="Enter your business name"
              value={formData.businessName}
              onChange={handleInputChange}
              disabled={isLoading}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="productType">Product/Service Type<span className="text-destructive">*</span></Label>
            <Input
              id="productType"
              name="productType"
              placeholder="e.g. Digital Products, Physical Goods, Services"
              value={formData.productType}
              onChange={handleInputChange}
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="returnPeriod">Return/Refund Period</Label>
            <Select 
              name="returnPeriod" 
              value={formData.returnPeriod}
              onValueChange={(value) => handleSelectChange("returnPeriod", value)}
              disabled={isLoading}
            >
              <SelectTrigger id="returnPeriod">
                <SelectValue placeholder="Select return period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="14 days">14 days</SelectItem>
                <SelectItem value="30 days">30 days</SelectItem>
                <SelectItem value="60 days">60 days</SelectItem>
                <SelectItem value="90 days">90 days</SelectItem>
                <SelectItem value="No refunds">No refunds</SelectItem>
                <SelectItem value="Case by case">Case by case</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="refundMethod">Refund Method</Label>
            <Select 
              name="refundMethod" 
              value={formData.refundMethod}
              onValueChange={(value) => handleSelectChange("refundMethod", value)}
              disabled={isLoading}
            >
              <SelectTrigger id="refundMethod">
                <SelectValue placeholder="Select refund method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="original payment method">Original payment method</SelectItem>
                <SelectItem value="store credit">Store credit</SelectItem>
                <SelectItem value="bank transfer">Bank transfer</SelectItem>
                <SelectItem value="replacement">Replacement</SelectItem>
                <SelectItem value="multiple options">Multiple options</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-2">
            {renderCreditInfo()}
          </div>
          
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || insufficientCredits || !user}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Refund Policy'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RefundPolicyForm;
