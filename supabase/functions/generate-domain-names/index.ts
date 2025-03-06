
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

For each domain, provide:
- The domain name with extension
- Whether it's likely available (true/false based on your best guess)

Return the result as a JSON array of objects, each with 'name', 'extension', and 'available' properties.`;

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
          { role: 'system', content: 'You are a domain name generator assistant. Generate creative, brandable domain names based on user input. Return only the requested JSON format without explanations or additional text.' },
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
    
    // Parse the JSON response
    let domainNames = [];
    try {
      const parsedContent = JSON.parse(data.choices[0].message.content);
      domainNames = Array.isArray(parsedContent.domains) ? parsedContent.domains : [];
      
      if (domainNames.length === 0) {
        // If the structure is different, try to find an array in the response
        const potentialArrays = Object.values(parsedContent).filter(val => Array.isArray(val));
        if (potentialArrays.length > 0) {
          domainNames = potentialArrays[0];
        }
      }
    } catch (error) {
      console.error('Error parsing OpenAI response:', error);
      console.log('Raw content:', data.choices[0].message.content);
      return new Response(
        JSON.stringify({ error: 'Failed to parse generated domain names' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Ensure we have the right format and limit to 10 domains
    const formattedDomains = domainNames.slice(0, 10).map(domain => {
      // Handle different possible response structures
      if (typeof domain === 'string') {
        // If it's just a string, parse it
        const parts = domain.split('.');
        const extension = parts.length > 1 ? `.${parts.pop()}` : '.com';
        return {
          name: parts.join('.'),
          extension,
          available: Math.random() > 0.3 // Randomize availability as a fallback
        };
      } else {
        // Clean up object format to ensure consistency
        return {
          name: domain.name ? domain.name.replace(/\..+$/, '') : '',
          extension: domain.extension || (domain.name ? `.${domain.name.split('.').pop()}` : '.com'),
          available: typeof domain.available === 'boolean' ? domain.available : Math.random() > 0.3
        };
      }
    });

    return new Response(JSON.stringify({ 
      domains: formattedDomains,
      prompt
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-domain-names function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
