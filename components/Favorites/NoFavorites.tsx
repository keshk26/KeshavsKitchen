import { Ionicons } from "@expo/vector-icons";
import { View, Text, ScrollView } from "react-native";

const NoFavorites = () => {
  return (
    <ScrollView className="flex-1 bg-bgDefault">
      <View className="p-5 bg-white border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-800">Favorite Recipes</Text>
      </View>

      <View className="items-center justify-center flex-1 p-10 mt-20">
        <View className="items-center justify-center w-24 h-24 mb-6 bg-white rounded-full shadow-sm">
          <Ionicons name="heart" size={64} color="#FF6B6B" />
        </View>
        <Text className="mb-2 text-xl font-semibold text-gray-800">
          No favorites yet
        </Text>
        <Text className="text-base leading-6 text-center text-gray-600">
          Your favorite recipes will appear here. Start adding some from the Recipes tab!
        </Text>
      </View>
    </ScrollView>
  );
};

export default NoFavorites