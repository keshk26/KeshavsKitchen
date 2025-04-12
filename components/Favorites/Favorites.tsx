import React from 'react';
import { View, ScrollView } from 'react-native';
import useRecipe from '../Recipes/useRecipe';
import { router } from 'expo-router';
import updateRecipe from '@/firebase/updateRecipe';
import { Recipe } from '@/types';
import SuspenseFallback from '../Global/SuspenseFallback';

const RecipeTile = React.lazy(() => import('../Recipes/RecipeTile'));

const Favorites = () => {
  const { recipes } = useRecipe({ favorite: true });

  const handleRecipePress = (id: string) => {
    router.push(`/favorites/${id}`);
  };

  const handleFavoritePress = async (recipe: Recipe) => {
    try {
      await updateRecipe(recipe.id, { favorite: !recipe.favorite });
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  return (
    <SuspenseFallback>
      <ScrollView className="flex-1 bg-bgDefault">
        <View className="p-4">
          {recipes?.map((recipe) => (
            <RecipeTile
              key={recipe.id}
              recipe={recipe}
              onPress={handleRecipePress}
              onFavoritePress={handleFavoritePress}
            />
          ))}
        </View>
      </ScrollView>
    </SuspenseFallback>
  );
};

export default Favorites;
