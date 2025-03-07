
import React from 'react';
import Layout from '@/components/Layout';
import { useSloganGenerator } from './hooks/useSloganGenerator';
import BusinessDescriptionForm from './components/BusinessDescriptionForm';
import ResultsDisplay from './components/ResultsDisplay';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Coins } from 'lucide-react';
import { Link } from 'react-router-dom';

const SloganGenerator = () => {
  const {
    isLoading,
    error,
    formData,
    results,
    insufficientCredits,
    handleInputChange,
    handleSubmit,
    resetForm,
    renderCreditInfo
  } = useSloganGenerator();

  const { user } = useAuth();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Slogan Generator</h1>
        <p className="text-muted-foreground mb-8">
          Create memorable slogans that capture the essence of your business.
        </p>

        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-4">
            <BusinessDescriptionForm
              formData={formData}
              isLoading={isLoading}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
            />
            
            <div className="flex justify-between items-center px-6 py-3 bg-accent/50 rounded-lg">
              {renderCreditInfo()}
              
              {insufficientCredits && (
                <Button asChild variant="outline" size="sm" className="bg-amber-500 hover:bg-amber-600 text-white">
                  <Link to="/premium">
                    <Coins className="mr-2 h-4 w-4" />
                    Get More Credits
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {results && (
            <ResultsDisplay
              results={results}
              isLoading={isLoading}
              onReset={resetForm}
            />
          )}

          {error && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-md">
              {error}
            </div>
          )}
        </div>

        {/* Information Sections */}
        <div className="mt-12 space-y-6">
          <div className="bg-[#E1F5F3] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">What is a Slogan Generator?</h2>
            <p className="text-gray-700">
              A Slogan Generator is an AI-powered tool that creates catchy, memorable taglines for your business, brand, or product. A great slogan can effectively communicate your brand's value proposition and leave a lasting impression on potential customers. Our generator uses advanced language models to create slogans that are relevant to your business, align with your desired tone, and have the potential to become a recognizable part of your brand identity.
            </p>
          </div>
          
          <div className="bg-[#D6F0EE] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Using It</h2>
            <p className="text-gray-700">
              To generate effective slogans, start by entering a detailed description of your business, including your values, mission, and what sets you apart from competitors. Select your industry from the dropdown menu to further contextualize your business. Choose a tone that aligns with your brand personality (professional, friendly, clever, etc.). Click "Generate Slogans" and our AI will create multiple slogan options for you to choose from. You can easily copy any slogan that resonates with your brand vision.
            </p>
          </div>
          
          <div className="bg-[#CBEAE7] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Tips</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Focus on your key value proposition or unique selling point in your description</li>
              <li>Consider the emotional response you want to evoke in your audience</li>
              <li>Keep in mind that the best slogans are often short, memorable, and easy to say</li>
              <li>Try different tones to see which style best matches your brand voice</li>
              <li>Generate multiple sets of slogans to explore different creative directions</li>
              <li>Test potential slogans with your target audience before final adoption</li>
              <li>Ensure your slogan is original and doesn't infringe on existing trademarks</li>
            </ul>
          </div>
          
          <div className="bg-[#BFE5E1] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">FAQ</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium">How do I know if a slogan is good?</h3>
                <p className="text-gray-700">A good slogan is memorable, reflects your brand's essence, resonates with your target audience, and is unique to your business. It should also be simple enough to remember and versatile enough to use across different marketing channels.</p>
              </div>
              <div>
                <h3 className="font-medium">Can I legally use any slogan generated by the tool?</h3>
                <p className="text-gray-700">While we strive to generate original slogans, we recommend conducting a trademark search before officially adopting any slogan for your business to ensure it doesn't infringe on existing trademarks.</p>
              </div>
              <div>
                <h3 className="font-medium">How often should I change my business slogan?</h3>
                <p className="text-gray-700">A strong slogan can last for years or even decades. Most successful brands change their slogans only when rebranding or when their original slogan no longer reflects their business direction or market position.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#B4DEDB] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Privacy</h2>
            <p className="text-gray-700">
              The business information you provide is used exclusively for generating slogan suggestions and is not shared with third parties. The slogans generated are private to your account, and you retain full rights to use any slogan you create with our tool. We understand the sensitive nature of branding elements and maintain strict confidentiality regarding your business details and generated content. For more comprehensive information, please review our Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SloganGenerator;
