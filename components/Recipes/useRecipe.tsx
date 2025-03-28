import { useState, useEffect } from "react";
import { collection, getDocs, query } from "@firebase/firestore";
import { db } from "../../firebase.config";
import Recipe from "@/types/Recipe";

const useRecipe = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const recipesRef = collection(db, 'recipes');
      const q = query(recipesRef);
      const querySnapshot = await getDocs(q);

      const fetchedRecipes = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Recipe[];

      setRecipes(fetchedRecipes);
      setError(null);
    } catch (err) {
      setError('Failed to fetch recipes');
      console.error('Error fetching recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return {
    recipes,
    loading,
    error,
    refreshRecipes: fetchRecipes
  };
};

export default useRecipe;