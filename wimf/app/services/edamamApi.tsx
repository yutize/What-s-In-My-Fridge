export interface NutrientInfo {
  label: string;
  quantity: number;
  unit: string;
}

export interface RecipeResult {
  label: string;
  image: string;
  url: string;
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
  query: string | string[]; // Can be single ingredient or array of ingredients
  allergies?: string[];
  mealpreference?: string[];
}
