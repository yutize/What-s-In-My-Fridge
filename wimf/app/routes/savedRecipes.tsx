import type { Route } from "./+types/recipes";
import { SavedRecipes } from "../pages/savedRecipes/savedRecipes";
import { requireUserId, getUserId } from "~/session.server";
import { db } from "~/db/app.server";
import { deleteSavedRecipe } from "~/middleware/RecipeService/deleteSavedRecipe";
import { redirect } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Saved Recipes" },
    { name: "description", content: "Look at your favorite recipes that you have saved." },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  await requireUserId(request);
  const userId = await getUserId(request);

  const user = db.prepare(`SELECT firstName FROM Users WHERE user_id = ?`).get(userId) as { firstName: string } | undefined;
  
  const savedRecipes = db.prepare(
    "SELECT * FROM RecipeSave WHERE user_id = ? ORDER BY recipe_id DESC"
  ).all(userId);

  const inventoryCount = db.prepare(`
    SELECT COUNT(*) as count 
    FROM Inventory 
    WHERE user_id = ?
  `).get(userId) as { count: number };
  
  return { 
    user: user?.firstName || "User", 
    savedRecipes, 
    inventoryCount: inventoryCount.count 
  };
}

export async function action({ request }: Route.ActionArgs) {
  try {
    const userId = await getUserId(request);
    const formData = await request.formData();
    const actionType = formData.get('actionType') as string;

    if (actionType === 'deleteRecipe') {
      const recipeId = parseInt(formData.get('recipeId') as string);
      await deleteSavedRecipe(recipeId, userId);
      return redirect('/savedRecipes');
    }
    return null;
  } catch (error) {
    console.error('Action failed:', error);
    return { success: false, message: 'Failed to delete recipe.' };
  }
}

export default function SavedRecipesRoute() {
  return <SavedRecipes />;
}