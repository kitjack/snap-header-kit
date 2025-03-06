
import React from 'react';
import Layout from '@/components/Layout';
import { useSloganGenerator } from './hooks/useSloganGenerator';
import BusinessDescriptionForm from './components/BusinessDescriptionForm';
import ResultsDisplay from './components/ResultsDisplay';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Coins } from 'lucide-react';
import { Link } from 'react-router-dom';

const SloganGenerator = () => {
  const {
    isLoading,
    error,
    formData,
    results,
    insufficientCredits,
    handleInputChange,
    handleSubmit,
    resetForm,
    renderCreditInfo
  } = useSloganGenerator();

  const { user } = useAuth();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Slogan Generator</h1>
        <p className="text-muted-foreground mb-8">
          Create memorable slogans that capture the essence of your business.
        </p>

        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-4">
            <BusinessDescriptionForm
              formData={formData}
              isLoading={isLoading}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
            />
            
            <div className="flex justify-between items-center px-6 py-3 bg-accent/50 rounded-lg">
              {renderCreditInfo()}
              
              {insufficientCredits && (
                <Button asChild variant="outline" size="sm" className="bg-amber-500 hover:bg-amber-600 text-white">
                  <Link to="/premium">
                    <Coins className="mr-2 h-4 w-4" />
                    Get More Credits
                  </Link>
                </Button>
              )}
            </div>
          </div>

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
