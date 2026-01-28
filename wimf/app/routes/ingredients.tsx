import type { Route } from "./+types/recipes";
import { Recipes } from "../pages/recipes/recipes";
import { requireUserId, getUserId } from "~/session.server";
import { handleRecipeSearch } from "~/middleware/RecipeService/handleRecipeSearch";
import { db } from "~/db/app.server";
import { Ingredients } from "~/pages/ingredients/ingredients";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ingredient Manager" },
    { name: "description", content: "Manage the ingredients in your fridge" },
  ];
}


export default function IngredientsRoute() {
  return <Ingredients />;
}