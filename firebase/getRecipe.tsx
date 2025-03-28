import { doc } from "@firebase/firestore";
import { getDoc } from "@firebase/firestore";
import { db } from "./config";
import Recipe from "@/types/Recipe";

const getRecipe = async (id: string): Promise<Recipe> => {
  const recipeRef = doc(db, 'recipes', id);
  const recipeSnap = await getDoc(recipeRef);
  return recipeSnap.data() as Recipe;
};

export default getRecipe;