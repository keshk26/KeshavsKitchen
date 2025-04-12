import React from 'react';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react-native';
import Favorites from './Favorites';
import { collection, query, onSnapshot, updateDoc, doc, where } from '@firebase/firestore';
import mockRecipes from './favoriteRecipes.mock';

const mockNavigate = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    navigate: mockNavigate
  }),
  useNavigation: () => ({
    setOptions: jest.fn()
  })
}));

describe('Favorites Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Create a mock collection reference
    const mockCollectionRef = {
      type: 'collection',
      id: 'recipes'
    };

    // Mock the collection function to return our mock ref
    (collection as jest.Mock).mockReturnValue(mockCollectionRef);

    // Mock where function
    (where as jest.Mock).mockReturnValue({
      field: 'favorite',
      operator: '==',
      type: 'where',
      value: true
    });

    // Mock query to handle where conditions
    (query as jest.Mock).mockReturnValue({
      ...mockCollectionRef,
      where: {
        field: 'favorite',
        operator: '==',
        type: 'where',
        value: true
      }
    });

    // Mock onSnapshot to immediately call the callback with our test data
    (onSnapshot as jest.Mock).mockImplementation((_, callback) => {
      callback({
        docs: mockRecipes.map((recipe) => ({
          id: recipe.id,
          data: () => recipe,
          exists: () => true
        }))
      });
      // Return an unsubscribe function
      return jest.fn();
    });

    // Mock doc and updateDoc
    (doc as jest.Mock).mockImplementation((db, collection, id) => ({
      id,
      collection,
      type: 'document'
    }));
    (updateDoc as jest.Mock).mockResolvedValue(undefined);
  });

  test('should show NoFavorites component when there are no favorites', async () => {
    // Mock onSnapshot to return empty data
    (onSnapshot as jest.Mock).mockImplementation((_, callback) => {
      callback({
        docs: []
      });
      return jest.fn();
    });

    render(<Favorites />);
    expect(await screen.findByText('No favorites yet')).toBeOnTheScreen();
  });

  test('should render favorite recipes list', async () => {
    render(<Favorites />);
    expect(await screen.findByText('Green Curry Fried Rice')).toBeOnTheScreen();
    expect(screen.getByText('Margarita')).toBeOnTheScreen();
    expect(screen.queryByText('Honey Garlic Shrimp')).not.toBeOnTheScreen();
  });

  test('should navigate to recipe detail page when recipe is pressed', async () => {
    const { getByText } = render(<Favorites />);
    const recipeName = await getByText('Green Curry Fried Rice');
    fireEvent.press(recipeName);
    expect(mockNavigate).toHaveBeenCalledWith('/favorites/1');
  });

  test('should update favorite status when favorite button is pressed', async () => {
    render(<Favorites />);

    // Initial render should show the recipe
    expect(await screen.findByText('Green Curry Fried Rice')).toBeOnTheScreen();

    // Press the favorite button
    fireEvent.press(screen.getByTestId(`favorite-button-${mockRecipes[0].id}`));

    // Verify updateDoc was called
    await waitFor(() => {
      expect(updateDoc).toHaveBeenCalledWith(
        expect.objectContaining({
          id: mockRecipes[0].id,
          collection: 'recipes'
        }),
        { favorite: false }
      );
    });

    // Mock onSnapshot with updated data (without the unfavorited recipe)
    await act(async () => {
      const onSnapshotCallback = (onSnapshot as jest.Mock).mock.calls[0][1];
      onSnapshotCallback({
        docs: mockRecipes.slice(1).map((recipe) => ({
          id: recipe.id,
          data: () => recipe,
          exists: () => true
        }))
      });
    });

    // Verify the unfavorited recipe is removed from the list
    await waitFor(() => {
      expect(screen.queryByText('Green Curry Fried Rice')).not.toBeOnTheScreen();
    });
  });

  test('should clean up subscription on unmount', () => {
    const unsubscribe = jest.fn();
    (onSnapshot as jest.Mock).mockReturnValue(unsubscribe);

    const { unmount } = render(<Favorites />);
    unmount();

    expect(unsubscribe).toHaveBeenCalled();
  });
});
