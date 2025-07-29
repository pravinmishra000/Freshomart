'use server';
/**
 * @fileOverview An AI flow to suggest products based on a user's cooking query.
 *
 * - suggestProducts - A function that suggests grocery products.
 * - ProductSuggestionInput - The input type for the suggestProducts function.
 * - ProductSuggestionOutput - The return type for the suggestProducts function.
 */

import { ai } from '@/ai/genkit';
import { products } from '@/lib/data';
import { z } from 'zod';

const ProductSuggestionInputSchema = z.object({
  query: z.string().describe('The user\'s description of what they want to cook.'),
});
export type ProductSuggestionInput = z.infer<typeof ProductSuggestionInputSchema>;

const ProductSuggestionOutputSchema = z.object({
  productNames: z.array(z.string()).describe('A list of product names that are ingredients for the user\'s query.'),
});
export type ProductSuggestionOutput = z.infer<typeof ProductSuggestionOutputSchema>;

// Create a simplified list of product names for the prompt
const productList = products.map(p => p.name).join(', ');

const prompt = ai.definePrompt({
  name: 'productSuggestionPrompt',
  input: { schema: ProductSuggestionInputSchema },
  output: { schema: ProductSuggestionOutputSchema },
  prompt: `You are a helpful grocery assistant for an online store called Freshomart.
A user will tell you what they plan to cook, and your job is to suggest a list of ingredients they might need from our store.

Analyze the user's query: "{{query}}"

Here is a list of available products in our store:
${productList}

Based on the user's query, identify and return a list of product names from the available list that would be required. Only return names that are on the list.
`,
});


export async function suggestProducts(input: ProductSuggestionInput): Promise<ProductSuggestionOutput> {
  const { output } = await prompt(input);
  return output!;
}
