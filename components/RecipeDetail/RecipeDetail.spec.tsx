import { render, screen, fireEvent } from '@testing-library/react-native';
import RecipeDetail from './RecipeDetail';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { doc, onSnapshot, updateDoc } from '@firebase/firestore';
import { db } from '../../firebase/config';
import mockRecipe from './recipe.mock';

// Mock expo-router
jest.mock('expo-router', () => {
  const mockSetOptions = jest.fn();
  return {
    useLocalSearchParams: jest.fn(),
    useNavigation: jest.fn(() => ({
      setOptions: mockSetOptions
    }))
  };
});

describe('RecipeDetail', () => {
  const mockDocRef = {
    id: '1',
    type: 'document',
    path: 'recipes/1'
  } as const;

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();

    // Mock the route params
    (useLocalSearchParams as jest.Mock).mockReturnValue({ id: '1' });

    // Mock Firestore document reference
    (doc as jest.Mock).mockReturnValue(mockDocRef);

    // Mock onSnapshot to immediately return recipe data
    (onSnapshot as jest.Mock).mockImplementation((docRef, callback) => {
      callback({
        exists: () => true,
        data: () => ({ ...mockRecipe, favorite: false }),
        id: mockRecipe.id
      });
      // Return unsubscribe function
      return jest.fn();
    });

    // Mock updateDoc to resolve immediately
    (updateDoc as jest.Mock).mockResolvedValue(undefined);
  });

  test('should render the recipe detail screen', async () => {
    render(<RecipeDetail />);

    // Verify Firestore was called correctly
    expect(doc).toHaveBeenCalledWith(db, 'recipes', '1');
    expect(onSnapshot).toHaveBeenCalledWith(mockDocRef, expect.any(Function));

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

  test('should toggle favorite status', async () => {
    render(<RecipeDetail />);

    // Wait for the component to render and set header options
    await screen.findByText('Green Curry Fried Rice');

    // Get the mock function from the jest.mock setup
    const mockNavigation = jest.requireMock('expo-router').useNavigation();
    const setOptionsCalls = mockNavigation.setOptions.mock.calls;

    // Get the most recent header options
    expect(setOptionsCalls.length).toBeGreaterThan(0);
    const headerOptions = setOptionsCalls[setOptionsCalls.length - 1][0];
    const HeaderRight = headerOptions.headerRight;

    // Render the header right component
    const { getByTestId } = render(<HeaderRight />);

    // Find and click the favorite button
    const favoriteButton = getByTestId('favorite-button');
    fireEvent.press(favoriteButton);

    // Verify updateDoc was called with correct params
    expect(updateDoc).toHaveBeenCalledWith(
      mockDocRef,
      { favorite: true }
    );
  });

  test('should clean up subscription on unmount', () => {
    const unsubscribe = jest.fn();
    (onSnapshot as jest.Mock).mockReturnValue(unsubscribe);

    const { unmount } = render(<RecipeDetail />);
    unmount();

    expect(unsubscribe).toHaveBeenCalled();
  });
});
