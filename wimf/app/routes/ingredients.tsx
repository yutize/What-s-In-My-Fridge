import type { Route } from "./+types/ingredients";
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