
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertCircle, Plane, Map } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const GENERATION_COST = 10;

interface TravelItineraryFormProps {
  formData: {
    destination: string;
    duration: string;
    activities: string;
    budget: string;
    travelers: string;
  };
  isLoading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  insufficientCredits: boolean;
  renderCreditInfo: () => React.ReactNode;
  user: any;
  profile: any;
}

const TravelItineraryForm: React.FC<TravelItineraryFormProps> = ({
  formData,
  isLoading,
  handleInputChange,
  handleSubmit,
  insufficientCredits,
  renderCreditInfo,
  user,
  profile
}) => {
  const handleSelectChange = (value: string, name: string) => {
    const event = {
      target: {
        name,
        value
      }
    } as React.ChangeEvent<HTMLSelectElement>;
    
    handleInputChange(event);
  };
  
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="destination">Destination *</Label>
            <Input
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              placeholder="e.g. Paris, France or Bali, Indonesia"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration (days) *</Label>
            <Input
              id="duration"
              name="duration"
              type="number"
              min="1"
              max="30"
              value={formData.duration}
              onChange={handleInputChange}
              placeholder="e.g. 7"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="activities">Preferred Activities (optional)</Label>
            <Textarea
              id="activities"
              name="activities"
              value={formData.activities}
              onChange={handleInputChange}
              placeholder="e.g. sightseeing, hiking, museums, beaches, food tours"
              rows={3}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget</Label>
            <Select 
              name="budget" 
              value={formData.budget} 
              onValueChange={(value) => handleSelectChange(value, 'budget')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="budget">Budget</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="travelers">Number of Travelers</Label>
            <Input
              id="travelers"
              name="travelers"
              type="number"
              min="1"
              max="20"
              value={formData.travelers}
              onChange={handleInputChange}
              placeholder="e.g. 2"
              disabled={isLoading}
            />
          </div>

          <div className="mt-4 flex justify-between items-center px-4 py-2 bg-accent/50 rounded-md">
            {renderCreditInfo()}
          </div>

          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full flex items-center justify-center" 
              disabled={isLoading || insufficientCredits || !user || !formData.destination || !formData.duration}
            >
              {isLoading ? 'Generating...' : (
                <>
                  <Plane className="mr-2 h-4 w-4" />
                  Generate Travel Itineraries
                </>
              )}
            </Button>
            
            {!user && (
              <p className="text-sm text-center mt-2 text-amber-600">
                <Link to="/login" className="underline">
                  Login
                </Link> to generate travel itineraries
              </p>
            )}
            
            {insufficientCredits && user && (
              <div className="flex justify-center mt-2">
                <Button asChild variant="outline" size="sm" className="bg-amber-500 hover:bg-amber-600 text-white">
                  <Link to="/premium">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Get More Credits
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TravelItineraryForm;
