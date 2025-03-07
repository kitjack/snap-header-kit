
import React from 'react';
import Layout from '@/components/Layout';

const TermsOfService = () => {
  return (
    <Layout>
      <div className="max-w-[800px] mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 prose max-w-none">
          <p className="text-gray-700">Last updated: August 1, 2023</p>
          
          <h2 className="text-xl font-semibold mt-6">1. Agreement to Terms</h2>
          <p>
            These Terms of Service constitute a legally binding agreement made between you and wpress.ai, 
            concerning your access to and use of our website and services. By accessing or using wpress.ai, 
            you agree to be bound by these Terms of Service. If you disagree with any part of the terms, 
            you may not access our services.
          </p>
          
          <h2 className="text-xl font-semibold mt-6">2. Use License</h2>
          <p>
            Permission is granted to temporarily use the materials (information, AI tools, outputs) on wpress.ai's website for personal 
            or commercial purposes, subject to the following restrictions:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>You must not modify or copy the materials except as provided for via our tools</li>
            <li>You must not attempt to decompile or reverse engineer any software contained on wpress.ai</li>
            <li>You must not remove any copyright or other proprietary notations from the materials</li>
            <li>This license shall automatically terminate if you violate any of these restrictions</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6">3. User Accounts</h2>
          <p>
            When you create an account with us, you guarantee that the information you provide us is accurate, complete, 
            and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination 
            of your account on our website.
          </p>
          <p>
            You are responsible for maintaining the confidentiality of your account and password and for restricting access 
            to your computer. You agree to accept responsibility for all activities that occur under your account or password.
          </p>
          
          <h2 className="text-xl font-semibold mt-6">4. Generated Content</h2>
          <p>
            Our website provides AI tools that generate content based on your inputs. You are solely responsible for how 
            you use the generated content. wpress.ai does not claim ownership of the content our tools generate for you, 
            but we reserve the right to use anonymized inputs to improve our services.
          </p>
          
          <h2 className="text-xl font-semibold mt-6">5. Credits System</h2>
          <p>
            Our website operates on a credits system. Some features may require the use of credits. Credits can be 
            obtained through purchase or through our premium subscription plans. Credits are non-refundable and have no cash value.
          </p>
          
          <h2 className="text-xl font-semibold mt-6">6. Limitation of Liability</h2>
          <p>
            In no event shall wpress.ai or its suppliers be liable for any damages (including, without limitation, damages for 
            loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on 
            wpress.ai's website, even if wpress.ai has been notified orally or in writing of the possibility of such damage.
          </p>
          
          <h2 className="text-xl font-semibold mt-6">7. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of our jurisdiction, 
            and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>
          
          <h2 className="text-xl font-semibold mt-6">8. Changes to Terms</h2>
          <p>
            wpress.ai reserves the right, at its sole discretion, to modify or replace these Terms at any time. By continuing 
            to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
          </p>
          
          <h2 className="text-xl font-semibold mt-6">9. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
            <br />
            <a href="mailto:support@wpress.ai" className="text-secondary hover:underline">support@wpress.ai</a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;
