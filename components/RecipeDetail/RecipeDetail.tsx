import { View, Text, ScrollView, ActivityIndicator, Pressable } from 'react-native';
import useRecipeDetail from './useRecipeDetail';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useCallback, useMemo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import updateRecipe from '@/firebase/updateRecipe';

const RecipeDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { recipe, loading } = useRecipeDetail(id);
  const navigation = useNavigation();

  const isFavorite = useMemo(() => {
    return recipe?.favorite || false;
  }, [recipe]);

  const toggleFavorite = useCallback(async () => {
    if (!recipe) return;
    const toggledFavorite = !isFavorite;
    try {
      await updateRecipe(recipe.id, { favorite: toggledFavorite });
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  }, [recipe, isFavorite]);

  useEffect(() => {
    if (!loading && recipe) {
      navigation.setOptions({
        title: recipe.name,
        headerRight: () => (
          <Pressable
            onPress={toggleFavorite}
            className="mr-4"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            testID="favorite-button"
          >
            <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={24} color="#FF6B6B" />
          </Pressable>
        )
      });
    }
  }, [loading, recipe, isFavorite, toggleFavorite, navigation]);

  if (!recipe) {
    return (
      <View className="items-center justify-center flex-1 bg-bgDefault">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-bgDefault">
      <View className="p-4">
        <View className="mb-6">
          <Text className="text-gray-600">Cuisine: {recipe.cuisine}</Text>
          <Text className="text-gray-600">Time: {recipe.time} minutes</Text>
        </View>

        <View className="mb-6">
          <Text className="mb-2 text-xl font-semibold">Ingredients</Text>
          {recipe.ingredients.map((ingredient, index) => (
            <Text key={index} className="mb-1 text-gray-600">
              • <Text>{ingredient}</Text>
            </Text>
          ))}
        </View>

        <View>
          <Text className="mb-2 text-xl font-semibold">Instructions</Text>
          {recipe.instructions.map((instruction, index) => (
            <Text key={index} className="mb-2 text-gray-600">
              {index + 1}. <Text>{instruction}</Text>
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default RecipeDetail;
