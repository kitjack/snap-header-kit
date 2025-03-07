
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

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
    const { topic, style, keywords, userId } = await req.json();
    
    console.log(`Generating poems for user ${userId}. Topic: ${topic}, Style: ${style}, Keywords: ${keywords}`);

    if (!userId) {
      throw new Error("User ID is required");
    }

    // Call OpenAI API to generate poems
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
            content: `You are a skilled poet who creates beautiful short poems based on user input. 
                      Generate EXACTLY 2 short poems in the requested style. 
                      Format your response as a valid JSON array with exactly 2 poem objects.
                      Each poem object should have these fields:
                      - id: a numeric identifier (1 or 2)
                      - title: a creative title for the poem
                      - content: the actual poem text
                      - style: the style of poem (based on user input)
                      - analysis: a brief analysis/explanation of the poem (2-3 sentences max)
                      
                      Ensure your response is STRICTLY in the following format:
                      [
                        {
                          "id": 1,
                          "title": "poem title here",
                          "content": "poem text here",
                          "style": "style name here",
                          "analysis": "brief analysis here"
                        },
                        {
                          "id": 2,
                          "title": "poem title here",
                          "content": "poem text here",
                          "style": "style name here",
                          "analysis": "brief analysis here"
                        }
                      ]`
          },
          { 
            role: 'user', 
            content: `Create two short poems about ${topic || 'life'} in ${style || 'free verse'} style.
                     ${keywords ? `Include these keywords or themes: ${keywords}.` : ''}` 
          }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error("Invalid response from OpenAI API");
    }

    // Parse the response content as JSON
    let poems;
    try {
      poems = JSON.parse(data.choices[0].message.content.trim());
      console.log("Successfully parsed poem data:", poems);
      
      // Verify we have exactly 2 poems with the required structure
      if (!Array.isArray(poems) || poems.length !== 2) {
        throw new Error("Expected exactly 2 poems in response");
      }
      
      // Validate each poem has required fields
      poems.forEach(poem => {
        if (!poem.id || !poem.title || !poem.content || !poem.style || !poem.analysis) {
          throw new Error("Each poem must have id, title, content, style, and analysis fields");
        }
      });
    } catch (parseError) {
      console.error("Error parsing poems:", parseError);
      console.error("Raw content:", data.choices[0].message.content);
      throw new Error("Failed to parse poem data");
    }

    return new Response(JSON.stringify({ poems }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Error generating poems:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
