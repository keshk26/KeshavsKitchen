import { useState, useEffect } from "react";
import Recipe from "@/types/Recipe";
import subscribeToRecipes from "@/firebase/subscribeToRecipes";

const useRecipe = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to recipes
    const unsubscribe = subscribeToRecipes((updatedRecipes) => {
      setRecipes(updatedRecipes);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return {
    recipes,
    loading
  };
};

export default useRecipe;