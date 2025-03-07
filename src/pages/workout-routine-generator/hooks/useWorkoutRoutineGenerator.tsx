
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { AlertCircle } from 'lucide-react';

// Cost per generation in credits
export const GENERATION_COST = 10;

// Form data interface
interface FormData {
  fitnessLevel: string;
  goalType: string;
  equipment: string;
  duration: string;
}

// Defining the exercise interface
export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes?: string;
}

// Defining the workout routine interface
export interface Routine {
  id: number;
  name: string;
  description: string;
  exercises: Exercise[];
  duration: string;
  tags: string[];
}

export const useWorkoutRoutineGenerator = () => {
  const [formData, setFormData] = useState<FormData>({
    fitnessLevel: 'beginner',
    goalType: '',
    equipment: '',
    duration: '',
  });
  const [results, setResults] = useState<Routine[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [insufficientCredits, setInsufficientCredits] = useState(false);
  const { toast } = useToast();
  const { user, profile } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!formData.fitnessLevel || !formData.goalType) {
      toast({
        title: "Input required",
        description: "Please enter your fitness level and goal.",
        variant: "destructive",
      });
      return;
    }

    // Check if user is logged in
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to generate workout routines.",
        variant: "destructive",
      });
      return;
    }

    // Check if user has enough credits
    if (profile && profile.credits < GENERATION_COST) {
      setInsufficientCredits(true);
      toast({
        title: "Insufficient credits",
        description: `You need ${GENERATION_COST} credits to generate workout routines.`,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setInsufficientCredits(false);
    
    try {
      console.log("Calling generate-workout-routines function with:", {
        fitnessLevel: formData.fitnessLevel,
        goalType: formData.goalType,
        equipment: formData.equipment,
        duration: formData.duration,
        userId: user.id
      });
      
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('generate-workout-routines', {
        body: {
          fitnessLevel: formData.fitnessLevel,
          goalType: formData.goalType,
          equipment: formData.equipment,
          duration: formData.duration,
          userId: user.id
        }
      });

      console.log("Edge function response:", data, error);

      if (error) {
        throw new Error(error.message);
      }

      if (!data || !data.routines || data.routines.length === 0) {
        throw new Error('Failed to generate workout routines');
      }

      setResults(data.routines);

      // Deduct credits
      if (profile) {
        const newCredits = profile.credits - GENERATION_COST;
        
        // Update the credits in the profiles table
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ credits: newCredits })
          .eq('id', user.id);
          
        if (updateError) {
          console.error('Error updating credits:', updateError);
          toast({
            title: "Error",
            description: "Failed to update credits. Please refresh the page.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Workout routines generated!",
            description: `${GENERATION_COST} credits have been deducted from your account.`,
          });
        }
      }
      
      // Store the result in database
      const { error: saveError } = await supabase
        .from('ai_tool_results')
        .insert({
          user_id: user.id,
          tool_id: 'workout-routine-generator',
          prompt: JSON.stringify(formData),
          result: JSON.stringify(data.routines)
        });
        
      if (saveError) {
        console.error('Error saving results:', saveError);
      }
    } catch (err: any) {
      console.error('Error generating workout routines:', err);
      setError("Failed to generate workout routines. Please try again.");
      toast({
        title: "Error",
        description: "Failed to generate workout routines. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Workout routine copied to clipboard.",
    });
  };

  const resetForm = () => {
    setResults([]);
  };

  const renderCreditInfo = () => {
    if (!user) return <div className="text-sm text-amber-600">Login to generate workout routines</div>;
    
    if (insufficientCredits) {
      return (
        <div className="flex items-center gap-1 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          <span>Insufficient credits</span>
        </div>
      );
    }
    
    return (
      <div className="text-sm text-muted-foreground">
        Cost: <span className="font-semibold text-secondary">{GENERATION_COST} credits</span> | 
        Available: <span className="font-semibold text-secondary">{profile?.credits || 0} credits</span>
      </div>
    );
  };

  return {
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
  };
};
