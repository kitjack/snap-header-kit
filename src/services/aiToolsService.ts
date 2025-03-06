
import { supabase } from '@/integrations/supabase/client';
import { generateAIContent } from './openai';
import { toast } from '@/hooks/use-toast';

export interface AIToolCreditsResponse {
  success: boolean;
  newCredits?: number;
  error?: string;
}

export interface AIToolGenerationResult {
  content: string;
  newCredits: number;
}

// Get OpenAI API key from edge function
export const getOpenAIKey = async (): Promise<string> => {
  try {
    console.log("Fetching OpenAI API key from edge function");
    const { data, error } = await supabase.functions.invoke('get-openai-key');
    
    if (error) {
      console.error('Error fetching OpenAI API key:', error);
      throw new Error(`Failed to get OpenAI API key: ${error.message}`);
    }
    
    if (!data?.apiKey) {
      throw new Error('Could not retrieve OpenAI API key - key is null or undefined');
    }
    
    console.log("API key retrieved successfully");
    return data.apiKey;
  } catch (error) {
    console.error("Error in getOpenAIKey:", error);
    toast({
      title: "API Key Error",
      description: `Failed to get OpenAI API key: ${error instanceof Error ? error.message : 'Unknown error'}`,
      variant: "destructive"
    });
    throw error;
  }
};

// Update user credits after a generation
export const updateUserCredits = async (userId: string, credits: number): Promise<AIToolCreditsResponse> => {
  try {
    console.log(`Updating credits for user ${userId} to ${credits}`);
    const { error } = await supabase
      .from('profiles')
      .update({ 
        credits,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (error) {
      console.error('Error updating credits:', error);
      return { success: false, error: error.message };
    }

    console.log("Credits updated successfully");
    return { success: true, newCredits: credits };
  } catch (err) {
    console.error('Error in updateUserCredits:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
};

// Save result to database for analytics
export const saveResultToDatabase = async (userId: string, toolId: string, prompt: string, result: string): Promise<boolean> => {
  try {
    console.log(`Saving result to database for user ${userId} and tool ${toolId}`);
    const { error } = await supabase
      .from('ai_tool_results')
      .insert({
        user_id: userId,
        tool_id: toolId,
        prompt,
        result
      });

    if (error) {
      console.error('Error saving result to database:', error);
      return false;
    }
    
    console.log("Result saved successfully");
    return true;
  } catch (err) {
    console.error('Error in saveResultToDatabase:', err);
    return false;
  }
};

// Main function to generate content and handle credits
export const generateToolContent = async (
  userId: string, 
  toolId: string, 
  prompt: string, 
  currentCredits: number,
  creditCost: number
): Promise<AIToolGenerationResult> => {
  console.log(`Generating content for tool ${toolId} with prompt: ${prompt}`);
  
  if (currentCredits < creditCost) {
    console.error("Not enough credits");
    throw new Error(`Not enough credits. You need ${creditCost} credits, but you only have ${currentCredits}.`);
  }
  
  try {
    // First, get the OpenAI API key
    const apiKey = await getOpenAIKey();
    
    // Generate the content
    const generatedContent = await generateAIContent({
      toolId,
      prompt,
      apiKey
    });
    
    // Update user credits
    const newCreditsAmount = currentCredits - creditCost;
    const creditsResult = await updateUserCredits(userId, newCreditsAmount);
    
    if (!creditsResult.success) {
      throw new Error(`Failed to update credits: ${creditsResult.error}`);
    }
    
    // Save the result to the database
    await saveResultToDatabase(userId, toolId, prompt, generatedContent);
    
    return {
      content: generatedContent,
      newCredits: newCreditsAmount
    };
  } catch (error) {
    console.error("Error in generateToolContent:", error);
    throw error;
  }
};
