import type { ActionFunctionArgs } from "react-router";
import { db } from "../../db/app";

export async function handleUpdateNutrition({ request }: ActionFunctionArgs, userId: number) {
  const formData = await request.formData();
  const caloriesLow = formData.get("caloriesLow");
  const caloriesHigh = formData.get("caloriesHigh");
  const id = userId
  const protein = formData.get("protein");
  const carbs = formData.get("carbs");
  const fat = formData.get("fat");
  
  const allergies = formData.getAll("allergies");
  
  const diet = formData.getAll("diet");

  console.log({
    id,
    caloriesLow,
    caloriesHigh,
    protein,
    carbs,
    fat,
    allergies,
    diet
  });

  db.prepare(`
    INSERT INTO NutritionProfile (user_id, caloriesLow, caloriesHigh, protein, carbs, fat, allergy, preference)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, caloriesLow, caloriesHigh, protein, carbs, fat, JSON.stringify(allergies), JSON.stringify(diet));
  }
