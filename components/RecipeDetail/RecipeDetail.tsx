import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import useRecipeDetail from './useRecipeDetail';

const RecipeDetail = () => {
  const { recipe, loading } = useRecipeDetail();

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
          <Text className="text-gray-600">Cuisine: {recipe.cuisine}</Text>
          <Text className="text-gray-600">Time: {recipe.time} minutes</Text>
        </View>

        <View className="mb-6">
          <Text className="mb-2 text-xl font-semibold">Ingredients</Text>
          {recipe.ingredients.map((ingredient, index) => (
            <Text key={index} className="mb-1 text-gray-600">• <Text>{ingredient}</Text></Text>
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
}
export default RecipeDetail;