
import React from 'react';
import Layout from '@/components/Layout';
import { usePromptEnhancer } from './hooks/usePromptEnhancer';
import PromptEnhancerForm from './components/PromptEnhancerForm';
import ResultsDisplay from './components/ResultsDisplay';
import { Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const PromptEnhancer = () => {
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
  } = usePromptEnhancer();

  const { user, profile } = useAuth();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-accent/50 w-12 h-12 rounded-full flex items-center justify-center">
            <Zap className="text-primary h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold">AI Prompt Enhancer</h1>
        </div>
        
        <p className="text-muted-foreground mb-8">
          Transform your basic AI prompts into powerful, detailed instructions that get better results from any AI system.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Form */}
          <PromptEnhancerForm
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
              <Zap className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                {isLoading 
                  ? "Enhancing your prompt..." 
                  : "Enter your original prompt to generate enhanced versions"}
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
            <h2 className="text-xl font-semibold mb-3">What is an AI Prompt Enhancer?</h2>
            <p className="text-gray-700">
              An AI Prompt Enhancer is a specialized tool that transforms simple, vague AI instructions into detailed, structured, and effective prompts that produce significantly better results from AI systems like ChatGPT, Claude, or Midjourney. It analyzes your initial prompt and adds specificity, context, constraints, and proper formatting to guide the AI toward generating more accurate, relevant, and high-quality outputs. Think of it as a translator that converts your general idea into a language that AI systems understand better.
            </p>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Using It</h2>
            <p className="text-gray-700">
              To use the AI Prompt Enhancer, start by entering your basic prompt in the text area (e.g., "Write a blog post about climate change"). Select your target AI system (general, writing, image, code) to optimize the enhancement for that specific type of AI. Choose the tone and style that matches your needs. Click "Enhance Prompt" to generate multiple refined versions of your original prompt, each structured to elicit better responses from AI systems. Simply copy the enhanced prompt of your choice and paste it into your preferred AI tool to see dramatically improved results.
            </p>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Tips</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Include your core request in the initial prompt, even if it's basic</li>
              <li>Specify your intended audience when it matters for the output</li>
              <li>For creative writing, mention genres or authors whose style you want to emulate</li>
              <li>For technical prompts, indicate your expertise level so the enhancement is appropriate</li>
              <li>Try different enhancements of the same prompt to see which yields better results</li>
              <li>Use the enhanced prompts as learning tools to understand what makes an effective prompt</li>
              <li>For image generation prompts, be especially detailed about visual elements and style</li>
            </ul>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">FAQ</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium">Why do enhanced prompts work better with AI?</h3>
                <p className="text-gray-700">AI models rely on clear instructions to generate relevant outputs. Enhanced prompts provide more context, specify desired formats, include constraints, and use clearer language—all factors that help AI systems better understand your intent and produce results that match your expectations.</p>
              </div>
              <div>
                <h3 className="font-medium">Do I need technical knowledge to use enhanced prompts?</h3>
                <p className="text-gray-700">No, our tool does the technical work for you. You simply provide your basic idea, and the enhancer creates well-structured prompts that you can copy and use immediately, regardless of your technical expertise.</p>
              </div>
              <div>
                <h3 className="font-medium">Will the same enhanced prompt work across different AI platforms?</h3>
                <p className="text-gray-700">While the general principles of good prompting apply across platforms, different AI systems have unique capabilities and limitations. Our enhancer creates variations optimized for different systems, so choose the one that best matches your target AI platform.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Privacy</h2>
            <p className="text-gray-700">
              We understand that your prompts may contain sensitive information or valuable ideas. All prompts submitted to our enhancer are treated with strict confidentiality. We do not store your original or enhanced prompts for purposes beyond the immediate generation process. Your prompts are not used to train our AI systems or shared with third parties. Enhanced prompts are private to your account, and you retain full intellectual property rights to both your original prompts and the enhanced versions our tool creates. For more comprehensive information on how we handle your data, please refer to our detailed Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PromptEnhancer;
