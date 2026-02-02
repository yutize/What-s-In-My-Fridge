import { useLoaderData } from "react-router";
import { Navbar } from "~/components/navbar/navbar";
import { useState } from "react";

interface SavedRecipe {
  recipe_id: number;
  user_id: number;
  recipe_name: string;
  recipe_url: string;
  recipe_image: string;
  servings: number;
  ingredients: string; // JSON string
}

export function SavedRecipes() {
  const { savedRecipes } = useLoaderData<{ savedRecipes: SavedRecipe[] }>();

  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;
  
  const totalPages = Math.ceil(savedRecipes.length / recipesPerPage);
  const startIndex = (currentPage - 1) * recipesPerPage;
  const currentRecipes = savedRecipes.slice(startIndex, startIndex + recipesPerPage);

  return (
    <>
      <Navbar />

      <main className="flex flex-col items-center px-6 py-8 gap-10 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="w-full">
          <div className="rounded-3xl p-12 dark:border-gray-700 bg-white/65 dark:bg-white/65 box-shadow-custom">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-700 mb-2">
                  📖 My Saved Recipes
                </h1>
              </div>
              <a
                href="/recipes"
                className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition font-medium shadow-lg"
                style={{ backgroundColor: '#269b59' }}
              >
                ← Back to Search
              </a>
            </div>
            <p className="text-gray-700 dark:text-gray-700">
              View and manage your saved recipes
            </p>
          </div>
        </div>

        {/* Saved Recipes Grid */}
        {savedRecipes.length > 0 ? (
          <>
            <div className="w-full">
              <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-700 mb-4">
                Your Collection ({savedRecipes.length} recipe{savedRecipes.length !== 1 ? 's' : ''})
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentRecipes.map((recipe) => {
                  const ingredientsList = JSON.parse(recipe.ingredients);
                  
                  return (
                    <div 
                      key={recipe.recipe_id} 
                      className="rounded-lg overflow-hidden box-shadow-custom hover:shadow-xl transition bg-white/65 dark:bg-white/65"
                    >
                      {/* Recipe Image with Delete Button */}
                      <div className="relative">
                        <img
                          src={recipe.recipe_image}
                          alt={recipe.recipe_name}
                          className="w-full h-48 object-cover"
                        />
                        <button
                          onClick={() => {
                            // TODO: Implement delete functionality
                            console.log('Delete recipe:', recipe.recipe_id);
                          }}
                          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition shadow-lg"
                          title="Remove recipe"
                        >
                          ✕ Remove
                        </button>
                      </div>

                      {/* Recipe Info */}
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2 text-gray-700 dark:text-gray-700">
                          {recipe.recipe_name}
                        </h3>
                        <p className="text-xs text-gray-500 mb-3">{recipe.servings} servings</p>

                        {/* Ingredients Preview */}
                        <div className="mb-3">
                          <p className="text-xs text-gray-700 dark:text-gray-700 mb-1 font-medium">
                            Ingredients:
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-700 line-clamp-2">
                            {ingredientsList.join(", ")}
                          </p>
                        </div>

                        {/* View Recipe Link */}
                        <a
                          href={recipe.recipe_url}
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
                })}
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="w-full flex justify-center items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white/65 box-shadow-custom text-gray-700 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg transition ${
                      currentPage === page
                        ? "text-white box-shadow-custom"
                        : "bg-white/65 box-shadow-custom text-gray-700 hover:bg-white"
                    }`}
                    style={currentPage === page ? { backgroundColor: '#269b59' } : {}}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white/65 box-shadow-custom text-gray-700 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="w-full text-center py-20">
            <div className="rounded-3xl p-12 dark:border-gray-700 bg-white/65 dark:bg-white/65 box-shadow-custom max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-700 mb-3">
                No Saved Recipes Yet
              </h2>
              <p className="text-gray-600 dark:text-gray-600 mb-6">
                Start saving your favorite recipes from the recipe search to see them here!
              </p>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
