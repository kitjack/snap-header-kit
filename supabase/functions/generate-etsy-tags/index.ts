
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { productDescription, category, keywords } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key is not set');
    }

    // Build prompt for OpenAI
    const prompt = `Generate 13 SEO-optimized tags for an Etsy product listing with the following details:

Product Description: ${productDescription || ""}
Category: ${category || ""}
Additional Keywords: ${keywords || ""}

Please follow these guidelines:
1. Include relevant, specific keywords that shoppers might search for
2. Ensure tags are concise and under 20 characters each
3. Use single words or short phrases (no spaces preferred)
4. Avoid duplicate concepts
5. Include a mix of specific and broad terms
6. Etsy allows a maximum of 13 tags per listing, so provide exactly 13
7. Return only the list of tags as a JSON array, nothing else

The tags should optimize visibility in Etsy's search algorithm.`;

    console.log("Sending request to OpenAI with prompt:", prompt);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert in Etsy SEO and tag optimization.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API error:", errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log("OpenAI response:", data);

    // Extract tags from the response
    let tags = [];
    try {
      const content = data.choices[0].message.content;
      
      // Try to parse JSON directly if the response is in JSON format
      if (content.trim().startsWith('[') && content.trim().endsWith(']')) {
        tags = JSON.parse(content);
      } else {
        // Extract tags from text
        const tagMatches = content.match(/["']([^"']+)["']/g) || [];
        tags = tagMatches.map(match => match.replace(/["']/g, ''));
      }
      
      // Ensure we have exactly 13 tags (Etsy's limit)
      tags = tags.slice(0, 13);
      
      // If we have fewer than 13 tags, add generic ones
      const genericTags = ['handmade', 'custom', 'gift', 'unique', 'personalized', 'trending', 'homemade', 'artisan', 'quality', 'shopsmall', 'crafted', 'limited', 'special'];
      while (tags.length < 13) {
        const newTag = genericTags[tags.length];
        if (!tags.includes(newTag)) {
          tags.push(newTag);
        }
      }
      
      // Clean up tags
      tags = tags.map(tag => tag.trim().toLowerCase().replace(/[^\w\s-]/g, ''));
    } catch (error) {
      console.error("Error extracting tags:", error);
      throw new Error('Failed to parse OpenAI response');
    }

    return new Response(
      JSON.stringify({ tags }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
