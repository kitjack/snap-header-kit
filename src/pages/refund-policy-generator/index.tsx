
import React from 'react';
import Layout from '@/components/Layout';
import { useRefundPolicyGenerator } from './hooks/useRefundPolicyGenerator';
import RefundPolicyForm from './components/RefundPolicyForm';
import ResultsDisplay from './components/ResultsDisplay';
import { useAuth } from '@/contexts/AuthContext';
import { FileText, Shield, FileCheck, ClipboardEdit } from 'lucide-react';

const RefundPolicyGenerator = () => {
  const { 
    formData, 
    result, 
    isLoading, 
    handleInputChange, 
    handleSubmit, 
    copyToClipboard, 
    renderCreditInfo, 
    resetForm,
    insufficientCredits
  } = useRefundPolicyGenerator();
  
  const { user, profile } = useAuth();

  return (
    <Layout>
      <div className="container max-w-[1200px] mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Refund Policy Generator</h1>
        <p className="text-center text-muted-foreground mb-8">
          Create professional refund policies for your business in seconds
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <RefundPolicyForm 
            formData={formData}
            isLoading={isLoading}
            insufficientCredits={insufficientCredits}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            renderCreditInfo={renderCreditInfo}
            user={user}
            profile={profile}
          />
          
          {result ? (
            <ResultsDisplay 
              result={result}
              isLoading={isLoading}
              onReset={resetForm}
              onCopy={copyToClipboard}
            />
          ) : (
            <div className="bg-accent/10 p-6 rounded-lg flex flex-col items-center justify-center min-h-[300px]">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                {isLoading 
                  ? "Generating your refund policy..." 
                  : "Complete the form to generate your refund policy"}
              </p>
            </div>
          )}
        </div>
        
        <div className="bg-accent/50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">How It Works</h2>
          <div className="space-y-6">
            <div className="flex gap-3">
              <div className="bg-primary/10 text-primary rounded-full p-2 h-fit">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-base">Input Business Details</h3>
                <p className="text-sm text-muted-foreground">
                  Enter your business name, product type, return period, and refund methods.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="bg-primary/10 text-primary rounded-full p-2 h-fit">
                <ClipboardEdit className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-base">AI Policy Generation</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI analyzes your input and crafts a comprehensive refund policy tailored to your business.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="bg-primary/10 text-primary rounded-full p-2 h-fit">
                <FileCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-base">Review and Use</h3>
                <p className="text-sm text-muted-foreground">
                  Copy your generated refund policy and customize it further if needed.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Why Use Our Refund Policy Generator?</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              A well-crafted refund policy is essential for any business that sells products or services. It helps 
              establish trust with your customers and ensures clarity regarding return and refund procedures.
            </p>
            
            <p className="text-gray-700">
              Our AI-powered Refund Policy Generator creates comprehensive, professional policies tailored to your specific 
              business needs. Each policy covers essential elements like eligibility criteria, return process, 
              refund methods, exceptions, and contact information.
            </p>
            
            <div className="mt-6">
              <h3 className="text-xl font-medium mb-3">Benefits of Using Our Generator:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Fast creation - generate a complete policy in seconds</li>
                <li>Customized to your specific business details</li>
                <li>Helps reduce customer disputes and misunderstandings</li>
                <li>Professional formatting ready for your website</li>
                <li>Easy to update as your refund practices change</li>
                <li>Builds trust with your customers</li>
              </ul>
            </div>
            
            <p className="text-gray-700 mt-4">
              <strong>Note:</strong> While our generator creates high-quality refund policies based on standard best practices, 
              we recommend having your final policy reviewed by a legal professional familiar with commercial laws in your jurisdiction 
              to ensure full compliance with all applicable regulations.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RefundPolicyGenerator;
