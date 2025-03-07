
import React from 'react';
import Layout from '@/components/Layout';
import { Laptop, Zap, BookOpen } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="max-w-[800px] mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">About wpress.ai</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">What is wpress.ai?</h2>
          <p className="text-gray-700 mb-6">
            wpress.ai is the largest collection of free AI tools specifically designed for WordPress users. 
            Our platform provides a comprehensive suite of AI-powered generators that help website owners, 
            bloggers, marketers, and businesses create compelling content, enhance their online presence, 
            and streamline their workflow.
          </p>
          
          <p className="text-gray-700 mb-6">
            With wpress.ai, you can generate everything from business names and slogans to social media bios 
            and ad copy, all optimized for engagement and conversion. Our tools are designed to be embedded 
            directly into WordPress websites or used through our intuitive online platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="mb-4 text-primary">
              <Zap className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Time-Saving</h3>
            <p className="text-gray-600">
              Generate high-quality content in seconds rather than spending hours writing it yourself.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="mb-4 text-primary">
              <Laptop className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">WordPress Integration</h3>
            <p className="text-gray-600">
              Seamlessly embed our tools directly into your WordPress website for on-demand content generation.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="mb-4 text-primary">
              <BookOpen className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Diverse Tools</h3>
            <p className="text-gray-600">
              Access over 20 specialized AI generators designed for various content needs and business purposes.
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Benefits of wpress.ai</h2>
          
          <ul className="space-y-4 mb-6">
            <li className="flex items-start gap-3">
              <div className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div>
                <strong className="font-medium">Enhanced Productivity:</strong> Generate content in seconds that would normally take hours to create manually.
              </div>
            </li>
            
            <li className="flex items-start gap-3">
              <div className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div>
                <strong className="font-medium">Cost-Effective:</strong> Access powerful AI tools without the high price tag of premium AI services.
              </div>
            </li>
            
            <li className="flex items-start gap-3">
              <div className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div>
                <strong className="font-medium">WordPress Integration:</strong> Embed our tools directly into your WordPress site for seamless content creation.
              </div>
            </li>
            
            <li className="flex items-start gap-3">
              <div className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div>
                <strong className="font-medium">Versatility:</strong> Access tools for diverse needs, from business naming to content creation for various platforms.
              </div>
            </li>
            
            <li className="flex items-start gap-3">
              <div className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div>
                <strong className="font-medium">Quality Output:</strong> Generate professional-quality content that engages your audience and drives results.
              </div>
            </li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4">How to Use the Platform</h2>
          
          <ol className="space-y-6 mb-6">
            <li className="flex gap-4">
              <div className="flex-shrink-0 bg-primary text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">1</div>
              <div>
                <h3 className="font-medium text-lg mb-1">Create an account</h3>
                <p className="text-gray-600">
                  Sign up for a free account to access our collection of AI tools. No credit card required to get started.
                </p>
              </div>
            </li>
            
            <li className="flex gap-4">
              <div className="flex-shrink-0 bg-primary text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">2</div>
              <div>
                <h3 className="font-medium text-lg mb-1">Choose your tool</h3>
                <p className="text-gray-600">
                  Browse our extensive collection of AI generators and select the one that fits your current needs.
                </p>
              </div>
            </li>
            
            <li className="flex gap-4">
              <div className="flex-shrink-0 bg-primary text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">3</div>
              <div>
                <h3 className="font-medium text-lg mb-1">Input your requirements</h3>
                <p className="text-gray-600">
                  Provide specific details about what you want to generate. The more specific you are, the better the results.
                </p>
              </div>
            </li>
            
            <li className="flex gap-4">
              <div className="flex-shrink-0 bg-primary text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">4</div>
              <div>
                <h3 className="font-medium text-lg mb-1">Generate and review</h3>
                <p className="text-gray-600">
                  Click generate and review the AI-created content. You can regenerate or make adjustments as needed.
                </p>
              </div>
            </li>
            
            <li className="flex gap-4">
              <div className="flex-shrink-0 bg-primary text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">5</div>
              <div>
                <h3 className="font-medium text-lg mb-1">Use or embed the content</h3>
                <p className="text-gray-600">
                  Copy the generated content for your use or embed the tool directly on your WordPress website.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </Layout>
  );
};

export default About;
