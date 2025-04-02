import { doc, onSnapshot, Unsubscribe } from '@firebase/firestore';
import { db } from './config';
import { Recipe } from '@/types';

const subscribeToRecipe = (id: string, onUpdate: (recipe: Recipe) => void): Unsubscribe => {
  const recipeRef = doc(db, 'recipes', id);
  return onSnapshot(recipeRef, (recipeSnap) => {
    onUpdate({ id: recipeSnap.id, ...recipeSnap.data() } as Recipe);
  });
};

export default subscribeToRecipe;
