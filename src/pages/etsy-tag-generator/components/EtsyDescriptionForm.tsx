
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface FormData {
  productDescription: string;
  category: string;
  keywords: string;
}

interface EtsyDescriptionFormProps {
  formData: FormData;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const EtsyDescriptionForm = ({
  formData,
  isLoading,
  onChange,
  onSubmit,
}: EtsyDescriptionFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 bg-accent/50 p-6 rounded-xl">
      <div className="space-y-2">
        <Label htmlFor="productDescription">Product Description</Label>
        <Textarea
          id="productDescription"
          name="productDescription"
          placeholder="Describe your Etsy product in detail..."
          value={formData.productDescription}
          onChange={onChange}
          className="resize-none h-32"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          name="category"
          placeholder="e.g. Jewelry, Home Decor, Art"
          value={formData.category}
          onChange={onChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="keywords">Additional Keywords (optional)</Label>
        <Input
          id="keywords"
          name="keywords"
          placeholder="handmade, vintage, etc."
          value={formData.keywords}
          onChange={onChange}
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Tags...
          </>
        ) : (
          'Generate Tags'
        )}
      </Button>
    </form>
  );
};

export default EtsyDescriptionForm;
