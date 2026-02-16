import type { Route } from "./+types/nutrition";
import { requireUserId, getUserId } from "~/session.server";
import { Nutrition } from "../pages/nutrition/nutrition";
import { handleUpdateNutrition } from "../middleware/NutritionService/nutritionController";
import { db } from "~/db/app.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nutrition" },
    { name: "nutrition", content: "Nutrition page." },
  ];
}
export async function loader({ request }: Route.LoaderArgs) {
  await requireUserId(request);
  const userId = await getUserId(request);
  
  // Fetch existing nutrition profile for the user
  const nutritionProfile = db.prepare(
    "SELECT * FROM NutritionProfile WHERE user_id = ? ORDER BY nutrition_id DESC LIMIT 1"
  ).get(userId);
  
  return { nutritionProfile };
}

export async function action(args: Route.ActionArgs) {
  const userId = await getUserId(args.request);
  const formData = await args.request.formData();
  return handleUpdateNutrition(formData, userId);
}
export default function NutritionRoute({ loaderData }: Route.ComponentProps) {
  return <Nutrition nutritionProfile={loaderData.nutritionProfile || null} />;
} 