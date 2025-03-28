import { collection, getDocs, query } from "@firebase/firestore";
import { db } from "./config";
import Recipe from "@/types/Recipe";

const getAllRecipes = async (): Promise<Recipe[]> => {
  const recipesRef = collection(db, 'recipes');
  const q = query(recipesRef);
  const querySnapshot = await getDocs(q);

  const fetchedRecipes = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Recipe[];

  return fetchedRecipes
};

export default getAllRecipes;
