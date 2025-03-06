
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

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
    const { businessDescription, industry, tone, userId } = await req.json();
    
    // Validate inputs
    if (!businessDescription || !industry || !tone) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      console.error('Missing OpenAI API key');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create prompt for OpenAI
    const prompt = `Generate 5 catchy and memorable slogans for a ${industry} business with the following description: "${businessDescription}". 
    The tone should be ${tone}. 
    Each slogan should be concise, catchy, and memorable. 
    Format the response as a JSON array of strings, with each string being a slogan.`;

    console.log(`Generating slogans for a ${industry} business with ${tone} tone`);
    
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
          { role: 'system', content: 'You are a creative marketing expert who specializes in creating memorable slogans.' },
          { role: 'user', content: prompt }
        ],
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      return new Response(
        JSON.stringify({ error: 'Failed to generate slogans' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;
    
    // Parse the JSON response
    let slogans;
    try {
      const parsedContent = JSON.parse(generatedContent);
      slogans = Array.isArray(parsedContent.slogans) ? parsedContent.slogans : [];
      
      if (slogans.length === 0) {
        // If the structure is different, try to find an array in the response
        const potentialArrays = Object.values(parsedContent).filter(val => Array.isArray(val));
        if (potentialArrays.length > 0) {
          slogans = potentialArrays[0];
        }
      }
    } catch (error) {
      console.error('Error parsing OpenAI response:', error);
      console.log('Raw content:', generatedContent);
      return new Response(
        JSON.stringify({ error: 'Failed to parse generated slogans' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Format the slogans with IDs
    const formattedSlogans = slogans.map((text, index) => ({
      id: (index + 1).toString(),
      text: text
    }));

    return new Response(
      JSON.stringify({ slogans: formattedSlogans }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-slogans function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
