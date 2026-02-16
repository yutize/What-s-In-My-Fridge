export interface NutritionProfile {
  nutrition_id: number;
  user_id: number;
  caloriesLow: number | null;
  caloriesHigh: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  allergy: string | null;
  preference: string | null;
}
