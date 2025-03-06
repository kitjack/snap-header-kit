
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
import OpenAI from 'openai';

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
      // Get OpenAI API key from Supabase
      const { data: apiKeyData, error: apiKeyError } = await supabase.functions.invoke('get-openai-key', {});
      
      if (apiKeyError || !apiKeyData?.apiKey) {
        throw new Error('Could not retrieve OpenAI API key');
      }
      
      const openai = new OpenAI({
        apiKey: apiKeyData.apiKey,
        dangerouslyAllowBrowser: true, // Note: This is not recommended for production
      });

      // Create system messages based on tool type
      let systemMessage = "You are a helpful assistant.";
      
      switch (id) {
        case 'business-name':
          systemMessage = "You are a business naming expert. Generate 5 creative, unique, and memorable business names based on the description provided. Format your response as a numbered list. Be concise and professional.";
          break;
        
        case 'etsy-tags':
          systemMessage = "You are an Etsy SEO expert. Generate 10 relevant and effective Etsy tags for the product described. Format each tag with a # prefix. Focus on searchable and trending keywords that will help the product get discovered.";
          break;
        
        case 'slogan':
          systemMessage = "You are a branding expert specializing in slogan creation. Generate 5 catchy, memorable slogans for the business described. Format your response as a numbered list. Each slogan should be concise and convey the essence of the brand.";
          break;
        
        default:
          systemMessage = "You are a helpful assistant. Provide a detailed and helpful response to the prompt.";
      }

      // Call OpenAI API directly
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      });

      const generatedText = response.choices[0].message.content || '';
      
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
      setResult(generatedText);
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
