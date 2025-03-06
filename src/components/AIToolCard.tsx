
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Copy, ArrowRight } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { generateToolContent } from '@/services/aiToolsService';

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
  useTextarea = true,
  creditCost = 10
}: AIToolCardProps) => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, profile, refreshProfile } = useAuth();

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
      console.log("Starting generation with prompt:", prompt);
      
      const { content, newCredits } = await generateToolContent(
        user.id,
        id,
        prompt,
        profile.credits || 0,
        creditCost
      );
      
      console.log("Generated content:", content);
      setResult(content);
      await refreshProfile();
      
      toast({
        title: "Success!",
        description: `Generated successfully! ${creditCost} credits used.`,
      });
    } catch (error) {
      console.error('Error using AI tool:', error);
      toast({
        title: "Error",
        description: `Failed to generate: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    
    navigator.clipboard.writeText(result)
      .then(() => {
        toast({
          title: "Copied!",
          description: "Result copied to clipboard",
        });
      })
      .catch(err => {
        console.error("Failed to copy text: ", err);
        toast({
          title: "Copy failed",
          description: "Could not copy to clipboard",
          variant: "destructive",
        });
      });
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="text-primary">
            {icon}
          </div>
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={placeholder}
            className="min-h-24 resize-none"
            disabled={loading}
          />
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Cost: <span className="font-medium">{creditCost} credits</span>
            </div>
            
            <Button 
              type="submit" 
              disabled={loading || !user || (profile && profile.credits < creditCost)}
              className="ml-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  Generate
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
        
        {/* Results Section */}
        {(loading || result) && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Result</h3>
              {result && (
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="h-3.5 w-3.5 mr-1.5" />
                  Copy
                </Button>
              )}
            </div>
            
            <div className="rounded-md border">
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : result ? (
                <div className="p-4 max-h-80 overflow-y-auto whitespace-pre-line text-sm">
                  {result}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIToolCard;
