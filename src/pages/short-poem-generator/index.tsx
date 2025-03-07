
import React from 'react';
import Layout from '@/components/Layout';
import { useShortPoemGenerator } from './hooks/useShortPoemGenerator';
import PoemForm from './components/PoemForm';
import ResultsDisplay from './components/ResultsDisplay';
import { Feather } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const ShortPoemGenerator = () => {
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
  } = useShortPoemGenerator();

  const { user, profile } = useAuth();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-accent/50 w-12 h-12 rounded-full flex items-center justify-center">
            <Feather className="text-primary h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold">Short Poem Generator</h1>
        </div>
        
        <p className="text-muted-foreground mb-8">
          Create beautiful, meaningful poems on any topic in a variety of styles - perfect for personal reflection, gifts, or social media.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Form */}
          <PoemForm
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
              <Feather className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                {isLoading 
                  ? "Crafting your poems..." 
                  : "Complete the form to generate beautiful poems"}
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
            <h2 className="text-xl font-semibold mb-3">What is a Short Poem Generator?</h2>
            <p className="text-gray-700">
              A Short Poem Generator is an AI-powered tool that creates brief, expressive poems on any topic or theme you specify. It combines the art of poetic expression with advanced language technology to craft concise verses that capture emotions, scenes, or ideas in just a few carefully chosen lines. These poems can range from haikus and sonnets to free verse and rhyming couplets, depending on your preferences. Whether you're looking for something heartfelt, whimsical, profound, or celebratory, our generator creates original poems that convey meaning in a compact, memorable form.
            </p>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Using It</h2>
            <p className="text-gray-700">
              To generate short poems, begin by entering a topic, theme, or subject you'd like the poem to address. Select a poetic style (such as haiku, sonnet, free verse, or rhyming) if you have a preference for the poem's structure. Choose the emotional tone that best matches your intention—whether thoughtful, joyful, melancholic, inspirational, or another feeling altogether. You can also specify any particular words or phrases you'd like included. After clicking "Generate Poems," you'll receive multiple unique short poem options. You can easily copy the one you like best to use in greeting cards, social media posts, personal journals, or any creative project.
            </p>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Tips</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Be specific about your topic to get more focused and meaningful poems</li>
              <li>Experiment with different poetic styles to find what best expresses your message</li>
              <li>Try varying emotional tones even for the same topic to see different creative angles</li>
              <li>Include sensory details or specific imagery in your prompt for more vivid poems</li>
              <li>Generate multiple sets of poems by slightly adjusting your inputs</li>
              <li>For special occasions, mention the event (birthday, anniversary, etc.) in your description</li>
              <li>Consider your audience when selecting the poem's complexity and language style</li>
            </ul>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">FAQ</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium">Can I use these poems commercially?</h3>
                <p className="text-gray-700">Yes, the poems you generate are yours to use however you wish, including commercial purposes. However, it's always good practice to review and potentially customize the poems to ensure they perfectly match your needs, especially for commercial applications.</p>
              </div>
              <div>
                <h3 className="font-medium">Will my poem be completely original?</h3>
                <p className="text-gray-700">Our AI creates original compositions based on your specifications, but as with any AI-generated content, there may be similarities to existing works due to the AI's training. We recommend reviewing and potentially making your own edits for truly unique pieces.</p>
              </div>
              <div>
                <h3 className="font-medium">How long are the generated poems?</h3>
                <p className="text-gray-700">Most poems generated are between 4-16 lines, depending on the style selected. Haikus are typically 3 lines, sonnets are 14 lines, while free verse and other styles vary. If you need a specific length, mention it in your description.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Privacy</h2>
            <p className="text-gray-700">
              We respect the personal nature of creative writing. The topics and themes you provide for poem generation are handled confidentially and are not shared with third parties. The poems generated are private to your account, and you retain full rights to use them as you wish. We understand that poetry often expresses personal feelings and experiences, and we maintain strict privacy standards to protect the information you share. For more details on our data handling practices, please refer to our comprehensive Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShortPoemGenerator;
