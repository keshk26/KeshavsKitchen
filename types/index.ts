export interface Recipe {
  id: string;
  name: string;
  cuisine: string;
  time: number;
  ingredients: string[];
  instructions: string[];
  favorite?: boolean;
  imageUrl?: string;
  imageExpiration?: string;
}

export type FilterOptions = {
  favorite?: boolean;
  cuisine?: string;
};
