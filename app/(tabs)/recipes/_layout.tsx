import { Stack, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';

export default function RecipesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Recipes',
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
