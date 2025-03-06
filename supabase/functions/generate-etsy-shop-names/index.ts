
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const { productType, style, keywords, userId } = await req.json();
    
    // Validate inputs
    if (!productType && !keywords) {
      return new Response(
        JSON.stringify({ error: 'At least product type or keywords are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build the prompt for OpenAI
    const prompt = `Generate 10 creative and memorable Etsy shop names based on the following information:
    
${productType ? `Product Type: ${productType}` : ''}
${style ? `Style/Aesthetic: ${style}` : ''}
${keywords ? `Keywords: ${keywords}` : ''}

Please follow these guidelines:
1. Create shop names that are memorable, brandable, and easy to spell
2. Aim for names that are likely available (not already registered)
3. Include a mix of approaches: descriptive names, puns, creative combinations
4. Keep names reasonably short (1-3 words maximum)
5. Make names relevant to the products and style indicated
6. Return exactly 10 shop name suggestions

Format the response as a JSON object with a "shopNames" array containing objects with these properties:
- "name": the shop name (without "Shop" suffix unless it's part of the creative name)
- "available": a boolean guess if the name might be available (true/false)
- "description": a very brief one-line explanation of the name's relevance`;

    console.log("Sending prompt to OpenAI:", prompt);

    // Call OpenAI API
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
            content: 'You are a creative shop name generator assistant. Generate memorable, brandable Etsy shop names based on user input. Return only the requested JSON format without explanations or additional text.' 
          },
          { role: 'user', content: prompt }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API error:", errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    console.log("OpenAI response:", data);
    
    let shopNames = [];
    try {
      const content = data.choices[0].message.content;
      console.log("Raw content:", content);
      
      const parsedResponse = JSON.parse(content);
      console.log("Parsed response:", parsedResponse);
      
      if (parsedResponse && parsedResponse.shopNames && Array.isArray(parsedResponse.shopNames)) {
        shopNames = parsedResponse.shopNames;
      } else {
        // Look for any array in the response as a fallback
        Object.keys(parsedResponse).forEach(key => {
          if (Array.isArray(parsedResponse[key]) && parsedResponse[key].length > 0) {
            shopNames = parsedResponse[key];
          }
        });
      }
      
      if (shopNames.length === 0) {
        throw new Error("Could not find shop names array in OpenAI response");
      }
      
      // Ensure proper format for each shop name
      shopNames = shopNames.map(shop => {
        if (typeof shop === 'string') {
          return {
            name: shop,
            available: true,
            description: "A creative shop name based on your input"
          };
        } else {
          return {
            name: shop.name || '',
            available: shop.available === undefined ? true : shop.available,
            description: shop.description || "A creative shop name based on your input"
          };
        }
      });
      
    } catch (error) {
      console.error("Error parsing OpenAI response:", error);
      throw new Error(`Failed to parse shop names: ${error.message}`);
    }

    return new Response(
      JSON.stringify({ shopNames: shopNames.slice(0, 10) }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-etsy-shop-names function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
