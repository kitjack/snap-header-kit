
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
    const { keywords, industry, extensions, userId } = await req.json();
    
    // Validate inputs
    if (!keywords) {
      return new Response(
        JSON.stringify({ error: 'Keywords are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build the prompt for OpenAI
    let extensionsList = [];
    if (extensions === 'All Popular Extensions') {
      extensionsList = ['.com', '.net', '.org', '.io', '.co', '.app', '.dev', '.ai'];
    } else {
      extensionsList = [extensions];
    }

    const prompt = `Generate 10 creative and available domain names based on the following information:
    
Keywords: ${keywords}
${industry ? `Industry: ${industry}` : ''}
Domain Extensions to consider: ${extensionsList.join(', ')}

Please follow these guidelines:
1. Create domain names that are memorable, brandable, and easy to spell
2. Each domain name should include one of the specified extensions
3. Aim for names that are available (not already registered)
4. Mix different approaches: keyword combinations, industry terms, prefixes/suffixes
5. Keep names reasonably short and pronounceable
6. Return exactly 10 domain names

Format the response as a JSON object with a "domains" array containing objects with these properties:
- "name": the domain name without extension (e.g., "example")
- "extension": the extension with dot (e.g., ".com")
- "available": a boolean guess if the domain might be available (true/false)`;

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
            content: 'You are a domain name generator assistant. Generate creative, brandable domain names based on user input. Return only the requested JSON format without explanations or additional text.' 
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
    
    let domains = [];
    try {
      const content = data.choices[0].message.content;
      console.log("Raw content:", content);
      
      const parsedResponse = JSON.parse(content);
      console.log("Parsed response:", parsedResponse);
      
      if (parsedResponse && parsedResponse.domains && Array.isArray(parsedResponse.domains)) {
        domains = parsedResponse.domains;
      } else {
        // Look for any array in the response as a fallback
        Object.keys(parsedResponse).forEach(key => {
          if (Array.isArray(parsedResponse[key]) && parsedResponse[key].length > 0) {
            domains = parsedResponse[key];
          }
        });
      }
      
      if (domains.length === 0) {
        throw new Error("Could not find domain array in OpenAI response");
      }
      
      // Ensure proper format for each domain
      domains = domains.map(domain => {
        if (typeof domain === 'string') {
          const parts = domain.split('.');
          const extension = parts.length > 1 ? `.${parts.pop()}` : '.com';
          return {
            name: parts.join('.'),
            extension,
            available: true
          };
        } else {
          return {
            name: domain.name || '',
            extension: domain.extension || '.com',
            available: domain.available === undefined ? true : domain.available
          };
        }
      });
      
    } catch (error) {
      console.error("Error parsing OpenAI response:", error);
      throw new Error(`Failed to parse domain names: ${error.message}`);
    }

    return new Response(
      JSON.stringify({ domains: domains.slice(0, 10) }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-domain-names function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
