export interface NutrientInfo {
  label: string;
  quantity: number;
  unit: string;
}

export interface RecipeResult {
  label: string;
  image: string;
  url: string;
  yield: number;
  ingredientLines: string[];
  totalNutrients: {
    ENERC_KCAL: NutrientInfo;
    FAT: NutrientInfo;
    CHOCDF: NutrientInfo;
    PROCNT: NutrientInfo;
  };
}

export interface EdamamResponse {
  hits: Array<{
    recipe: RecipeResult;
  }>;
  count: number;
}

export interface RecipeSearchParams {
  query: string | string[]; 
  allergies?: string[];
  mealpreference?: string[];
  calories?: string; 
  fat?: string; 
  carbs?: string; 
}
