
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
    const { topic, industry, tone, content, userId } = await req.json();

    // Validate inputs
    if (!topic) {
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

    console.log(`Generating newsletters for topic: ${topic}, industry: ${industry}, tone: ${tone}`);

    // Generate newsletters using OpenAI with a simplified prompt
    const prompt = `
      Create 2 newsletter templates for the topic "${topic}" ${industry ? `in the ${industry} industry` : ''} with a ${tone || 'professional'} tone.
      ${content ? `Key content to include: ${content}` : ''}
      
      For each newsletter, provide:
      - Subject line (compelling, 50-60 characters)
      - Body content (include introduction, main content sections with headings, and conclusion)
      - Design notes (brief suggestions for layout, colors, or imagery)
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
            content: 'You are a newsletter expert. Return your response as two complete newsletter options.'
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error('Failed to generate newsletters');
    }

    const data = await response.json();
    console.log('OpenAI response received');
    
    // Define fallback newsletters in case parsing fails
    const fallbackNewsletters = [
      {
        id: 1,
        subjectLine: `${topic} Newsletter: Latest Updates and Insights`,
        body: `Dear Subscriber,\n\nWelcome to our ${topic} newsletter. Here are the latest updates and insights...\n\n[Main Content]\n\nThank you for reading,\nThe Team`,
        designNotes: "Use a clean layout with brand colors and relevant imagery."
      },
      {
        id: 2,
        subjectLine: `Discover New Trends in ${topic}`,
        body: `Hello,\n\nExcited to share the latest trends in ${topic} with you today...\n\n[Main Content]\n\nUntil next time,\nThe Team`,
        designNotes: "Try a modern design with accent colors and section dividers."
      }
    ];
    
    let newsletters;
    
    try {
      // Extract content from the OpenAI response
      const content = data.choices[0].message.content;
      console.log('Processing OpenAI response content');
      
      // Split the response into two separate newsletters
      const newsletterSections = content.split(/Newsletter \d+:|Option \d+:|Template \d+:/i).filter(section => section.trim().length > 0);
      
      if (newsletterSections.length >= 2) {
        newsletters = newsletterSections.slice(0, 2).map((section, index) => {
          const subjectLineMatch = section.match(/Subject(?:\s*line)?:?\s*(.*?)(?:\n|$)/i);
          const bodyMatch = section.match(/Body(?:\s*content)?:?\s*([\s\S]*?)(?=Design|$)/i);
          const designMatch = section.match(/Design(?:\s*notes)?:?\s*([\s\S]*?)(?=\n\n|$)/i);
          
          return {
            id: index + 1,
            subjectLine: subjectLineMatch ? subjectLineMatch[1].trim() : `${topic} Newsletter`,
            body: bodyMatch ? bodyMatch[1].trim() : `Newsletter content about ${topic}`,
            designNotes: designMatch ? designMatch[1].trim() : "Use a clean, professional design."
          };
        });
      } else {
        console.error('Failed to parse newsletter sections from OpenAI response');
        newsletters = fallbackNewsletters;
      }
    } catch (error) {
      console.error('Error processing OpenAI response:', error);
      newsletters = fallbackNewsletters;
    }

    // Ensure we have exactly 2 newsletters
    if (!Array.isArray(newsletters)) {
      newsletters = fallbackNewsletters;
    } else if (newsletters.length < 2) {
      while (newsletters.length < 2) {
        newsletters.push(fallbackNewsletters[newsletters.length]);
      }
    } else if (newsletters.length > 2) {
      newsletters = newsletters.slice(0, 2);
    }

    return new Response(
      JSON.stringify({ newsletters }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-newsletters function:', error);
    
    return new Response(
      JSON.stringify({ error: error.message || 'An error occurred while generating newsletters' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
