
import React from 'react';
import Layout from '@/components/Layout';
import { useEtsyTagGenerator } from './hooks/useEtsyTagGenerator';
import EtsyDescriptionForm from './components/EtsyDescriptionForm';
import ResultsDisplay from './components/ResultsDisplay';

const EtsyTagGenerator = () => {
  const {
    isLoading,
    error,
    formData,
    results,
    handleInputChange,
    handleSubmit,
    resetForm
  } = useEtsyTagGenerator();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Etsy Tag Generator</h1>
        <p className="text-muted-foreground mb-8">
          Optimize your Etsy listings with perfect tags to increase visibility and sales.
        </p>

        <div className="grid grid-cols-1 gap-8">
          <EtsyDescriptionForm
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

export default EtsyTagGenerator;
