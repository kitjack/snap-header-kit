
import React from 'react';
import Layout from '@/components/Layout';
import { useQuoteGenerator } from './hooks/useQuoteGenerator';
import QuoteForm from './components/QuoteForm';
import ResultsDisplay from './components/ResultsDisplay';
import { Quote } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const QuoteGenerator = () => {
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
  } = useQuoteGenerator();

  const { user, profile } = useAuth();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-accent/50 w-12 h-12 rounded-full flex items-center justify-center">
            <Quote className="text-primary h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold">Quote Generator</h1>
        </div>
        
        <p className="text-muted-foreground mb-8">
          Generate inspirational, thought-provoking quotes on any topic for social media, presentations, or personal motivation.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Form */}
          <QuoteForm
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
              <Quote className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                {isLoading 
                  ? "Crafting your quotes..." 
                  : "Complete the form to generate inspiring quotes"}
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
            <h2 className="text-xl font-semibold mb-3">What is a Quote Generator?</h2>
            <p className="text-gray-700">
              A Quote Generator is an AI-powered tool that creates original, thought-provoking quotes on any topic or theme. It distills wisdom, inspiration, and insight into concise, memorable statements that capture complex ideas in accessible language. Whether you need motivational quotes for social media, presentation slides, journaling prompts, or personal reflection, our generator crafts unique expressions that resonate with your specified themes and emotional tones. The generated quotes can range from philosophical musings to practical wisdom, inspirational encouragement to thoughtful observations about life and the human experience.
            </p>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Using It</h2>
            <p className="text-gray-700">
              To generate quotes, start by selecting a topic or theme that interests you—this could be anything from "success" or "friendship" to more specific subjects like "environmental conservation" or "digital transformation." Choose the tone you prefer: inspirational, philosophical, humorous, reflective, or another mood that matches your purpose. Specify any particular keywords or concepts you'd like included in the quotes. For added customization, indicate whether you want the quotes to be attributed to a fictional persona (like a philosopher or leader) or presented without attribution. After clicking "Generate Quotes," you'll receive multiple options to choose from. You can easily copy your favorite quote for immediate use in your content.
            </p>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Tips</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Be specific with your topic for more focused and relevant quotes</li>
              <li>Experiment with different tones to see how the same concept can be expressed differently</li>
              <li>For social media content, consider generating quotes around trending topics or seasonal themes</li>
              <li>Pair your quotes with relevant images for more engaging social media posts</li>
              <li>Use generated quotes as writing prompts for longer content pieces</li>
              <li>Generate multiple sets of quotes by adjusting your inputs slightly for more variety</li>
              <li>Consider your audience when selecting the quote's complexity and language style</li>
            </ul>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">FAQ</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium">Are these quotes original or taken from existing sources?</h3>
                <p className="text-gray-700">The quotes generated are original compositions created by our AI based on your specifications. They are not direct copies of existing quotes, though they may reflect similar wisdom or sentiments found in common human expressions. For academic or professional use, we recommend noting them as AI-generated content.</p>
              </div>
              <div>
                <h3 className="font-medium">How should I attribute these quotes when I use them?</h3>
                <p className="text-gray-700">For personal use, no attribution is necessary as the quotes are generated for you. For public or professional use, you might consider labeling them as "Original quote" or "Custom quote." If you're using them in published work, you could note "AI-assisted original quote" for transparency.</p>
              </div>
              <div>
                <h3 className="font-medium">Can I generate quotes for commercial purposes?</h3>
                <p className="text-gray-700">Yes, the quotes you generate are yours to use for commercial purposes, including marketing materials, merchandise, or published content. However, we recommend reviewing and potentially customizing the quotes to ensure they perfectly align with your brand voice and commercial objectives.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Privacy</h2>
            <p className="text-gray-700">
              We respect your privacy when using our Quote Generator. The topics and themes you provide are handled confidentially and used solely for generating quotes tailored to your needs. We do not store your specific requests for purposes beyond the immediate quote generation, and this data is not shared with third parties. The quotes generated are private to your account, and you retain full rights to use them as you wish. For more comprehensive information on our data handling practices, please refer to our detailed Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuoteGenerator;
