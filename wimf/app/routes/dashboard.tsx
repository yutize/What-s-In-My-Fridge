import type { Route } from "./+types/dashboard";
import { Dashboard } from "../pages/dashboard/dashboard";
import { requireUserId, getUserId } from "~/session.server";
import { db } from "~/db/app.server";
import { switchProfile } from "../middleware/NutritionService/nutritionController";
import { redirect, useNavigation, useFetcher } from "react-router";
import type { NutritionProfile } from "~/types/nutrition";
import type { SavedRecipe } from "~/types/recipe";
import type { ProfileOption, InventoryItem } from "~/types/dashboard";
import { getAIRecipePicks, fetchEdamamRecipeDetail } from "~/services/recipePicksService";
import type { RecipePicksResult } from "~/services/recipePicksService";

interface ExpiringItem extends InventoryItem {
  days_until_expiration: number;
}

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
  ).get(userId) as { caloriesLow?: number; caloriesHigh?: number; protein?: number } | undefined;

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

  const expiringSoonItems = (inventoryItems as InventoryItem[])
    .filter((item) => !!item.expiration_date)
    .map((item) => {
      const now = new Date();
      const expiration = new Date(item.expiration_date as string);
      const diffMs = expiration.getTime() - now.getTime();
      const daysUntil = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      return {
        ...item,
        days_until_expiration: daysUntil,
      };
    })
    .filter((item) => item.days_until_expiration >= 0 && item.days_until_expiration <= 7);

  // ── AI Editor's Picks ──────────────────────────────────────────────────────
  let recipePicks: RecipePicksResult | null = null;
  try {
    const ingredientNames = (inventoryItems as InventoryItem[]).map((i) => i.ingredient_name);
    const picks = await getAIRecipePicks(ingredientNames, nutritionProfile ?? null, false);

    // Enrich with Edamam images in parallel (best-effort — won't block if missing)
    const [featuredDetail, pick1Detail, pick2Detail] = await Promise.all([
      fetchEdamamRecipeDetail(picks.featured.name),
      fetchEdamamRecipeDetail(picks.picks[0]?.name ?? ""),
      fetchEdamamRecipeDetail(picks.picks[1]?.name ?? ""),
    ]);

    if (featuredDetail) {
      picks.featured.image = featuredDetail.image;
      picks.featured.url = featuredDetail.url;
    }
    if (pick1Detail && picks.picks[0]) {
      picks.picks[0].image = pick1Detail.image;
      picks.picks[0].url = pick1Detail.url;
    }
    if (pick2Detail && picks.picks[1]) {
      picks.picks[1].image = pick2Detail.image;
      picks.picks[1].url = pick2Detail.url;
    }

    recipePicks = picks;
  } catch (err) {
    console.error("AI recipe picks failed:", err);
    // recipePicks stays null — component will show a fallback
  }

  return { user, savedRecipes, nutritionProfile, allProfiles, inventoryItems, expiringSoonItems, recipePicks };
}

export async function action(args: Route.ActionArgs) {
  const userId = await getUserId(args.request);
  const formData = await args.request.formData();
  const actionType = formData.get("actionType") as string;

  // ── Surprise Me: regenerate picks with randomize=true ──────────────────────
  if (actionType === "surpriseMe") {
    const inventoryItems = db.prepare(`
      SELECT ing.ingredient_name
      FROM Inventory inv
      JOIN Ingredients ing ON inv.ingredient_id = ing.ingredient_id
      WHERE inv.user_id = ?
        AND (inv.expiration_date IS NULL OR DATE(inv.expiration_date) >= DATE('now'))
    `).all(userId) as Array<{ ingredient_name: string }>;

    const nutritionProfile = db.prepare(
      "SELECT caloriesLow, caloriesHigh, protein FROM NutritionProfile WHERE user_id = ? AND isActive = 1"
    ).get(userId) as { caloriesLow?: number; caloriesHigh?: number; protein?: number } | undefined;

    try {
      const ingredientNames = inventoryItems.map((i) => i.ingredient_name);
      const picks = await getAIRecipePicks(ingredientNames, nutritionProfile ?? null, true);

      const [featuredDetail, pick1Detail, pick2Detail] = await Promise.all([
        fetchEdamamRecipeDetail(picks.featured.name),
        fetchEdamamRecipeDetail(picks.picks[0]?.name ?? ""),
        fetchEdamamRecipeDetail(picks.picks[1]?.name ?? ""),
      ]);

      if (featuredDetail) { picks.featured.image = featuredDetail.image; picks.featured.url = featuredDetail.url; }
      if (pick1Detail && picks.picks[0]) { picks.picks[0].image = pick1Detail.image; picks.picks[0].url = pick1Detail.url; }
      if (pick2Detail && picks.picks[1]) { picks.picks[1].image = pick2Detail.image; picks.picks[1].url = pick2Detail.url; }

      return { recipePicks: picks };
    } catch (err) {
      console.error("Surprise Me failed:", err);
      return { recipePicks: null };
    }
  }

  // ── Default: switch nutrition profile ─────────────────────────────────────
  const profileId = parseInt(formData.get("profileId") as string);
  await switchProfile(userId, profileId);

  // Return the new profile immediately so the hub can update without a full re-fetch of AI data
  const newProfile = db.prepare(
    "SELECT * FROM NutritionProfile WHERE user_id = ? AND isActive = 1"
  ).get(userId) as NutritionProfile | undefined;
  return { success: true, newProfile };
}

export function shouldRevalidate({ actionResult, defaultShouldRevalidate }: any) {
  // If we just switched a profile, don't re-run the slow AI recipe generator.
  if (actionResult?.success && actionResult?.newProfile) {
    return false;
  }
  return defaultShouldRevalidate;
}

export default function DashboardRoute({ loaderData, actionData }: Route.ComponentProps) {
  // Prefer action data recipePicks (Surprise Me result) over loader data
  const fetcher = useFetcher();
  const recipePicks = (actionData as any)?.recipePicks ?? loaderData.recipePicks;
  
  // To truly only update the hub in-place, prefer fetcher's newProfile
  const activeProfile = fetcher.data?.newProfile ?? loaderData.nutritionProfile;

  return <Dashboard
    user={loaderData.user?.firstName || "User"}
    savedRecipes={(loaderData.savedRecipes || []) as unknown as SavedRecipe[]}
    nutritionProfile={activeProfile as NutritionProfile | null}
    allProfiles={(loaderData.allProfiles || []) as unknown as ProfileOption[]}
    inventoryItems={(loaderData.inventoryItems || []) as unknown as InventoryItem[]}
    expiringSoonItems={(loaderData.expiringSoonItems || []) as unknown as ExpiringItem[]}
    recipePicks={recipePicks}
  />;
}