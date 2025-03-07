
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, AlertCircle, Coins, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FormData {
  topic: string;
  style: string;
  author: string;
}

interface QuoteFormProps {
  formData: FormData;
  isLoading: boolean;
  insufficientCredits: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  renderCreditInfo: () => React.ReactNode;
  user: any;
  profile: any;
}

const QuoteForm: React.FC<QuoteFormProps> = ({
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
            <Label htmlFor="topic">Topic or Theme *</Label>
            <Input
              id="topic"
              name="topic"
              placeholder="e.g. Success, Courage, Friendship, Nature"
              value={formData.topic}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="style">Quote Style</Label>
            <Select name="style" value={formData.style} onValueChange={(value) => handleSelectChange(value, 'style')}>
              <SelectTrigger>
                <SelectValue placeholder="Select a style (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inspirational">Inspirational</SelectItem>
                <SelectItem value="motivational">Motivational</SelectItem>
                <SelectItem value="philosophical">Philosophical</SelectItem>
                <SelectItem value="humorous">Humorous</SelectItem>
                <SelectItem value="poetic">Poetic</SelectItem>
                <SelectItem value="spiritual">Spiritual</SelectItem>
                <SelectItem value="wise">Wise</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="author">Preferred Author (Optional)</Label>
            <Input
              id="author"
              name="author"
              placeholder="e.g. Anonymous, a philosopher, a poet"
              value={formData.author}
              onChange={handleInputChange}
            />
            <p className="text-xs text-muted-foreground">
              This will be used for fictional attribution only
            </p>
          </div>
          
          <div className="py-1">
            {renderCreditInfo()}
          </div>
          
          <Button 
            type="submit"
            disabled={isLoading || !user || !formData.topic}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Quote className="mr-2 h-4 w-4" />
                Generate Quotes
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

export default QuoteForm;
