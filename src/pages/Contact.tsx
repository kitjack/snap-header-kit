
import React from 'react';
import Layout from '@/components/Layout';
import { Mail } from 'lucide-react';

const Contact = () => {
  return (
    <Layout>
      <div className="max-w-[800px] mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <p className="text-gray-700 mb-6">
            We're here to help with any questions or concerns you may have about our AI tools. 
            Feel free to reach out to us at the email address below, and we'll get back to you as soon as possible.
          </p>
          
          <div className="flex items-center gap-3 p-4 bg-secondary/5 rounded-md">
            <Mail className="text-secondary h-5 w-5" />
            <a href="mailto:support@wpress.ai" className="text-secondary font-medium hover:underline">
              support@wpress.ai
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
