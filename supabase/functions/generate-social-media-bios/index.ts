
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the request body
    const { platform, purpose, tone, keywords, userId } = await req.json();

    console.log('Generating social media bios for:', {
      platform,
      purpose,
      tone,
      keywords,
      userId
    });

    if (!openAIApiKey) {
      throw new Error('Missing OpenAI API key');
    }

    // Call OpenAI to generate social media bios
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
            content: 'You are a professional social media profile expert who writes compelling and effective bios. Generate 2 distinct social media bios based on the information provided.'
          },
          {
            role: 'user',
            content: `Create 2 compelling ${platform} bios for a profile with the purpose of ${purpose}. 
            Keywords to include: ${keywords}. 
            The tone should be ${tone}.
            Each bio should be unique and professionally formatted.
            Format the response as a JSON array of objects, each with "id" (1 or 2) and "bio" (the text of the bio).`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('OpenAI API error:', data);
      throw new Error(`OpenAI API error: ${data.error?.message || 'Unknown error'}`);
    }

    // Parse the JSON from the response text
    const content = data.choices[0].message.content;
    let bios;
    
    try {
      // Try to parse the JSON directly
      bios = JSON.parse(content);
    } catch (e) {
      // If direct parsing fails, try to extract JSON from the text
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        bios = JSON.parse(jsonMatch[0]);
      } else {
        // If extraction fails, manually parse the text
        console.log("Failed to parse JSON, creating structured data manually");
        const biosTexts = content.split(/Bio \d+:|^\d+\./m).filter(text => text.trim().length > 0);
        bios = biosTexts.slice(0, 2).map((bio, index) => ({
          id: index + 1,
          bio: bio.trim()
        }));
      }
    }

    // Return the bios
    return new Response(
      JSON.stringify({ 
        bios,
        prompt: `Social media bio for ${platform} with keywords: ${keywords}`
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error in generate-social-media-bios function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An error occurred while generating social media bios' 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
