import { Form, useActionData, useNavigation } from "react-router";
import { Navbar } from "~/components/navbar/navbar";
import { useState, useEffect } from "react";
import { RecipeCard } from "~/components/recipes/RecipeCard";
import { IngredientInput } from "~/components/recipes/IngredientInput";
import { RecipeLoadingGrid } from "~/components/recipes/RecipeLoadingSkeleton";
import { Pagination } from "~/components/recipes/Pagination";

export function Recipes() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const actionData = useActionData<{ recipes: any }>();
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";

  const apiRecipes = actionData?.recipes?.hits?.map((hit: any) => hit.recipe) || [];

  useEffect(() => {
    if (actionData?.recipes) {
      setCurrentPage(1);
    }
  }, [actionData]);

  const recipesPerPage = 6;
  const totalPages = Math.ceil(apiRecipes.length / recipesPerPage);
  const startIndex = (currentPage - 1) * recipesPerPage;
  const currentRecipes = apiRecipes.slice(startIndex, startIndex + recipesPerPage);

  return (
    <>
      <Navbar />

      <main className="flex flex-col items-center px-6 py-8 gap-8 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="w-full">
          <div className="rounded-3xl border border-gray-200 p-8 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Recipe Search
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Find delicious recipes based on your ingredients
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Note: If you want to see results based on specific dietary preferences or allergies, please go to the "Nutrition" tab and fill out your preferences.
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className="w-full">
          <div className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              What ingredients do you have?
            </h2>

            {/* Ingredient Input Component */}
            <IngredientInput
              ingredients={ingredients}
              onIngredientsChange={setIngredients}
            />

            {/* Search Button */}
            <Form method="post">
              {ingredients.map((ing, i) => (
                <input key={i} type="hidden" name="ingredient" value={ing} />
              ))}
              <button
                type="submit"
                disabled={ingredients.length === 0}
                className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition font-medium text-lg"
              >
                {ingredients.length === 0
                  ? "Add ingredients to search"
                  : `Search Recipes with ${ingredients.length} ingredient${ingredients.length > 1 ? "s" : ""}`}
              </button>
            </Form>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && <RecipeLoadingGrid />}

        {/* Recipe Results */}
        {!isLoading && apiRecipes.length > 0 && (
          <>
            <div className="w-full">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Recipe Results ({apiRecipes.length} found)
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentRecipes.map((recipe, index) => (
                  <RecipeCard key={recipe.url || index} recipe={recipe} />
                ))}
              </div>
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}

        {/* No Results */}
        {!isLoading && actionData && apiRecipes.length === 0 && (
          <div className="w-full text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No recipes found. Try different ingredients!
            </p>
          </div>
        )}
      </main>
    </>
  );
}
