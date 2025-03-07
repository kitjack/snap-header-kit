
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import TravelItineraryForm from './components/TravelItineraryForm';
import ResultsDisplay from './components/ResultsDisplay';
import { useTravelItineraryGenerator } from './hooks/useTravelItineraryGenerator';
import { map, plane, compass } from 'lucide-react';

const TravelItineraryGenerator = () => {
  const {
    formData,
    results,
    isLoading,
    error,
    handleInputChange,
    handleSubmit,
    resetForm,
    copyToClipboard,
    renderCreditInfo,
    user,
    profile
  } = useTravelItineraryGenerator();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Travel Itinerary Generator</h1>
          <p className="text-gray-600 mb-6">
            Create personalized travel itineraries based on your destination, duration, and preferences.
          </p>

          <Tabs defaultValue="generator" className="w-full mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="generator">Generator</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>

            <TabsContent value="generator">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TravelItineraryForm
                  formData={formData}
                  isLoading={isLoading}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  renderCreditInfo={renderCreditInfo}
                  insufficientCredits={profile?.credits < 10}
                  user={user}
                  profile={profile}
                />

                {results && results.length > 0 && (
                  <ResultsDisplay
                    results={results}
                    isLoading={isLoading}
                    onReset={resetForm}
                    onCopy={copyToClipboard}
                  />
                )}
              </div>
            </TabsContent>

            <TabsContent value="about">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">About the Travel Itinerary Generator</h2>
                  <p className="mb-4">
                    The Travel Itinerary Generator helps you plan your perfect trip by creating customized
                    day-by-day schedules based on your preferences. Simply input your destination, trip
                    duration, and any specific activities or needs, and our AI will create detailed itineraries
                    tailored just for you.
                  </p>
                  <p>
                    Each generated itinerary includes a daily schedule, recommended accommodations, transportation
                    suggestions, and estimated costs, making your trip planning faster and easier.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Separator className="my-8" />

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">How to Use the Travel Itinerary Generator</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-full mb-4">
                      <plane className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-2">Enter Your Trip Details</h3>
                    <p className="text-sm text-gray-600">
                      Provide your destination, duration, preferred activities, budget, and number of travelers.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-full mb-4">
                      <compass className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-2">Get Multiple Options</h3>
                    <p className="text-sm text-gray-600">
                      Our AI will generate two different itinerary options tailored to your specifications.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-full mb-4">
                      <map className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-2">Customize Your Plan</h3>
                    <p className="text-sm text-gray-600">
                      Copy your preferred itinerary and adjust it as needed to create your perfect trip.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Why Use Our Travel Itinerary Generator?</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <strong className="font-medium">Save Planning Time:</strong> Create comprehensive travel itineraries in seconds instead of spending hours researching.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <strong className="font-medium">Personalized Recommendations:</strong> Get itineraries tailored to your specific preferences, budget, and travel style.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <strong className="font-medium">Discover Hidden Gems:</strong> Explore lesser-known attractions and experiences that you might miss in standard travel guides.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <strong className="font-medium">Practical Details:</strong> Get accommodation and transportation suggestions along with estimated costs to help with budgeting.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TravelItineraryGenerator;
