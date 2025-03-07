
import React from 'react';
import Layout from '@/components/Layout';
import { useLinkedInBioGenerator } from './hooks/useLinkedInBioGenerator';
import LinkedInBioForm from './components/LinkedInBioForm';
import ResultsDisplay from './components/ResultsDisplay';
import { Briefcase } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const LinkedInBioGenerator = () => {
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
  } = useLinkedInBioGenerator();

  const { user, profile } = useAuth();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-accent/50 w-12 h-12 rounded-full flex items-center justify-center">
            <Briefcase className="text-primary h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold">LinkedIn Bio Generator</h1>
        </div>
        
        <p className="text-muted-foreground mb-8">
          Create professional and compelling LinkedIn bios that highlight your expertise and career achievements.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Form */}
          <LinkedInBioForm
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
              <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                {isLoading 
                  ? "Generating your LinkedIn bios..." 
                  : "Complete the form to generate professional LinkedIn bios"}
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
            <h2 className="text-xl font-semibold mb-3">What is a LinkedIn Bio Generator?</h2>
            <p className="text-gray-700">
              A LinkedIn Bio Generator is an AI-powered tool designed to help professionals create compelling and effective LinkedIn profile summaries. Your LinkedIn bio (or "About" section) is a critical component of your professional online presence, serving as a personal pitch to potential employers, clients, and connections. Our generator analyzes your professional background, skills, achievements, and career goals to craft customized bio options that highlight your unique value proposition in a way that resonates with your target audience while optimizing for LinkedIn's search algorithm.
            </p>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Using It</h2>
            <p className="text-gray-700">
              To generate effective LinkedIn bios, start by entering your current role, industry, and years of experience. Detail your key skills, notable achievements, and certifications. Specify your career goals and the professional image you want to project. Select your preferred tone (conversational, formal, confident, etc.) and indicate what you're using LinkedIn for (job seeking, networking, thought leadership). Click "Generate Bios" to receive multiple professionally crafted options tailored to your profile. You can easily copy any bio that resonates with you and paste it directly into your LinkedIn profile.
            </p>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Tips</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Include relevant keywords for your industry to improve your LinkedIn search visibility</li>
              <li>Balance professional achievements with a glimpse of your personality and values</li>
              <li>Keep your final bio between 200-300 words for optimal readability</li>
              <li>Consider addressing what you can offer connections rather than just listing achievements</li>
              <li>Include a call to action (e.g., "Connect with me to discuss digital marketing trends")</li>
              <li>Update your bio regularly to reflect new skills, positions, or career pivots</li>
              <li>Use specific metrics and results where possible (e.g., "Increased sales by 35%")</li>
            </ul>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">FAQ</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium">How often should I update my LinkedIn bio?</h3>
                <p className="text-gray-700">It's recommended to review and update your LinkedIn bio at least every 6-12 months, or whenever you achieve a significant professional milestone, change roles, or pivot your career direction. Regular updates also signal an active profile to LinkedIn's algorithm.</p>
              </div>
              <div>
                <h3 className="font-medium">Should I write my LinkedIn bio in first or third person?</h3>
                <p className="text-gray-700">First-person is generally preferred for LinkedIn as it creates a more personal connection with readers. However, our generator offers both styles, and you can choose based on your industry norms and personal preference.</p>
              </div>
              <div>
                <h3 className="font-medium">Can I customize the generated bio?</h3>
                <p className="text-gray-700">Absolutely! The generated bios are starting points. We recommend personalizing them further by adding specific anecdotes, adjusting the language to match your authentic voice, and ensuring all information is accurate and up-to-date.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Privacy</h2>
            <p className="text-gray-700">
              The professional information you provide is handled with complete confidentiality. We use your career details solely for generating tailored LinkedIn bio suggestions and do not store this information beyond the immediate generation process. The bios generated are private to your account, and you retain full rights to use and modify them as you see fit. We understand the sensitive nature of career information and maintain strict privacy standards to protect your professional data. For more comprehensive information on how we safeguard your information, please refer to our detailed Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LinkedInBioGenerator;
