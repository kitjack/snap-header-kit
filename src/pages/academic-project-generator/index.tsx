
import React from 'react';
import Layout from '@/components/Layout';
import { useAcademicProjectGenerator } from './hooks/useAcademicProjectGenerator';
import ProjectForm from './components/ProjectForm';
import ResultsDisplay from './components/ResultsDisplay';
import { GraduationCap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AcademicProjectGenerator = () => {
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
  } = useAcademicProjectGenerator();

  const { user, profile } = useAuth();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-accent/50 w-12 h-12 rounded-full flex items-center justify-center">
            <GraduationCap className="text-primary h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold">Academic Project Topic Generator</h1>
        </div>
        
        <p className="text-muted-foreground mb-8">
          Generate innovative and focused academic project topics tailored to your field of study and interests.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Form */}
          <ProjectForm
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
              <GraduationCap className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                {isLoading 
                  ? "Generating your project topics..." 
                  : "Complete the form to generate academic project topics"}
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
            <h2 className="text-xl font-semibold mb-3">What is an Academic Project Topic Generator?</h2>
            <p className="text-gray-700">
              An Academic Project Topic Generator is an AI-powered tool designed to help students, researchers, and academics discover innovative, relevant, and feasible project ideas tailored to their specific field of study. Whether you're looking for an undergraduate research topic, a master's thesis subject, a PhD dissertation focus, or a classroom project idea, our generator analyzes current academic trends, your specific interests, and educational level to suggest well-scoped topics that are both novel and academically rigorous. It's particularly helpful for overcoming "topic block" when you're struggling to identify a research direction that balances your interests with academic requirements.
            </p>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Using It</h2>
            <p className="text-gray-700">
              To generate academic project topics, start by selecting your broad field of study (e.g., Computer Science, Psychology, Environmental Science) and more specific subfield or concentration. Indicate your academic level (undergraduate, master's, PhD) to ensure appropriate complexity. Enter your specific research interests, preferred methodologies, and any constraints such as time frame or resource limitations. You can also specify if you're interested in interdisciplinary approaches. Click "Generate Topics" to receive multiple academically sound project ideas. Each suggestion includes a potential title, brief description, and indication of scope appropriateness for your level.
            </p>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Tips</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Be specific about your interests to get more targeted and relevant suggestions</li>
              <li>Consider including research methodologies you're familiar with or want to learn</li>
              <li>Mention any special access to data, labs, or research facilities you might have</li>
              <li>Include current trends or emerging topics in your field that interest you</li>
              <li>Generate multiple sets of topics by slightly changing your input parameters</li>
              <li>Discuss potential topics with your academic advisor before finalizing</li>
              <li>Check for existing research on proposed topics to ensure novelty and to build on established work</li>
            </ul>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">FAQ</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium">How do I know if a suggested topic is actually feasible?</h3>
                <p className="text-gray-700">While our generator aims to suggest realistic topics for your academic level, you should evaluate feasibility based on your resources, time constraints, and access to necessary data or equipment. Consulting with an academic advisor is always recommended before committing to a project topic.</p>
              </div>
              <div>
                <h3 className="font-medium">Can I modify the suggested topics?</h3>
                <p className="text-gray-700">Absolutely! Consider the generated topics as starting points. You're encouraged to refine, combine, or modify them to better align with your specific interests and academic requirements. The best academic projects often evolve from initial ideas.</p>
              </div>
              <div>
                <h3 className="font-medium">Will these topics be original enough for academic publication?</h3>
                <p className="text-gray-700">Our generator suggests topics with potential for originality, but you'll need to conduct a thorough literature review to ensure your specific approach hasn't been extensively studied. The originality often comes from your unique methodology, perspective, or application of concepts rather than the broad topic itself.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Privacy</h2>
            <p className="text-gray-700">
              We understand the sensitive nature of academic research ideas. The information you provide about your research interests and academic focus is handled with strict confidentiality. We use these details solely for generating topic suggestions and do not store this information beyond the immediate generation process. The project topics generated are private to your account, and you retain full intellectual property rights to any research conducted based on these suggestions. We do not share your academic interests or generated topics with third parties. For more comprehensive information on our data handling practices, please refer to our detailed Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AcademicProjectGenerator;
