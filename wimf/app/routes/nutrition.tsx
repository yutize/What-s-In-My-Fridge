import type { Route } from "./+types/nutrition";
import { requireUserId, getUserId } from "~/session.server";
import { Nutrition } from "../pages/nutrition/nutrition";
import { handleUpdateNutrition } from "../middleware/NutritionService/nutritionController";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nutrition" },
    { name: "nutrition", content: "Nutrition page." },
  ];
}
export async function loader({ request }: Route.LoaderArgs) {
  await requireUserId(request);
}

export async function action(args: Route.ActionArgs) {
  handleUpdateNutrition(args);
}
export default function NutritionRoute() {
  return <Nutrition />;
} 