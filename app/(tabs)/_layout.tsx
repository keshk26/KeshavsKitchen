import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const TabLayout = () => {
  return (
    <Tabs screenOptions={{
      headerShown: true,
      tabBarActiveTintColor: '#FF6B6B',
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Recipes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

export default TabLayout; 