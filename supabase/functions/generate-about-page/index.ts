
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { OpenAI } from "https://esm.sh/openai@4.28.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

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
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('Missing OpenAI API Key');
    }

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error('Missing Supabase URL or Anon Key');
    }

    // Get the request body
    const { businessName, industry, keyFeatures, tone, userId } = await req.json();

    if (!businessName || !industry) {
      throw new Error('Missing required fields: business name and industry are required');
    }

    // Initialize OpenAI
    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Create a detailed prompt for OpenAI
    let prompt = `Write an about page text for a business named "${businessName}" in the ${industry} industry. `;
    
    if (keyFeatures) {
      prompt += `The business has these key features or offerings: ${keyFeatures}. `;
    }
    
    prompt += `The tone should be ${tone || 'professional'}. `;
    prompt += `Include sections for the company background, mission statement, values, and a brief call to action. `;
    prompt += `Write it in plain text format without any markdown or special formatting.`;

    console.log("Sending prompt to OpenAI:", prompt);

    // Generate the about page text
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a professional content writer specializing in creating compelling about pages for businesses."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    });

    const generatedText = response.choices[0]?.message?.content?.trim() || "Failed to generate about page text";

    return new Response(
      JSON.stringify({ aboutPageText: generatedText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error in generate-about-page function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
