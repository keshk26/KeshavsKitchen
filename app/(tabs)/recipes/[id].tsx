import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from '@firebase/firestore';
import { db } from '../../../firebase.config';
import { Recipe } from '@/components/Recipes/useRecipe';

export default function RecipeDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        if (!id) return;
        const recipeRef = doc(db, 'recipes', id);
        const recipeSnap = await getDoc(recipeRef);

        if (recipeSnap.exists()) {
          setRecipe({ id: recipeSnap.id, ...recipeSnap.data() } as Recipe);
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <View className="items-center justify-center flex-1 bg-bgDefault">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!recipe) {
    return (
      <View className="flex-1 p-4 bg-bgDefault">
        <Text className="text-xl text-center">Recipe not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-bgDefault">
      <View className="p-4">
        <Text className="mb-4 text-3xl font-bold">{recipe.name}</Text>

        <View className="mb-6">
          <Text className="mb-2 text-xl font-semibold">Details</Text>
          <Text className="text-gray-600">Cuisine: {recipe.cuisine}</Text>
          <Text className="text-gray-600">Time: {recipe.time} minutes</Text>
        </View>

        <View className="mb-6">
          <Text className="mb-2 text-xl font-semibold">Ingredients</Text>
          {recipe.ingredients.map((ingredient, index) => (
            <Text key={index} className="mb-1 text-gray-600">• {ingredient}</Text>
          ))}
        </View>

        <View>
          <Text className="mb-2 text-xl font-semibold">Instructions</Text>
          {recipe.instructions.map((instruction, index) => (
            <Text key={index} className="mb-2 text-gray-600">
              {index + 1}. {instruction}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
} 