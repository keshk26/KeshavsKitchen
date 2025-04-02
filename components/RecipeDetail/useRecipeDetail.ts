import { useState, useEffect } from 'react';
import { Recipe } from '@/types';
import subscribeToRecipe from '@/firebase/subscribeToRecipe';

const useRecipeDetail = (id: string) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = subscribeToRecipe(id, (recipe) => {
      setRecipe(recipe);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [id]);

  return { recipe, loading };
};

export default useRecipeDetail;
