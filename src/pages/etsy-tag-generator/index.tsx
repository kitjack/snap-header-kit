
import React from 'react';
import Layout from '@/components/Layout';
import { useEtsyTagGenerator } from './hooks/useEtsyTagGenerator';
import EtsyDescriptionForm from './components/EtsyDescriptionForm';
import ResultsDisplay from './components/ResultsDisplay';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

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
          Optimize your Etsy listings with AI-generated SEO tags to increase visibility and sales.
        </p>

        <div className="grid grid-cols-1 gap-8">
          {!results && (
            <EtsyDescriptionForm
              formData={formData}
              isLoading={isLoading}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
            />
          )}

          {results && (
            <ResultsDisplay
              results={results}
              isLoading={isLoading}
              onReset={resetForm}
            />
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default EtsyTagGenerator;
