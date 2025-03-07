
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
    // Parse request body
    const { businessName, productType, returnPeriod, refundMethod, userId } = await req.json();

    // Call OpenAI API to generate refund policy
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
            content: 'You are a refund policy text generator. Generate a clear, professional refund policy based on the business details provided. The policy should be written as plain text, without any markdown formatting. Keep it concise but thorough, covering all necessary legal aspects for a refund policy. Format it with clear sections and spacing for readability.'
          },
          {
            role: 'user',
            content: `Generate a refund policy for a business with the following details:
              - Business Name: ${businessName || 'the business'}
              - Product/Service Type: ${productType || 'products/services'}
              - Return/Refund Period: ${returnPeriod || '30 days'}
              - Refund Method: ${refundMethod || 'original payment method'}
              
              Please create a professional, clear refund policy that covers all necessary legal aspects. Return ONLY the policy text without any markdown formatting, explanations or additional commentary.`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error('No response from OpenAI');
    }

    const refundPolicy = data.choices[0].message.content.trim();

    // Return the generated refund policy
    return new Response(
      JSON.stringify({
        refundPolicy,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error generating refund policy:', error);
    
    return new Response(
      JSON.stringify({
        error: 'Failed to generate refund policy. Please try again.',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
