import { useState } from "react";
import { db } from "@/firebase/config";
import { doc, getDoc } from "@firebase/firestore";
import { useEffect } from "react";
import Recipe from "@/types/Recipe";
import getRecipe from "@/firebase/getRecipe";

const useRecipeDetail = (id: string) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const recipe = await getRecipe(id);
        setRecipe(recipe);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return { recipe, loading };
}

export default useRecipeDetail;
