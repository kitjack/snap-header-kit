
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
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
import { Loader2, AlertCircle, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';

// Cost per generation in credits
export const GENERATION_COST = 10;

interface FormData {
  dietType: string;
  dietaryRestrictions: string;
  calorieGoal: string;
  mealsPerDay: string;
}

interface MealPlanFormProps {
  formData: FormData;
  isLoading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  insufficientCredits?: boolean;
  renderCreditInfo?: () => React.ReactNode;
  user?: any;
  profile?: any;
}

// Diet type options
const dietTypeOptions = [
  { value: "", label: "Select a diet type" },
  { value: "balanced", label: "Balanced" },
  { value: "keto", label: "Keto" },
  { value: "paleo", label: "Paleo" },
  { value: "mediterranean", label: "Mediterranean" },
  { value: "vegan", label: "Vegan" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "low-carb", label: "Low Carb" },
  { value: "high-protein", label: "High Protein" },
  { value: "gluten-free", label: "Gluten Free" },
  { value: "dairy-free", label: "Dairy Free" },
];

// Meals per day options
const mealsPerDayOptions = [
  { value: "3", label: "3 meals per day" },
  { value: "4", label: "4 meals per day" },
  { value: "5", label: "5 meals per day" },
  { value: "6", label: "6 meals per day" },
];

const MealPlanForm: React.FC<MealPlanFormProps> = ({
  formData,
  isLoading,
  handleInputChange,
  handleSubmit,
  insufficientCredits,
  renderCreditInfo,
  user,
  profile
}) => {
  const hasLowCredits = profile && profile?.credits < GENERATION_COST;
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="dietType" className="mb-1.5 block">Diet Type</Label>
        <Select
          value={formData.dietType}
          onValueChange={(value) => {
            const event = {
              target: { name: "dietType", value }
            } as React.ChangeEvent<HTMLSelectElement>;
            handleInputChange(event);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a diet type" />
          </SelectTrigger>
          <SelectContent>
            {dietTypeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="dietaryRestrictions" className="mb-1.5 block">Dietary Restrictions (Optional)</Label>
        <Textarea
          id="dietaryRestrictions"
          name="dietaryRestrictions"
          placeholder="e.g., no nuts, dairy-free, no shellfish"
          value={formData.dietaryRestrictions}
          onChange={handleInputChange}
          className="min-h-[80px] resize-none focus-visible:ring-1"
        />
      </div>
      
      <div>
        <Label htmlFor="calorieGoal" className="mb-1.5 block">Calorie Goal (Optional)</Label>
        <Input
          id="calorieGoal"
          name="calorieGoal"
          placeholder="e.g., 1500, 2000, 2500"
          value={formData.calorieGoal}
          onChange={handleInputChange}
          className="focus-visible:ring-1"
        />
      </div>
      
      <div>
        <Label htmlFor="mealsPerDay" className="mb-1.5 block">Meals Per Day</Label>
        <Select
          value={formData.mealsPerDay}
          onValueChange={(value) => {
            const event = {
              target: { name: "mealsPerDay", value }
            } as React.ChangeEvent<HTMLSelectElement>;
            handleInputChange(event);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select number of meals per day" />
          </SelectTrigger>
          <SelectContent>
            {mealsPerDayOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {renderCreditInfo && (
        <div className="py-1">
          {renderCreditInfo()}
        </div>
      )}
      
      <Button 
        type="submit"
        disabled={isLoading || !formData.dietType || (user && insufficientCredits)}
        className="w-full bg-green-600 hover:bg-green-700 text-white mt-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Meal Plans...
          </>
        ) : (
          'Generate Meal Plans'
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

export default MealPlanForm;
