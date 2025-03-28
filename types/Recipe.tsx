export default interface Recipe {
  id: string;
  name: string;
  cuisine: string;
  time: number;
  ingredients: string[];
  instructions: string[];
}