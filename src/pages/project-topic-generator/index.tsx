
import React from 'react';
import Layout from '@/components/Layout';
import { useProjectTopicGenerator } from './hooks/useProjectTopicGenerator';
import ProjectForm from './components/ProjectForm';
import ResultsDisplay from './components/ResultsDisplay';
import { useAuth } from '@/contexts/AuthContext';
import { Lightbulb, Search, List } from 'lucide-react';

const ProjectTopicGenerator = () => {
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
  } = useProjectTopicGenerator();
  
  const { user, profile } = useAuth();

  return (
    <Layout>
      <div className="container max-w-[1200px] mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Project Topic Generator</h1>
        <p className="text-center text-muted-foreground mb-8">
          Generate innovative project ideas tailored to your field and requirements
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {results.length === 0 ? (
            <ProjectForm 
              formData={formData}
              isLoading={isLoading}
              insufficientCredits={insufficientCredits}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              renderCreditInfo={renderCreditInfo}
              user={user}
              profile={profile}
            />
          ) : (
            <ResultsDisplay 
              results={results}
              isLoading={isLoading}
              onReset={resetForm}
              onCopy={copyToClipboard}
            />
          )}
          
          <div className="bg-accent/50 p-6 rounded-lg h-fit">
            <h2 className="text-xl font-bold mb-4">How It Works</h2>
            <div className="space-y-6">
              <div className="flex gap-3">
                <div className="bg-primary/10 text-primary rounded-full p-2 h-fit">
                  <Lightbulb className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-base">Input Your Requirements</h3>
                  <p className="text-sm text-muted-foreground">
                    Specify your field, desired project scope, and relevant keywords.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="bg-primary/10 text-primary rounded-full p-2 h-fit">
                  <Search className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-base">AI Topic Generation</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI analyzes your requirements and generates unique project ideas.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="bg-primary/10 text-primary rounded-full p-2 h-fit">
                  <List className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-base">Detailed Project Outline</h3>
                  <p className="text-sm text-muted-foreground">
                    Get comprehensive project topics with descriptions, key features, and potential impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-2xl font-semibold mb-4">Why Use Our Project Topic Generator?</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              Finding the perfect project idea can be challenging, whether you're a student, professional, or entrepreneur. 
              Our Project Topic Generator uses advanced AI to create innovative, feasible, and detailed project concepts 
              tailored to your specific field and requirements.
            </p>
            
            <p className="text-gray-700">
              Each generated topic comes with a comprehensive description, key features to include, and the expected 
              impact or benefits of the project. This gives you a solid foundation to start developing your project 
              with confidence and clarity.
            </p>
            
            <div className="mt-6">
              <h3 className="text-xl font-medium mb-3">Perfect For:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Students looking for academic project ideas</li>
                <li>Developers seeking new portfolio project concepts</li>
                <li>Entrepreneurs brainstorming innovative business ventures</li>
                <li>Teams needing fresh ideas for hackathons or competitions</li>
                <li>Professionals developing solutions for real-world problems</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectTopicGenerator;
