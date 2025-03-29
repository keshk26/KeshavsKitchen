import { Stack } from 'expo-router';

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
          headerShown: true
        }}
      />
    </Stack>
  );
} 