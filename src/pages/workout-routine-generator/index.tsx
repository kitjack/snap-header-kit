
import React from 'react';
import Layout from '@/components/Layout';
import { useWorkoutRoutineGenerator } from './hooks/useWorkoutRoutineGenerator';
import WorkoutForm from './components/WorkoutForm';
import ResultsDisplay from './components/ResultsDisplay';
import { Dumbbell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const WorkoutRoutineGenerator = () => {
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
  } = useWorkoutRoutineGenerator();

  const { user, profile } = useAuth();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-accent/50 w-12 h-12 rounded-full flex items-center justify-center">
            <Dumbbell className="text-primary h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold">Workout Routine Generator</h1>
        </div>
        
        <p className="text-muted-foreground mb-8">
          Create personalized workout routines tailored to your fitness level, goals, and available equipment.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Form */}
          <WorkoutForm
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
              <Dumbbell className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                {isLoading 
                  ? "Creating your workout routines..." 
                  : "Complete the form to generate personalized workout routines"}
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

export default WorkoutRoutineGenerator;
