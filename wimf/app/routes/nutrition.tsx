import type { Route } from "./+types/nutrition";
import { requireUserId, getUserId } from "~/session.server";
import { Nutrition } from "../pages/nutrition/nutrition";
import { handleUpdateNutrition } from "../middleware/NutritionService/nutritionController";
import { db } from "~/db/app";
import { useLoaderData } from "react-router";
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
  const userId = await getUserId(args.request);
  handleUpdateNutrition(args, userId);
}
export default function NutritionRoute() {
  return <Nutrition />;
} 