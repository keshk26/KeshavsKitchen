import { useState, useEffect, useMemo } from 'react';
import { Recipe, FilterOptions } from '@/types';
import subscribeToRecipes from '@/firebase/subscribeToRecipes';

const useRecipe = (filter?: FilterOptions) => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [loading, setLoading] = useState(true);

  // Create a stable filter reference
  const stableFilter = useMemo(() => filter, [JSON.stringify(filter)]);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToRecipes((fetchedRecipes: Recipe[]) => {
      setRecipes(fetchedRecipes);
      setLoading(false);
    }, stableFilter);

    return () => unsubscribe();
  }, [stableFilter]);

  return { recipes, loading };
};

export default useRecipe; 