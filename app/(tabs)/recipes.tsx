import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RecipesScreen = () => {
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Recipes</Text>
      </View>

      <View style={styles.recipeList}>
        {recipes.map((recipe) => (
          <Pressable key={recipe.id} style={styles.recipeCard}>
            <View style={styles.recipeContent}>
              <Text style={styles.recipeTitle}>{recipe.title}</Text>
              <Text style={styles.recipeCuisine}>{recipe.cuisine}</Text>

              <View style={styles.recipeMetaContainer}>
                <View style={styles.recipeMeta}>
                  <Ionicons name="time-outline" size={16} color="#666" />
                  <Text style={styles.recipeMetaText}>{recipe.time}</Text>
                </View>
                <View style={styles.recipeMeta}>
                  <Ionicons name="speedometer-outline" size={16} color="#666" />
                  <Text style={styles.recipeMetaText}>{recipe.difficulty}</Text>
                </View>
              </View>
            </View>
            <Pressable style={styles.favoriteButton}>
              <Ionicons name="heart-outline" size={24} color="#FF6B6B" />
            </Pressable>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  recipeList: {
    padding: 16,
  },
  recipeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  recipeContent: {
    flex: 1,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  recipeCuisine: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  recipeMetaContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  recipeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  recipeMetaText: {
    fontSize: 14,
    color: '#666',
  },
  favoriteButton: {
    padding: 8,
  },
});

export default RecipesScreen; 