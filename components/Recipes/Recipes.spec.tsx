import { render, screen } from '@testing-library/react-native';
import Recipes from './Recipes';

describe('Recipes Component', () => {
  test('Header renders correctly', () => {
    render(<Recipes />);
    expect(screen.getByText('My Recipes')).toBeOnTheScreen();
  });
});
