import { useState } from "react";
import { Toast } from "../Toast";
import { useMealPlan } from "../../context/MealPlanContext";

interface NutrientInfo {
  label: string;
  quantity: number;
  unit: string;
}

interface RecipeCardProps {
  recipe: {
    label: string;
    image: string;
    url: string;
    ingredientLines: string[];
    totalNutrients: {
      ENERC_KCAL: NutrientInfo;
      FAT: NutrientInfo;
      CHOCDF: NutrientInfo;
      PROCNT: NutrientInfo;
    };
  };
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const [showToast, setShowToast] = useState(false);
  const { addRecipe, isRecipeSaved } = useMealPlan();

  const handleAddToMealPlan = () => {
    addRecipe({
      label: recipe.label,
      image: recipe.image,
      url: recipe.url,
      ingredientLines: recipe.ingredientLines,
      totalNutrients: recipe.totalNutrients,
    });
    setShowToast(true);
  };

  const isSaved = isRecipeSaved(recipe.label);

  return (
    <div className="rounded-3xl overflow-hidden box-shadow-custom hover:shadow-xl transition-colors duration-200 bg-white/65 dark:bg-gray-700 flex flex-col h-full">
      {/* Recipe Image */}
      <img
        src={recipe.image}
        alt={recipe.label}
        className="w-full h-48 object-cover"
      />

      {/* Recipe Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg mb-2 text-gray-700 dark:text-gray-100 line-clamp-2">
          {recipe.label}
        </h3>

        {/* Nutrition Info */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-700 dark:text-gray-200">
          <div>🔥 {Math.round(recipe.totalNutrients.ENERC_KCAL.quantity)} cal</div>
          <div>💪 {Math.round(recipe.totalNutrients.PROCNT.quantity)}g protein</div>
          <div>🍞 {Math.round(recipe.totalNutrients.CHOCDF.quantity)}g carbs</div>
          <div>🥑 {Math.round(recipe.totalNutrients.FAT.quantity)}g fat</div>
        </div>

        {/* Ingredients Preview */}
        <div className="mb-3">
          <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">
            Ingredients:
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-200 line-clamp-2">
            {recipe.ingredientLines.join(", ")}
          </p>
        </div>

        {/* View Recipe Link */}
        <div className="flex gap-2 mt-auto">
          <a
            href={recipe.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition font-medium"
          >
            View Full →
          </a>
          <button
            onClick={handleAddToMealPlan}
            disabled={isSaved}
            className={`flex-1 px-4 py-2 rounded-lg transition font-medium ${
              isSaved
                ? "bg-gray-400 cursor-not-allowed text-gray-700"
                : "bg-emerald-600 hover:bg-emerald-700 text-white"
            }`}
          >
            {isSaved ? "✓ Saved" : "Add to Plan"}
          </button>
        </div>

        {showToast && (
          <Toast
            message="Recipe Saved!"
            onDismiss={() => setShowToast(false)}
          />
        )}
      </div>
    </div>
  );
}
