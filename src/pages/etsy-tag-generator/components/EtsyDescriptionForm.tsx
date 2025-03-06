
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
    <Card>
      <CardHeader>
        <CardTitle>Generate SEO-Optimized Etsy Tags</CardTitle>
        <CardDescription>
          Enter your product details to generate up to 13 SEO-optimized tags for your Etsy listing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="productDescription">Product Description</Label>
            <Textarea
              id="productDescription"
              name="productDescription"
              placeholder="Describe your Etsy product in detail (materials, colors, size, usage, benefits)..."
              value={formData.productDescription}
              onChange={onChange}
              className="resize-none h-32"
              required
            />
            <p className="text-xs text-muted-foreground">
              Be specific about materials, color, size, and what makes your product unique
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              placeholder="e.g. Jewelry, Home Decor, Art, Clothing"
              value={formData.category}
              onChange={onChange}
            />
            <p className="text-xs text-muted-foreground">
              The main category or niche your product belongs to
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords">Additional Keywords</Label>
            <Input
              id="keywords"
              name="keywords"
              placeholder="vintage, bohemian, minimalist, etc."
              value={formData.keywords}
              onChange={onChange}
            />
            <p className="text-xs text-muted-foreground">
              Add style descriptors, occasions, or themes (comma separated)
            </p>
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
          
          <p className="text-xs text-center text-muted-foreground">
            Generates 13 SEO-optimized tags for Etsy (costs 10 credits)
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default EtsyDescriptionForm;
