
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Copy, ArrowLeft, Compass, Building, Bus, Wallet } from 'lucide-react';

interface ItineraryDay {
  day: number;
  activities: string[];
}

interface Itinerary {
  id: number;
  title: string;
  description: string;
  days: ItineraryDay[];
  accommodations: string;
  transportation: string;
  costs: string;
}

interface ResultsDisplayProps {
  results: Itinerary[];
  isLoading: boolean;
  onReset: () => void;
  onCopy: (text: string) => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  results,
  isLoading,
  onReset,
  onCopy
}) => {
  // Format itinerary as plain text for copying
  const formatItineraryText = (itinerary: Itinerary): string => {
    let text = `${itinerary.title}\n\n`;
    text += `${itinerary.description}\n\n`;
    
    text += `Daily Schedule:\n`;
    itinerary.days.forEach(day => {
      text += `Day ${day.day}:\n`;
      day.activities.forEach(activity => {
        text += `- ${activity}\n`;
      });
      text += '\n';
    });
    
    text += `Accommodations:\n${itinerary.accommodations}\n\n`;
    text += `Transportation:\n${itinerary.transportation}\n\n`;
    text += `Estimated Costs:\n${itinerary.costs}\n`;
    
    return text;
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Generating travel itineraries...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Generated Itineraries</CardTitle>
        <Button variant="outline" size="sm" onClick={onReset}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          New Itinerary
        </Button>
      </CardHeader>
      
      <CardContent className="pt-0">
        <Tabs defaultValue={results[0]?.id?.toString() || '1'} className="w-full">
          <TabsList className="mb-4 w-full">
            {results.map((itinerary) => (
              <TabsTrigger 
                key={itinerary.id} 
                value={itinerary.id.toString()}
                className="flex-1"
              >
                Option {itinerary.id}
              </TabsTrigger>
            ))}
          </TabsList>

          {results.map((itinerary) => (
            <TabsContent key={itinerary.id} value={itinerary.id.toString()}>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{itinerary.title}</h3>
                  <p className="text-sm text-muted-foreground">{itinerary.description}</p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="daily-schedule">
                    <AccordionTrigger className="flex items-center text-base font-medium">
                      <Compass className="h-4 w-4 mr-2" />
                      Daily Schedule
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pt-2">
                        {itinerary.days.map((day) => (
                          <div key={day.day} className="border rounded-md p-3">
                            <h4 className="font-medium mb-2">Day {day.day}</h4>
                            <ul className="space-y-1 list-disc list-inside text-sm">
                              {day.activities.map((activity, index) => (
                                <li key={index} className="text-muted-foreground">{activity}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="accommodations">
                    <AccordionTrigger className="flex items-center text-base font-medium">
                      <Building className="h-4 w-4 mr-2" />
                      Accommodations
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="p-3 text-sm text-muted-foreground">
                        {itinerary.accommodations}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="transportation">
                    <AccordionTrigger className="flex items-center text-base font-medium">
                      <Bus className="h-4 w-4 mr-2" />
                      Transportation
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="p-3 text-sm text-muted-foreground">
                        {itinerary.transportation}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="costs">
                    <AccordionTrigger className="flex items-center text-base font-medium">
                      <Wallet className="h-4 w-4 mr-2" />
                      Estimated Costs
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="p-3 text-sm text-muted-foreground">
                        {itinerary.costs}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex justify-end mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center" 
                    onClick={() => onCopy(formatItineraryText(itinerary))}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Itinerary
                  </Button>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
