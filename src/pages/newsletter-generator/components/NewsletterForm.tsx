
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User } from '@supabase/supabase-js';
import { Loader2 } from 'lucide-react';

interface NewsletterFormProps {
  formData: {
    topic: string;
    industry: string;
    tone: string;
    content: string;
  };
  isLoading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  insufficientCredits: boolean;
  renderCreditInfo: () => React.ReactNode;
  user: User | null;
  profile: { credits: number } | null;
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({
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
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Newsletter Generator</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Newsletter Topic*</Label>
            <Input
              id="topic"
              name="topic"
              placeholder="E.g., Industry trends, Monthly updates, Product announcements"
              value={formData.topic}
              onChange={handleInputChange}
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              name="industry"
              placeholder="E.g., Technology, Healthcare, Finance"
              value={formData.industry}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tone">Tone</Label>
            <Select
              name="tone"
              value={formData.tone}
              onValueChange={(value) => {
                handleInputChange({
                  target: { name: 'tone', value }
                } as React.ChangeEvent<HTMLSelectElement>);
              }}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="authoritative">Authoritative</SelectItem>
                <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Key Content (Optional)</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Specific points or information you want to include in the newsletter"
              value={formData.content}
              onChange={handleInputChange}
              disabled={isLoading}
              rows={4}
            />
          </div>

          <div className="text-sm">
            {renderCreditInfo()}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || !formData.topic || !user || insufficientCredits}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Newsletters'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default NewsletterForm;
