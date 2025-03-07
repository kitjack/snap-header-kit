
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
          Create personalized meal plans tailored to your dietary preferences, nutritional needs, and health goals.
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

        {/* Information Sections */}
        <div className="mt-12 space-y-6">
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">What is a Diet Meal Plan Generator?</h2>
            <p className="text-gray-700">
              A Diet Meal Plan Generator is an AI-powered tool designed to create customized eating plans based on your specific dietary preferences, nutritional requirements, and health goals. It takes into account factors like your target calorie intake, macronutrient distribution, food allergies, dietary restrictions, personal preferences, and available cooking time to suggest meals that are both nutritionally balanced and enjoyable to eat. Whether you're following a specific diet protocol (keto, vegan, paleo, etc.), managing a health condition, wanting to lose weight, or simply seeking to eat healthier, our generator creates practical meal plans with variety and balance to help you achieve your nutrition goals without the stress of planning every meal yourself.
            </p>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Using It</h2>
            <p className="text-gray-700">
              To generate a personalized meal plan, start by selecting your dietary approach (omnivore, vegetarian, vegan, keto, etc.) and indicating any food allergies or intolerances you have. Specify your health goals, whether that's weight loss, muscle gain, increased energy, or managing a specific condition. Enter your preferred calorie range if you have one, or our system can suggest appropriate levels based on your goals. Indicate the number of meals you prefer per day and any specific foods you particularly enjoy or dislike. For additional customization, you can specify your cooking skill level and available time for meal preparation. After clicking "Generate Meal Plan," you'll receive a detailed plan that includes breakfast, lunch, dinner, and snack options for multiple days, complete with approximate nutritional information. You can easily copy the plan that best fits your preferences and lifestyle.
            </p>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Tips</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Be specific about your food allergies and intolerances to ensure safe recommendations</li>
              <li>Consider your cooking abilities and time constraints for more realistic meal plans</li>
              <li>Generate multiple meal plans to create variety in your weekly eating routine</li>
              <li>Start with a shorter meal plan (3-4 days) if you're new to meal planning</li>
              <li>List foods you definitely enjoy to increase the likelihood you'll stick with the plan</li>
              <li>Look for recipes with overlapping ingredients to reduce food waste and grocery costs</li>
              <li>Consider seasonality when selecting plans to optimize for fresh, available produce</li>
            </ul>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">FAQ</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium">Are these meal plans nutritionally complete?</h3>
                <p className="text-gray-700">Our generator aims to create balanced meal plans that meet general nutritional guidelines based on your selected dietary approach. However, individual nutritional needs vary significantly based on factors our system cannot fully assess. For specific health conditions or precise nutritional requirements, we recommend consulting with a registered dietitian or healthcare provider.</p>
              </div>
              <div>
                <h3 className="font-medium">Can I modify the generated meal plans?</h3>
                <p className="text-gray-700">Absolutely! Consider the generated plans as starting points or templates. Feel free to swap meals, adjust portions, or substitute ingredients based on your preferences, what's available in your kitchen, or seasonal availability. The flexibility to customize is an important aspect of sustainable healthy eating.</p>
              </div>
              <div>
                <h3 className="font-medium">How accurate are the calorie estimates?</h3>
                <p className="text-gray-700">The calorie and macronutrient estimates provided are approximations based on standard nutritional databases. Actual values may vary based on specific ingredients, brands, and portion sizes used. If precise tracking is important for your goals, consider using a nutrition tracking app alongside your meal plan.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#f4fcfb] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Privacy</h2>
            <p className="text-gray-700">
              We understand that dietary preferences and health goals are personal information. The details you provide about your nutritional needs, allergies, and health objectives are handled with strict confidentiality and used solely for generating appropriate meal plan recommendations. This information is not shared with third parties. The meal plans generated are private to your account, and you retain full rights to use them as you wish. We do not store your specific requests for purposes beyond the immediate meal plan generation, and we maintain strict privacy standards to protect your personal information. For more comprehensive information on our data handling practices, please refer to our detailed Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DietMealPlanGenerator;
