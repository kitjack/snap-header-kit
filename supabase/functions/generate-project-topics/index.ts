
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
    const { field, scope, keywords, userId } = await req.json();

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'User ID is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Generate project topics request:', { field, scope, keywords });

    // Create a detailed prompt for OpenAI with explicit formatting instructions
    const prompt = `Generate 2 detailed project topic ideas in the field of ${field} with a scope that is ${scope}. 
    Consider these keywords: ${keywords || 'none specified'}.
    
    For each project topic, provide:
    1. A clear and specific title
    2. A short description (2-3 sentences)
    3. Key features or components to include
    4. Expected benefits or impact
    
    Format your response as a valid JSON array with objects containing these exact fields: title, description, features, impact.

    Example of the expected JSON format:
    [
      {
        "title": "Project Title 1",
        "description": "Description of project 1",
        "features": "Key features of project 1",
        "impact": "Impact of project 1"
      },
      {
        "title": "Project Title 2",
        "description": "Description of project 2",
        "features": "Key features of project 2",
        "impact": "Impact of project 2"
      }
    ]

    Make sure your response is ONLY the JSON array with no additional text or formatting.`;

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
            content: 'You are a project advisor specializing in generating project ideas across various fields. Provide detailed, specific, and realistic project topics as valid JSON only.'
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      console.error('Unexpected API response:', data);
      throw new Error('Failed to generate project topics');
    }

    let topics;
    try {
      // Remove any extra text surrounding the JSON
      const content = data.choices[0].message.content;
      // Extract JSON content - looking for anything between square brackets
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      const jsonContent = jsonMatch ? jsonMatch[0] : content;
      
      console.log('Parsed content from API:', jsonContent);
      
      // Parse the content as JSON
      topics = JSON.parse(jsonContent);
      
      // Ensure we have exactly 2 topics with the expected format
      if (!Array.isArray(topics)) {
        throw new Error('API did not return an array of topics');
      }
      
      // Validate and limit to 2 topics
      topics = topics.slice(0, 2).map((topic, index) => ({
        id: index + 1,
        title: topic.title || `Topic ${index + 1}`,
        description: topic.description || '',
        features: topic.features || '',
        impact: topic.impact || ''
      }));
    } catch (error) {
      console.error('Error parsing API response:', error);
      console.log('Raw response:', data.choices[0].message.content);
      
      // Fallback: create a structured response from unstructured text
      const content = data.choices[0].message.content;
      const sections = content.split(/(?:Topic|Project) \d+:/i).filter(Boolean);
      
      topics = sections.slice(0, 2).map((section, index) => {
        const lines = section.split('\n').filter(Boolean);
        return {
          id: index + 1,
          title: lines[0]?.trim() || `Project ${index + 1}`,
          description: lines.slice(1, 3).join(' ').trim() || 'No description provided.',
          features: lines.slice(3, 5).join(' ').trim() || 'Features to be determined.',
          impact: lines.slice(5).join(' ').trim() || 'Impact to be determined.'
        };
      });
    }

    return new Response(
      JSON.stringify({ topics }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error generating project topics:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
