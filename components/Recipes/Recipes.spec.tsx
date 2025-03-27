import { render, screen } from '@testing-library/react-native';
import Recipes from './Recipes';
import { collection, getDocs, query } from '@firebase/firestore';
import { mockRecipes } from '../../__mocks__/firebase.config';

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

    // Mock getDocs to return our test data
    (getDocs as jest.Mock).mockResolvedValue({
      docs: mockRecipes.map(recipe => ({
        id: recipe.id,
        data: () => recipe,
        exists: () => true
      }))
    });
  });

  test('Recipe list renders correctly', async () => {
    render(<Recipes />)
    expect(screen.getByText('My Recipes')).toBeOnTheScreen();
    // Wait for and verify the recipe title
    expect(await screen.findByText('Green Curry Fried Rice')).toBeOnTheScreen();
    // Verify recipe details
    expect(screen.getByText('Thai')).toBeOnTheScreen();
    expect(screen.getByText('30 minutes')).toBeOnTheScreen();
    expect(screen.getByText('4 ingredients')).toBeOnTheScreen();
  });
});
