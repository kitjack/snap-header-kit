
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

// Supabase client setup for admin actions
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const openAIApiKey = Deno.env.get('OPENAI_API_KEY') || '';

// CORS headers
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
    const { fitnessLevel, goalType, equipment, duration, userId } = await req.json();
    
    console.log('Received request:', { fitnessLevel, goalType, equipment, duration, userId });
    
    if (!fitnessLevel || !goalType) {
      return new Response(
        JSON.stringify({ error: 'Fitness level and goal type are required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
    
    console.log('Checking user credits...');
    // Verify user has enough credits if userId is provided
    if (userId) {
      const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2.39.7");
      const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
      
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('credits')
        .eq('id', userId)
        .single();
      
      if (profileError) {
        console.error('Error fetching user profile:', profileError);
        return new Response(
          JSON.stringify({ error: 'Error verifying user credits' }),
          { 
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
      
      if (!profile || profile.credits < 10) {
        return new Response(
          JSON.stringify({ error: 'Insufficient credits' }),
          { 
            status: 402,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
    }
    
    console.log('Generating workout routines with OpenAI...');
    // Generate workout routines with OpenAI
    let prompt = `Generate 2 unique workout routines for a ${fitnessLevel} fitness level person with the goal of ${goalType}`;
    
    if (equipment) {
      prompt += ` using ${equipment} equipment`;
    }
    
    if (duration) {
      prompt += ` that takes approximately ${duration} to complete`;
    }
    
    prompt += `. Return the response in the following JSON format:
    [
      {
        "id": 1,
        "name": "Routine name here",
        "description": "Brief description of the routine and its benefits",
        "exercises": [
          {
            "name": "Exercise name",
            "sets": 3,
            "reps": "8-12",
            "rest": "60 seconds",
            "notes": "Form tips or variations"
          }
        ],
        "duration": "Estimated workout duration",
        "tags": ["tag1", "tag2"]
      },
      {
        "id": 2,
        "name": "Another routine name",
        "description": "Brief description of the routine and its benefits",
        "exercises": [
          {
            "name": "Exercise name",
            "sets": 3,
            "reps": "8-12",
            "rest": "60 seconds",
            "notes": "Form tips or variations"
          }
        ],
        "duration": "Estimated workout duration",
        "tags": ["tag1", "tag2"]
      }
    ]
    Only return the JSON array and make sure it's properly formatted with no extra text.`;
    
    console.log('OpenAI prompt:', prompt);

    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openAIApiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a fitness expert that creates personalized workout routines. Always return exactly 2 routines in a valid JSON array structure.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7
      })
    });
    
    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.json();
      console.error('OpenAI API error:', errorData);
      throw new Error('Failed to generate workout routines from OpenAI');
    }
    
    const openAIData = await openAIResponse.json();
    const content = openAIData.choices[0].message.content.trim();
    console.log('OpenAI response:', content);
    
    // Extract the JSON from the response
    let routines = [];
    try {
      // Try to parse the content directly
      routines = JSON.parse(content);
    } catch (e) {
      console.error('Error parsing JSON directly:', e);
      
      // Fallback: Try to extract JSON from the string
      try {
        const jsonMatch = content.match(/\[\s*\{.*\}\s*\]/s);
        if (jsonMatch) {
          routines = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('Could not extract JSON from response');
        }
      } catch (e2) {
        console.error('Error extracting JSON:', e2);
        throw new Error('Failed to parse routine data from OpenAI response');
      }
    }
    
    if (!Array.isArray(routines) || routines.length === 0) {
      throw new Error('Invalid routine data format from OpenAI');
    }
    
    console.log('Successfully generated workout routines:', routines);
    
    return new Response(
      JSON.stringify({ routines }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
    
  } catch (error) {
    console.error('Error in generate-workout-routines function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to generate workout routines' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
