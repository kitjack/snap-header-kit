
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, AlertCircle, Coins, Skull } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FormData {
  theme: string;
  style: string;
  setting: string;
}

interface HorrorStoryFormProps {
  formData: FormData;
  isLoading: boolean;
  insufficientCredits: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  renderCreditInfo: () => React.ReactNode;
  user: any;
  profile: any;
}

const HorrorStoryForm: React.FC<HorrorStoryFormProps> = ({
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
            <Label htmlFor="theme">Horror Theme *</Label>
            <Input
              id="theme"
              name="theme"
              placeholder="e.g. Haunted house, Zombies, Ghosts, Possession"
              value={formData.theme}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="style">Horror Style</Label>
            <Select name="style" value={formData.style} onValueChange={(value) => handleSelectChange(value, 'style')}>
              <SelectTrigger>
                <SelectValue placeholder="Select a style (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="psychological">Psychological</SelectItem>
                <SelectItem value="supernatural">Supernatural</SelectItem>
                <SelectItem value="gothic">Gothic</SelectItem>
                <SelectItem value="cosmic">Cosmic Horror</SelectItem>
                <SelectItem value="slasher">Slasher</SelectItem>
                <SelectItem value="folk">Folk Horror</SelectItem>
                <SelectItem value="body">Body Horror</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="setting">Setting (Optional)</Label>
            <Input
              id="setting"
              name="setting"
              placeholder="e.g. Victorian mansion, abandoned hospital, small town"
              value={formData.setting}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="py-1">
            {renderCreditInfo()}
          </div>
          
          <Button 
            type="submit"
            disabled={isLoading || !user || !formData.theme}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Skull className="mr-2 h-4 w-4" />
                Generate Horror Stories
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

export default HorrorStoryForm;
