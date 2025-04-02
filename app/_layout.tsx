import React from 'react';
import '../global.css';
import { Redirect, Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
      <Redirect href="/(tabs)/recipes" />
    </>
  );
}
