import { Form, useActionData } from "react-router";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import { Navbar } from "~/components/navbar/navbar";
import { NutritionInput } from "~/components/nutrition/NutritionInput";
import { CheckboxOption } from "~/components/nutrition/CheckboxOption";
import { SectionCard } from "~/components/nutrition/SectionCard";
import type { NutritionProfile } from "~/types/nutrition";

interface ActionData {
  success?: boolean;
  message?: string;
}

export function Nutrition({ nutritionProfile }: { nutritionProfile: NutritionProfile | null }) {
  const actionData = useActionData<ActionData>();
  
  // Parse allergies and preferences if they exist
  const allergies = nutritionProfile?.allergy ? JSON.parse(nutritionProfile.allergy) : [];
  const preferences = nutritionProfile?.preference ? JSON.parse(nutritionProfile.preference) : [];
  return (
    <>
      <Navbar />

      <main className="flex flex-col items-center px-6 py-8 gap-10 max-w-[1000px] mx-auto">
        {/* Header */}
        <div className="w-full">
          <div className="rounded-3xl p-12 dark:border-gray-700 bg-white/65 dark:bg-white/65 box-shadow-custom">
            <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-700">My Nutrition Profile</h1>
            <p className="text-lg text-gray-700 dark:text-gray-700 mt-2">
              Set your daily goals and dietary preferences
            </p>
          </div>
        </div>


        <Form method="post" className="w-full space-y-6">
          {/* Daily Nutritional Goals */}
          <SectionCard title="Daily Meal Nutritional Goals" subtitle="Set your desired daily nutritional goal for each a meal.">
            <div className="grid grid-cols-2 gap-6">
              <NutritionInput
                label="Desired Calories Minimum"
                id="caloriesLow"
                name="caloriesLow"
                placeholder="Minimum amount of calories."
                unit="kcal"
                defaultValue={nutritionProfile?.caloriesLow?.toString()}
              />
              <NutritionInput
                label="Desired Calories Maximum"
                id="caloriesHigh"
                name="caloriesHigh"
                placeholder="Maximum amount of calories."
                unit="kcal"
                defaultValue={nutritionProfile?.caloriesHigh?.toString()}
              />
              <NutritionInput
                label="Protein"
                id="protein"
                name="protein"
                placeholder="35"
                unit="g"
                defaultValue={nutritionProfile?.protein?.toString()}
              />
              <NutritionInput
                label="Carbohydrates"
                id="carbs"
                name="carbs"
                placeholder="40"
                unit="g"
                defaultValue={nutritionProfile?.carbs?.toString()}
              />
              <NutritionInput
                label="Fat"
                id="fat"
                name="fat"
                placeholder="10"
                unit="g"
                defaultValue={nutritionProfile?.fat?.toString()}
              />
            </div>
          </SectionCard>

          {/* Allergies & Intolerances */}
          <SectionCard title="Allergies & Intolerances" subtitle="Tell us about any of your allergies or food intolerances.">
            <div className="grid grid-cols-3 gap-4">
              <CheckboxOption name="allergies" value="nuts" label="Nuts" defaultChecked={allergies.includes("nuts")} />
              <CheckboxOption name="allergies" value="dairy" label="Dairy" defaultChecked={allergies.includes("dairy")} />
              <CheckboxOption name="allergies" value="eggs" label="Eggs" defaultChecked={allergies.includes("eggs")} />
              <CheckboxOption name="allergies" value="shellfish" label="Shellfish" defaultChecked={allergies.includes("shellfish")} />
              <CheckboxOption name="allergies" value="fish" label="Fish" defaultChecked={allergies.includes("fish")} />
              <CheckboxOption name="allergies" value="soy" label="Soy" defaultChecked={allergies.includes("soy")} />
              <CheckboxOption name="allergies" value="gluten" label="Gluten" defaultChecked={allergies.includes("gluten")} />
              <CheckboxOption name="allergies" value="sesame" label="Sesame" defaultChecked={allergies.includes("sesame")} />
              <CheckboxOption name="allergies" value="peanuts" label="Peanuts" defaultChecked={allergies.includes("peanuts")} />
            </div>
          </SectionCard>

          {/* Dietary Preferences */}
          <SectionCard title="Dietary Preferences" subtitle="Select any dietary preferences you follow.">
            <div className="grid grid-cols-3 gap-4">
              <CheckboxOption name="diet" value="vegetarian" label="Vegetarian" defaultChecked={preferences.includes("vegetarian")} />
              <CheckboxOption name="diet" value="vegan" label="Vegan" defaultChecked={preferences.includes("vegan")} />
              <CheckboxOption name="diet" value="pescatarian" label="Pescatarian" defaultChecked={preferences.includes("pescatarian")} />
              <CheckboxOption name="diet" value="keto" label="Keto" defaultChecked={preferences.includes("keto")} />
              <CheckboxOption name="diet" value="paleo" label="Paleo" defaultChecked={preferences.includes("paleo")} />
              <CheckboxOption name="diet" value="Mediterranean" label="Halal" defaultChecked={preferences.includes("Mediterranean")} />
              <CheckboxOption name="diet" value="kosher" label="Kosher" defaultChecked={preferences.includes("kosher")} />
              <CheckboxOption name="diet" value="pork-free" label="No Pork" defaultChecked={preferences.includes("pork-free")} />
              <CheckboxOption name="diet" value="red-meat-free" label="No Red Meat" defaultChecked={preferences.includes("red-meat-free")} />
            </div>
          </SectionCard>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium transition-colors"
            >
              Save Nutrition Profile
            </button>
            <button
              type="button"
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>

          {/* Success Alert */}
          {actionData?.success && (
            <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              <p className="font-medium">✓ Nutrition Profile Saved!</p>
              <p className="text-sm">{actionData.message || 'Your nutritional preferences have been updated successfully.'}</p>
            </div>
          )}
        </Form>
      </main>
    </>
  );
};
