import { db } from "../../db/app.server";

export async function handleUpdateNutrition(formData: FormData, userId: number) {
  const profileName = formData.get("profileName") as string | null;
  
  const sanitize = (val: FormDataEntryValue | null) => {
    if (!val || typeof val !== "string" || val.trim() === "") return null;
    return parseInt(val, 10);
  };

  const caloriesLow = sanitize(formData.get("caloriesLow"));
  const caloriesHigh = sanitize(formData.get("caloriesHigh"));
  const protein = sanitize(formData.get("protein"));
  const carbs = sanitize(formData.get("carbs"));
  const fat = sanitize(formData.get("fat"));
  const id = userId;


  let allergies: string[];
  let diet: string[];

  const allergiesJson = formData.get("allergiesJson");
  const preferencesJson = formData.get("preferencesJson");

  if (allergiesJson) {
    try { allergies = JSON.parse(allergiesJson as string); } catch { allergies = []; }
  } else {
    allergies = formData.getAll("allergies") as string[];
  }

  if (preferencesJson) {
    try { diet = JSON.parse(preferencesJson as string); } catch { diet = []; }
  } else {
    diet = formData.getAll("diet") as string[];
  }

  const originalProfileId = formData.get("originalProfileId");
  const originalProfileName = formData.get("originalProfileName");

  console.log({
    id, profileName, originalProfileName, originalProfileId,
    caloriesLow, caloriesHigh, protein, carbs, fat, allergies, diet,
  });

  if (originalProfileId && profileName === originalProfileName) {
    db.prepare(`
      UPDATE NutritionProfile 
      SET caloriesLow = ?, caloriesHigh = ?, protein = ?, carbs = ?, fat = ?, allergy = ?, preference = ?
      WHERE nutrition_id = ? AND user_id = ?
    `).run(
      caloriesLow, caloriesHigh, protein, carbs, fat,
      JSON.stringify(allergies), JSON.stringify(diet),
      originalProfileId, id
    );
    return { success: true, message: "Nutrition profile updated successfully!" };
  } else {
    db.prepare(`UPDATE NutritionProfile SET isActive = 0 WHERE user_id = ?`).run(id);
    db.prepare(`
      INSERT INTO NutritionProfile (user_id, profileName, caloriesLow, caloriesHigh, protein, carbs, fat, allergy, preference, isActive)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
    `).run(
      id, profileName, caloriesLow, caloriesHigh, protein, carbs, fat,
      JSON.stringify(allergies), JSON.stringify(diet)
    );
    return { success: true, message: "New nutrition profile created successfully!" };
  }
}

export async function switchProfile(userId: number, profileId: number) {
  db.prepare(`UPDATE NutritionProfile SET isActive = 0 WHERE user_id = ?`).run(userId);
  db.prepare(`UPDATE NutritionProfile SET isActive = 1 WHERE nutrition_id = ? AND user_id = ?`).run(profileId, userId);
  return { success: true };
}
