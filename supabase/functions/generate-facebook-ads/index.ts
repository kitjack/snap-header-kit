
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

    // Generate Facebook ads using OpenAI with a simplified prompt
    const prompt = `
      Create 2 Facebook ad options for a ${businessType} business targeting ${targetAudience} with the objective of ${objective}.
      ${keywords ? `Key selling points: ${keywords}` : ''}
      
      For each ad:
      - Headline (40 characters max)
      - Primary text (125 characters max)
      - Description (30 characters max)
      - Call to action button 
      - Image description
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
            content: 'You are a Facebook ads expert. Return your response as a simple JSON array with 2 objects containing: id (1 or 2), headline, primaryText, description, cta, and imageDescription.'
          },
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
      // Get the content from OpenAI response
      const content = data.choices[0].message.content;
      console.log('OpenAI response content:', content);
      
      // Try direct JSON parsing first
      try {
        adOptions = JSON.parse(content);
      } catch (parseError) {
        console.error('Error parsing content as JSON directly:', parseError);
        
        // Extract JSON if embedded in text
        const jsonMatch = content.match(/\[\s*\{.*\}\s*\]/s);
        if (jsonMatch) {
          try {
            adOptions = JSON.parse(jsonMatch[0]);
          } catch (extractError) {
            // If still can't parse, create basic structure
            adOptions = [
              {
                id: 1,
                headline: "Compelling Offer",
                primaryText: "Check out our amazing product that solves your problems.",
                description: "Limited time offer",
                cta: "Learn More",
                imageDescription: "Professional image related to the business",
              },
              {
                id: 2,
                headline: "Special Deal",
                primaryText: "Discover how our service can transform your experience.",
                description: "Exclusive benefits",
                cta: "Shop Now",
                imageDescription: "Customer enjoying the product with visible satisfaction",
              }
            ];
          }
        } else {
          // Create fallback structure
          adOptions = [
            {
              id: 1,
              headline: "Compelling Offer",
              primaryText: "Check out our amazing product that solves your problems.",
              description: "Limited time offer",
              cta: "Learn More",
              imageDescription: "Professional image related to the business",
            },
            {
              id: 2,
              headline: "Special Deal",
              primaryText: "Discover how our service can transform your experience.",
              description: "Exclusive benefits",
              cta: "Shop Now",
              imageDescription: "Customer enjoying the product with visible satisfaction",
            }
          ];
        }
      }
      
      // Ensure it's an array with 2 items
      if (!Array.isArray(adOptions)) {
        adOptions = [adOptions, {...adOptions, id: 2}];
      } else if (adOptions.length < 2) {
        adOptions.push({...adOptions[0], id: 2});
      } else if (adOptions.length > 2) {
        adOptions = adOptions.slice(0, 2);
      }
      
      // Normalize and validate each ad option
      adOptions = adOptions.map((ad, index) => {
        return {
          id: ad.id || index + 1,
          headline: ad.headline || "Compelling Offer",
          primaryText: ad.primaryText || "Check out our amazing product that solves your problems.",
          description: ad.description || "Limited time offer",
          cta: ad.cta || "Learn More",
          imageDescription: ad.imageDescription || "Professional image related to the business",
        };
      });
      
    } catch (error) {
      console.error('Error processing OpenAI response:', error);
      // Complete fallback in case all parsing attempts fail
      adOptions = [
        {
          id: 1,
          headline: "Compelling Offer for " + businessType,
          primaryText: "Check out our amazing product that solves your problems.",
          description: "Limited time offer",
          cta: "Learn More",
          imageDescription: "Professional image related to the business",
        },
        {
          id: 2,
          headline: "Special Deal for " + businessType,
          primaryText: "Discover how our service can transform your experience.",
          description: "Exclusive benefits",
          cta: "Shop Now",
          imageDescription: "Customer enjoying the product with visible satisfaction",
        }
      ];
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
