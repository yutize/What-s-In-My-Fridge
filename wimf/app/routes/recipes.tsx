import type { Route } from "./+types/recipes";
import { Recipes } from "../pages/recipes/recipes";
import { requireUserId, getUserId } from "~/session.server";
import { handleRecipeSearch } from "~/middleware/RecipeService/handleRecipeSearch";
import { db } from "~/db/app.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Recipes" },
    { name: "description", content: "Search for recipes based on your ingredients." },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  await requireUserId(request);

}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const ingredients = formData.getAll('ingredient') as string[];
  
  const userId = await getUserId(request);
  const nutritionProfile = db.prepare(
    "SELECT * FROM NutritionProfile WHERE user_id = ? ORDER BY nutrition_id DESC LIMIT 1"
  ).get(userId) as { 
    caloriesLow: number; 
    caloriesHigh: number; 
    protein: number;
    carbs: number; 
    fat: number;
    allergy: string;
    preference: string;
  } | undefined;

  let calories: string | undefined;
  let fatRange: string | undefined;
  let carbsRange: string | undefined;
  let allergies: string[] | undefined;
  let mealpreference: string[] | undefined;

  if (nutritionProfile) {
    if (nutritionProfile.caloriesLow && nutritionProfile.caloriesHigh) {
      calories = `${nutritionProfile.caloriesLow}-${nutritionProfile.caloriesHigh}`;
    } else if (nutritionProfile.caloriesHigh) {
      calories = `${nutritionProfile.caloriesHigh}`;
    } else if (nutritionProfile.caloriesLow) {
      calories = `${nutritionProfile.caloriesLow}%2B`;
    }

    if (nutritionProfile.fat) {
      fatRange = `${nutritionProfile.fat}`;
    }

    if (nutritionProfile.carbs) {
      carbsRange = `${nutritionProfile.carbs}`;
    }

    if (nutritionProfile.allergy) {
      try {
        allergies = JSON.parse(nutritionProfile.allergy);
      } catch (e) {
        console.error('Error parsing allergies:', e);
      }
    }

    if (nutritionProfile.preference) {
      try {
        mealpreference = JSON.parse(nutritionProfile.preference);
      } catch (e) {
        console.error('Error parsing preferences:', e);
      }
    }
  }
    
  const results = await handleRecipeSearch({
    query: ingredients,
    calories,
    fat: fatRange,
    carbs: carbsRange,
    allergies,
    mealpreference,
  });
  
  return { recipes: results };
}


export default function RecipesRoute() {
  return <Recipes />;
}