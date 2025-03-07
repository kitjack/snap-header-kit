
import React from 'react';
import Layout from '@/components/Layout';
import { useDietMealPlanGenerator } from './hooks/useDietMealPlanGenerator';
import MealPlanForm from './components/MealPlanForm';
import ResultsDisplay from './components/ResultsDisplay';
import { Utensils } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const DietMealPlanGenerator = () => {
  const {
    formData,
    results,
    isLoading,
    error,
    insufficientCredits,
    handleInputChange,
    handleSubmit,
    copyToClipboard,
    renderCreditInfo,
    resetForm
  } = useDietMealPlanGenerator();

  const { user, profile } = useAuth();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-accent/50 w-12 h-12 rounded-full flex items-center justify-center">
            <Utensils className="text-primary h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold">Diet Meal Plan Generator</h1>
        </div>
        
        <p className="text-muted-foreground mb-8">
          Create personalized meal plans tailored to your dietary preferences, restrictions, and calorie goals.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Form */}
          <MealPlanForm
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
          {results && results.length > 0 ? (
            <ResultsDisplay
              results={results}
              isLoading={isLoading}
              onReset={resetForm}
              onCopy={copyToClipboard}
            />
          ) : (
            <div className="bg-accent/10 p-6 rounded-lg flex flex-col items-center justify-center min-h-[300px]">
              <Utensils className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                {isLoading 
                  ? "Creating your meal plans..." 
                  : "Complete the form to generate personalized meal plans"}
              </p>
            </div>
          )}
        </div>
        
        {error && (
          <div className="mt-6 p-4 bg-destructive/10 text-destructive rounded-md">
            {error}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DietMealPlanGenerator;
