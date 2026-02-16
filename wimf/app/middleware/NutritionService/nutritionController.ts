import type { ActionFunctionArgs } from "react-router";
import { db } from "../../db/app";

export async function handleUpdateNutrition(formData: FormData, userId: number) {
  const profileName = formData.get("profileName");
  const caloriesLow = formData.get("caloriesLow");
  const caloriesHigh = formData.get("caloriesHigh");
  const id = userId
  const protein = formData.get("protein");
  const carbs = formData.get("carbs");
  const fat = formData.get("fat");
  
  const allergies = formData.getAll("allergies");
  const diet = formData.getAll("diet");
  
  // Get original profile info to determine UPDATE vs INSERT
  const originalProfileId = formData.get("originalProfileId");
  const originalProfileName = formData.get("originalProfileName");

  console.log({
    id,
    profileName,
    originalProfileName,
    originalProfileId,
    caloriesLow,
    caloriesHigh,
    protein,
    carbs,
    fat,
    allergies,
    diet
  });

  // If we have an original profile and the name hasn't changed, UPDATE
  if (originalProfileId && profileName === originalProfileName) {
    db.prepare(`
      UPDATE NutritionProfile 
      SET caloriesLow = ?, caloriesHigh = ?, protein = ?, carbs = ?, fat = ?, allergy = ?, preference = ?
      WHERE nutrition_id = ? AND user_id = ?
    `).run(caloriesLow, caloriesHigh, protein, carbs, fat, JSON.stringify(allergies), JSON.stringify(diet), originalProfileId, id);
    
    return { success: true, message: 'Nutrition profile updated successfully!' };
  } else {
    // Name changed or new profile - INSERT as new profile
    // Deactivate all profiles for this user
    db.prepare(`UPDATE NutritionProfile SET isActive = 0 WHERE user_id = ?`).run(id);
    
    // Insert new profile as active
    db.prepare(`
      INSERT INTO NutritionProfile (user_id, profileName, caloriesLow, caloriesHigh, protein, carbs, fat, allergy, preference, isActive)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
    `).run(id, profileName, caloriesLow, caloriesHigh, protein, carbs, fat, JSON.stringify(allergies), JSON.stringify(diet));
    
    return { success: true, message: 'New nutrition profile created successfully!' };
  }
}

export async function switchProfile(userId: number, profileId: number) {
  // Deactivate all profiles
  db.prepare(`UPDATE NutritionProfile SET isActive = 0 WHERE user_id = ?`).run(userId);
  // Activate selected profile
  db.prepare(`UPDATE NutritionProfile SET isActive = 1 WHERE nutrition_id = ? AND user_id = ?`).run(profileId, userId);
  return { success: true };
}
