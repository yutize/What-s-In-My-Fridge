import { Form, useActionData } from "react-router";
import { useState, useCallback } from "react";
import { Navbar } from "~/components/navbar/navbar";
import { NutritionInput } from "~/components/nutrition/NutritionInput";
import { CheckboxOption } from "~/components/nutrition/CheckboxOption";
import { SectionCard } from "~/components/nutrition/SectionCard";
import { ChatPanel } from "~/components/nutrition/ChatPanel";
import type { NutritionProfile } from "~/types/nutrition";
import type { FormUpdates } from "~/services/chatService";
import { ThemeToggle } from "~/components/ThemeToggle";

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
  } catch { }
  try {
    if (nutritionProfile?.preference && nutritionProfile.preference !== "null") {
      initPreferences = JSON.parse(nutritionProfile.preference);
    }
  } catch { }

  const [profileName, setProfileName] = useState(nutritionProfile?.profileName ?? "");
  const [caloriesLow, setCaloriesLow] = useState(nutritionProfile?.caloriesLow?.toString() ?? "");
  const [caloriesHigh, setCaloriesHigh] = useState(nutritionProfile?.caloriesHigh?.toString() ?? "");
  const [protein, setProtein] = useState(nutritionProfile?.protein?.toString() ?? "");
  const [carbs, setCarbs] = useState(nutritionProfile?.carbs?.toString() ?? "");
  const [fat, setFat] = useState(nutritionProfile?.fat?.toString() ?? "");
  const [allergies, setAllergies] = useState<string[]>(initAllergies);
  const [preferences, setPreferences] = useState<string[]>(initPreferences);

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
    <div className="bg-surface text-on-surface min-h-[100vh]">
      
      <header className="bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur-xl fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 transition-all duration-300">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-serif italic text-emerald-900 dark:text-emerald-100">
            What's In My Fridge
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="/savedRecipes"
            className="hidden md:flex items-center gap-2 px-4 py-2 text-primary font-semibold hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition-all duration-300 rounded-xl text-sm"
          >
            <span className="material-symbols-outlined text-[20px]">bookmark</span>
            Saved Recipes
          </a>
          <ThemeToggle />
        </div>
      </header>

      <aside className="h-screen w-64 fixed left-0 top-0 hidden md:flex flex-col bg-stone-50 dark:bg-stone-950 pt-20 px-4">
        <nav className="flex flex-col gap-2">
          <a
            className="text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 rounded-xl mx-2 flex items-center gap-4 px-4 py-3 transition-transform duration-200 hover:translate-x-1"
            href="/dashboard"
          >
            <span className="material-symbols-outlined">explore</span>
            <span className="font-label text-sm font-medium uppercase tracking-wider">
              Discover
            </span>
          </a>
          <a
            className="text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 rounded-xl mx-2 flex items-center gap-4 px-4 py-3 transition-transform duration-200 hover:translate-x-1"
            href="/ingredients"
          >
            <span className="material-symbols-outlined">restaurant</span>
            <span className="font-label text-sm font-medium uppercase tracking-wider">
              My Kitchen
            </span>
          </a>

          <a
            className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-100 rounded-xl mx-2 flex items-center gap-4 px-4 py-3 transition-transform duration-200 hover:translate-x-1"
            href="/nutrition"
          >
            <span className="material-symbols-outlined">person</span>
            <span className="font-label text-sm font-medium uppercase tracking-wider">
              Profile
            </span>
          </a>
          <a
            className="text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 rounded-xl mx-2 flex items-center gap-4 px-4 py-3 transition-transform duration-200 hover:translate-x-1"
            href="/logout"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label text-sm font-medium uppercase tracking-wider">
              Sign Out
            </span>
          </a>
        </nav>
        <div className="mt-auto pb-8 px-4">
          <a
            href="/recipes"
            className="w-full bg-primary text-on-primary py-3 rounded-xl flex items-center justify-center gap-2 font-label font-bold text-sm tracking-widest hover:brightness-110 transition-all shadow-lg shadow-primary/20 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            <span>NEW RECIPE</span>
          </a>
        </div>
      </aside>

      <main className="pt-24 pb-24 md:pb-20 md:pl-64 px-4 md:pr-8 mx-auto max-w-7xl min-h-screen lg:grid lg:grid-cols-12 lg:gap-12">
        
        <div className="lg:col-span-6 space-y-12">
          
          <header className="space-y-4">
            <h1 className="text-5xl md:text-6xl text-on-surface font-headline italic tracking-tight">My Nutrition Profile</h1>
            <p className="text-on-surface-variant max-w-2xl font-body leading-relaxed">Tailor your culinary experience by defining your nutritional boundaries and health goals. This data informs our AI recipe generation.</p>
          </header>

          <Form method="post" className="space-y-8">
            <input type="hidden" name="originalProfileId" value={nutritionProfile?.nutrition_id || ""} />
            <input type="hidden" name="originalProfileName" value={nutritionProfile?.profileName ?? ""} />
            <input type="hidden" name="allergiesJson" value={JSON.stringify(allergies)} />
            <input type="hidden" name="preferencesJson" value={JSON.stringify(preferences)} />

            <div className="bg-surface-container-low p-8 rounded-xl space-y-4">
              <label className="block text-xs font-bold uppercase tracking-widest text-primary font-label">Profile Name</label>
              <input
                name="profileName"
                className="w-full bg-surface-container-lowest border-none rounded-lg p-4 text-xl font-headline focus:ring-2 focus:ring-primary/20 text-on-surface placeholder-outline-variant outline-none"
                type="text"
                placeholder="High Protein Profile"
                value={profileName}
                onChange={e => setProfileName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-6">
              <div className="flex items-end justify-between">
                <h2 className="text-3xl font-headline text-on-surface">Daily Meal Nutritional Goals</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="bg-surface-container-low p-6 rounded-xl border-l-4 border-primary">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4 font-label">Calories (kcal)</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <span className="text-[10px] uppercase text-outline font-bold">Min</span>
                      <input name="caloriesLow" value={caloriesLow} onChange={e => setCaloriesLow(e.target.value)} type="number" className="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 p-2 font-headline text-2xl outline-none" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] uppercase text-outline font-bold">Max</span>
                      <input name="caloriesHigh" value={caloriesHigh} onChange={e => setCaloriesHigh(e.target.value)} type="number" className="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 p-2 font-headline text-2xl outline-none" />
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-low p-6 rounded-xl border-l-4 border-secondary">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4 font-label">Protein (g)</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <span className="text-[10px] uppercase text-outline font-bold">Min</span>
                      
                      <input name="protein" value={protein} onChange={e => setProtein(e.target.value)} type="number" className="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 p-2 font-headline text-2xl outline-none" />
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-low p-6 rounded-xl border-l-4 border-tertiary">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4 font-label">Carbs (g)</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <span className="text-[10px] uppercase text-outline font-bold">Max Limit</span>
                      <input name="carbs" value={carbs} onChange={e => setCarbs(e.target.value)} type="number" className="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 p-2 font-headline text-2xl outline-none" />
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-low p-6 rounded-xl border-l-4 border-outline">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4 font-label">Fat (g)</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <span className="text-[10px] uppercase text-outline font-bold">Max Limit</span>
                      <input name="fat" value={fat} onChange={e => setFat(e.target.value)} type="number" className="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 p-2 font-headline text-2xl outline-none" />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              <div className="space-y-6">
                <h2 className="text-2xl font-headline text-on-surface">Allergies & Intolerances</h2>
                <div className="flex flex-wrap gap-3">
                  {ALLERGY_OPTIONS.map(opt => {
                    const isChecked = allergies.includes(opt.value);
                    return (
                      <label key={opt.value} className="group cursor-pointer">
                        <input className="hidden peer" type="checkbox" checked={isChecked} onChange={(e) => toggleAllergy(opt.value, e.target.checked)} />
                        <span className="px-6 py-2 rounded-full border border-outline-variant peer-checked:bg-secondary-container peer-checked:border-secondary-container peer-checked:text-on-secondary-container text-sm font-label transition-all flex items-center gap-2">
                          {isChecked && <span className="material-symbols-outlined text-sm">priority_high</span>}
                          {opt.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-headline text-on-surface">Dietary Preferences</h2>
                <div className="flex flex-wrap gap-3">
                  {DIET_OPTIONS.map(opt => {
                    const isChecked = preferences.includes(opt.value);
                    return (
                      <label key={opt.value} className="group cursor-pointer">
                        <input className="hidden peer" type="checkbox" checked={isChecked} onChange={(e) => togglePreference(opt.value, e.target.checked)} />
                        <span className="px-6 py-2 rounded-full border border-outline-variant peer-checked:bg-primary-container peer-checked:border-primary-container peer-checked:text-on-primary-container text-sm font-label transition-all flex items-center gap-2">
                          {isChecked && <span className="material-symbols-outlined text-sm">check</span>}
                          {opt.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

            </div>

            <div className="flex items-center gap-4 pt-8">
              <button type="submit" className="bg-primary text-on-primary px-10 py-4 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-primary-dim transition-all shadow-lg shadow-primary/10">
                Save Nutrition Profile
              </button>
              <button type="button" className="bg-surface-container-high text-on-surface px-10 py-4 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-surface-container-highest transition-all">
                Cancel
              </button>
            </div>

            {actionData?.success && (
              <div className="p-4 bg-tertiary-container text-on-tertiary-container rounded-xl font-body">
                <p className="font-bold tracking-widest uppercase text-xs">✓ Nutrition Profile Saved!</p>
                <p className="text-sm mt-1">{actionData.message ?? "Your nutritional preferences have been updated successfully."}</p>
              </div>
            )}
            {actionData?.success === false && (
              <div className="p-4 bg-error-container text-on-error-container rounded-xl font-body">
                <p className="font-bold tracking-widest uppercase text-xs">✗ Save Failed</p>
                <p className="text-sm mt-1">{actionData.message ?? "Something went wrong. Please try again."}</p>
              </div>
            )}

          </Form>
        </div>

        <aside className="lg:col-span-6 mt-12 lg:mt-0 relative">
          <div className="sticky top-24 bg-surface-container-lowest rounded-xl p-6 shadow-xl shadow-on-surface/5 border border-outline-variant/10 flex flex-col h-[calc(100vh-8rem)] min-h-[600px] max-h-[1000px] overflow-hidden">

            <div className="flex items-center space-x-3 mb-6 shrink-0">
              <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">auto_awesome</span>
              </div>
              <div>
                <h3 className="font-headline text-xl leading-none">AI Nutrition Assistant</h3>
                <span className="text-[10px] uppercase font-bold tracking-tighter text-outline-variant">Powered by Gastronomist AI</span>
              </div>
            </div>

            <div className="flex-1 min-h-0 relative -mx-4 px-4 overflow-hidden">
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
        </aside>

      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-stone-50/90 backdrop-blur-xl flex items-center justify-around px-6 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <a href="/dashboard" className="text-stone-500 flex flex-col items-center gap-0.5">
          <span className="material-symbols-outlined">explore</span>
          <span className="text-[9px] font-label font-bold uppercase tracking-tighter">
            Discover
          </span>
        </a>
        <a href="/ingredients" className="text-stone-500 flex flex-col items-center gap-0.5">
          <span className="material-symbols-outlined">restaurant</span>
          <span className="text-[9px] font-label font-bold uppercase tracking-tighter">
            Kitchen
          </span>
        </a>

        <a
          href="/nutrition"
          className="bg-primary text-white p-3 rounded-full -translate-y-4 shadow-lg shadow-primary/40 ring-4 ring-background flex flex-col items-center gap-0.5"
        >
          <span className="material-symbols-outlined">person</span>
        </a>
      </nav>
    </div>
  );
}
