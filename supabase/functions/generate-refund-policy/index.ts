
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
    const { businessName, productType, returnPeriod, refundMethod, userId } = await req.json();

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
    let prompt = `Write a comprehensive refund policy for a business named "${businessName}". `;
    
    if (productType) {
      prompt += `The business sells ${productType}. `;
    }
    
    if (returnPeriod) {
      prompt += `The return period is ${returnPeriod}. `;
    }
    
    if (refundMethod) {
      prompt += `The business offers refunds via ${refundMethod}. `;
    }
    
    prompt += `Format the refund policy as plain text without markdown formatting. Include standard sections like eligibility for returns, return process, refund methods, exceptions, damaged items, and contact information. The policy should be professional, clear, and comprehensive.`;

    console.log("Sending prompt to OpenAI:", prompt);

    // Generate the refund policy text
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a legal expert specializing in creating professional refund policies for businesses."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    });

    const generatedText = response.choices[0]?.message?.content?.trim() || "Failed to generate refund policy text";

    return new Response(
      JSON.stringify({ refundPolicyText: generatedText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error in generate-refund-policy function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
