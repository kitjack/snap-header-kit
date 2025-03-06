
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
    const { toolId, prompt } = await req.json();

    // Create system messages based on tool type
    let systemMessage = "You are a helpful assistant.";
    
    switch (toolId) {
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

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const generatedText = data.choices[0].message.content;

    return new Response(JSON.stringify({ result: generatedText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-ai-content function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
