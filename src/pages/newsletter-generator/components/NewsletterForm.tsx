
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, AlertCircle, Coins, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FormData {
  topic: string;
  audience: string;
  purpose: string;
}

interface NewsletterFormProps {
  formData: FormData;
  isLoading: boolean;
  insufficientCredits: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  renderCreditInfo: () => React.ReactNode;
  user: any;
  profile: any;
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({
  formData,
  isLoading,
  insufficientCredits,
  handleInputChange,
  handleSubmit,
  renderCreditInfo,
  user,
  profile
}) => {
  const hasLowCredits = profile && profile.credits < 10;
  
  const handleSelectChange = (value: string, name: string) => {
    const event = {
      target: {
        name,
        value
      }
    } as React.ChangeEvent<HTMLSelectElement>;
    
    handleInputChange(event);
  };
  
  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Newsletter Topic *</Label>
            <Input
              id="topic"
              name="topic"
              placeholder="e.g. Monthly company updates, Health tips, Industry news"
              value={formData.topic}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="audience">Target Audience *</Label>
            <Input
              id="audience"
              name="audience"
              placeholder="e.g. Customers, Employees, Industry professionals"
              value={formData.audience}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="purpose">Newsletter Purpose *</Label>
            <Select 
              name="purpose" 
              value={formData.purpose} 
              onValueChange={(value) => handleSelectChange(value, 'purpose')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select newsletter purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inform">Inform & Educate</SelectItem>
                <SelectItem value="engage">Engage & Build Community</SelectItem>
                <SelectItem value="promote">Promote Products/Services</SelectItem>
                <SelectItem value="update">Provide Updates</SelectItem>
                <SelectItem value="nurture">Nurture Leads</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="py-1">
            {renderCreditInfo()}
          </div>
          
          <Button 
            type="submit"
            disabled={isLoading || !user || !formData.topic || !formData.audience || !formData.purpose}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Generate Newsletters
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
      </CardContent>
    </Card>
  );
};

export default NewsletterForm;
