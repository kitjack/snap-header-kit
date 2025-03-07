
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Routine } from '../hooks/useWorkoutRoutineGenerator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

interface ResultsDisplayProps {
  results: Routine[];
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
  const formatRoutineText = (routine: Routine): string => {
    let text = `${routine.name}\n\n`;
    text += `${routine.description}\n\n`;
    text += `Duration: ${routine.duration}\n\n`;
    text += `Exercises:\n`;
    
    routine.exercises.forEach((exercise, index) => {
      text += `${index + 1}. ${exercise.name}\n`;
      text += `   Sets: ${exercise.sets}\n`;
      text += `   Reps: ${exercise.reps}\n`;
      text += `   Rest: ${exercise.rest}\n`;
      if (exercise.notes) {
        text += `   Notes: ${exercise.notes}\n`;
      }
      text += `\n`;
    });
    
    return text;
  };
  
  // Handle case where results might be malformed
  const validResults = Array.isArray(results) ? results : [];
  
  return (
    <div className="bg-accent/50 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Generated Workout Routines</h2>
      
      <div className="space-y-4 mb-6">
        {validResults.length > 0 ? (
          validResults.map((routine) => (
            <Card key={routine.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{routine.name}</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onCopy(formatRoutineText(routine))}
                    className="h-8 w-8 p-0"
                    title="Copy full routine"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {routine.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">{routine.description}</p>
                  <p className="text-sm font-medium mt-2">Duration: {routine.duration}</p>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="exercises">
                    <AccordionTrigger className="text-sm font-medium">
                      View Exercises ({routine.exercises.length})
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        {routine.exercises.map((exercise, index) => (
                          <div key={index} className="border rounded-md p-3">
                            <h4 className="font-medium">{exercise.name}</h4>
                            <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                              <div>
                                <span className="text-muted-foreground">Sets:</span> {exercise.sets}
                              </div>
                              <div>
                                <span className="text-muted-foreground">Reps:</span> {exercise.reps}
                              </div>
                              <div>
                                <span className="text-muted-foreground">Rest:</span> {exercise.rest}
                              </div>
                            </div>
                            {exercise.notes && (
                              <div className="mt-2 text-sm">
                                <span className="text-muted-foreground">Notes:</span> {exercise.notes}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="p-4 text-center text-muted-foreground">
            <p>No valid workout routines found. Please try generating again.</p>
          </Card>
        )}
      </div>
      
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          onClick={onReset}
          disabled={isLoading}
        >
          Generate New Routines
        </Button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
