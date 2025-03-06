
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { originalPrompt, promptType, toneStyle, additionalContext, userId } = await req.json();

    if (!originalPrompt) {
      throw new Error('Original prompt is required');
    }

    // Create a system message based on the prompt type and tone
    let systemMessage = 'You are an AI prompt specialist that helps improve prompts to get better AI results.';
    
    if (promptType) {
      systemMessage += ` Optimize prompts specifically for ${promptType} purposes.`;
    }
    
    if (toneStyle) {
      systemMessage += ` Use a ${toneStyle} tone in the enhanced prompts.`;
    }

    // Construct the OpenAI API request
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: systemMessage
          },
          {
            role: 'user',
            content: `Original prompt: "${originalPrompt}"
            ${additionalContext ? `Additional context: ${additionalContext}` : ''}
            
            Please enhance this prompt to make it more effective for AI systems. Create 5 different variations of the prompt with increasing levels of detail and specificity. For each enhanced prompt, provide:
            1. The enhanced prompt text
            2. An explanation of how this version improves on the original
            3. A rating from 1-10 on how much better this version is likely to be than the original
            
            Format each enhancement as a valid JSON object with the following fields:
            - "enhancedPrompt": the improved prompt text
            - "explanation": why this is better
            - "rating": numerical rating from 1-10
            - "id": a unique identifier string
            
            Return the results as a JSON array.`
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const enhancedPromptsText = data.choices[0].message.content;
    
    // Extract the JSON array from the response
    let enhancedPrompts;
    try {
      // Find JSON array in the text
      const jsonMatch = enhancedPromptsText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        enhancedPrompts = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Could not extract JSON from response');
      }
    } catch (parseError) {
      console.error('Error parsing JSON from OpenAI response:', parseError);
      console.log('Raw response:', enhancedPromptsText);
      throw new Error('Failed to parse enhanced prompts from AI response');
    }

    console.log('Successfully generated enhanced prompts');
    
    return new Response(
      JSON.stringify({ enhancedPrompts }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in enhance-ai-prompts function:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
