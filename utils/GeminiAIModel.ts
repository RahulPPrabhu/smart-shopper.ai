import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function generateGeminiText(prompt: string) {
  try {
    const { text } = await generateText({
      model: google('gemini-1.5-flash'),
      prompt: prompt,
    });
    return text;
  } catch (error) {
    console.error('Error generating text with Gemini:', error);
    throw new Error('Failed to generate text');
  }
}