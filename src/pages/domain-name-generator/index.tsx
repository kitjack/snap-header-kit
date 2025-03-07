
import React from 'react';
import Layout from '@/components/Layout';
import { useDomainNameGenerator } from './hooks/useDomainNameGenerator';
import DomainNameForm from './components/DomainNameForm';
import ResultsDisplay from './components/ResultsDisplay';
import { useAuth } from '@/contexts/AuthContext';

const DomainNameGenerator = () => {
  const {
    isLoading,
    error,
    formData,
    results,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    copyToClipboard,
    renderCreditInfo,
    insufficientCredits,
    resetForm
  } = useDomainNameGenerator();

  const { user, profile } = useAuth();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Domain Name Generator</h1>
        <p className="text-muted-foreground mb-8">
          Find the perfect domain name for your website or project.
        </p>

        <div className="grid grid-cols-1 gap-8">
          <DomainNameForm
            formData={formData}
            isLoading={isLoading}
            onChange={handleInputChange}
            onSelectChange={handleSelectChange}
            onSubmit={handleSubmit}
            insufficientCredits={insufficientCredits}
            renderCreditInfo={renderCreditInfo}
            user={user}
            profile={profile}
          />

          {results && (
            <ResultsDisplay
              results={results}
              isLoading={isLoading}
              onReset={resetForm}
              onCopy={copyToClipboard}
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
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">What is a Domain Name Generator?</h2>
            <p className="text-gray-700">
              A Domain Name Generator is an AI-powered tool designed to help you find available and catchy domain names for your website or online business. It analyzes your business description, keywords, and preferences to suggest domain names that align with your brand identity. A good domain name is crucial for your online presence as it serves as your digital address and significantly impacts your brand's memorability and discoverability.
            </p>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Using It</h2>
            <p className="text-gray-700">
              To use the Domain Name Generator, start by entering a description of your business or project, including its purpose, target audience, and key offerings. Add specific keywords you'd like to include in your domain name. Select your preferred domain extension (e.g., .com, .io, .net) from the dropdown menu. Click "Generate Domain Names" to receive multiple domain suggestions tailored to your input. You can copy any domain name you like and check its availability with a domain registrar.
            </p>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Tips</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Keep your domain name short and memorable (ideally under 15 characters)</li>
              <li>Avoid hyphens and numbers as they can make your domain harder to remember</li>
              <li>Consider keywords that improve SEO but don't compromise on brandability</li>
              <li>Check for trademark issues before registering a domain name</li>
              <li>If possible, secure multiple TLDs (e.g., .com, .net) to protect your brand</li>
              <li>Test your domain name by saying it out loud to ensure it's easy to pronounce</li>
              <li>Consider how the domain will look in email addresses and social media handles</li>
            </ul>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">FAQ</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium">How do I know if a suggested domain is available?</h3>
                <p className="text-gray-700">After generating domain names, you'll need to check their availability with a domain registrar such as GoDaddy, Namecheap, or Google Domains. Our tool generates creative suggestions but doesn't verify availability in real-time.</p>
              </div>
              <div>
                <h3 className="font-medium">Which domain extension is best for my business?</h3>
                <p className="text-gray-700">.com remains the most recognized and trusted extension, especially for businesses. However, depending on your industry, other extensions like .io (tech), .shop (e-commerce), or country-specific TLDs might be more appropriate for your specific needs.</p>
              </div>
              <div>
                <h3 className="font-medium">Can I use the generated domain for any type of website?</h3>
                <p className="text-gray-700">Yes, the domains our tool generates can be used for any type of website. However, we recommend choosing a domain that aligns with your specific project type, whether it's a blog, e-commerce store, portfolio, or business website.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Privacy</h2>
            <p className="text-gray-700">
              The information you provide for generating domain names is handled with strict confidentiality. We do not store your business descriptions or keywords for purposes beyond generating domain suggestions, and this data is not shared with third parties. The domain names you generate are private to your account. We do not register domains on your behalf, so your domain selection remains private until you choose to register it with a domain provider. For more details, please refer to our comprehensive Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DomainNameGenerator;
