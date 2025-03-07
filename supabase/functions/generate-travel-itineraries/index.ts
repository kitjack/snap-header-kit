
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
    // Parse the request body
    const { destination, duration, activities, budget, travelers, userId } = await req.json();

    console.log('Generating travel itineraries for:', {
      destination,
      duration,
      activities,
      budget,
      travelers,
      userId
    });

    if (!openAIApiKey) {
      throw new Error('Missing OpenAI API key');
    }

    // Call OpenAI to generate travel itineraries
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
            content: 'You are a professional travel planner who creates detailed, practical travel itineraries. Generate 2 distinct travel itinerary options based on the information provided.'
          },
          {
            role: 'user',
            content: `Create 2 travel itinerary options for a trip to ${destination} for ${duration} days.
            Preferred activities: ${activities || 'any activities'}
            Budget: ${budget || 'moderate'}
            Number of travelers: ${travelers || '1'}
            
            For each itinerary, include:
            - A title for the itinerary
            - A brief description
            - Day-by-day schedule with activities, places to visit, and suggested times
            - Recommended accommodations
            - Transportation suggestions
            - Estimated costs
            
            Format the response as a JSON array with exactly 2 objects, each representing an itinerary option with the following properties:
            - id: 1 or 2
            - title: the title of the itinerary
            - description: a brief overall description
            - days: an array of daily schedules, each with activities
            - accommodations: accommodation suggestions
            - transportation: transportation recommendations
            - costs: estimated budget breakdown
            `
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
        response_format: { type: "json_object" }
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('OpenAI API error:', data);
      throw new Error(`OpenAI API error: ${data.error?.message || 'Unknown error'}`);
    }

    // Parse the JSON from the response
    const content = data.choices[0].message.content;
    let itineraries;
    
    try {
      const parsedContent = JSON.parse(content);
      itineraries = parsedContent.itineraries || [];
      
      if (!Array.isArray(itineraries) || itineraries.length === 0) {
        // Try to find itineraries in other properties
        const possibleArrays = Object.values(parsedContent).filter(val => Array.isArray(val));
        if (possibleArrays.length > 0) {
          itineraries = possibleArrays[0];
        } else {
          throw new Error('No itineraries found in response');
        }
      }
      
      // Make sure we have exactly 2 itineraries
      itineraries = itineraries.slice(0, 2);
      
      // Ensure each itinerary has an id
      itineraries = itineraries.map((item, index) => ({
        ...item,
        id: item.id || index + 1
      }));
      
    } catch (e) {
      console.error('Error parsing response:', e);
      console.error('Raw content:', content);
      throw new Error('Failed to parse itineraries from the response');
    }

    // Return the itineraries
    return new Response(
      JSON.stringify({ 
        itineraries,
        prompt: `Travel itinerary for ${destination} for ${duration} days`
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error in generate-travel-itineraries function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An error occurred while generating travel itineraries' 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
