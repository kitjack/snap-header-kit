
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkle, Loader2 } from 'lucide-react';
import { User } from '@supabase/supabase-js';

interface PoemFormProps {
  formData: {
    topic: string;
    style: string;
    keywords: string;
  };
  isLoading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  insufficientCredits: boolean;
  renderCreditInfo: () => React.ReactNode;
  user: User | null;
  profile: any;
}

const PoemForm: React.FC<PoemFormProps> = ({
  formData,
  isLoading,
  handleInputChange,
  handleSubmit,
  insufficientCredits,
  renderCreditInfo,
  user,
  profile
}) => {
  
  const poemStyles = [
    { value: '', label: 'Select a style (optional)' },
    { value: 'haiku', label: 'Haiku' },
    { value: 'sonnet', label: 'Sonnet' },
    { value: 'limerick', label: 'Limerick' },
    { value: 'free verse', label: 'Free Verse' },
    { value: 'acrostic', label: 'Acrostic' },
    { value: 'narrative', label: 'Narrative' },
    { value: 'ballad', label: 'Ballad' },
    { value: 'ode', label: 'Ode' },
  ];

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="topic" className="text-base">
              Poem Topic <span className="text-red-500">*</span>
            </Label>
            <Input
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleInputChange}
              placeholder="Nature, Love, Time, etc."
              className="mt-1.5"
              required
            />
          </div>

          <div>
            <Label htmlFor="style" className="text-base">
              Poem Style
            </Label>
            <select
              id="style"
              name="style"
              value={formData.style}
              onChange={handleInputChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1.5"
            >
              {poemStyles.map((style) => (
                <option key={style.value} value={style.value}>
                  {style.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="keywords" className="text-base">
              Keywords or Themes (Optional)
            </Label>
            <Textarea
              id="keywords"
              name="keywords"
              value={formData.keywords}
              onChange={handleInputChange}
              placeholder="Enter specific words, themes, or feelings you'd like included in your poem"
              className="mt-1.5 resize-none"
              rows={3}
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            {renderCreditInfo()}
            
            <Button 
              type="submit" 
              disabled={isLoading || insufficientCredits || !user}
              className="ml-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkle className="mr-2 h-4 w-4" />
                  Generate Poems
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PoemForm;
