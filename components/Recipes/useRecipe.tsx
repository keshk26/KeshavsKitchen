import { useState, useEffect } from "react";
import Recipe from "@/types/Recipe";
import getAllRecipes from "@/firebase/getAllRecipes";

const useRecipe = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    try {
      const fetchedRecipes = await getAllRecipes();
      setRecipes(fetchedRecipes);
    } catch (err) {
      console.error('Error fetching recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchRecipes();
    })();
  }, []);

  return {
    recipes,
    loading,
    refetchRecipes: fetchRecipes
  };
};

export default useRecipe;