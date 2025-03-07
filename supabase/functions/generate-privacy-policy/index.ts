
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
    const { businessName, websiteUrl, dataCollected, thirdParties, userId } = await req.json();

    if (!businessName) {
      throw new Error('Missing required fields: business name is required');
    }

    // Initialize OpenAI
    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Create a detailed prompt for OpenAI
    let prompt = `Write a comprehensive privacy policy for a business named "${businessName}". `;
    
    if (websiteUrl) {
      prompt += `The website URL is ${websiteUrl}. `;
    }
    
    if (dataCollected) {
      prompt += `The business collects the following types of data: ${dataCollected}. `;
    }
    
    if (thirdParties) {
      prompt += `The business shares data with the following third parties: ${thirdParties}. `;
    }
    
    prompt += `Format the privacy policy as plain text without markdown formatting. Include standard sections like information collection, use of information, data sharing, security measures, user rights, updates to the policy, and contact information. Make it compliant with GDPR and CCPA where applicable.`;

    console.log("Sending prompt to OpenAI:", prompt);

    // Generate the privacy policy text
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a legal expert specializing in creating professional privacy policies for businesses."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    });

    const generatedText = response.choices[0]?.message?.content?.trim() || "Failed to generate privacy policy text";

    return new Response(
      JSON.stringify({ privacyPolicyText: generatedText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error in generate-privacy-policy function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
