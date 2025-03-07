
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
    const { productType, targetAudience, adStyle, keywords, userId } = await req.json();

    // Validate inputs
    if (!productType || !targetAudience) {
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

    console.log(`Generating Google ads for product: ${productType}, target: ${targetAudience}, style: ${adStyle}`);

    // Generate Google ads using OpenAI with a simplified prompt
    const prompt = `
      Create 2 Google ad options for a ${productType} targeting ${targetAudience} with a ${adStyle || 'professional'} style.
      ${keywords ? `Key features or selling points: ${keywords}` : ''}
      
      For each ad, provide:
      - Headline (30 characters max)
      - Description line 1 (90 characters max)
      - Description line 2 (90 characters max)
      - Call to action suggestion
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
          { 
            role: 'system', 
            content: 'You are a Google Ads expert. Return your response as two simple ad options, each with headline, description1, description2, and callToAction.'
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error('Failed to generate Google ads');
    }

    const data = await response.json();
    console.log('OpenAI response data:', data);
    
    // Define fallback ads in case parsing fails
    const fallbackAds = [
      {
        id: 1,
        headline: `${productType} for ${targetAudience}`,
        description1: `Discover our premium ${productType} designed specifically for ${targetAudience}.`,
        description2: `High quality, affordable prices. Limited time offer available now.`,
        callToAction: "Shop Now"
      },
      {
        id: 2,
        headline: `Best ${productType} Solution`,
        description1: `Perfect for ${targetAudience}. Our ${productType} delivers outstanding results.`,
        description2: `Join thousands of satisfied customers. Free shipping on all orders.`,
        callToAction: "Learn More"
      }
    ];
    
    let adOptions;
    
    try {
      // Extract content from the OpenAI response
      const content = data.choices[0].message.content;
      console.log('OpenAI response content:', content);
      
      // Split the response into two separate ads
      const adSections = content.split(/Ad \d+:|Option \d+:|Ad Option \d+:/i).filter(section => section.trim().length > 0);
      
      if (adSections.length >= 2) {
        adOptions = adSections.slice(0, 2).map((section, index) => {
          const headlineMatch = section.match(/Headline:?\s*(.*?)(?:\n|$)/i);
          const description1Match = section.match(/Description(?:\s*line)?(?:\s*1)?:?\s*(.*?)(?:\n|$)/i);
          const description2Match = section.match(/Description(?:\s*line)?(?:\s*2)?:?\s*(.*?)(?:\n|$)/i);
          const ctaMatch = section.match(/(?:Call to action|CTA):?\s*(.*?)(?:\n|$)/i);
          
          return {
            id: index + 1,
            headline: headlineMatch ? headlineMatch[1].trim() : `${productType} for ${targetAudience}`,
            description1: description1Match ? description1Match[1].trim() : `Discover our premium ${productType}.`,
            description2: description2Match ? description2Match[1].trim() : `Perfect for ${targetAudience}.`,
            callToAction: ctaMatch ? ctaMatch[1].trim() : "Shop Now"
          };
        });
      } else {
        console.error('Failed to parse ad sections from OpenAI response');
        adOptions = fallbackAds;
      }
    } catch (error) {
      console.error('Error processing OpenAI response:', error);
      adOptions = fallbackAds;
    }

    // Ensure we have exactly 2 ads
    if (!Array.isArray(adOptions)) {
      adOptions = fallbackAds;
    } else if (adOptions.length < 2) {
      while (adOptions.length < 2) {
        adOptions.push(fallbackAds[adOptions.length]);
      }
    } else if (adOptions.length > 2) {
      adOptions = adOptions.slice(0, 2);
    }

    return new Response(
      JSON.stringify({ adOptions }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-google-ads function:', error);
    
    return new Response(
      JSON.stringify({ error: error.message || 'An error occurred while generating Google ads' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
