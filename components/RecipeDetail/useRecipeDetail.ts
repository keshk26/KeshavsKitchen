import { useState, useEffect, useCallback } from 'react';
import { Recipe } from '@/types';
import subscribeToRecipe from '@/firebase/subscribeToRecipe';
import generateRecipeImage from '@/openai/fetchImage';
import updateRecipe from '@/firebase/updateRecipe';

const useRecipeDetail = (id: string) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToRecipe(id, (recipe) => {
      setRecipe(recipe);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [id]);

  const generateImage = useCallback(async () => {
    if (!recipe) return;

    try {
      setImageLoading(true);
      const { imageUrl, imageExpiration } = await generateRecipeImage(recipe);
      if (imageUrl) {
        await updateRecipe(recipe.id, { imageUrl, imageExpiration });
      }
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setImageLoading(false);
    }
  }, [recipe]);

  return { recipe, loading, imageLoading, generateImage };
};

export default useRecipeDetail;
