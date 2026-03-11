import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface SavedRecipe {
  label: string;
  image: string;
  url: string;
  ingredientLines: string[];
  totalNutrients: {
    ENERC_KCAL: { label: string; quantity: number; unit: string };
    FAT: { label: string; quantity: number; unit: string };
    CHOCDF: { label: string; quantity: number; unit: string };
    PROCNT: { label: string; quantity: number; unit: string };
  };
}

interface MealPlanContextType {
  savedRecipes: SavedRecipe[];
  addRecipe: (recipe: SavedRecipe) => void;
  removeRecipe: (recipeLabel: string) => void;
  isRecipeSaved: (recipeLabel: string) => boolean;
}

const MealPlanContext = createContext<MealPlanContextType | undefined>(undefined);

export function MealPlanProvider({ children }: { children: ReactNode }) {
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);

  // Load saved recipes from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("mealPlanRecipes");
    if (saved) {
      try {
        setSavedRecipes(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved recipes:", e);
      }
    }
  }, []);

  // Save recipes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("mealPlanRecipes", JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  const addRecipe = (recipe: SavedRecipe) => {
    setSavedRecipes((prev) => {
      // Prevent duplicates
      if (prev.some((r) => r.label === recipe.label)) {
        return prev;
      }
      return [...prev, recipe];
    });
  };

  const removeRecipe = (recipeLabel: string) => {
    setSavedRecipes((prev) => prev.filter((r) => r.label !== recipeLabel));
  };

  const isRecipeSaved = (recipeLabel: string) => {
    return savedRecipes.some((r) => r.label === recipeLabel);
  };

  return (
    <MealPlanContext.Provider value={{ savedRecipes, addRecipe, removeRecipe, isRecipeSaved }}>
      {children}
    </MealPlanContext.Provider>
  );
}

export function useMealPlan() {
  const context = useContext(MealPlanContext);
  if (context === undefined) {
    throw new Error("useMealPlan must be used within a MealPlanProvider");
  }
  return context;
}
