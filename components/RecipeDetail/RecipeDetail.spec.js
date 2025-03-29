import { render, screen } from '@testing-library/react-native';
import RecipeDetail from './RecipeDetail';
import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from '@firebase/firestore';
import { db } from '../../firebase/config';
import mockRecipe from './recipe.mock';

// Mock expo-router
jest.mock('expo-router', () => ({
  useLocalSearchParams: jest.fn(),
  useNavigation: jest.fn(() => ({
    setOptions: jest.fn()
  }))
}));

describe('RecipeDetail', () => {
  let mockDocRef;
  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();

    // Mock the route params
    useLocalSearchParams.mockReturnValue({ id: '1' });

    mockDocRef = {
      id: '1',
      type: 'document',
      path: 'recipes/1'
    };

    // Mock Firestore document reference
    doc.mockReturnValue(mockDocRef);

    // Mock Firestore document snapshot
    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => mockRecipe,
      id: mockRecipe.id
    });
  });

  test('should render the recipe detail screen', async () => {
    render(<RecipeDetail />);

    // Verify Firestore was called correctly
    expect(doc).toHaveBeenCalledWith(db, 'recipes', '1');
    expect(getDoc).toHaveBeenCalledWith(mockDocRef);

    // Wait for recipe details to be displayed
    expect(await screen.findByText('Green Curry Fried Rice')).toBeOnTheScreen();
    expect(screen.getByText('Cuisine: Thai')).toBeOnTheScreen();
    expect(screen.getByText('Time: 30 minutes')).toBeOnTheScreen();
    expect(screen.getByText('Ingredients')).toBeOnTheScreen();
    expect(screen.getByText('Instructions')).toBeOnTheScreen();

    // Test ingredients are displayed
    for (const ingredient of mockRecipe.ingredients) {
      expect(await screen.findByText(ingredient)).toBeOnTheScreen();
    }

    // Test instructions are displayed
    for (const instruction of mockRecipe.instructions) {
      expect(await screen.findByText(instruction)).toBeOnTheScreen();
    }
  });
});
