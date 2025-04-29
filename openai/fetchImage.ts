import OpenAI from 'openai';
import { Recipe } from '@/types';

type GenerateRecipeImage = (recipe: Recipe) => Promise<string>;

const generateRecipeImage: GenerateRecipeImage = async (recipe) => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY
    });

    const prompt = `${recipe.cuisine} ${recipe.name}. Centered composition, overhead angle, natural lighting but not too zoomed in, on a minimalist ceramic plate. Garnished and styled for restaurant presentation.`;
    const imageParams: OpenAI.Images.ImageGenerateParams = {
      model: 'dall-e-2',
      n: 1,
      size: '256x256',
      prompt
    };

    const response = await openai.images.generate(imageParams);

    return response.data[0]?.url ?? '';
  } catch (error) {
    console.error('Error generating recipe image:', error);
    throw error;
  }
};

export default generateRecipeImage;
