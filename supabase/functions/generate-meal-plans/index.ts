
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.5.0";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const supabase = createClient(supabaseUrl, supabaseServiceKey);

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
    const { dietType, dietaryRestrictions, calorieGoal, mealsPerDay, userId } = await req.json();

    // Validate the required parameters
    if (!dietType || !userId) {
      throw new Error("Missing required parameters");
    }

    console.log("Generating meal plans with parameters:", { dietType, dietaryRestrictions, calorieGoal, mealsPerDay });

    // Prepare the prompt for OpenAI
    let systemPrompt = `You are a professional nutritionist specializing in ${dietType} diets.`;
    systemPrompt += `\n\nYour task is to create TWO different meal plans that are:\n`;
    systemPrompt += `- Aligned with the ${dietType} diet philosophy\n`;
    if (dietaryRestrictions) systemPrompt += `- Avoiding the following ingredients/foods: ${dietaryRestrictions}\n`;
    if (calorieGoal) systemPrompt += `- Approximately ${calorieGoal} calories per day\n`;
    systemPrompt += `- Consisting of ${mealsPerDay || 3} meals per day\n`;
    systemPrompt += `- Nutritionally balanced\n`;
    systemPrompt += `- Practical and easy to prepare\n`;

    const userPrompt = `Create two different ${dietType} meal plans with ${mealsPerDay || 3} meals per day` +
      `${dietaryRestrictions ? ` avoiding ${dietaryRestrictions}` : ""}` +
      `${calorieGoal ? ` with approximately ${calorieGoal} calories` : ""}.` +
      `\n\nProvide a title for each meal plan. For each day, list every meal with ingredients and simple preparation instructions. Include estimated calorie counts per meal.`;

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
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenAI API error:", error);
      throw new Error(`OpenAI API error: ${error.error?.message || "Unknown error"}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Process the content to extract meal plans
    const mealPlans = processMealPlans(content);

    // Store the result in database
    const { error: saveError } = await supabase
      .from('ai_tool_results')
      .insert({
        user_id: userId,
        tool_id: 'diet-meal-plan-generator',
        prompt: JSON.stringify({ dietType, dietaryRestrictions, calorieGoal, mealsPerDay }),
        result: JSON.stringify(mealPlans)
      });
        
    if (saveError) {
      console.error('Error saving results:', saveError);
    }

    // Return the meal plans
    return new Response(
      JSON.stringify({ mealPlans }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error in generate-meal-plans function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

// Helper function to process the raw content into structured meal plans
function processMealPlans(content: string) {
  // Split the content to identify the two meal plans
  const plans = [];
  
  try {
    // Identify where each meal plan starts
    let currentPlanText = '';
    let currentPlanIndex = 0;
    
    // Process the content line by line
    const lines = content.split('\n');
    let currentTitle = '';
    let currentPlan = {
      id: 0,
      title: '',
      description: '',
      meals: [],
      tags: []
    };
    
    // Extract titles and meal content
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Detect meal plan titles - typically starts with "Meal Plan" or contains "Plan" with a number or name
      if ((line.startsWith('Meal Plan') || line.match(/Plan \d|Plan \w+:/) || line.match(/^\d\./) || line.match(/^#\d/)) 
          && line.length < 100 && !currentTitle) {
        if (currentPlanIndex > 0 && currentPlan.title) {
          // Add tags based on the plan content
          currentPlan.tags = generateTags(currentPlan);
          plans.push({...currentPlan});
        }
        
        currentTitle = line.replace(/^\d\.|^#\d|^\*\*|\*\*$|:/g, '').trim();
        currentPlan = {
          id: currentPlanIndex + 1,
          title: currentTitle,
          description: '',
          meals: [],
          tags: []
        };
        currentPlanIndex++;
      } 
      // The line after the title is often a description or introduction
      else if (currentTitle && currentPlan.description === '' && line !== '') {
        currentPlan.description = line;
      }
      // If there's a title and we already have a description, we're looking at meal content
      else if (currentTitle && line !== '') {
        // Process meals and add to the current plan
        if (currentPlan.meals.length < 7) {  // Limit to 7 days for simplicity
          currentPlan.meals.push(line);
        }
      }
    }
    
    // Make sure to add the last plan
    if (currentPlan.title && !plans.find(p => p.id === currentPlan.id)) {
      currentPlan.tags = generateTags(currentPlan);
      plans.push(currentPlan);
    }
    
    // If we didn't successfully parse into two plans, fall back to a simpler approach
    if (plans.length < 2) {
      // Simple fallback: just split the content in half
      const midpoint = Math.floor(content.length / 2);
      plans.length = 0; // Clear the array
      
      plans.push({
        id: 1,
        title: "Meal Plan 1",
        description: "Nutritionally balanced meal plan.",
        meals: content.substring(0, midpoint).split('\n').filter(line => line.trim() !== ''),
        tags: ["balanced", "nutritious"]
      });
      
      plans.push({
        id: 2,
        title: "Meal Plan 2",
        description: "Alternative nutritionally balanced meal plan.",
        meals: content.substring(midpoint).split('\n').filter(line => line.trim() !== ''),
        tags: ["balanced", "alternative"]
      });
    }
    
    return plans;
  } catch (error) {
    console.error("Error processing meal plans:", error);
    // Fallback for when processing fails
    return [
      {
        id: 1,
        title: "Meal Plan 1",
        description: "Generated meal plan based on your preferences.",
        meals: content.split('\n').slice(0, 10).filter(line => line.trim() !== ''),
        tags: ["nutritious", "balanced"]
      },
      {
        id: 2,
        title: "Meal Plan 2",
        description: "Alternative meal plan based on your preferences.",
        meals: content.split('\n').slice(10).filter(line => line.trim() !== ''),
        tags: ["nutritious", "alternative"]
      }
    ];
  }
}

// Generate relevant tags based on the meal plan content
function generateTags(plan) {
  const tags = [];
  const content = plan.title + ' ' + plan.description + ' ' + plan.meals.join(' ');
  
  if (content.toLowerCase().includes('keto') || content.toLowerCase().includes('low carb')) tags.push('keto');
  if (content.toLowerCase().includes('vegan')) tags.push('vegan');
  if (content.toLowerCase().includes('vegetarian')) tags.push('vegetarian');
  if (content.toLowerCase().includes('paleo')) tags.push('paleo');
  if (content.toLowerCase().includes('gluten-free') || content.toLowerCase().includes('gluten free')) tags.push('gluten-free');
  if (content.toLowerCase().includes('low fat')) tags.push('low-fat');
  if (content.toLowerCase().includes('high protein') || content.toLowerCase().includes('high-protein')) tags.push('high-protein');
  if (content.toLowerCase().includes('mediterranean')) tags.push('mediterranean');
  if (content.toLowerCase().includes('intermittent fasting') || content.toLowerCase().includes('if')) tags.push('intermittent-fasting');
  if (content.toLowerCase().includes('dash')) tags.push('dash');
  
  // Add balanced as a default tag if no specific diet type was detected
  if (tags.length === 0) tags.push('balanced');
  
  // Add 'nutritious' as a general tag
  tags.push('nutritious');
  
  return tags.slice(0, 5); // Limit to 5 tags
}
