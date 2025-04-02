import { doc, updateDoc } from '@firebase/firestore';
import { db } from './config';
import { Recipe } from '@/types';

const updateRecipe = async (id: string, recipeUpdate: Partial<Recipe>): Promise<void> => {
  const recipeRef = doc(db, 'recipes', id);
  await updateDoc(recipeRef, recipeUpdate);
};

export default updateRecipe;
