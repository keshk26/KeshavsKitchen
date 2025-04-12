import { collection, query, where, onSnapshot, Unsubscribe } from '@firebase/firestore';
import { db } from './config';
import { Recipe, FilterOptions } from '@/types';

const subscribeToRecipes = (
  onUpdate: (recipes: Recipe[]) => void,
  filter?: FilterOptions
): Unsubscribe => {
  const recipesRef = collection(db, 'recipes');
  let q = query(recipesRef);

  if (filter?.favorite) {
    q = query(recipesRef, where('favorite', '==', filter.favorite));
  }
  if (filter?.cuisine) {
    q = query(recipesRef, where('cuisine', '==', filter.cuisine));
  }

  return onSnapshot(q, (querySnapshot) => {
    const fetchedRecipes: Recipe[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as Recipe[];

    onUpdate(fetchedRecipes);
  });
};

export default subscribeToRecipes;
