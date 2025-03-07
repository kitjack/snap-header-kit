
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.2.1";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

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
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('Missing OpenAI API Key');
    }

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error('Missing Supabase URL or Anon Key');
    }

    // Get the request body
    const { jobTitle, jobDescription, workExperience, skills, tone, userId } = await req.json();

    if (!jobTitle || !workExperience) {
      throw new Error('Missing required fields: job title and work experience are required');
    }

    // Initialize OpenAI
    const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Create a detailed prompt for OpenAI
    let prompt = `Write two professional cover letters for a ${jobTitle} position. `;
    
    if (jobDescription) {
      prompt += `The job description is: ${jobDescription}. `;
    }
    
    prompt += `The applicant has the following work experience: ${workExperience}. `;
    
    if (skills) {
      prompt += `The applicant has these skills: ${skills}. `;
    }
    
    prompt += `The tone should be ${tone || 'professional'}. `;
    prompt += `Format each cover letter as plain text without markdown or formatting. Provide exactly two options.`;

    console.log("Sending prompt to OpenAI:", prompt);

    // Generate the cover letters
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1500,
      temperature: 0.7,
      n: 1,
    });

    const generatedText = response.data.choices[0].text?.trim() || "Failed to generate cover letters";
    
    // Split the text into two cover letters
    let coverLetters = [];
    
    // Process the generated text to extract two cover letters
    // This is a simple approach - depending on the actual output format, you might need to adjust this
    const splitText = generatedText.split(/Option \d+:|Cover Letter \d+:/i).filter(Boolean);
    
    if (splitText.length >= 2) {
      coverLetters = splitText.slice(0, 2).map((text, index) => ({
        id: index + 1,
        content: text.trim()
      }));
    } else {
      // If the splitting didn't work as expected, just use the entire text as one cover letter
      coverLetters = [{
        id: 1,
        content: generatedText
      }];
    }

    console.log("Generated cover letters:", coverLetters);

    // Log the generated content for debugging
    console.log(`Generated ${coverLetters.length} cover letters for user ${userId}`);

    return new Response(
      JSON.stringify({ coverLetters }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error in generate-cover-letters function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
