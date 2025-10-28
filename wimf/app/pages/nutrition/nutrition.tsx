import { Form } from "react-router";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import { Navbar } from "~/components/navbar/navbar";
import { NutritionInput } from "~/components/nutrition/NutritionInput";
import { CheckboxOption } from "~/components/nutrition/CheckboxOption";
import { SectionCard } from "~/components/nutrition/SectionCard";

export function Nutrition() {
  return (
    <>
      <Navbar />

      <main className="flex flex-col items-center px-6 py-8 gap-6 max-w-[1000px] mx-auto">
        {/* Header */}
        <div className="w-full">
          <div className="rounded-3xl border border-gray-200 p-8 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">My Nutrition Profile</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
              Set your daily goals and dietary preferences
            </p>
          </div>
        </div>

        <Form method="post" className="w-full space-y-6">
          {/* Daily Nutritional Goals */}
          <SectionCard title="Daily Nutritional Goals">
            <div className="grid grid-cols-2 gap-6">
              <NutritionInput
                label="Daily Calories"
                id="calories"
                name="calories"
                placeholder="2000"
                unit="kcal"
              />
              <NutritionInput
                label="Protein"
                id="protein"
                name="protein"
                placeholder="150"
                unit="g"
              />
              <NutritionInput
                label="Carbohydrates"
                id="carbs"
                name="carbs"
                placeholder="200"
                unit="g"
              />
              <NutritionInput
                label="Fat"
                id="fat"
                name="fat"
                placeholder="65"
                unit="g"
              />
            </div>
          </SectionCard>

          {/* Allergies & Intolerances */}
          <SectionCard title="Allergies & Intolerances">
            <div className="grid grid-cols-3 gap-4">
              <CheckboxOption name="allergies" value="nuts" label="Nuts" />
              <CheckboxOption name="allergies" value="dairy" label="Dairy" />
              <CheckboxOption name="allergies" value="eggs" label="Eggs" />
              <CheckboxOption name="allergies" value="shellfish" label="Shellfish" />
              <CheckboxOption name="allergies" value="fish" label="Fish" />
              <CheckboxOption name="allergies" value="soy" label="Soy" />
              <CheckboxOption name="allergies" value="gluten" label="Gluten" />
              <CheckboxOption name="allergies" value="sesame" label="Sesame" />
              <CheckboxOption name="allergies" value="lactose" label="Lactose" />
            </div>
          </SectionCard>

          {/* Dietary Preferences */}
          <SectionCard title="Dietary Preferences">
            <div className="grid grid-cols-3 gap-4">
              <CheckboxOption name="diet" value="vegetarian" label="Vegetarian" />
              <CheckboxOption name="diet" value="vegan" label="Vegan" />
              <CheckboxOption name="diet" value="pescatarian" label="Pescatarian" />
              <CheckboxOption name="diet" value="keto" label="Keto" />
              <CheckboxOption name="diet" value="paleo" label="Paleo" />
              <CheckboxOption name="diet" value="lowcarb" label="Low Carb" />
              <CheckboxOption name="diet" value="halal" label="Halal" />
              <CheckboxOption name="diet" value="kosher" label="Kosher" />
              <CheckboxOption name="diet" value="whole30" label="Whole30" />
            </div>
          </SectionCard>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium transition-colors"
            >
              Save Nutrition Profile
            </button>
            <button
              type="button"
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </Form>
      </main>
    </>
  );
};
