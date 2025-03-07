
import React from 'react';
import Layout from '@/components/Layout';
import { useFacebookAdsGenerator } from './hooks/useFacebookAdsGenerator';
import FacebookAdsForm from './components/FacebookAdsForm';
import ResultsDisplay from './components/ResultsDisplay';
import { MessageSquare } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const FacebookAdsGenerator = () => {
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
  } = useFacebookAdsGenerator();

  const { user, profile } = useAuth();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-accent/50 w-12 h-12 rounded-full flex items-center justify-center">
            <MessageSquare className="text-primary h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold">Facebook Ads Generator</h1>
        </div>
        
        <p className="text-muted-foreground mb-8">
          Create engaging Facebook ads that capture attention, drive engagement, and generate conversions for your business.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Form */}
          <FacebookAdsForm
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
                  ? "Generating your Facebook ads..." 
                  : "Complete the form to generate engaging Facebook ads"}
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
            <h2 className="text-xl font-semibold mb-3">What is a Facebook Ads Generator?</h2>
            <p className="text-gray-700">
              A Facebook Ads Generator is an AI-powered tool designed to create compelling ad copy and content specifically optimized for Facebook's advertising platform. It produces attention-grabbing headlines, engaging primary text, and effective descriptions that align with Facebook's best practices and character limits. Our generator helps you craft ads that resonate with your target audience, communicate your value proposition clearly, and include strong calls-to-action to drive engagement and conversions. Whether you're promoting products, services, events, or content, this tool helps you quickly develop multiple ad variations to test performance and optimize your social media advertising strategy, ultimately improving your return on ad spend.
            </p>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Using It</h2>
            <p className="text-gray-700">
              To generate effective Facebook ads, start by entering your business or product name and a detailed description of what you're promoting. Specify your target audience demographics, interests, and pain points to ensure the ad copy resonates with the right people. Include your unique selling propositions and any special offers or promotions you're featuring. Select your campaign objective (brand awareness, lead generation, sales, etc.) and preferred ad tone (friendly, professional, humorous, urgent, etc.). After clicking "Generate Ads," you'll receive multiple ad variants with primary text, headlines, and descriptions formatted according to Facebook's requirements. You can easily copy the ad elements you prefer directly into your Facebook Ads Manager or export them for future use.
            </p>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Tips</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Focus on the customer benefits rather than just product features in your description</li>
              <li>Include specific pain points your target audience experiences that your offering solves</li>
              <li>Add social proof elements like testimonials or user numbers in your product description</li>
              <li>Generate multiple ad variations to test different messaging approaches</li>
              <li>Consider creating separate ads for different audience segments with tailored messaging</li>
              <li>Use emotional triggers appropriate for your brand and offering</li>
              <li>Include a clear, specific call-to-action that tells users exactly what to do next</li>
            </ul>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">FAQ</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium">Will these ads comply with Facebook's policies?</h3>
                <p className="text-gray-700">Our generator is designed to create ads that follow Facebook's general advertising guidelines. However, Facebook has specific restrictions for certain industries (like finance, healthcare, politics) and their policies evolve regularly. We recommend reviewing Facebook's current advertising policies for your specific industry and making any necessary adjustments before publishing.</p>
              </div>
              <div>
                <h3 className="font-medium">What about images for my Facebook ads?</h3>
                <p className="text-gray-700">Our generator focuses on creating compelling ad copy. For images, you'll need to source high-quality visuals separately that align with your brand and message. Remember that Facebook's algorithm typically favors ads with less than 20% text in the image itself.</p>
              </div>
              <div>
                <h3 className="font-medium">How should I choose which ad variation to use?</h3>
                <p className="text-gray-700">The most effective approach is to implement multiple ad variations in your campaign and let Facebook's algorithm test their performance. This A/B testing method allows you to see which headlines, primary text, and descriptions generate the best engagement and conversion rates for your specific audience and offering.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Privacy</h2>
            <p className="text-gray-700">
              We understand the competitive nature of social media advertising and treat your business information with strict confidentiality. The product descriptions, target audience details, and marketing strategies you provide are used solely for generating ad copy and are not shared with third parties. The ads generated are private to your account, and you retain full rights to use them in your marketing campaigns. We do not store your specific ad requests for purposes beyond the immediate generation process, and we maintain strict privacy standards to protect your business information. For more comprehensive details on our data handling practices, please refer to our detailed Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FacebookAdsGenerator;
