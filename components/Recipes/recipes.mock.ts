import { Recipe } from '@/types';

const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Green Curry Fried Rice',
    cuisine: 'Thai',
    time: 30,
    ingredients: ['1 cup cooked rice', '2 tsp green curry paste', '1/2 can coconut milk'],
    instructions: [
      '1. Heat a large pan over medium heat.',
      '2. Add and fry the green curry paste for 2 minute.',
      '3. Add the coconut milk and bring to a boil.',
      '4. Add the rice and cook until heated through.'
    ],
    favorite: false
  },
  {
    id: '2',
    name: 'Margarita',
    cuisine: 'Mexican',
    time: 5,
    ingredients: [
      '1 can of frozen limeade',
      '1 can of water',
      '1 can of ice',
      '1 can of Lunazual tequila',
      '1/3 can of Grand Marnier'
    ],
    instructions: [
      'In large pitcher, combine the above ingredients.',
      'Makes around 6 cups of margarita.',
      'Serve in glass over ice.'
    ],
    favorite: false
  },
  {
    id: '3',
    name: 'Honey Garlic Shrimp',
    cuisine: 'Chinese',
    time: 20,
    ingredients: ['1 lb shrimp', '1/2 cup honey', '1/2 cup soy sauce', '1/2 cup garlic'],
    instructions: [
      '1. Heat a large pan over medium heat.',
      '2. Add and fry the green curry paste for 2 minute.',
      '3. Add the coconut milk and bring to a boil.',
      '4. Add the rice and cook until heated through.'
    ],
    favorite: false
  }
];

export default mockRecipes;
