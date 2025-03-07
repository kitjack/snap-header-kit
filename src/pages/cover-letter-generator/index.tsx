
import React from 'react';
import Layout from '@/components/Layout';
import { useCoverLetterGenerator } from './hooks/useCoverLetterGenerator';
import CoverLetterForm from './components/CoverLetterForm';
import ResultsDisplay from './components/ResultsDisplay';
import { useAuth } from '@/contexts/AuthContext';
import { FileText, Edit, FileCheck } from 'lucide-react';

const CoverLetterGenerator = () => {
  const { 
    formData, 
    results, 
    isLoading, 
    handleInputChange, 
    handleSubmit, 
    copyToClipboard, 
    renderCreditInfo, 
    resetForm,
    insufficientCredits
  } = useCoverLetterGenerator();
  
  const { user, profile } = useAuth();

  return (
    <Layout>
      <div className="container max-w-[1200px] mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Cover Letter Generator</h1>
        <p className="text-center text-muted-foreground mb-8">
          Create professional, tailored cover letters for your job applications
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <CoverLetterForm 
            formData={formData}
            isLoading={isLoading}
            insufficientCredits={insufficientCredits}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            renderCreditInfo={renderCreditInfo}
            user={user}
            profile={profile}
          />
          
          {results.length > 0 ? (
            <ResultsDisplay 
              results={results}
              isLoading={isLoading}
              onReset={resetForm}
              onCopy={copyToClipboard}
            />
          ) : (
            <div className="bg-accent/10 p-6 rounded-lg flex flex-col items-center justify-center min-h-[300px]">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                {isLoading 
                  ? "Generating your cover letters..." 
                  : "Complete the form to generate tailored cover letters"}
              </p>
            </div>
          )}
        </div>
        
        {/* How It Works Section - moved below the tool */}
        <div className="bg-accent/50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">How It Works</h2>
          <div className="space-y-6">
            <div className="flex gap-3">
              <div className="bg-primary/10 text-primary rounded-full p-2 h-fit">
                <Edit className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-base">Input Job Details</h3>
                <p className="text-sm text-muted-foreground">
                  Enter the job title, description, your experience, and skills.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="bg-primary/10 text-primary rounded-full p-2 h-fit">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-base">AI Letter Generation</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI analyzes your information and crafts tailored cover letters.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="bg-primary/10 text-primary rounded-full p-2 h-fit">
                <FileCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-base">Customize & Submit</h3>
                <p className="text-sm text-muted-foreground">
                  Copy your preferred letter, customize if needed, and submit with your application.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-2xl font-semibold mb-4">Why Use Our Cover Letter Generator?</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              A well-crafted cover letter significantly increases your chances of landing an interview. Our AI-powered
              Cover Letter Generator creates personalized, professional cover letters that highlight your skills
              and experience in relation to the specific job you're applying for.
            </p>
            
            <p className="text-gray-700">
              Each generated cover letter is unique and tailored to the job description you provide. The AI analyzes
              the job requirements and your experience to create compelling content that resonates with hiring managers.
            </p>
            
            <div className="mt-6">
              <h3 className="text-xl font-medium mb-3">Perfect For:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Job seekers applying to multiple positions</li>
                <li>Career changers highlighting transferable skills</li>
                <li>Professionals who struggle with writing persuasive cover letters</li>
                <li>Recent graduates with limited experience</li>
                <li>Anyone looking to save time on job applications</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CoverLetterGenerator;
