import { View, Text, ScrollView, ActivityIndicator, Pressable } from 'react-native';
import useRecipe from './useRecipe';
import { router, useNavigation } from 'expo-router';
import updateRecipe from '@/firebase/updateRecipe';
import { Recipe } from '@/types';
import RecipeTile from './RecipeTile';
import React, { useEffect, useState, useMemo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import CuisineFilterModal from './CuisineFilterModal';

const Recipes = () => {
  const [selectedCuisine, setSelectedCuisine] = useState<string | undefined>(undefined);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const { recipes, cuisines, loading } = useRecipe({ cuisine: selectedCuisine });
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => setIsFilterModalVisible(true)}
          className="mr-4"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          testID="filter-button"
        >
          <Ionicons
            name={selectedCuisine ? "filter" : "filter-outline"}
            size={24}
            color="#FF6B6B"
          />
        </Pressable>
      ),
    });
  }, [navigation, selectedCuisine]);

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
    <>
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

      <CuisineFilterModal
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        selectedCuisine={selectedCuisine}
        onSelectCuisine={(cuisine) => {
          setSelectedCuisine(cuisine);
          setIsFilterModalVisible(false);
        }}
        cuisines={cuisines}
      />
    </>
  );
}

export default Recipes; 