
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
    const { profession, experience, skills, tone, userId } = await req.json();

    console.log('Generating LinkedIn bios for:', {
      profession,
      experience,
      skills,
      tone,
      userId
    });

    if (!openAIApiKey) {
      throw new Error('Missing OpenAI API key');
    }

    // Call OpenAI to generate LinkedIn bios
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
            content: 'You are a professional LinkedIn profile expert who writes compelling and effective bios. Generate 5 distinct LinkedIn bios based on the information provided.'
          },
          {
            role: 'user',
            content: `Create 5 compelling LinkedIn bios for a ${profession} with ${experience} years of experience. 
            Skills include: ${skills}. 
            The tone should be ${tone}.
            Each bio should be unique and professionally formatted.
            Format the response as a JSON array of objects, each with "id" (a number 1-5) and "bio" (the text of the bio).`
          }
        ],
        temperature: 0.7,
        max_tokens: 1500,
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
        bios = biosTexts.map((bio, index) => ({
          id: index + 1,
          bio: bio.trim()
        }));
      }
    }

    // Return the bios
    return new Response(
      JSON.stringify({ 
        bios,
        prompt: `LinkedIn bio for a ${profession} with skills in ${skills}`
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error in generate-linkedin-bios function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An error occurred while generating LinkedIn bios' 
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
