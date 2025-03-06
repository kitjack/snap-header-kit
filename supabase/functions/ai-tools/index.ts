
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
    const { tool, prompt, userId } = await req.json();
    
    if (!tool || !prompt || !userId) {
      throw new Error('Missing required parameters: tool, prompt, or userId');
    }

    let systemPrompt = '';
    
    // Configure system prompt based on the tool
    switch (tool) {
      case 'business-name':
        systemPrompt = 'You are a business name generator. Generate 5 creative and catchy business names based on the user\'s description. Return only the list of names, numbered 1-5, without additional text.';
        break;
      case 'etsy-tags':
        systemPrompt = 'You are an Etsy tag generator. Generate 10 effective SEO-optimized tags for an Etsy listing based on the user\'s product description. Return only the list of tags, separated by commas, without additional text.';
        break;
      case 'slogan':
        systemPrompt = 'You are a slogan generator. Generate 5 catchy, memorable slogans for a business based on the user\'s description. Return only the list of slogans, numbered 1-5, without additional text.';
        break;
      default:
        throw new Error('Invalid tool specified');
    }

    console.log(`Processing ${tool} request for user ${userId} with prompt: ${prompt}`);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const result = data.choices[0].message.content;

    // Deduct credits from the user's account
    const { error } = await fetch(
      `https://cqyyqhhafougprcnueek.supabase.co/rest/v1/profiles?id=eq.${userId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': Deno.env.get('SUPABASE_ANON_KEY') || '',
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY') || ''}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          credits: -5,  // Deduct 5 credits
        }),
      }
    );

    if (error) {
      console.error('Error updating user credits:', error);
    }

    return new Response(JSON.stringify({ result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-tools function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
