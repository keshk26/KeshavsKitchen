import { Recipe } from '@/types';

const mockRecipe: Recipe = {
  id: '1',
  name: 'Green Curry Fried Rice',
  cuisine: 'Thai',
  time: 30,
  ingredients: ['1 cup cooked rice', '2 tsp green curry paste', '1/2 can coconut milk'],
  instructions: [
    'Heat a large pan over medium heat.',
    'Add and fry the green curry paste for 2 minute.',
    'Add the coconut milk and bring to a boil.',
    'Add the rice and cook until heated through.'
  ]
};
export default mockRecipe;
