
import React from 'react';
import Layout from '@/components/Layout';
import { useAboutPageGenerator } from './hooks/useAboutPageGenerator';
import AboutPageForm from './components/AboutPageForm';
import ResultsDisplay from './components/ResultsDisplay';
import { useAuth } from '@/contexts/AuthContext';
import { FileText, Edit, FileCheck, Wand2 } from 'lucide-react';

const AboutPageGenerator = () => {
  const { 
    formData, 
    result, 
    isLoading, 
    handleInputChange, 
    handleSubmit, 
    copyToClipboard, 
    renderCreditInfo, 
    resetForm,
    insufficientCredits
  } = useAboutPageGenerator();
  
  const { user, profile } = useAuth();

  return (
    <Layout>
      <div className="container max-w-[1200px] mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">About Page Generator</h1>
        <p className="text-center text-muted-foreground mb-8">
          Create professional and engaging about pages for your business in seconds
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <AboutPageForm 
            formData={formData}
            isLoading={isLoading}
            insufficientCredits={insufficientCredits}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            renderCreditInfo={renderCreditInfo}
            user={user}
            profile={profile}
          />
          
          {result ? (
            <ResultsDisplay 
              result={result}
              isLoading={isLoading}
              onReset={resetForm}
              onCopy={copyToClipboard}
            />
          ) : (
            <div className="bg-accent/10 p-6 rounded-lg flex flex-col items-center justify-center min-h-[300px]">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                {isLoading 
                  ? "Generating your about page..." 
                  : "Complete the form to generate your about page text"}
              </p>
            </div>
          )}
        </div>
        
        <div className="bg-accent/50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">How It Works</h2>
          <div className="space-y-6">
            <div className="flex gap-3">
              <div className="bg-primary/10 text-primary rounded-full p-2 h-fit">
                <Edit className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-base">Input Business Details</h3>
                <p className="text-sm text-muted-foreground">
                  Enter your business name, industry, and any key features or unique offerings.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="bg-primary/10 text-primary rounded-full p-2 h-fit">
                <Wand2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-base">AI Content Generation</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI analyzes your input and crafts a professional about page.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="bg-primary/10 text-primary rounded-full p-2 h-fit">
                <FileCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-base">Review and Use</h3>
                <p className="text-sm text-muted-foreground">
                  Copy your generated text and customize it further if needed.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Why Use Our About Page Generator?</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              Creating a compelling about page is crucial for establishing your brand's identity and building trust with 
              your audience. Our AI-powered About Page Generator helps you craft professional, engaging content that 
              effectively communicates your business's story, values, and unique offerings.
            </p>
            
            <p className="text-gray-700">
              Each generated about page is tailored to your specific industry and business needs, incorporating your 
              key features and maintaining your desired tone of voice throughout the content.
            </p>
            
            <div className="mt-6">
              <h3 className="text-xl font-medium mb-3">Perfect For:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>New businesses launching their website</li>
                <li>Companies refreshing their online presence</li>
                <li>Startups needing professional copy</li>
                <li>Small business owners saving time on content creation</li>
                <li>Marketers looking for a solid foundation for their about page</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPageGenerator;
