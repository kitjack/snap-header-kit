
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Copy } from "lucide-react";
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
  useTextarea = false,
  creditCost = 10
}: AIToolCardProps) => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, profile, refreshProfile } = useAuth();

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
    setResult(''); // Clear the current result

    try {
      console.log("Starting generation with prompt:", prompt);
      
      // Generate content and handle credits in one operation
      const { content, newCredits } = await generateToolContent(
        user.id,
        id,
        prompt,
        profile.credits || 0,
        creditCost
      );
      
      // Set the result directly in the UI
      setResult(content);
      
      // Refresh profile to show updated credits
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
      {/* Input Form Card */}
      <Card className="w-full lg:col-span-5">
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
                  id={`prompt-${id}`}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={placeholder}
                  className="resize-none h-24"
                  required
                />
              ) : (
                <Input
                  id={`prompt-${id}`}
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
        </CardContent>
      </Card>

      {/* Result Card */}
      <Card className="w-full lg:col-span-7">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Result</CardTitle>
            {result && (
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            )}
          </div>
          <CardDescription>Your generated output</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : result ? (
            <div className="bg-secondary/10 rounded-md p-4 h-48 overflow-y-auto">
              <div className="whitespace-pre-line text-sm">{result}</div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-48 text-muted-foreground">
              No result yet. Submit a prompt to see results here.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIToolCard;
