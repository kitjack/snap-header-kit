
import React from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Register = () => {
  return (
    <Layout>
      <div className="flex-grow flex items-center justify-center py-12">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <p className="text-center mb-6">Registration page coming soon</p>
          <Button asChild className="w-full">
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
