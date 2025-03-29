import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useRecipe from './useRecipe';
import { router } from 'expo-router';
import updateRecipe from '@/firebase/updateRecipe';
import Recipe from '@/types/Recipe';

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
      <View className="p-5 bg-white border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-800">My Recipes</Text>
      </View>

      <View className="p-4">
        {recipes.map((recipe) => (
          <Pressable
            key={recipe.id}
            className="flex-row items-center p-4 mb-4 bg-white shadow-sm rounded-xl"
            onPress={() => handleRecipePress(recipe.id)}
          >
            <View className="flex-1">
              <Text className="mb-1 text-lg font-semibold text-gray-800">
                {recipe.name}
              </Text>
              <View className="flex-row gap-4">
                <View className="flex-row items-center gap-1">
                  <Ionicons name="restaurant-outline" size={16} color="#666" />
                  <Text className="text-sm text-gray-600">
                    {recipe.cuisine}
                  </Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <Ionicons name="time-outline" size={16} color="#666" />
                  <Text className="text-sm text-gray-600">
                    {recipe.time} minutes
                  </Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <Ionicons name="list" size={16} color="#666" />
                  <Text className="text-sm text-gray-600">
                    {recipe.ingredients.length} ingredients
                  </Text>
                </View>
              </View>
            </View>
            <Pressable className="p-2" onPress={() => handleFavoritePress(recipe)}>
              <Ionicons
                name={recipe.favorite ? "heart" : "heart-outline"}
                size={24}
                color="#FF6B6B"
              />
            </Pressable>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

export default Recipes; 