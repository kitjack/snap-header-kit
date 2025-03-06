
import React from 'react';
import Layout from '@/components/Layout';
import { useSloganGenerator } from './hooks/useSloganGenerator';
import BusinessDescriptionForm from './components/BusinessDescriptionForm';
import ResultsDisplay from './components/ResultsDisplay';

const SloganGenerator = () => {
  const {
    isLoading,
    error,
    formData,
    results,
    handleInputChange,
    handleSubmit,
    resetForm
  } = useSloganGenerator();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Slogan Generator</h1>
        <p className="text-muted-foreground mb-8">
          Create memorable slogans that capture the essence of your business.
        </p>

        <div className="grid grid-cols-1 gap-8">
          <BusinessDescriptionForm
            formData={formData}
            isLoading={isLoading}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />

          {results && (
            <ResultsDisplay
              results={results}
              isLoading={isLoading}
              onReset={resetForm}
            />
          )}

          {error && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-md">
              {error}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SloganGenerator;
