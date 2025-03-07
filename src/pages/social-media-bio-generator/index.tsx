
import React from 'react';
import Layout from '@/components/Layout';
import { useSocialMediaBioGenerator } from './hooks/useSocialMediaBioGenerator';
import BioForm from './components/BioForm';
import ResultsDisplay from './components/ResultsDisplay';
import { MessageSquare } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const SocialMediaBioGenerator = () => {
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
  } = useSocialMediaBioGenerator();

  const { user, profile } = useAuth();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-accent/50 w-12 h-12 rounded-full flex items-center justify-center">
            <MessageSquare className="text-primary h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold">Social Media Bio Generator</h1>
        </div>
        
        <p className="text-muted-foreground mb-8">
          Create compelling social media bios that showcase your personality and purpose across different platforms.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Form */}
          <BioForm
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
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                {isLoading 
                  ? "Generating your social media bios..." 
                  : "Complete the form to generate creative social media bios"}
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
            <h2 className="text-xl font-semibold mb-3">What is a Social Media Bio Generator?</h2>
            <p className="text-gray-700">
              A Social Media Bio Generator is an AI-powered tool designed to create platform-specific biographies that effectively represent you or your brand on social networks. Your social media bio is often the first impression visitors have of your profile, and it needs to quickly communicate who you are, what you do, and why someone should follow you—all within strict character limits. Our generator creates engaging, concise, and platform-optimized bios that capture your personality, purpose, and unique value proposition while incorporating relevant keywords and calls to action.
            </p>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Using It</h2>
            <p className="text-gray-700">
              To generate effective social media bios, start by selecting your target platform (Instagram, Twitter, TikTok, etc.) since each has different character limits and audience expectations. Enter key information about yourself or your brand, including interests, profession, accomplishments, and values. Choose your preferred tone (professional, witty, inspirational, etc.) and audience type. Add any specific elements you want to include like hashtags or emojis. Click "Generate Bios" to receive multiple customized options tailored to your selected platform. Copy the one you like best and paste it directly into your social profile.
            </p>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Tips</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Use relevant keywords to make your profile more discoverable in searches</li>
              <li>Include a clear call-to-action (what should followers do next?)</li>
              <li>Balance professionalism with personality to create an authentic impression</li>
              <li>Use line breaks strategically to improve readability, especially on mobile</li>
              <li>Consider including a branded hashtag if you're building a community</li>
              <li>Update your bio regularly to reflect current projects or seasonal promotions</li>
              <li>For business accounts, include essential information like hours or location</li>
            </ul>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">FAQ</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium">Should I use the same bio across all social platforms?</h3>
                <p className="text-gray-700">While your core messaging should be consistent, each platform has different character limits, audience expectations, and formats. We recommend customizing your bio for each platform rather than using identical text everywhere. Our generator creates platform-specific options for this reason.</p>
              </div>
              <div>
                <h3 className="font-medium">How many emojis should I include in my bio?</h3>
                <p className="text-gray-700">This depends on your brand and audience. For professional accounts, limit emojis to 1-3 strategic places. For casual or creative accounts, more emojis may be appropriate. Our generator provides options with varying emoji usage so you can choose what feels right.</p>
              </div>
              <div>
                <h3 className="font-medium">Should I include links in my social media bio?</h3>
                <p className="text-gray-700">When possible, yes. However, platforms like Instagram only allow links in specific places (not in the bio text itself). For Twitter and some other platforms, including a relevant link can drive traffic to your website or latest project.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Privacy</h2>
            <p className="text-gray-700">
              The personal information you provide to generate social media bios is handled with strict confidentiality. We use your details solely for creating tailored bio suggestions and do not store this information beyond the immediate generation process. The bios generated are private to your account, and you retain full rights to use them across your social platforms. We understand that your personal brand is important, and we maintain strict privacy standards to protect the information you share with us. For more details on our data handling practices, please refer to our comprehensive Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SocialMediaBioGenerator;
