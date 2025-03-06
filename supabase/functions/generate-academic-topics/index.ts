
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
    const { fieldOfStudy, academicLevel, interests, keywords, userId } = await req.json();

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'User ID is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Generate academic topics request:', { fieldOfStudy, academicLevel, interests, keywords });

    // Create a detailed prompt for OpenAI
    const prompt = `Generate 2 detailed academic project topic ideas for a ${academicLevel} student in ${fieldOfStudy}. 
    The student is interested in: ${interests || 'various aspects of the field'}. 
    Additional keywords to consider: ${keywords || 'none specified'}.
    
    For each project topic, provide:
    1. A clear and specific title
    2. A short description (2-3 sentences)
    3. Potential research methods or approach
    4. Expected outcomes or significance
    
    Format as a JSON array with objects containing: title, description, approach, and significance fields.`;

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
            content: 'You are an academic advisor specializing in generating project ideas across various fields. Provide detailed, specific, and realistic project topics that would be suitable for academic research or development.'
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
      // Parse the content as JSON
      const content = data.choices[0].message.content;
      topics = JSON.parse(content);
      
      // Ensure we have exactly 2 topics with the expected format
      if (!Array.isArray(topics) || topics.length !== 2) {
        throw new Error('API returned incorrect number of topics');
      }
      
      // Validate the structure of each topic
      topics = topics.map((topic, index) => ({
        id: index + 1,
        title: topic.title || `Topic ${index + 1}`,
        description: topic.description || '',
        approach: topic.approach || '',
        significance: topic.significance || ''
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
          title: lines[0]?.trim() || `Academic Project ${index + 1}`,
          description: lines.slice(1, 3).join(' ').trim() || 'No description provided.',
          approach: lines.slice(3, 5).join(' ').trim() || 'Research methods to be determined.',
          significance: lines.slice(5).join(' ').trim() || 'Significance to be determined.'
        };
      });
    }

    return new Response(
      JSON.stringify({ topics }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error generating academic topics:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
