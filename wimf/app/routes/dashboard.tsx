import type { Route } from "./+types/dashboard";
import { Dashboard } from "../pages/dashboard/dashboard";
import { requireUserId, getUserId } from "~/session.server";
import { db } from "~/db/app.server";
import { switchProfile } from "../middleware/NutritionService/nutritionController";
import { redirect } from "react-router";
import type { SavedRecipe } from "~/types/recipe";
import type { ProfileOption, InventoryItem } from "~/types/dashboard";

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
  
  const nutritionProfile = db.prepare(
    "SELECT * FROM NutritionProfile WHERE user_id = ? AND isActive = 1"
  ).get(userId);
  
  const allProfiles = db.prepare(
    "SELECT nutrition_id, profileName FROM NutritionProfile WHERE user_id = ?"
  ).all(userId);
  
  const inventoryItems = db.prepare(`
    SELECT 
      inv.inventory_id,
      inv.quantity,
      inv.expiration_date,
      ing.ingredient_id,
      ing.ingredient_name,
      ing.category,
      ing.uom as unit
    FROM Inventory inv
    JOIN Ingredients ing ON inv.ingredient_id = ing.ingredient_id
    WHERE inv.user_id = ? 
      AND (inv.expiration_date IS NULL OR DATE(inv.expiration_date) >= DATE('now'))
  `).all(userId);
  
  return { user, savedRecipes, nutritionProfile, allProfiles, inventoryItems };
}

export async function action(args: Route.ActionArgs) {
  const userId = await getUserId(args.request);
  const formData = await args.request.formData();
  const profileId = parseInt(formData.get("profileId") as string);
  
  await switchProfile(userId, profileId);
  return redirect("/dashboard");
}

export default function DashboardRoute({ loaderData }: Route.ComponentProps) {
  return <Dashboard 
    user={loaderData.user?.firstName || "User"} 
    savedRecipes={(loaderData.savedRecipes || []) as unknown as SavedRecipe[]} 
    nutritionProfile={loaderData.nutritionProfile || null} 
    allProfiles={(loaderData.allProfiles || []) as unknown as ProfileOption[]} 
    inventoryItems={(loaderData.inventoryItems || []) as unknown as InventoryItem[]} 
  />;
}