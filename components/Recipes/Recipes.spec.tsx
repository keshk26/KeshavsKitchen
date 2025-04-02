import { render, screen } from '@testing-library/react-native';
import Recipes from './Recipes';
import { collection, onSnapshot, query } from '@firebase/firestore';
import mockRecipes from './recipes.mock';

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn()
  },
  useNavigation: () => ({
    setOptions: jest.fn()
  })
}));

describe('Recipes', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Create a mock collection reference
    const mockCollectionRef = {
      type: 'collection',
      id: 'recipes'
    };

    // Mock the collection function to return our mock ref
    (collection as jest.Mock).mockReturnValue(mockCollectionRef);

    // Mock query to return the same ref
    (query as jest.Mock).mockReturnValue(mockCollectionRef);

    // Mock onSnapshot to immediately call the callback with our test data
    (onSnapshot as jest.Mock).mockImplementation((query, callback) => {
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
  });

  test('Recipe list renders correctly', async () => {
    render(<Recipes />);
    // Wait for and verify the first recipe
    expect(await screen.findByText('Thai')).toBeOnTheScreen();
    expect(screen.getByText('30 minutes')).toBeOnTheScreen();
    expect(screen.getByText('3 ingredients')).toBeOnTheScreen();

    // Verify the second recipe
    expect(screen.getByText('Margarita')).toBeOnTheScreen();
    expect(screen.getByText('Mexican')).toBeOnTheScreen();
    expect(screen.getByText('5 minutes')).toBeOnTheScreen();
    expect(screen.getByText('5 ingredients')).toBeOnTheScreen();
  });

  test('Subscription is cleaned up on unmount', () => {
    const unsubscribe = jest.fn();
    (onSnapshot as jest.Mock).mockReturnValue(unsubscribe);

    const { unmount } = render(<Recipes />);
    unmount();

    expect(unsubscribe).toHaveBeenCalled();
  });
});
