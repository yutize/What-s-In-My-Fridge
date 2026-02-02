import type { Route } from "./+types/recipes";
import { SavedRecipes } from "../pages/savedRecipes/savedRecipes";
import { requireUserId, getUserId } from "~/session.server";
import { handleRecipeSearch } from "~/middleware/RecipeService/handleRecipeSearch";
import { db } from "~/db/app.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Saved Recipes" },
    { name: "description", content: "Look at your favorite recipes that you have saved." },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  await requireUserId(request);
  const userId = await getUserId(request);
  
  const savedRecipes = db.prepare(
    "SELECT * FROM RecipeSave WHERE user_id = ? ORDER BY recipe_id DESC"
  ).all(userId);

  console.log('Saved recipes for user:', userId, savedRecipes);
  
  return { savedRecipes };
}

export default function SavedRecipesRoute() {
  return <SavedRecipes />;
}