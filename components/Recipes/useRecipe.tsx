import { useState, useEffect } from "react";
import Recipe from "@/types/Recipe";
import getAllRecipes from "@/firebase/getAllRecipes";

const useRecipe = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const fetchedRecipes = await getAllRecipes();
        setRecipes(fetchedRecipes);
      } catch (err) {
        console.error('Error fetching recipes:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return {
    recipes,
    loading
  };
};

export default useRecipe;