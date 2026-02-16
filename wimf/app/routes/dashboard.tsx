import type { Route } from "./+types/dashboard";
import { Dashboard } from "../pages/dashboard/dashboard";
import { requireUserId, getUserId } from "~/session.server";
import { db } from "~/db/app.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "dashboard", content: "Main page for managing your fridge." },
  ];
}
export async function loader({ request }: Route.LoaderArgs) {
  await requireUserId(request);
  const userId = await getUserId(request);
  const user = db.prepare(`SELECT firstName FROM Users WHERE user_id = ?`).get(userId) as { firstName: string } | undefined;
  
  // Fetch saved recipes for the user
  const savedRecipes = db.prepare(
    "SELECT * FROM RecipeSave WHERE user_id = ? ORDER BY recipe_id DESC LIMIT 5"
  ).all(userId);
  
  // Fetch nutrition profile for the user
  const nutritionProfile = db.prepare(
    "SELECT * FROM NutritionProfile WHERE user_id = ? ORDER BY nutrition_id DESC LIMIT 1"
  ).get(userId);
  
  return { user, savedRecipes, nutritionProfile };
}

export default function DashboardRoute({ loaderData }: Route.ComponentProps) {
  return <Dashboard user={loaderData.user?.firstName || "User"} savedRecipes={loaderData.savedRecipes || []} nutritionProfile={loaderData.nutritionProfile || null} />;
}