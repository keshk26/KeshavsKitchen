import { doc, updateDoc } from "@firebase/firestore";
import { db } from "./config";
import Recipe from "@/types/Recipe";

const updateRecipe = async (id: string, recipe: Recipe): Promise<void> => {
  const recipeRef = doc(db, 'recipes', id);
  const { id: _, ...updateData } = recipe;
  await updateDoc(recipeRef, updateData);
};

export default updateRecipe;
