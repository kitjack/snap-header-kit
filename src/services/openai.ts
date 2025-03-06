
import { toast } from "@/hooks/use-toast";

interface GenerateAIContentProps {
  toolId: string;
  prompt: string;
  apiKey: string;
}

export const generateAIContent = async ({ 
  toolId, 
  prompt, 
  apiKey 
}: GenerateAIContentProps): Promise<string> => {
  let systemMessage = "You are a helpful assistant.";
  
  // Configure system prompt based on tool type
  switch (toolId) {
    case 'business-name':
      systemMessage = "You are a business naming expert. Generate 5 creative, unique, and memorable business names based on the description provided. Format your response as a numbered list. Be concise and professional.";
      break;
    
    case 'etsy-tags':
      systemMessage = "You are an Etsy SEO expert. Generate 10 relevant and effective Etsy tags for the product described. Format each tag with a # prefix. Focus on searchable and trending keywords that will help the product get discovered.";
      break;
    
    case 'slogan':
      systemMessage = "You are a branding expert specializing in slogan creation. Generate 5 catchy, memorable slogans for the business described. Format your response as a numbered list. Each slogan should be concise and convey the essence of the brand.";
      break;
    
    default:
      systemMessage = "You are a helpful assistant. Provide a detailed and helpful response to the prompt.";
  }

  console.log("Calling OpenAI with system message:", systemMessage);
  
  try {
    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true, // For client-side usage
    });

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
    });

    const generatedText = response.choices[0].message.content || '';
    return generatedText;
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    throw error;
  }
};
