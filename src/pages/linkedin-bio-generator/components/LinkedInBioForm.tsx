
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertCircle, Briefcase, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export const GENERATION_COST = 10;

interface LinkedInBioFormProps {
  formData: {
    profession: string;
    experience: string;
    skills: string;
    tone: string;
  };
  isLoading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  insufficientCredits: boolean;
  renderCreditInfo: () => React.ReactNode;
  user: any;
  profile: any;
}

const LinkedInBioForm = ({
  formData,
  isLoading,
  handleInputChange,
  handleSubmit,
  insufficientCredits,
  renderCreditInfo,
  user,
  profile
}: LinkedInBioFormProps) => {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="profession">Profession / Title</Label>
            <Input
              id="profession"
              name="profession"
              value={formData.profession}
              onChange={handleInputChange}
              placeholder="e.g. Senior Marketing Manager"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Years of Experience</Label>
            <Input
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              placeholder="e.g. 5"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Key Skills</Label>
            <Textarea
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              placeholder="e.g. digital marketing, SEO, content strategy, team leadership"
              rows={3}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tone">Tone</Label>
            <select
              id="tone"
              name="tone"
              value={formData.tone}
              onChange={handleInputChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              disabled={isLoading}
            >
              <option value="professional">Professional</option>
              <option value="conversational">Conversational</option>
              <option value="enthusiastic">Enthusiastic</option>
              <option value="authoritative">Authoritative</option>
              <option value="creative">Creative</option>
            </select>
          </div>

          <div className="mt-4 flex justify-between items-center px-4 py-2 bg-accent/50 rounded-md">
            {renderCreditInfo()}
          </div>

          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || insufficientCredits || !user}
            >
              {isLoading ? 'Generating...' : 'Generate LinkedIn Bios'}
            </Button>
            
            {!user && (
              <p className="text-sm text-center mt-2 text-amber-600">
                <Link to="/login" className="underline">
                  Login
                </Link> to generate LinkedIn bios
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

export default LinkedInBioForm;
