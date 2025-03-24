import { View, Text, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Recipes = () => {
  const recipes = [
    {
      id: 1,
      title: 'Butter Chicken',
      cuisine: 'Indian',
      time: '45 mins',
      difficulty: 'Medium',
    },
    {
      id: 2,
      title: 'Palak Paneer',
      cuisine: 'Indian',
      time: '30 mins',
      difficulty: 'Easy',
    },
    {
      id: 3,
      title: 'Chicken Biryani',
      cuisine: 'Indian',
      time: '60 mins',
      difficulty: 'Hard',
    },
  ];

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
          >
            <View className="flex-1">
              <Text className="mb-1 text-lg font-semibold text-gray-800">
                {recipe.title}
              </Text>
              <Text className="mb-2 text-sm text-gray-600">
                {recipe.cuisine}
              </Text>

              <View className="flex-row gap-4">
                <View className="flex-row items-center gap-1">
                  <Ionicons name="time-outline" size={16} color="#666" />
                  <Text className="text-sm text-gray-600">
                    {recipe.time}
                  </Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <Ionicons name="speedometer-outline" size={16} color="#666" />
                  <Text className="text-sm text-gray-600">
                    {recipe.difficulty}
                  </Text>
                </View>
              </View>
            </View>
            <Pressable className="p-2">
              <Ionicons name="heart-outline" size={24} color="#FF6B6B" />
            </Pressable>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

export default Recipes; 