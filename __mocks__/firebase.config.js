
const mockRecipes = [
  {
    id: '1',
    name: 'Green Curry Fried Rice',
    cuisine: 'Thai',
    time: 30,
    ingredients: [
      'Rice',
      'Green Curry Paste',
      'Coconut Milk',
      'Vegetables'
    ]
  }
];

const db = {
  type: 'firestore',
  toJSON: () => 'firestore'
};

export { db, mockRecipes }; 