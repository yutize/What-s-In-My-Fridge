import type { Route } from "./+types/dashboard";
import { requireUserId, getUserId } from "~/session.server";
import { Nutrition } from "../pages/nutrition/nutrition";
import { db } from "~/db/app";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nutrition" },
    { name: "nutrition", content: "Nutrition page." },
  ];
}
export async function loader({ request }: Route.LoaderArgs) {
  await requireUserId(request);

}

export default function NutritionRoute() {
  return <Nutrition />;
} 