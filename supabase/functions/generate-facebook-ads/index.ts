
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
            content: 'You are a professional Facebook ads expert. Create compelling, concise Facebook ads that follow the platform\'s best practices. Format your response as a valid JSON array with exactly 2 objects, using the keys: id, headline, primaryText, description, cta, imageDescription.' 
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
      // Parse the response from OpenAI which should be a JSON string within the content
      const content = data.choices[0].message.content;
      console.log('OpenAI response content:', content);
      
      // Attempt to parse the JSON
      try {
        adOptions = JSON.parse(content);
      } catch (parseError) {
        console.error('Error parsing content as JSON directly:', parseError);
        
        // Try to extract JSON from the content if it contains additional text
        const jsonMatch = content.match(/\[\s*\{.*\}\s*\]/s);
        if (jsonMatch) {
          try {
            adOptions = JSON.parse(jsonMatch[0]);
          } catch (extractError) {
            console.error('Error parsing extracted JSON:', extractError);
            throw new Error('Could not extract valid JSON from response');
          }
        } else {
          throw new Error('No JSON array found in response');
        }
      }
      
      // Ensure we have exactly 2 ad options
      if (!Array.isArray(adOptions) || adOptions.length !== 2) {
        console.error('Invalid response format, expected array of 2 items, got:', adOptions);
        
        // Attempt to format the response if it's not properly formatted
        if (Array.isArray(adOptions) && adOptions.length > 0) {
          // Take just the first 2 items if there are more
          adOptions = adOptions.slice(0, 2);
          
          // If we have less than 2, duplicate the first one
          if (adOptions.length === 1) {
            adOptions.push({...adOptions[0], id: 2});
          }
        } else {
          throw new Error('Invalid response format');
        }
      }
      
      // Validate each ad option has required fields
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
      console.error('Error parsing OpenAI response:', error);
      console.log('OpenAI response:', data.choices[0].message.content);
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
