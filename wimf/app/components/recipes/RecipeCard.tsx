import { Form } from "react-router";

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
    yield: number;
    ingredientLines: string[];
    totalNutrients: {
      ENERC_KCAL: NutrientInfo;
      FAT: NutrientInfo;
      CHOCDF: NutrientInfo;
      PROCNT: NutrientInfo;
    };
  };
  currentRecipes?: any;
  searchIngredients?: string[];
}

export function RecipeCard({ recipe, currentRecipes, searchIngredients }: RecipeCardProps) {
  const servings = recipe.yield || 1;
  const caloriesPerServing = Math.round(recipe.totalNutrients.ENERC_KCAL.quantity / servings);
  const proteinPerServing = Math.round(recipe.totalNutrients.PROCNT.quantity / servings);
  const carbsPerServing = Math.round(recipe.totalNutrients.CHOCDF.quantity / servings);
  const fatPerServing = Math.round(recipe.totalNutrients.FAT.quantity / servings);

  return (
    <div className="rounded-lg overflow-hidden box-shadow-custom hover:shadow-xl transition bg-white/65 dark:bg-gray-800">
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.label}
          className="w-full h-48 object-cover"
        />
        <Form method="post">
          <input type="hidden" name="actionType" value="saveRecipe" />
          <input type="hidden" name="recipeName" value={recipe.label} />
          <input type="hidden" name="recipeUrl" value={recipe.url} />
          <input type="hidden" name="recipeImage" value={recipe.image} />
          <input type="hidden" name="servings" value={servings} />
          <input type="hidden" name="ingredients" value={JSON.stringify(recipe.ingredientLines)} />
          {currentRecipes && <input type="hidden" name="currentRecipes" value={JSON.stringify(currentRecipes)} />}
          {searchIngredients && <input type="hidden" name="searchIngredients" value={JSON.stringify(searchIngredients)} />}
          <button
            type="submit"
            className="absolute top-2 right-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition shadow-lg"
            title="Save recipe"
          >
            Save
          </button>
        </Form>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-700 dark:text-gray-100">
          {recipe.label}
        </h3>
        <p className="text-xs text-gray-500 mb-2">{servings} servings</p>

        <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-700 dark:text-gray-200">
          <div>Below are the nutritional information per serving</div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-700 dark:text-gray-200">
          <div>🔥 {caloriesPerServing} cal</div>
          <div>💪 {proteinPerServing}g protein</div>
          <div>🍞 {carbsPerServing}g carbs</div>
          <div>🥑 {fatPerServing}g fat</div>
        </div>

        <div className="mb-3">
          <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">
            Ingredients:
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-200 line-clamp-2">
            {recipe.ingredientLines.join(", ")}
          </p>
        </div>

        <a
          href={recipe.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full text-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition font-medium"
        >
          View Full Recipe →
        </a>
      </div>
    </div>
  );
}
