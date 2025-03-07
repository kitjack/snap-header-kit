
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

        {/* Information Sections */}
        <div className="mt-12 space-y-6">
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">What is a Workout Routine Generator?</h2>
            <p className="text-gray-700">
              A Workout Routine Generator is an AI-powered tool that creates customized exercise programs based on your specific fitness goals, physical condition, time constraints, and available equipment. It applies principles of exercise science and program design to develop structured workouts that target your desired outcomes—whether that's building strength, losing weight, improving endurance, enhancing flexibility, or achieving a combination of fitness objectives. Our generator creates varied, progressive, and balanced routines that help prevent plateaus and keep your training fresh and effective. It's like having a personal trainer in your pocket, helping you design workouts that are appropriate for your fitness level while challenging enough to promote improvement.
            </p>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Using It</h2>
            <p className="text-gray-700">
              To generate effective workout routines, start by specifying your primary fitness goal (strength, weight loss, muscle gain, etc.). Indicate your current fitness level from beginner to advanced so the exercises match your capabilities. Select the equipment you have access to—whether that's a fully equipped gym, basic home equipment, or no equipment at all. Specify any physical limitations or injuries that need to be accommodated in your routine. Choose how many days per week you can dedicate to working out and how much time you have available per session. After clicking "Generate Workout," you'll receive detailed routines that include specific exercises, sets, repetitions, rest periods, and progressive overload strategies. You can easily copy the workout that best fits your needs and preferences.
            </p>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Tips</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Be honest about your current fitness level to receive appropriate exercise recommendations</li>
              <li>Start with fewer days per week if you're new to exercise and gradually increase frequency</li>
              <li>Include any injuries or limitations to ensure the generated routine is safe for your body</li>
              <li>Generate new routines every 4-6 weeks to prevent plateaus and maintain progress</li>
              <li>Consider combining different goals (like strength + cardio) for more balanced fitness</li>
              <li>Look up proper form for unfamiliar exercises before attempting them</li>
              <li>Track your progress with the generated routines to see what works best for your body</li>
            </ul>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">FAQ</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium">Are these workouts safe for everyone?</h3>
                <p className="text-gray-700">While our generator aims to create safe, balanced routines based on your inputs, it's always recommended to consult with a healthcare provider before starting any new exercise program, especially if you have pre-existing health conditions or injuries. Always listen to your body and modify exercises as needed.</p>
              </div>
              <div>
                <h3 className="font-medium">How often should I generate a new workout routine?</h3>
                <p className="text-gray-700">For optimal results, we recommend changing your routine every 4-6 weeks to prevent adaptation and plateaus. However, beginners might benefit from staying with the same routine a bit longer to master proper form and build a foundation before progressing.</p>
              </div>
              <div>
                <h3 className="font-medium">What if I don't understand an exercise in my routine?</h3>
                <p className="text-gray-700">If you're unfamiliar with any exercise, we recommend looking up proper form videos online before attempting it. Alternatively, you can generate a new routine with the "beginner-friendly" option selected to receive more commonly known exercises with simpler technique requirements.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Privacy</h2>
            <p className="text-gray-700">
              We understand the sensitive nature of health and fitness information. The details you provide about your physical condition, fitness goals, and limitations are handled with strict confidentiality. We use this information solely for generating appropriate workout recommendations and do not share it with third parties. The workout routines generated are private to your account, and you retain full rights to use them as you wish. For more comprehensive information on our data handling practices, please refer to our detailed Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WorkoutRoutineGenerator;
