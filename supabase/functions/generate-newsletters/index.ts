
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    // Get request body
    const { topic, audience, purpose, userId } = await req.json();
    
    console.log("Generating newsletters for:", { topic, audience, purpose, userId });

    // Check if required fields are provided
    if (!topic || !audience || !purpose) {
      throw new Error('Missing required fields: topic, audience, and purpose are required');
    }

    // Create prompt for OpenAI
    const prompt = `
    Create exactly 2 newsletter templates with the following parameters:
    - Topic: ${topic}
    - Target Audience: ${audience}
    - Purpose: ${purpose}

    For each newsletter, provide:
    1. A creative subject line (attention-grabbing, relevant to topic)
    2. Complete newsletter content (introduction, main content, conclusion)
    3. A call-to-action
    4. Recommended images or graphics (description only)

    Format them clearly as two distinct options.
    `;

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openAIApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an expert newsletter writer specializing in creating engaging, professional newsletters for various audiences and purposes."
          },
          {
            role: "user",
            content: prompt
          }
        ],
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(`OpenAI API error: ${data.error.message}`);
    }

    // Extract and parse newsletters from the response
    const content = data.choices[0].message.content;
    
    // Process the content to extract two distinct newsletters
    const newsletters = parseNewsletters(content);
    
    console.log("Generated newsletters:", newsletters);

    return new Response(JSON.stringify({ newsletters }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating newsletters:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});

// Helper function to parse the GPT response into structured newsletters
function parseNewsletters(content: string) {
  try {
    // Split content to find separate newsletters
    const sections = content.split(/NEWSLETTER\s*(\d+|TWO|ONE):|OPTION\s*(\d+|TWO|ONE):/i);
    
    // Filter out empty sections and process
    const relevantSections = sections.filter(section => section.trim().length > 0);
    
    // Extract subject lines, content and other components
    const newsletters = [];
    let currentIndex = 0;
    
    while (currentIndex < relevantSections.length) {
      // Skip the number/identifier parts
      if (/^\d+$|^ONE$|^TWO$/i.test(relevantSections[currentIndex].trim())) {
        currentIndex++;
        continue;
      }
      
      const text = relevantSections[currentIndex];
      
      // Extract subject line
      const subjectMatch = text.match(/Subject(\s*Line)?:(.+?)(\n|$)/i);
      const subject = subjectMatch ? subjectMatch[2].trim() : "Newsletter";
      
      // Extract content sections
      const contentSections = [];
      const contentMatches = text.match(/Content:|Main Content:|Body:/i);
      
      if (contentMatches) {
        const contentStart = text.indexOf(contentMatches[0]) + contentMatches[0].length;
        let contentEnd = text.length;
        
        // Find where content ends (at the next section)
        const nextSectionMatch = text.slice(contentStart).match(/Call(\s*to|-)Action:|CTA:|Conclusion:|Recommended Images:/i);
        if (nextSectionMatch) {
          contentEnd = contentStart + text.slice(contentStart).indexOf(nextSectionMatch[0]);
        }
        
        contentSections.push(text.slice(contentStart, contentEnd).trim());
      } else {
        // If no content markers, just take the entire text minus the subject line
        contentSections.push(text.replace(/Subject(\s*Line)?:(.+?)(\n|$)/i, "").trim());
      }
      
      // Extract call to action
      const ctaMatch = text.match(/Call(\s*to|-)Action:|CTA:(.+?)(\n|$|Recommended)/i);
      const cta = ctaMatch ? ctaMatch[2].trim() : "";
      
      // Extract image recommendations
      const imageMatch = text.match(/Recommended Images:|Graphics:(.+?)(\n|$)/i);
      const imageRecommendations = imageMatch ? imageMatch[1].trim() : "";
      
      newsletters.push({
        id: newsletters.length + 1,
        subject,
        content: contentSections.join("\n\n"),
        cta,
        imageRecommendations
      });
      
      currentIndex++;
      
      // Only process two newsletters
      if (newsletters.length >= 2) break;
    }
    
    // If we couldn't parse properly, create a fallback structure
    if (newsletters.length === 0) {
      const halfwayPoint = Math.floor(content.length / 2);
      newsletters.push({
        id: 1,
        subject: "Newsletter Option 1",
        content: content.substring(0, halfwayPoint).trim(),
        cta: "",
        imageRecommendations: ""
      });
      
      if (content.length > halfwayPoint) {
        newsletters.push({
          id: 2,
          subject: "Newsletter Option 2",
          content: content.substring(halfwayPoint).trim(),
          cta: "",
          imageRecommendations: ""
        });
      }
    }
    
    return newsletters;
  } catch (e) {
    console.error("Error parsing newsletters:", e);
    
    // Fallback in case parsing fails
    return [
      {
        id: 1,
        subject: "Generated Newsletter",
        content: content,
        cta: "",
        imageRecommendations: ""
      }
    ];
  }
}
