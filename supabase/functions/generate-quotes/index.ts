
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
    // Parse request body
    const { topic, style, keywords, userId } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    if (!userId) {
      throw new Error('User ID is required');
    }

    // Build prompt with user inputs
    let prompt = `Generate 2 inspiring and thoughtful quotes about ${topic || 'life'}`;
    
    if (style) {
      prompt += ` in a ${style} style`;
    }
    
    if (keywords) {
      prompt += ` incorporating these keywords or themes where appropriate: ${keywords}`;
    }
    
    prompt += `. For each quote, provide: 1) The quote text, 2) An author attribution (if fictional, create a plausible name), 3) A brief context or explanation about the quote's meaning. Format the response as a valid JSON array with exactly 2 objects, each containing 'id', 'quote', 'author', and 'context' fields.`;

    console.log('Calling OpenAI with prompt:', prompt);

    // Call OpenAI API
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
            content: 'You are a professional quote generator that creates inspiring, thoughtful quotes based on requested topics and styles. Always format your response as a valid JSON array containing exactly 2 quote objects with the fields "id", "quote", "author", and "context".'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
      }),
    });

    const data = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      console.error('Unexpected OpenAI response:', data);
      throw new Error('Failed to generate quotes');
    }

    const responseContent = data.choices[0].message.content;
    console.log('OpenAI response:', responseContent);
    
    // Parse the response content and validate
    let quotes;
    try {
      quotes = JSON.parse(responseContent);
      
      // Ensure we have an array with exactly 2 quotes
      if (!Array.isArray(quotes) || quotes.length !== 2) {
        throw new Error('Expected an array with exactly 2 quotes');
      }
      
      // Validate each quote has required fields
      quotes = quotes.map((quote, index) => {
        // Ensure quote has an id (or assign one if missing)
        if (!quote.id) {
          quote.id = index + 1;
        }
        
        // Ensure other required fields exist
        if (!quote.quote || !quote.author || !quote.context) {
          throw new Error(`Quote at index ${index} is missing required fields`);
        }
        
        return quote;
      });
    } catch (error) {
      console.error('Failed to parse quotes:', error);
      console.error('Response content:', responseContent);
      
      // Fallback - create a structured response if parsing fails
      quotes = [
        {
          id: 1,
          quote: "Failed to parse the generated quotes. Please try again.",
          author: "System",
          context: "An error occurred while generating your quotes."
        },
        {
          id: 2,
          quote: "The system encountered an error. Please try with a different input.",
          author: "System",
          context: "There was an issue with the quote generation."
        }
      ];
    }

    // Return the quotes
    return new Response(
      JSON.stringify({ quotes }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in generate-quotes function:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
