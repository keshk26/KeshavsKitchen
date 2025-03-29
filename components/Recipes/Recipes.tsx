import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import useRecipe from './useRecipe';
import { router } from 'expo-router';
import updateRecipe from '@/firebase/updateRecipe';
import { Recipe } from '@/types';
import RecipeTile from './RecipeTile';

const Recipes = () => {
  const { recipes, loading } = useRecipe()

  const handleRecipePress = (id: string) => {
    router.push(`/recipes/${id}`);
  };

  const handleFavoritePress = async (recipe: Recipe) => {
    try {
      await updateRecipe(recipe.id, { favorite: !recipe.favorite });
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  if (loading || !recipes) {
    return (
      <View className="items-center justify-center flex-1 bg-bgDefault">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-bgDefault">
      <View className="p-4">
        {recipes.map((recipe) => (
          <RecipeTile
            key={recipe.id}
            recipe={recipe}
            onPress={handleRecipePress}
            onFavoritePress={handleFavoritePress}
          />
        ))}
      </View>
    </ScrollView>
  );
}

export default Recipes; 