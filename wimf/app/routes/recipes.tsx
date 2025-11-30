import type { Route } from "./+types/dashboard";
import { Recipes } from "../pages/recipes/recipes";
import { requireUserId, getUserId } from "~/session.server";
import { db } from "~/db/app";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Recipes" },
    { name: "dashboard", content: "Recipes page." },
  ];
}
export async function loader({ request }: Route.LoaderArgs) {
  await requireUserId(request);

}

export default function DashboardRoute() {
  return <Recipes />;
}