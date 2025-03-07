
import React from 'react';
import Layout from '@/components/Layout';
import { useEtsyShopNameGenerator } from './hooks/useEtsyShopNameGenerator';
import ShopNameForm from './components/ShopNameForm';
import ResultsDisplay from './components/ResultsDisplay';
import { ShoppingBag } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const EtsyShopNameGenerator = () => {
  const {
    formData,
    results,
    isLoading,
    error,
    insufficientCredits,
    handleInputChange,
    handleSubmit,
    copyToClipboard,
    renderCreditInfo,
    resetForm
  } = useEtsyShopNameGenerator();

  const { user, profile } = useAuth();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-accent/50 w-12 h-12 rounded-full flex items-center justify-center">
            <ShoppingBag className="text-primary h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold">Etsy Shop Name Generator</h1>
        </div>
        
        <p className="text-muted-foreground mb-8">
          Create a memorable and brandable name for your Etsy shop that reflects your products and style.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Form */}
          <ShopNameForm
            formData={formData}
            isLoading={isLoading}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            insufficientCredits={insufficientCredits}
            renderCreditInfo={renderCreditInfo}
            user={user}
            profile={profile}
          />
          
          {/* Results Section */}
          {results && results.length > 0 ? (
            <ResultsDisplay
              results={results}
              isLoading={isLoading}
              onReset={resetForm}
              onCopy={copyToClipboard}
            />
          ) : (
            <div className="bg-accent/10 p-6 rounded-lg flex flex-col items-center justify-center min-h-[300px]">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                {isLoading 
                  ? "Generating your shop names..." 
                  : "Complete the form to generate creative Etsy shop names"}
              </p>
            </div>
          )}
        </div>
        
        {error && (
          <div className="mt-6 p-4 bg-destructive/10 text-destructive rounded-md">
            {error}
          </div>
        )}

        {/* Information Sections */}
        <div className="mt-12 space-y-6">
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">What is an Etsy Shop Name Generator?</h2>
            <p className="text-gray-700">
              An Etsy Shop Name Generator is a specialized tool designed to help artisans, crafters, and sellers create memorable and unique names for their Etsy stores. It uses AI to analyze your product descriptions, style preferences, and creative direction to suggest shop names that will resonate with your target audience. A distinctive Etsy shop name is crucial for building brand recognition, attracting customers, and standing out in Etsy's marketplace of millions of sellers.
            </p>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Using It</h2>
            <p className="text-gray-700">
              To generate the perfect Etsy shop name, start by describing the products you plan to sell, including materials, styles, and unique features. Select your primary product category to help the AI understand your market niche. Add keywords that reflect your brand's personality and aesthetic. Indicate the tone you prefer (whimsical, sophisticated, rustic, etc.). Click "Generate Shop Names" to receive multiple creative options tailored to your handmade business. You can easily copy any name you like to check its availability on Etsy.
            </p>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Tips</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Choose a name that's easy to spell and pronounce for better word-of-mouth marketing</li>
              <li>Ensure your shop name reflects the style and feel of your products</li>
              <li>Check that the name is available across social media platforms for consistent branding</li>
              <li>Consider SEO implications—including relevant keywords can help discoverability</li>
              <li>Avoid using terms that violate Etsy's policies (like "handmade" or protected terms)</li>
              <li>Test your shop name with potential customers before finalizing</li>
              <li>Remember that you can only change your Etsy shop name once, so choose carefully</li>
            </ul>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">FAQ</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium">Can I change my Etsy shop name after creating it?</h3>
                <p className="text-gray-700">Etsy allows you to change your shop name once. After that, you would need to contact Etsy support for any additional name changes, which are granted only in special circumstances. This is why choosing the right name from the start is so important.</p>
              </div>
              <div>
                <h3 className="font-medium">Should my shop name include what I sell?</h3>
                <p className="text-gray-700">It can be beneficial for SEO, but it's not necessary. If you plan to expand your product range in the future, a more general brand name might provide more flexibility. Consider your long-term business goals when selecting a name.</p>
              </div>
              <div>
                <h3 className="font-medium">How do I know if a shop name is already taken on Etsy?</h3>
                <p className="text-gray-700">You'll need to check availability directly on Etsy during the shop creation process or by searching for the name on Etsy's platform. Our generator provides creative ideas, but doesn't verify availability in real-time.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Privacy</h2>
            <p className="text-gray-700">
              We treat the information you provide about your products and brand with complete confidentiality. The details you share are used solely for generating shop name suggestions and are not shared with third parties. The shop names generated are private to your account, and you retain full rights to use any name you create with our tool. We understand the importance of protecting your business concepts and ideas as you prepare to launch or rebrand your Etsy shop. For more information on how we handle your data, please refer to our comprehensive Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EtsyShopNameGenerator;
