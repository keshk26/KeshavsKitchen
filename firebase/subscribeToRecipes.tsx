import { collection, query, onSnapshot, Unsubscribe } from "@firebase/firestore";
import { db } from "./config";
import Recipe from "@/types/Recipe";

const subscribeToRecipes = (onUpdate: (recipes: Recipe[]) => void): Unsubscribe => {
  const recipesRef = collection(db, 'recipes');
  const q = query(recipesRef);

  return onSnapshot(q, (querySnapshot) => {
    const fetchedRecipes = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Recipe[];

    onUpdate(fetchedRecipes);
  });
};

export default subscribeToRecipes;
