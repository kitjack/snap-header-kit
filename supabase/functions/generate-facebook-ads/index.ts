
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const projectId = Deno.env.get('SUPABASE_PROJECT_ID');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

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
    const { businessType, targetAudience, objective, keywords, userId } = await req.json();

    // Validate inputs
    if (!businessType || !targetAudience || !objective) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Validate user ID
    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'User not authenticated' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Generating Facebook ads for business: ${businessType}, target: ${targetAudience}, objective: ${objective}`);

    // Generate Facebook ads using OpenAI
    const prompt = `
      Generate 2 Facebook advertisement options for the following business:
      Business Type: ${businessType}
      Target Audience: ${targetAudience}
      Ad Objective: ${objective}
      ${keywords ? `Keywords/USPs: ${keywords}` : ''}
      
      For each ad option, include:
      1. A compelling headline (max 40 characters)
      2. Primary text (max 125 characters)
      3. Description (max 30 characters)
      4. Call to action button suggestion
      5. An image description that would work well for this ad
      
      Format the response as a JSON array with exactly 2 objects, each with the following properties:
      - id: a number (1 or 2)
      - headline: the headline text
      - primaryText: the primary text
      - description: the description text
      - cta: suggested call to action button
      - imageDescription: description of image that would work well
    `;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a professional Facebook ads expert. Create compelling, concise Facebook ads that follow the platform\'s best practices.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error('Failed to generate Facebook ads');
    }

    const data = await response.json();
    let adOptions;

    try {
      // Parse the response from OpenAI which should be a JSON string within the content
      const content = data.choices[0].message.content;
      adOptions = JSON.parse(content);
      
      // Ensure we have exactly 2 ad options
      if (!Array.isArray(adOptions) || adOptions.length !== 2) {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error parsing OpenAI response:', error);
      console.log('OpenAI response:', data.choices[0].message.content);
      
      // Fallback formatting if the response isn't valid JSON
      throw new Error('Failed to parse Facebook ads from OpenAI response');
    }

    return new Response(
      JSON.stringify({ adOptions }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-facebook-ads function:', error);
    
    return new Response(
      JSON.stringify({ error: error.message || 'An error occurred while generating Facebook ads' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
