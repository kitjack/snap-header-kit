
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, RotateCcw } from 'lucide-react';
import { MealPlan } from '../hooks/useDietMealPlanGenerator';

interface ResultsDisplayProps {
  results: MealPlan[];
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
  if (!results || results.length === 0) return null;

  const formatMealPlanForCopy = (mealPlan: MealPlan) => {
    return `${mealPlan.title}\n\n${mealPlan.description}\n\n${mealPlan.meals.join('\n\n')}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Generated Meal Plans</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onReset} 
          disabled={isLoading}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          New Meal Plan
        </Button>
      </div>

      <div className="space-y-4">
        {results.map((mealPlan) => (
          <Card key={mealPlan.id} className="overflow-hidden border shadow hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold text-primary">{mealPlan.title}</h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onCopy(formatMealPlanForCopy(mealPlan))}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                
                <p className="text-md text-muted-foreground mb-4">
                  {mealPlan.description}
                </p>
                
                <div className="space-y-3">
                  {mealPlan.meals.map((meal, index) => (
                    <div key={index} className="p-3 bg-accent/10 rounded-md">
                      <p className="whitespace-pre-line text-sm leading-relaxed">
                        {meal}
                      </p>
                    </div>
                  ))}
                </div>

                {mealPlan.tags && mealPlan.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {mealPlan.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-accent text-accent-foreground rounded-md text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ResultsDisplay;
