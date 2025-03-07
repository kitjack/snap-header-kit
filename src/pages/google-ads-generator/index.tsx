
import React from 'react';
import Layout from '@/components/Layout';
import { useGoogleAdsGenerator } from './hooks/useGoogleAdsGenerator';
import GoogleAdsForm from './components/GoogleAdsForm';
import ResultsDisplay from './components/ResultsDisplay';
import { MessageSquare } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const GoogleAdsGenerator = () => {
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
  } = useGoogleAdsGenerator();

  const { user, profile } = useAuth();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-accent/50 w-12 h-12 rounded-full flex items-center justify-center">
            <MessageSquare className="text-primary h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold">Google Ads Generator</h1>
        </div>
        
        <p className="text-muted-foreground mb-8">
          Create compelling Google ads that engage your target audience and drive conversions for your products or services.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Form */}
          <GoogleAdsForm
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
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                {isLoading 
                  ? "Generating your Google ads..." 
                  : "Complete the form to generate professional Google ads"}
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
            <h2 className="text-xl font-semibold mb-3">What is a Google Ads Generator?</h2>
            <p className="text-gray-700">
              A Google Ads Generator is an AI-powered tool designed to create effective, platform-compliant search advertisements for the Google Ads network. It crafts compelling headlines, descriptions, and call-to-action text that adheres to Google's character limits and best practices. Our generator focuses on creating ads that maximize click-through rates and conversions by incorporating your key selling points and target keywords in attention-grabbing copy. Whether you're promoting products, services, or content, this tool helps you quickly produce multiple ad variations to test performance and optimize your PPC (pay-per-click) campaigns, saving you time and improving your return on ad spend.
            </p>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Using It</h2>
            <p className="text-gray-700">
              To generate effective Google ads, start by entering your business or product name and a detailed description of what you're promoting. Include your main selling points, unique value proposition, and any special offers or promotions. Specify your target audience and their key pain points or desires that your offering addresses. Add the primary keywords you're targeting with your campaign. Select your industry and preferred tone (professional, conversational, urgent, etc.). After clicking "Generate Ads," you'll receive multiple ad variants that include headline options, descriptions, and display paths formatted according to Google Ads requirements. You can easily copy the ad elements you prefer directly into your Google Ads account or export them for future use.
            </p>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Tips</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Focus on your unique selling proposition (USP) in your product/service description</li>
              <li>Include specific benefits rather than just features to create more compelling ads</li>
              <li>Add numbers where possible (prices, percentages, years of experience) to increase CTR</li>
              <li>Generate multiple ad variations to test different approaches in your campaigns</li>
              <li>Use highly relevant keywords that match your landing page content</li>
              <li>Consider creating separate ads for different audience segments or search intents</li>
              <li>Include a clear call-to-action that tells users exactly what you want them to do</li>
            </ul>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">FAQ</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium">Will these ads comply with Google's policies?</h3>
                <p className="text-gray-700">Our generator is designed to create ads that follow Google's format requirements and general advertising policies. However, certain industries have specific restrictions, and Google's policies change periodically. We recommend reviewing Google's current advertising policies for your specific industry and making any necessary adjustments before publishing.</p>
              </div>
              <div>
                <h3 className="font-medium">How should I choose between the generated ad variations?</h3>
                <p className="text-gray-700">The best practice is to implement multiple ad variations in your campaign and let Google's algorithm test their performance. This approach, known as A/B testing, allows you to see which headlines and descriptions generate the best click-through and conversion rates for your specific audience.</p>
              </div>
              <div>
                <h3 className="font-medium">Do I need to edit the generated ads before using them?</h3>
                <p className="text-gray-700">While our generator creates ready-to-use ads, we recommend reviewing them to ensure they accurately represent your offering and brand voice. Small customizations, particularly adding specific numbers, prices, or limited-time offers, can significantly improve performance.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Privacy</h2>
            <p className="text-gray-700">
              We understand the competitive nature of advertising and treat your business information with strict confidentiality. The product descriptions, target keywords, and marketing strategies you provide are used solely for generating ad copy and are not shared with third parties. The ads generated are private to your account, and you retain full rights to use them in your marketing campaigns. We do not store your specific ad requests for purposes beyond the immediate generation process, and we maintain strict privacy standards to protect your business information. For more comprehensive details on our data handling practices, please refer to our detailed Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GoogleAdsGenerator;
