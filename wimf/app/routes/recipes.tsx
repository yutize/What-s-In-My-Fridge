import type { Route } from "./+types/recipes";
import { Recipes } from "../pages/recipes/recipes";
import { requireUserId } from "~/session.server";
import { handleRecipeSearch } from "~/middleware/RecipeService/handleRecipeSearch";

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
    
  const results = await handleRecipeSearch({
    query: ingredients,
  });
  
  console.log('Recipe results:', results);
  
  return { recipes: results };
}


export default function RecipesRoute() {
  return <Recipes />;
}