import { Form, useActionData } from "react-router";
import { useState, useCallback } from "react";
import { Navbar } from "~/components/navbar/navbar";
import { NutritionInput } from "~/components/nutrition/NutritionInput";
import { CheckboxOption } from "~/components/nutrition/CheckboxOption";
import { SectionCard } from "~/components/nutrition/SectionCard";
import { ChatPanel } from "~/components/nutrition/ChatPanel";
import type { NutritionProfile } from "~/types/nutrition";
import type { FormUpdates } from "~/services/chatService";

interface ActionData {
  success?: boolean;
  message?: string;
}

const ALLERGY_OPTIONS = [
  { value: "nuts", label: "Nuts" },
  { value: "shellfish", label: "Shellfish" },
  { value: "gluten", label: "Gluten" },
  { value: "dairy", label: "Dairy" },
  { value: "fish", label: "Fish" },
  { value: "sesame", label: "Sesame" },
  { value: "eggs", label: "Eggs" },
  { value: "soy", label: "Soy" },
  { value: "peanuts", label: "Peanuts" },
];

const DIET_OPTIONS = [
  { value: "vegetarian", label: "Vegetarian" },
  { value: "keto", label: "Keto" },
  { value: "kosher", label: "Kosher" },
  { value: "vegan", label: "Vegan" },
  { value: "paleo", label: "Paleo" },
  { value: "pork-free", label: "No Pork" },
  { value: "pescatarian", label: "Pescatarian" },
  { value: "Mediterranean", label: "Halal" },
  { value: "red-meat-free", label: "No Red Meat" },
];

export function Nutrition({
  nutritionProfile,
  chatHistory = [],
}: {
  nutritionProfile: NutritionProfile | null;
  chatHistory?: Array<{ role: string; content: string }>;
}) {
  const actionData = useActionData<ActionData>();

  let initAllergies: string[] = [];
  let initPreferences: string[] = [];
  try {
    if (nutritionProfile?.allergy && nutritionProfile.allergy !== "null") {
      initAllergies = JSON.parse(nutritionProfile.allergy);
    }
  } catch {}
  try {
    if (nutritionProfile?.preference && nutritionProfile.preference !== "null") {
      initPreferences = JSON.parse(nutritionProfile.preference);
    }
  } catch {}

  const [profileName, setProfileName] = useState(nutritionProfile?.profileName ?? "");
  const [caloriesLow, setCaloriesLow] = useState(nutritionProfile?.caloriesLow?.toString() ?? "");
  const [caloriesHigh, setCaloriesHigh] = useState(nutritionProfile?.caloriesHigh?.toString() ?? "");
  const [protein, setProtein] = useState(nutritionProfile?.protein?.toString() ?? "");
  const [carbs, setCarbs] = useState(nutritionProfile?.carbs?.toString() ?? "");
  const [fat, setFat] = useState(nutritionProfile?.fat?.toString() ?? "");
  const [allergies, setAllergies] = useState<string[]>(initAllergies);
  const [preferences, setPreferences] = useState<string[]>(initPreferences);

  // ─── Handle AI-triggered form updates ────────────────────────────────────
  const handleFormUpdate = useCallback((updates: FormUpdates) => {
    if (updates.profileName !== undefined) setProfileName(updates.profileName);
    if (updates.caloriesLow !== undefined) setCaloriesLow(updates.caloriesLow.toString());
    if (updates.caloriesHigh !== undefined) setCaloriesHigh(updates.caloriesHigh.toString());
    if (updates.protein !== undefined) setProtein(updates.protein.toString());
    if (updates.carbs !== undefined) setCarbs(updates.carbs.toString());
    if (updates.fat !== undefined) setFat(updates.fat.toString());
    if (updates.allergies !== undefined) setAllergies(updates.allergies);
    if (updates.preferences !== undefined) setPreferences(updates.preferences);
  }, []);

  const currentProfileSnapshot = {
    profileName,
    caloriesLow,
    caloriesHigh,
    protein,
    carbs,
    fat,
    allergies,
    preferences,
  };

  function toggleAllergy(value: string, checked: boolean) {
    setAllergies((prev) =>
      checked ? [...prev, value] : prev.filter((a) => a !== value)
    );
  }

  function togglePreference(value: string, checked: boolean) {
    setPreferences((prev) =>
      checked ? [...prev, value] : prev.filter((p) => p !== value)
    );
  }

  return (
    <>
      <Navbar />

      <main className="px-4 py-6 max-w-[1400px] mx-auto">
        {/* Full-width page header */}
        <div className="rounded-3xl p-8 mb-6 bg-white/65 dark:bg-gray-800 box-shadow-custom transition-colors duration-200">
          <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-100">
            My Nutrition Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Configure your nutrition goals manually or chat with the AI to set them up instantly.
          </p>
        </div>

        {/* Split-panel layout */}
        <div className="flex gap-6 items-stretch">
          {/* ── Left Panel: Nutrition Profile Form (60%) ── */}
          <div className="flex-[3] min-w-0">
            <Form method="post" className="space-y-5">
              {/* Hidden tracking fields */}
              {nutritionProfile && (
                <>
                  <input type="hidden" name="originalProfileId" value={nutritionProfile.nutrition_id} />
                  <input type="hidden" name="originalProfileName" value={nutritionProfile.profileName ?? ""} />
                </>
              )}
              {/* Serialize controlled allergy/preference arrays as hidden inputs */}
              <input type="hidden" name="allergiesJson" value={JSON.stringify(allergies)} />
              <input type="hidden" name="preferencesJson" value={JSON.stringify(preferences)} />

              {/* Profile Name */}
              <SectionCard
                title="My Nutrition Profile"
                subtitle="Set your daily goals and dietary preferences."
              >
                <div className="mb-1">
                  <label
                    htmlFor="profileName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                  >
                    Profile Name
                  </label>
                  <input
                    type="text"
                    id="profileName"
                    name="profileName"
                    placeholder="e.g., My Fitness Goals, Weight Loss Plan"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    💡 Tip: Set your daily goals and dietary preferences.
                  </p>
                </div>
              </SectionCard>

              {/* Daily Nutritional Goals */}
              <SectionCard
                title="Daily Meal Nutritional Goals"
                subtitle="Set your desired daily nutritional goal for each meal."
              >
                <div className="grid grid-cols-2 gap-4">
                  <NutritionInput
                    label="Desired Calories Minimum"
                    id="caloriesLow"
                    name="caloriesLow"
                    placeholder="e.g. 1800 kcal"
                    unit="kcal"
                    value={caloriesLow}
                    onChange={setCaloriesLow}
                  />
                  <NutritionInput
                    label="Desired Calories Maximum"
                    id="caloriesHigh"
                    name="caloriesHigh"
                    placeholder="e.g. 2200 kcal"
                    unit="kcal"
                    value={caloriesHigh}
                    onChange={setCaloriesHigh}
                  />
                  <NutritionInput
                    label="Protein"
                    id="protein"
                    name="protein"
                    placeholder="e.g. 150 g"
                    unit="g"
                    value={protein}
                    onChange={setProtein}
                  />
                  <NutritionInput
                    label="Carbohydrates"
                    id="carbs"
                    name="carbs"
                    placeholder="e.g. 100 g"
                    unit="g"
                    value={carbs}
                    onChange={setCarbs}
                  />
                  <NutritionInput
                    label="Fat"
                    id="fat"
                    name="fat"
                    placeholder="e.g. 60 g"
                    unit="g"
                    value={fat}
                    onChange={setFat}
                  />
                </div>
              </SectionCard>

              {/* Allergies & Intolerances */}
              <SectionCard
                title="Allergies & Intolerances"
                subtitle="Tell us about any of your allergies or food intolerances."
              >
                <div className="grid grid-cols-3 gap-3">
                  {ALLERGY_OPTIONS.map((opt) => (
                    <CheckboxOption
                      key={opt.value}
                      name="allergies"
                      value={opt.value}
                      label={opt.label}
                      checked={allergies.includes(opt.value)}
                      onChange={(chk) => toggleAllergy(opt.value, chk)}
                    />
                  ))}
                </div>
              </SectionCard>

              {/* Dietary Preferences */}
              <SectionCard
                title="Dietary Preferences"
                subtitle="Select any dietary preferences you follow."
              >
                <div className="grid grid-cols-3 gap-3">
                  {DIET_OPTIONS.map((opt) => (
                    <CheckboxOption
                      key={opt.value}
                      name="diet"
                      value={opt.value}
                      label={opt.label}
                      checked={preferences.includes(opt.value)}
                      onChange={(chk) => togglePreference(opt.value, chk)}
                    />
                  ))}
                </div>
              </SectionCard>

              {/* Submit */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  id="save-nutrition-btn"
                  className="flex-1 bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-300 font-medium transition-colors"
                >
                  Save Nutrition Profile
                </button>
                <button
                  type="button"
                  id="cancel-nutrition-btn"
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>

              {/* Success/error feedback */}
              {actionData?.success && (
                <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  <p className="font-medium">✓ Nutrition Profile Saved!</p>
                  <p className="text-sm">
                    {actionData.message ?? "Your nutritional preferences have been updated successfully."}
                  </p>
                </div>
              )}
              {actionData?.success === false && (
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  <p className="font-medium">✗ Save Failed</p>
                  <p className="text-sm">
                    {actionData.message ?? "Something went wrong. Please try again."}
                  </p>
                </div>
              )}
            </Form>
          </div>

          {/* ── Right Panel: AI Chatbot (40%) ── */}
          <div className="flex-[2] min-w-0 relative">
            <div className="absolute inset-0">
              <ChatPanel
                onFormUpdate={handleFormUpdate}
                currentProfile={currentProfileSnapshot}
                initialHistory={
                  chatHistory
                    .filter((m) => m.role === "user" || m.role === "model")
                    .map((m) => ({
                      role: m.role as "user" | "model",
                      content: m.content,
                    }))
                }
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
