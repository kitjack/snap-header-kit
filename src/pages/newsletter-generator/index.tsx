
import React from 'react';
import Layout from '@/components/Layout';
import { useNewsletterGenerator } from './hooks/useNewsletterGenerator';
import NewsletterForm from './components/NewsletterForm';
import ResultsDisplay from './components/ResultsDisplay';
import { Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const NewsletterGenerator = () => {
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
  } = useNewsletterGenerator();

  const { user, profile } = useAuth();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-accent/50 w-12 h-12 rounded-full flex items-center justify-center">
            <Mail className="text-primary h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold">Newsletter Generator</h1>
        </div>
        
        <p className="text-muted-foreground mb-8">
          Create engaging, professional newsletters tailored to your audience with customized content, compelling subject lines, and calls-to-action.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Form */}
          <NewsletterForm
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
              <Mail className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                {isLoading 
                  ? "Crafting your newsletters..." 
                  : "Complete the form to generate professional newsletters"}
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
            <h2 className="text-xl font-semibold mb-3">What is a Newsletter Generator?</h2>
            <p className="text-gray-700">
              A Newsletter Generator is an AI-powered tool that creates professionally written email newsletters customized to your specific audience, topic, and purpose. It combines effective copywriting techniques with AI language capabilities to craft compelling content that engages readers and drives action. Whether you need internal company updates, customer relationship nurturing, or promotional content, our generator creates newsletters with attention-grabbing subject lines, well-structured content, and strategic calls-to-action. Each generated newsletter is designed to maintain consistent branding while delivering value to recipients, helping you maintain regular communication with your target audience without the time-consuming process of writing from scratch.
            </p>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Using It</h2>
            <p className="text-gray-700">
              To create a professional newsletter, begin by specifying your newsletter topic—this could be anything from company updates to industry news, educational content, or promotional announcements. Define your target audience clearly, whether it's customers, employees, industry professionals, or another group, as this helps tailor the content appropriately. Select the main purpose of your newsletter from options like informing, engaging, promoting, or providing updates. After clicking "Generate Newsletters," you'll receive multiple newsletter options complete with subject lines, body content, calls-to-action, and image recommendations. You can view both a formatted preview and HTML code that you can copy directly into your email marketing platform of choice. Choose the option that best fits your needs, or generate more variations until you find the perfect match for your communication goals.
            </p>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Tips</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Be specific about your newsletter topic to get more focused and relevant content</li>
              <li>Define your audience precisely—"marketing professionals in healthcare" will yield better results than just "professionals"</li>
              <li>Match your purpose with your overall marketing goals for better alignment</li>
              <li>Use the generated HTML code as a starting point and customize it to match your brand colors and style</li>
              <li>Test different subject lines from your generated options to see which performs better</li>
              <li>Consider seasonal themes or current events when describing your newsletter topic</li>
              <li>For promotional newsletters, be clear about the specific products or offers you want to highlight</li>
              <li>Add your own images based on the recommendations provided for more engaging newsletters</li>
            </ul>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">FAQ</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium">How do I use the HTML code provided?</h3>
                <p className="text-gray-700">The HTML code can be copied and pasted directly into most email marketing platforms like Mailchimp, Constant Contact, or Campaign Monitor in their HTML/code editor section. You may need to adjust some styling elements to match your brand guidelines. Some platforms also allow you to import HTML files directly.</p>
              </div>
              <div>
                <h3 className="font-medium">Can I edit the generated newsletters?</h3>
                <p className="text-gray-700">Yes, the generated newsletters are starting points that you can and should customize. You can copy the content to your preferred editor or email marketing platform and make any changes to better suit your brand voice, add specific details, or incorporate additional sections.</p>
              </div>
              <div>
                <h3 className="font-medium">How often should I send newsletters?</h3>
                <p className="text-gray-700">The ideal frequency depends on your audience and content. For most businesses, once a week or once a month works well. The key is consistency—decide on a schedule you can maintain and stick with it so your audience knows when to expect your communications.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Privacy</h2>
            <p className="text-gray-700">
              We respect the confidential nature of your newsletter content and audience information. All data submitted for newsletter generation is handled securely and not shared with third parties. The topics, audience details, and purposes you specify are used solely to generate appropriate newsletter content for your use. We do not store the full content of your generated newsletters for purposes beyond your immediate session, and this information is not used to train our models. The newsletters you generate are private to your account, and you retain full rights to use them as you wish. For comprehensive information about our data practices, please refer to our detailed Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewsletterGenerator;
