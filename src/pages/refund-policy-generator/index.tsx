
import React from 'react';
import Layout from '@/components/Layout';
import { useRefundPolicyGenerator } from './hooks/useRefundPolicyGenerator';
import RefundPolicyForm from './components/RefundPolicyForm';
import ResultsDisplay from './components/ResultsDisplay';
import { FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const RefundPolicyGenerator = () => {
  const {
    formData,
    result,
    isLoading,
    error,
    insufficientCredits,
    handleInputChange,
    handleSubmit,
    copyToClipboard,
    renderCreditInfo,
    resetForm
  } = useRefundPolicyGenerator();

  const { user, profile } = useAuth();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-accent/50 w-12 h-12 rounded-full flex items-center justify-center">
            <FileText className="text-primary h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold">Refund Policy Generator</h1>
        </div>
        
        <p className="text-muted-foreground mb-8">
          Create a professional refund policy tailored to your business needs in seconds. Ensure customer trust and legal compliance with clear return and refund terms.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Form */}
          <RefundPolicyForm
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
                  : "Complete the form to generate a professional refund policy"}
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
            <h2 className="text-xl font-semibold mb-3">What is a Refund Policy?</h2>
            <p className="text-gray-700">
              A refund policy is a document that outlines the terms and conditions under which a business will refund customers for returned products or canceled services. It sets clear expectations about the refund process, eligible items, time frames, and refund methods. A well-crafted refund policy helps build customer trust, reduces disputes, and ensures legal compliance while protecting your business interests.
            </p>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Why Every Business Needs a Refund Policy</h2>
            <p className="text-gray-700">
              A clear refund policy is essential for several reasons:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Legal Compliance: Many jurisdictions require businesses to have clear return and refund terms.</li>
              <li>Customer Trust: Transparent policies build confidence and encourage purchases.</li>
              <li>Dispute Prevention: Clear guidelines reduce misunderstandings and customer service issues.</li>
              <li>Business Protection: Well-defined terms protect your business from excessive or fraudulent returns.</li>
              <li>E-commerce Requirements: Many payment processors and platforms require a published refund policy.</li>
            </ul>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Key Elements of a Good Refund Policy</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><span className="font-medium">Eligibility Criteria:</span> What can and cannot be returned or refunded</li>
              <li><span className="font-medium">Time Limits:</span> The window during which returns are accepted</li>
              <li><span className="font-medium">Condition Requirements:</span> Required state of returned items (unused, original packaging, etc.)</li>
              <li><span className="font-medium">Refund Methods:</span> How refunds will be issued (original payment method, store credit, etc.)</li>
              <li><span className="font-medium">Processing Time:</span> How long customers should expect to wait for their refund</li>
              <li><span className="font-medium">Return Shipping:</span> Who bears the cost of return shipping</li>
              <li><span className="font-medium">Special Circumstances:</span> Policies for damaged items, promotions, or special sales</li>
              <li><span className="font-medium">Contact Information:</span> How customers can initiate the refund process</li>
            </ul>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">How to Display Your Refund Policy</h2>
            <p className="text-gray-700">
              Once you've generated your refund policy, make sure it's easily accessible to customers:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Include a link in your website footer</li>
              <li>Add it to your Terms & Conditions page</li>
              <li>Feature it on product pages near the "Add to Cart" button</li>
              <li>Include it in order confirmation emails</li>
              <li>Mention key points in your checkout process</li>
              <li>Add it to your FAQ section</li>
            </ul>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Legal Considerations</h2>
            <p className="text-gray-700">
              While our generator creates a comprehensive refund policy based on standard best practices, laws regarding refunds vary by country, state, and industry. We recommend having your refund policy reviewed by a legal professional familiar with consumer protection laws in your jurisdiction to ensure full compliance with all applicable regulations. This is particularly important for businesses operating internationally, as consumer rights differ significantly between regions.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RefundPolicyGenerator;
