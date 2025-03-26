import { render, screen } from '@testing-library/react-native';
import Recipes from './Recipes';

describe('Recipes Component', () => {
  it('renders correctly', () => {
    render(<Recipes />);
    expect(screen.getByText('My Recipes')).toBeTruthy();
  });
});
