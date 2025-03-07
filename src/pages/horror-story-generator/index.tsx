
import React from 'react';
import Layout from '@/components/Layout';
import { useHorrorStoryGenerator } from './hooks/useHorrorStoryGenerator';
import HorrorStoryForm from './components/HorrorStoryForm';
import ResultsDisplay from './components/ResultsDisplay';
import { Skull } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const HorrorStoryGenerator = () => {
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
  } = useHorrorStoryGenerator();

  const { user, profile } = useAuth();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-accent/50 w-12 h-12 rounded-full flex items-center justify-center">
            <Skull className="text-primary h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold">Horror Story Generator</h1>
        </div>
        
        <p className="text-muted-foreground mb-8">
          Generate spine-chilling horror stories for your creative writing, social media posts, or just to scare your friends.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Form */}
          <HorrorStoryForm
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
              <Skull className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                {isLoading 
                  ? "Summoning your nightmares..." 
                  : "Complete the form to generate chilling horror stories"}
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
            <h2 className="text-xl font-semibold mb-3">What is a Horror Story Generator?</h2>
            <p className="text-gray-700">
              A Horror Story Generator is an AI-powered tool that crafts spine-chilling tales of terror based on your selected themes, settings, and elements. It weaves together atmospheric descriptions, suspenseful pacing, and frightening scenarios to create short horror stories that provoke fear, unease, or psychological discomfort. Our generator draws inspiration from various horror traditions—from supernatural hauntings and cosmic dread to psychological thrillers and slasher scenarios—to produce original narratives that tap into universal and personal fears. These stories are perfect for sharing around campfires, adding a chilling touch to social media posts, inspiring your own creative writing, or simply enjoying the thrill of a good scare.
            </p>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Using It</h2>
            <p className="text-gray-700">
              To generate horrifying tales, start by selecting a horror subgenre (supernatural, psychological, body horror, etc.) that interests you. Choose a setting for your story—a haunted house, abandoned asylum, dark forest, suburban neighborhood, or any other location that sets the scene for terror. Specify any particular elements you'd like included, such as specific monsters, phenomena, or psychological themes. Select your preferred length and intensity level, from mildly unsettling to deeply disturbing. For additional customization, you can include specific characters or situations you want featured in the narrative. After clicking "Generate Story," you'll receive chilling tales tailored to your specifications. You can easily copy your favorite story to share with friends or use as inspiration for your own creative projects.
            </p>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Tips</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Combine unexpected horror subgenres for unique and surprising stories</li>
              <li>Add specific phobias or fears to make the stories more personally unsettling</li>
              <li>Experiment with different settings—sometimes ordinary locations yield the scariest stories</li>
              <li>Adjust the intensity level based on your audience's comfort with horror</li>
              <li>For Halloween or special events, include seasonal or thematic elements</li>
              <li>Try generating multiple stories with similar inputs to explore different narrative approaches</li>
              <li>Use the generated stories as writing prompts to develop your own expanded horror fiction</li>
            </ul>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">FAQ</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium">Are these stories appropriate for children?</h3>
                <p className="text-gray-700">Our horror stories are primarily designed for teen and adult audiences. While you can adjust the intensity level, even mild horror content may not be suitable for young children. We recommend parents and educators review the generated content before sharing with younger audiences.</p>
              </div>
              <div>
                <h3 className="font-medium">Can I use these stories in my own creative projects?</h3>
                <p className="text-gray-700">Yes! The stories you generate are yours to use in personal or creative projects. You can use them as inspiration for longer works, adapt them for performances, or share them on social media. For commercial publishing, we recommend using them as inspiration while developing your own unique narrative.</p>
              </div>
              <div>
                <h3 className="font-medium">Why do some horror elements work better than others?</h3>
                <p className="text-gray-700">Effective horror often relies on psychological tension, the unknown, and tapping into universal fears. Some combinations of elements create more coherent narratives, while unusual combinations might result in more experimental or surreal horror. Feel free to experiment with different inputs to find what creates the most chilling effect for your taste.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Privacy</h2>
            <p className="text-gray-700">
              We understand that horror preferences can be personal. The themes and elements you provide for story generation are handled confidentially and are not shared with third parties. The stories generated are private to your account, and you retain full rights to use them as you wish. We do not store your specific story requests for purposes beyond the immediate generation, and we maintain strict privacy standards to protect the information you share. For more comprehensive information on our data handling practices, please refer to our detailed Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HorrorStoryGenerator;
