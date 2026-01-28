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

  const mockRecipes = [
    {
      label: "Lemon Butter Garlic Salmon",
      image: "/recipes/lemonbuttergarlicsalmon.jpg",
      url: "#",
      ingredientLines: ["Salmon", "Lemon", "Butter"],
      totalNutrients: {
        ENERC_KCAL: { label: "Energy", quantity: 450, unit: "kcal" },
        FAT: { label: "Fat", quantity: 25, unit: "g" },
        CHOCDF: { label: "Carbs", quantity: 5, unit: "g" },
        PROCNT: { label: "Protein", quantity: 45, unit: "g" },
      },
    },
    {
      label: "Marry Me Chicken",
      image: "/recipes/marrymechicken.jpg",
      url: "#",
      ingredientLines: ["Chicken", "Tomato", "Garlic"],
      totalNutrients: {
        ENERC_KCAL: { label: "Energy", quantity: 420, unit: "kcal" },
        FAT: { label: "Fat", quantity: 15, unit: "g" },
        CHOCDF: { label: "Carbs", quantity: 20, unit: "g" },
        PROCNT: { label: "Protein", quantity: 50, unit: "g" },
      },
    },
    {
      label: "Creamy Pasta Carbonara",
      image: "/recipes/creamypastacarbanara.jpg",
      url: "#",
      ingredientLines: ["Pasta", "Egg", "Bacon"],
      totalNutrients: {
        ENERC_KCAL: { label: "Energy", quantity: 520, unit: "kcal" },
        FAT: { label: "Fat", quantity: 28, unit: "g" },
        CHOCDF: { label: "Carbs", quantity: 55, unit: "g" },
        PROCNT: { label: "Protein", quantity: 20, unit: "g" },
      },
    },
    {
      label: "Rainbow Salad",
      image: "/recipes/rainbowsalad.jpeg",
      url: "#",
      ingredientLines: ["Lettuce", "Tomato", "Cucumber"],
      totalNutrients: {
        ENERC_KCAL: { label: "Energy", quantity: 150, unit: "kcal" },
        FAT: { label: "Fat", quantity: 5, unit: "g" },
        CHOCDF: { label: "Carbs", quantity: 25, unit: "g" },
        PROCNT: { label: "Protein", quantity: 8, unit: "g" },
      },
    },
    {
      label: "Creamy Tuscan Pasta",
      image: "/recipes/tuscanchickenpasta.jpg",
      url: "#",
      ingredientLines: ["Pasta", "Chicken", "Cream"],
      totalNutrients: {
        ENERC_KCAL: { label: "Energy", quantity: 480, unit: "kcal" },
        FAT: { label: "Fat", quantity: 20, unit: "g" },
        CHOCDF: { label: "Carbs", quantity: 50, unit: "g" },
        PROCNT: { label: "Protein", quantity: 28, unit: "g" },
      },
    },
    {
      label: "Mediterranean Chicken Bowls",
      image: "/recipes/mediterraneanchickenbowls.jpg",
      url: "#",
      ingredientLines: ["Chicken", "Hummus", "Feta"],
      totalNutrients: {
        ENERC_KCAL: { label: "Energy", quantity: 400, unit: "kcal" },
        FAT: { label: "Fat", quantity: 18, unit: "g" },
        CHOCDF: { label: "Carbs", quantity: 35, unit: "g" },
        PROCNT: { label: "Protein", quantity: 32, unit: "g" },
      },
    },
    {
      label: "Soy Ginger Glazed Salmon",
      image: "/recipes/soygingerglazedsalmon.jpg",
      url: "#",
      ingredientLines: ["Salmon", "Soy Sauce", "Ginger"],
      totalNutrients: {
        ENERC_KCAL: { label: "Energy", quantity: 460, unit: "kcal" },
        FAT: { label: "Fat", quantity: 26, unit: "g" },
        CHOCDF: { label: "Carbs", quantity: 15, unit: "g" },
        PROCNT: { label: "Protein", quantity: 48, unit: "g" },
      },
    },
    {
      label: "Chicken Shawarma Bowl",
      image: "/recipes/chickenshawarmabowl.jpg",
      url: "#",
      ingredientLines: ["Chicken", "Tahini", "Pita"],
      totalNutrients: {
        ENERC_KCAL: { label: "Energy", quantity: 480, unit: "kcal" },
        FAT: { label: "Fat", quantity: 22, unit: "g" },
        CHOCDF: { label: "Carbs", quantity: 42, unit: "g" },
        PROCNT: { label: "Protein", quantity: 35, unit: "g" },
      },
    },
    {
      label: "Avgolemono",
      image: "/recipes/avgelemono.jpg",
      url: "#",
      ingredientLines: ["Chicken", "Lemon", "Rice"],
      totalNutrients: {
        ENERC_KCAL: { label: "Energy", quantity: 280, unit: "kcal" },
        FAT: { label: "Fat", quantity: 10, unit: "g" },
        CHOCDF: { label: "Carbs", quantity: 30, unit: "g" },
        PROCNT: { label: "Protein", quantity: 22, unit: "g" },
      },
    },
    {
      label: "Cilantro Lime Shrimp",
      image: "/recipes/cilantrolimeshrimp.jpg",
      url: "#",
      ingredientLines: ["Shrimp", "Cilantro", "Lime"],
      totalNutrients: {
        ENERC_KCAL: { label: "Energy", quantity: 200, unit: "kcal" },
        FAT: { label: "Fat", quantity: 8, unit: "g" },
        CHOCDF: { label: "Carbs", quantity: 10, unit: "g" },
        PROCNT: { label: "Protein", quantity: 28, unit: "g" },
      },
    },
    {
      label: "Turkey Stuffed Peppers",
      image: "/recipes/turkeystuffedpeppers.jpg",
      url: "#",
      ingredientLines: ["Turkey", "Bell Pepper", "Rice"],
      totalNutrients: {
        ENERC_KCAL: { label: "Energy", quantity: 320, unit: "kcal" },
        FAT: { label: "Fat", quantity: 12, unit: "g" },
        CHOCDF: { label: "Carbs", quantity: 28, unit: "g" },
        PROCNT: { label: "Protein", quantity: 32, unit: "g" },
      },
    },
    {
      label: "Tteokbokki",
      image: "/recipes/tteokbokki.jpg",
      url: "#",
      ingredientLines: ["Rice Cakes", "Gochujang", "Green Onion"],
      totalNutrients: {
        ENERC_KCAL: { label: "Energy", quantity: 340, unit: "kcal" },
        FAT: { label: "Fat", quantity: 8, unit: "g" },
        CHOCDF: { label: "Carbs", quantity: 60, unit: "g" },
        PROCNT: { label: "Protein", quantity: 10, unit: "g" },
      },
    },
  ];
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

      <main className="flex flex-col items-center px-6 py-8 gap-10 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="w-full">
          <div className="rounded-3xl p-12 dark:border-gray-700 bg-white/65 dark:bg-white/65 box-shadow-custom">
            <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-700 mb-2">
              Recipe Search
            </h1>
            <p className="text-gray-700 dark:text-gray-700">
              Find delicious recipes based on your ingredients
            </p>
            <p className="text-gray-700 dark:text-gray-700">
              Note: If you want to see results based on specific dietary preferences or allergies, please go to the "Nutrition" tab and fill out your preferences.
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className="w-full">
          <div className="rounded-3xl p-6 dark:border-gray-700 bg-white/65 dark:bg-white/65 box-shadow-custom">
            <h2 className="text-xl font-bold text-gray-700 dark:text-gray-700 mb-4">
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
                className="w-full py-3 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition font-medium text-lg hover:opacity-90"
                style={{ backgroundColor: ingredients.length === 0 ? undefined : '#269b59' }}
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
              <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-700 mb-4">
                Recipe Results ({mockRecipes.length} found)
              </h2>
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
            <p className="text-gray-700 dark:text-gray-700 text-lg">
              No recipes found. Make sure that the ingredient spelling is correct and try again.
            </p>
          </div>
        )}
      </main>
    </>
  );
}
