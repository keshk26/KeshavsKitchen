import OpenAI from 'openai';

const generateRecipeImage = async (recipe) => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY
    });

    const prompt = `centered image with slight zoom out of ${recipe.cuisine} ${recipe.name} with elegant plating`;
    const response = await openai.images.generate({
      model: 'dall-e-2',
      prompt,
      n: 1,
      size: '256x256',
      quality: 'standard'
    });

    return response.data[0].url;
  } catch (error) {
    console.error('Error generating recipe image:', error);
    throw error;
  }
};

export default generateRecipeImage;
