import type { Route } from "./+types/recipes";
import { Recipes } from "../pages/recipes/recipes";
import { requireUserId, getUserId } from "~/session.server";
import { handleRecipeSearch } from "~/middleware/RecipeService/handleRecipeSearch";
import { db } from "~/db/app.server";

interface InventoryItem {
  ingredient_name: string;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Recipes" },
    { name: "description", content: "Search for recipes based on your ingredients." },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  await requireUserId(request);
  const userId = await getUserId(request);
  
  const inventoryItems = db.prepare(`
    SELECT 
      ing.ingredient_name
    FROM Inventory inv
    JOIN Ingredients ing ON inv.ingredient_id = ing.ingredient_id
    WHERE inv.user_id = ? 
      AND (inv.expiration_date IS NULL OR DATE(inv.expiration_date) >= DATE('now'))
    GROUP BY ing.ingredient_name
    ORDER BY ing.ingredient_name
  `).all(userId);
  
  return { inventoryItems };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const actionType = formData.get('actionType') as string;
  const userId = await getUserId(request);

  if (actionType === 'saveRecipe') {
    const recipeName = formData.get('recipeName') as string;
    const recipeUrl = formData.get('recipeUrl') as string;
    const recipeImage = formData.get('recipeImage') as string;
    const servings = parseInt(formData.get('servings') as string);
    const ingredients = formData.get('ingredients') as string;

    try {
      db.prepare(`
        INSERT INTO RecipeSave (user_id, recipe_name, recipe_url, recipe_image, servings, ingredients)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(userId, recipeName, recipeUrl, recipeImage, servings, ingredients);

      return { success: true, message: 'Recipe saved successfully!' };
    } catch (error) {
      console.error('Error saving recipe:', error);
      return { success: false, message: 'Failed to save recipe' };
    }
  }

  const ingredients = formData.getAll('ingredient') as string[];
  console.log('Received ingredients from form:', ingredients);
  
  const nutritionProfile = db.prepare(
    "SELECT * FROM NutritionProfile WHERE user_id = ? AND isActive = 1"
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
      fatRange = `0-${nutritionProfile.fat}`;
    }

    if (nutritionProfile.carbs) {
      carbsRange = `0-${nutritionProfile.carbs}`;
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


export default function RecipesRoute({ loaderData }: Route.ComponentProps) {
  return <Recipes inventoryItems={(loaderData?.inventoryItems ?? []) as unknown as InventoryItem[]} />;
}