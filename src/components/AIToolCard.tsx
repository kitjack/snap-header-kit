
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AIToolCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  placeholder: string;
  inputLabel: string;
  useTextarea?: boolean;
  creditCost?: number;
}

const AIToolCard = ({
  id,
  title,
  description,
  icon,
  placeholder,
  inputLabel,
  useTextarea = false,
  creditCost = 10
}: AIToolCardProps) => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, profile, refreshProfile } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !profile) {
      toast({
        title: "Not logged in",
        description: "You need to be logged in to use this tool",
        variant: "destructive",
      });
      return;
    }

    if ((profile.credits || 0) < creditCost) {
      toast({
        title: "Insufficient credits",
        description: `You need at least ${creditCost} credits to use this tool`,
        variant: "destructive",
      });
      return;
    }

    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a prompt to continue",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setResult('');

    try {
      // First call the edge function to generate content
      const { data: aiResponse, error: aiError } = await supabase.functions.invoke('generate-ai-content', {
        body: {
          toolId: id,
          prompt
        }
      });

      if (aiError) throw aiError;
      
      // Then update the credits in the database
      const { data, error } = await supabase
        .from('profiles')
        .update({ 
          credits: (profile.credits || 0) - creditCost,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;
      
      // Set the result and refresh the profile to get updated credits
      setResult(aiResponse.result);
      await refreshProfile();
      
      toast({
        title: "Success!",
        description: `Generated successfully! ${creditCost} credits used.`,
      });
    } catch (error) {
      console.error('Error using AI tool:', error);
      toast({
        title: "Error",
        description: "Failed to generate. Your credits have not been deducted.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const InputComponent = useTextarea ? (
    <Textarea
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      placeholder={placeholder}
      className="resize-none h-24"
      required
    />
  ) : (
    <Input
      type="text"
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      placeholder={placeholder}
      required
    />
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="text-primary">
            {icon}
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`prompt-${id}`}>{inputLabel}</Label>
            {useTextarea ? (
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={placeholder}
                className="resize-none h-24"
                required
              />
            ) : (
              <Input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={placeholder}
                required
              />
            )}
          </div>
          <Button 
            type="submit" 
            disabled={loading || !user || (profile && profile.credits < creditCost)}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>Try Now • {creditCost} Credits</>
            )}
          </Button>
        </form>

        {result && (
          <div className="mt-4 p-4 bg-secondary/10 rounded-md">
            <p className="text-sm font-medium mb-2">Results:</p>
            <div className="whitespace-pre-line text-sm">{result}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIToolCard;
