import { useMealPlan } from "../../context/MealPlanContext";
import { RecipeCard } from "../../components/recipes/RecipeCard";
import { Navbar } from "../../components/navbar/navbar";

export default function MealPlans() {
  const { savedRecipes, removeRecipe } = useMealPlan();

  return (
    <>
      <Navbar />

      <main className="flex flex-col items-center px-6 py-8 gap-10 max-w-[1400px] mx-auto min-h-screen transition-colors duration-200">
        {/* Header Box */}
        <div className="w-full">
          <div className="rounded-3xl p-12 welcome-gradient bg-transparent dark:bg-transparent shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 rounded-3xl welcome-overlay"></div>
            <div className="relative z-10">
              <h1 className="text-3xl font-bold text-white">My Meal Plans</h1>
              <h2 className="text-xl text-white mt-2">View your saved recipes</h2>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="w-full">
          {savedRecipes.length === 0 ? (
            <div className="text-center py-12 w-full">
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                No recipes saved yet
              </p>
              <p className="text-gray-500 dark:text-gray-500">
                Add recipes from the Recipe Search page to build your meal plan
              </p>
            </div>
          ) : (
            <>
              {/* Recipe Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 w-full">
                {savedRecipes.map((recipe) => (
                  <div key={recipe.label} className="relative">
                    <RecipeCard recipe={recipe} />
                    {/* Remove Button */}
                    <button
                      onClick={() => removeRecipe(recipe.label)}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition shadow-md z-10"
                      title="Remove from meal plan"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
