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
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const servings = recipe.yield || 1;
  const caloriesPerServing = Math.round(recipe.totalNutrients.ENERC_KCAL.quantity / servings);
  const proteinPerServing = Math.round(recipe.totalNutrients.PROCNT.quantity / servings);
  const carbsPerServing = Math.round(recipe.totalNutrients.CHOCDF.quantity / servings);
  const fatPerServing = Math.round(recipe.totalNutrients.FAT.quantity / servings);

  return (
    <div className="rounded-lg overflow-hidden box-shadow-custom hover:shadow-xl transition bg-white/65 dark:bg-white/65">
      {/* Recipe Image with Save Button */}
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
          <button
            type="submit"
            className="absolute top-2 right-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition shadow-lg"
            title="Save recipe"
          >
            Save
          </button>
        </Form>
      </div>

      {/* Recipe Info */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-700 dark:text-gray-700">
          {recipe.label}
        </h3>
        <p className="text-xs text-gray-500 mb-2">{servings} servings</p>

{/* Warning */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-700 dark:text-gray-700">
          <div>Below are the nutritional information per serving</div>
        </div>

        {/* Nutrition Info - Per Serving */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-700 dark:text-gray-700">
          <div>🔥 {caloriesPerServing} cal</div>
          <div>💪 {proteinPerServing}g protein</div>
          <div>🍞 {carbsPerServing}g carbs</div>
          <div>🥑 {fatPerServing}g fat</div>
        </div>

        {/* Ingredients Preview */}
        <div className="mb-3">
          <p className="text-xs text-gray-700 dark:text-gray-700 mb-1">
            Ingredients:
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-700 line-clamp-2">
            {recipe.ingredientLines.join(", ")}
          </p>
        </div>

        {/* View Recipe Link */}
        <a
          href={recipe.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full text-center px-4 py-2 text-white rounded-lg hover:opacity-90 transition font-medium"
          style={{ backgroundColor: '#269b59' }}
        >
          View Full Recipe →
        </a>
      </div>
    </div>
  );
}
