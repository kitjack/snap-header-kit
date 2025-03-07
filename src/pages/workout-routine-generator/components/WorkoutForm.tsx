
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, AlertCircle, Coins, Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GENERATION_COST } from '../hooks/useWorkoutRoutineGenerator';

interface FormData {
  fitnessLevel: string;
  goalType: string;
  equipment: string;
  duration: string;
}

interface WorkoutFormProps {
  formData: FormData;
  isLoading: boolean;
  insufficientCredits: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  renderCreditInfo: () => React.ReactNode;
  user: any;
  profile: any;
}

const fitnessLevelOptions = [
  "beginner",
  "intermediate",
  "advanced"
];

const goalTypeOptions = [
  "muscle building",
  "weight loss",
  "strength",
  "endurance",
  "flexibility",
  "general fitness"
];

const durationOptions = [
  "20-30 minutes",
  "30-45 minutes",
  "45-60 minutes",
  "60+ minutes"
];

const WorkoutForm: React.FC<WorkoutFormProps> = ({
  formData,
  isLoading,
  insufficientCredits,
  handleInputChange,
  handleSubmit,
  renderCreditInfo,
  user,
  profile
}) => {
  const hasLowCredits = profile && profile.credits < GENERATION_COST;
  
  return (
    <form onSubmit={handleSubmit} className="bg-accent/50 p-6 rounded-lg space-y-4">
      <h2 className="text-xl font-bold mb-4">Workout Details</h2>
      
      <div className="space-y-2">
        <Label htmlFor="fitnessLevel">Fitness Level*</Label>
        <Select
          value={formData.fitnessLevel}
          onValueChange={(value) => handleInputChange({
            target: { name: 'fitnessLevel', value }
          } as React.ChangeEvent<HTMLSelectElement>)}
        >
          <SelectTrigger className="focus-visible:ring-1 w-full">
            <SelectValue placeholder="Select your fitness level" />
          </SelectTrigger>
          <SelectContent>
            {fitnessLevelOptions.map((level) => (
              <SelectItem key={level} value={level}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="goalType">Goal Type*</Label>
        <Select
          value={formData.goalType}
          onValueChange={(value) => handleInputChange({
            target: { name: 'goalType', value }
          } as React.ChangeEvent<HTMLSelectElement>)}
        >
          <SelectTrigger className="focus-visible:ring-1 w-full">
            <SelectValue placeholder="Select your workout goal" />
          </SelectTrigger>
          <SelectContent>
            {goalTypeOptions.map((goal) => (
              <SelectItem key={goal} value={goal}>
                {goal.charAt(0).toUpperCase() + goal.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="equipment">Available Equipment</Label>
        <Input
          id="equipment"
          name="equipment"
          placeholder="e.g. dumbbells, resistance bands, bodyweight only"
          value={formData.equipment}
          onChange={handleInputChange}
          className="focus-visible:ring-1"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="duration">Preferred Workout Duration</Label>
        <Select
          value={formData.duration}
          onValueChange={(value) => handleInputChange({
            target: { name: 'duration', value }
          } as React.ChangeEvent<HTMLSelectElement>)}
        >
          <SelectTrigger className="focus-visible:ring-1 w-full">
            <SelectValue placeholder="Select preferred duration" />
          </SelectTrigger>
          <SelectContent>
            {durationOptions.map((duration) => (
              <SelectItem key={duration} value={duration}>
                {duration}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="py-1">
        {renderCreditInfo()}
      </div>
      
      <Button 
        type="submit"
        disabled={isLoading || !user || !formData.fitnessLevel || !formData.goalType}
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white mt-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Dumbbell className="mr-2 h-4 w-4" />
            Generate Workout Routines
          </>
        )}
      </Button>
      
      {hasLowCredits && (
        <div className="mt-3">
          <div className="flex items-center gap-1 text-sm text-destructive mb-2">
            <AlertCircle className="h-4 w-4" />
            <span>Insufficient credits for generation</span>
          </div>
          <Button 
            asChild
            className="w-full bg-amber-500 hover:bg-amber-600 text-white"
          >
            <Link to="/premium">
              <Coins className="mr-2 h-4 w-4" />
              Top Up Credits
            </Link>
          </Button>
        </div>
      )}
    </form>
  );
};

export default WorkoutForm;
