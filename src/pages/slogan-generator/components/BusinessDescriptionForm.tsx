
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface FormData {
  businessDescription: string;
  industry: string;
  tone: string;
}

interface BusinessDescriptionFormProps {
  formData: FormData;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const BusinessDescriptionForm = ({
  formData,
  isLoading,
  onChange,
  onSubmit
}: BusinessDescriptionFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 bg-accent/50 p-6 rounded-lg">
      <div className="space-y-2">
        <Label htmlFor="businessDescription" className="block text-sm font-medium">
          Business Description
        </Label>
        <Textarea
          id="businessDescription"
          name="businessDescription"
          value={formData.businessDescription}
          onChange={onChange}
          placeholder="Describe your business, products or services..."
          required
          className="min-h-[120px] resize-none"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="industry" className="block text-sm font-medium">
          Industry
        </Label>
        <Input
          type="text"
          id="industry"
          name="industry"
          value={formData.industry}
          onChange={onChange}
          placeholder="e.g. Technology, Food, Fashion, etc."
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="tone" className="block text-sm font-medium">
          Tone
        </Label>
        <select
          id="tone"
          name="tone"
          value={formData.tone}
          onChange={onChange}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="professional">Professional</option>
          <option value="friendly">Friendly</option>
          <option value="humorous">Humorous</option>
          <option value="bold">Bold</option>
          <option value="inspirational">Inspirational</option>
        </select>
      </div>
      
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          'Generate Slogans'
        )}
      </Button>
    </form>
  );
};

export default BusinessDescriptionForm;
