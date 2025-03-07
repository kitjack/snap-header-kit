
import React from 'react';
import Layout from '@/components/Layout';
import { useEtsyTagGenerator } from './hooks/useEtsyTagGenerator';
import EtsyDescriptionForm from './components/EtsyDescriptionForm';
import ResultsDisplay from './components/ResultsDisplay';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const EtsyTagGenerator = () => {
  const {
    isLoading,
    error,
    formData,
    results,
    handleInputChange,
    handleSubmit,
    resetForm
  } = useEtsyTagGenerator();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Etsy Tag Generator</h1>
        <p className="text-muted-foreground mb-8">
          Optimize your Etsy listings with AI-generated SEO tags to increase visibility and sales.
        </p>

        <div className="grid grid-cols-1 gap-8">
          {!results && (
            <EtsyDescriptionForm
              formData={formData}
              isLoading={isLoading}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
            />
          )}

          {results && (
            <ResultsDisplay
              results={results}
              isLoading={isLoading}
              onReset={resetForm}
            />
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        {/* Information Sections */}
        <div className="mt-12 space-y-6">
          <div className="bg-[#F2FCE2] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">What is an Etsy Tag Generator?</h2>
            <p className="text-gray-700">
              An Etsy Tag Generator is a specialized tool designed to help Etsy sellers optimize their product listings with effective SEO tags. Using advanced AI algorithms, it analyzes your product descriptions and creates relevant, search-friendly tags that can significantly increase your shop's visibility in Etsy's search results. With the right tags, potential customers are more likely to discover your products, leading to improved traffic and potentially higher sales.
            </p>
          </div>
          
          <div className="bg-[#FEF7CD] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Using It</h2>
            <p className="text-gray-700">
              To use the Etsy Tag Generator, simply enter a detailed description of your product, select the appropriate category, and add any specific keywords you'd like to incorporate. Our AI will analyze this information and generate 13 optimized tags (the maximum Etsy allows) that are tailored to your product. These tags are designed to be concise (under 20 characters) and relevant to maximize your product's discoverability. Once generated, you can easily copy the tags and add them to your Etsy listing.
            </p>
          </div>
          
          <div className="bg-[#FDE1D3] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Tips</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Be specific and descriptive when entering your product details</li>
              <li>Include unique features, materials, and uses of your product</li>
              <li>Specify your target audience (e.g., gift for mom, wedding accessories)</li>
              <li>Mention style, color, or design elements that are searchable</li>
              <li>Use all 13 tag slots for maximum SEO benefit</li>
              <li>Combine broad and specific tags to capture different search queries</li>
              <li>Update your tags seasonally for holiday-specific searches</li>
            </ul>
          </div>
          
          <div className="bg-[#D3E4FD] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">FAQ</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium">How often should I update my Etsy tags?</h3>
                <p className="text-gray-700">It's recommended to review and refresh your tags every 2-3 months, or whenever you notice a significant drop in traffic. Seasonal updates are also important for products that could benefit from holiday-related searches.</p>
              </div>
              <div>
                <h3 className="font-medium">Will these tags work for any Etsy shop?</h3>
                <p className="text-gray-700">Yes, our generator creates tags suitable for all Etsy categories and product types. However, the effectiveness may vary depending on your specific niche and competition.</p>
              </div>
              <div>
                <h3 className="font-medium">Are long-tail tags better than short ones?</h3>
                <p className="text-gray-700">Both have their uses. Shorter tags often have higher search volume but more competition, while longer, more specific tags may have less competition but also less search volume. A good strategy is to use a mix of both.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#E5DEFF] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Privacy</h2>
            <p className="text-gray-700">
              Your product information and generated tags are kept confidential. We use your descriptions solely for the purpose of generating relevant tags and do not store or share this information with third parties. Your SEO strategy is an important part of your business, and we respect your privacy by ensuring that the tags we generate for you remain private to your account. For more information, please refer to our comprehensive Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EtsyTagGenerator;
