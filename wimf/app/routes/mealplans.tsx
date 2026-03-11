import { type MetaFunction } from "react-router";
import MealPlans from "../pages/mealplans/mealplans";

export const meta: MetaFunction = () => {
  return [
    { title: "My Meal Plans | What's In Your Fridge" },
    {
      name: "description",
      content: "View and manage your saved recipes and meal plans.",
    },
  ];
};

export default function MealPlansRoute() {
  return <MealPlans />;
}
