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
  return (
    <div className="rounded-lg overflow-hidden box-shadow-custom hover:shadow-xl transition bg-white/65 dark:bg-white/65">
      {/* Recipe Image */}
      <img
        src={recipe.image}
        alt={recipe.label}
        className="w-full h-48 object-cover"
      />

      {/* Recipe Info */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-700 dark:text-gray-700">
          {recipe.label}
        </h3>

        {/* Nutrition Info */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-700 dark:text-gray-700">
          <div>🔥 {Math.round(recipe.totalNutrients.ENERC_KCAL.quantity)} cal</div>
          <div>💪 {Math.round(recipe.totalNutrients.PROCNT.quantity)}g protein</div>
          <div>🍞 {Math.round(recipe.totalNutrients.CHOCDF.quantity)}g carbs</div>
          <div>🥑 {Math.round(recipe.totalNutrients.FAT.quantity)}g fat</div>
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
