
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
      </div>
    </Layout>
  );
};

export default BusinessNameGenerator;
