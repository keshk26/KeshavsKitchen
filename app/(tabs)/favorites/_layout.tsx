import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { router } from 'expo-router';

export default function FavoritesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Favorite Recipes",
          headerShown: true
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: '',
          headerShown: true,
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#FF4B4B" />
            </Pressable>
          )
        }}
      />
    </Stack>
  );
} 