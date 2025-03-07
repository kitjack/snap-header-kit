
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import BusinessDescriptionForm from './components/BusinessDescriptionForm';
import ResultsDisplay from './components/ResultsDisplay';
import { useBusinessNameGenerator } from './hooks/useBusinessNameGenerator';
import { AlertCircle } from 'lucide-react';

const BusinessNameGenerator = () => {
  const { 
    formData,
    generatedNames,
    isGenerating,
    insufficientCredits,
    handleInputChange,
    handleGenerate,
    copyToClipboard,
    renderCreditInfo
  } = useBusinessNameGenerator();
  
  const { user, profile, loading } = useAuth();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-accent/50 w-12 h-12 rounded-full flex items-center justify-center">
            <Briefcase className="text-primary h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold">Business Name Generator</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6 space-y-4">
              <BusinessDescriptionForm
                formData={formData}
                handleInputChange={handleInputChange}
                handleGenerate={handleGenerate}
                isGenerating={isGenerating}
                insufficientCredits={insufficientCredits}
                renderCreditInfo={renderCreditInfo}
                user={user}
                profile={profile}
              />
            </CardContent>
          </Card>
          
          {/* Results Section */}
          <Card className={`border-0 shadow-sm ${generatedNames.length === 0 ? 'bg-accent/10' : ''}`}>
            <CardHeader className="pb-0">
              <CardTitle className="text-xl">Results</CardTitle>
            </CardHeader>
            <CardContent>
              <ResultsDisplay
                isGenerating={isGenerating}
                generatedNames={generatedNames}
                copyToClipboard={copyToClipboard}
              />
            </CardContent>
          </Card>
        </div>

        {/* Information Sections */}
        <div className="mt-12 space-y-6">
          <div className="bg-[#E1F5F3] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">What is a Business Name Generator?</h2>
            <p className="text-gray-700">
              A Business Name Generator is an AI-powered tool that creates unique, catchy, and memorable name suggestions for your business. It combines creativity with relevance to help entrepreneurs find the perfect name that resonates with their brand identity and target audience. Our generator uses advanced AI to analyze your business description, industry, and keywords to produce names that are both original and aligned with your business goals.
            </p>
          </div>
          
          <div className="bg-[#D6F0EE] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Using It</h2>
            <p className="text-gray-700">
              To get started, simply describe your business in the text area provided. Include what your business does, its values, and its unique selling points. For better results, specify your industry and add relevant keywords that you'd like to see reflected in your business name. Click "Generate Names" and our AI will create a list of potential business names for you to choose from. You can copy any name that appeals to you with a single click.
            </p>
          </div>
          
          <div className="bg-[#CBEAE7] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Tips</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Be specific in your business description to get more relevant name suggestions</li>
              <li>Include your target audience or market in your description</li>
              <li>Add keywords that reflect your brand's personality and values</li>
              <li>Try multiple generations with slightly different inputs to get a wider variety of options</li>
              <li>Consider names that are easy to spell, pronounce, and remember</li>
              <li>Check domain availability for any business name you're seriously considering</li>
            </ul>
          </div>
          
          <div className="bg-[#BFE5E1] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">FAQ</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium">How many business names can I generate?</h3>
                <p className="text-gray-700">You can generate multiple sets of business names based on your available credits. Each generation typically produces 10 unique name suggestions.</p>
              </div>
              <div>
                <h3 className="font-medium">Are the generated business names already taken?</h3>
                <p className="text-gray-700">Our generator creates original name suggestions, but we recommend checking availability before finalizing your choice. This includes trademark searches and domain availability checks.</p>
              </div>
              <div>
                <h3 className="font-medium">Can I customize the types of names generated?</h3>
                <p className="text-gray-700">Yes, by adjusting your business description, industry selection, and keywords, you can influence the style and direction of the generated names.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#B4DEDB] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Privacy</h2>
            <p className="text-gray-700">
              We take your privacy seriously. The business information you provide is used solely for generating name suggestions and is not shared with third parties. Your generated business names are private to your account. We do not claim ownership of any names generated and you are free to use them for your business ventures. For more details, please refer to our full Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BusinessNameGenerator;
