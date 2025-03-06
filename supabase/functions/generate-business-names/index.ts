
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const { description, industry, keywords, userId } = await req.json();

    // Build the prompt
    let prompt = `Generate 10 creative and memorable business names based on this description: "${description}"`;
    
    if (industry) {
      prompt += ` The business is in the ${industry} industry.`;
    }
    
    if (keywords && keywords.trim()) {
      prompt += ` The following keywords should be considered: ${keywords}.`;
    }
    
    prompt += ` Return ONLY a list of business names, one per line. No numbering or explanations.`;

    console.log("Sending prompt to OpenAI:", prompt);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a creative business name generator. Respond ONLY with a list of business names, one per line. No numbering, explanations, or additional text.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API error:", errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const generatedText = data.choices[0].message.content;
    
    // Process the response to get clean business names
    const businessNames = generatedText
      .split('\n')
      .map(name => name.trim())
      .filter(name => name.length > 0)
      .map(name => name.replace(/^[0-9]+\.\s*/, '')) // Remove any numbering
      .slice(0, 10); // Limit to 10 names

    console.log("Generated business names:", businessNames);

    return new Response(JSON.stringify({ 
      businessNames,
      prompt,
      rawResponse: generatedText
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-business-names function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
