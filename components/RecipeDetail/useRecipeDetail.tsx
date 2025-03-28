import { useState } from "react";
import { db } from "@/firebase.config";
import { doc, getDoc } from "@firebase/firestore";
import { useEffect } from "react";
import Recipe from "@/types/Recipe";
import { useLocalSearchParams } from "expo-router";

const useRecipeDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        if (!id) return;
        const recipeRef = doc(db, 'recipes', id);
        const recipeSnap = await getDoc(recipeRef);

        if (recipeSnap.exists()) {
          setRecipe({ id: recipeSnap.id, ...recipeSnap.data() } as Recipe);
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  return { recipe, loading };
}

export default useRecipeDetail;
