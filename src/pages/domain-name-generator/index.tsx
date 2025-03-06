
import React from 'react';
import Layout from '@/components/Layout';
import { useDomainNameGenerator } from './hooks/useDomainNameGenerator';
import DomainNameForm from './components/DomainNameForm';
import ResultsDisplay from './components/ResultsDisplay';

const DomainNameGenerator = () => {
  const {
    isLoading,
    error,
    formData,
    results,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    resetForm
  } = useDomainNameGenerator();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Domain Name Generator</h1>
        <p className="text-muted-foreground mb-8">
          Find the perfect domain name for your website or project.
        </p>

        <div className="grid grid-cols-1 gap-8">
          <DomainNameForm
            formData={formData}
            isLoading={isLoading}
            onChange={handleInputChange}
            onSelectChange={handleSelectChange}
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

export default DomainNameGenerator;
