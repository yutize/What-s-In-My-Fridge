import { Form, useActionData, useNavigate, useNavigation } from "react-router";
import { Navbar } from "~/components/navbar/navbar";
import { useState, useEffect } from "react";
import { RecipeCard } from "~/components/recipes/RecipeCard";
import { IngredientInput } from "~/components/recipes/IngredientInput";
import { RecipeLoadingGrid } from "~/components/recipes/RecipeLoadingSkeleton";
import { Pagination } from "~/components/recipes/Pagination";

interface InventoryItem {
  ingredient_name: string;
}

interface RecipesProps {
  inventoryItems: InventoryItem[];
}

export function Recipes({ inventoryItems }: RecipesProps) {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [selectedInventoryItems, setSelectedInventoryItems] = useState<Set<string>>(new Set());
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const actionData = useActionData<{ recipes?: any; error?: string; success?: boolean; message?: string; searchIngredients?: string[]; timestamp?: number }>();
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";

  const apiRecipes = actionData?.recipes?.hits?.map((hit: any) => hit.recipe) || [];

  useEffect(() => {
    if (actionData?.searchIngredients && actionData.searchIngredients.length > 0) {
      setIngredients(actionData.searchIngredients);
    }
  }, [actionData?.searchIngredients]);

  useEffect(() => {
    if (actionData?.message && actionData?.timestamp) {
      setSaveMessage({
        type: actionData.success ? 'success' : 'error',
        text: actionData.message
      });
      const timer = setTimeout(() => {
        setSaveMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [actionData?.timestamp]);

  useEffect(() => {
    if (actionData?.recipes) {
      setCurrentPage(1);
    }
  }, [actionData]);

  const recipesPerPage = 6;
  const totalPages = Math.ceil(apiRecipes.length / recipesPerPage);
  const startIndex = (currentPage - 1) * recipesPerPage;
  const currentRecipes = apiRecipes.slice(startIndex, startIndex + recipesPerPage);

  const handleToggleInventoryItem = (itemName: string) => {
    setSelectedInventoryItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemName)) {
        newSet.delete(itemName);
      } else {
        newSet.add(itemName);
      }
      return newSet;
    });
  };

  const handleAddSelectedToSearch = () => {
    const itemsToAdd = Array.from(selectedInventoryItems).filter(
      item => !ingredients.includes(item)
    );
    setIngredients([...ingredients, ...itemsToAdd]);
    setShowInventoryModal(false);
    setSelectedInventoryItems(new Set());
  };

  return (
    <>
      <Navbar />

      {/* Save Message Notification */}
      {saveMessage && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className={`rounded-lg px-6 py-3 shadow-lg ${
            saveMessage.type === 'success' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            <p className="font-medium">{saveMessage.text}</p>
          </div>
        </div>
      )}

      <main className="flex flex-col items-center px-6 py-8 gap-10 max-w-[1400px] mx-auto">
        <div className="w-full">
          <div className="rounded-3xl p-12 dark:border-gray-700 bg-white/65 dark:bg-white/65 box-shadow-custom">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-700 mb-2">
                  Recipe Search
                </h1>
              </div>
              <a
              href="/savedRecipes"
                style={{ backgroundColor: '#269b59' }}
              className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition font-medium shadow-lg"
            >
              View Saved Recipes
            </a>
            </div>
            <p className="text-gray-700 dark:text-gray-700">
              Find delicious recipes based on your ingredients
            </p>
            <p className="text-gray-700 dark:text-gray-700">
              Note: If you want to see results based on specific dietary preferences or allergies, please go to the "Nutrition" tab and fill out your preferences.
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className="rounded-3xl p-6 dark:border-gray-700 bg-white/65 dark:bg-white/65 box-shadow-custom">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-700 dark:text-gray-700">
                What ingredients do you have?
              </h2>
              {inventoryItems.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowInventoryModal(true)}
                  className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition font-medium"
                  style={{ backgroundColor: '#269b59' }}
                >
                  Use My Fridge Ingredients
                </button>
              )}
            </div>

            <IngredientInput
              ingredients={ingredients}
              onIngredientsChange={setIngredients}
            />

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

        {isLoading && <RecipeLoadingGrid />}

        {!isLoading && actionData?.error && (
          <div className="w-full">
            <div className="rounded-3xl p-8 bg-red-50 border border-red-200">
              <h3 className="text-lg font-bold text-red-700 mb-2">Search Error</h3>
              <p className="text-red-600">{actionData.error}</p>
            </div>
          </div>
        )}

        {!isLoading && apiRecipes.length > 0 && (
          <>
            <div className="w-full">
              <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-700 mb-4">
              </h2>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Recipe Results ({apiRecipes.length} found)
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentRecipes.map((recipe: any, index: number) => (
                  <RecipeCard 
                    key={recipe.url || index} 
                    recipe={recipe}
                    currentRecipes={actionData?.recipes}
                    searchIngredients={ingredients}
                  />
                ))}
              </div>
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}

        {!isLoading && actionData && apiRecipes.length === 0 && (
          <div className="w-full text-center py-12">
            <p className="text-gray-700 dark:text-gray-700 text-lg">
              No recipes found. Make sure that the ingredient spelling is correct and try again.
            </p>
          </div>
        )}
      </main>

      {showInventoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-700">Select Ingredients from My Fridge</h3>
                <button
                  onClick={() => {
                    setShowInventoryModal(false);
                    setSelectedInventoryItems(new Set());
                  }}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Select ingredients to add to your recipe search
              </p>
            </div>

            <div className="p-6 overflow-y-auto max-h-[50vh]">
              {inventoryItems.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {inventoryItems.map((item) => (
                    <label
                      key={item.ingredient_name}
                      className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 hover:border-green-500 cursor-pointer transition"
                      style={{
                        borderColor: selectedInventoryItems.has(item.ingredient_name) ? '#269b59' : undefined,
                        backgroundColor: selectedInventoryItems.has(item.ingredient_name) ? 'rgba(38, 155, 89, 0.1)' : undefined,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedInventoryItems.has(item.ingredient_name)}
                        onChange={() => handleToggleInventoryItem(item.ingredient_name)}
                        className="w-4 h-4 border border-gray-300 rounded cursor-pointer"
                        style={{
                          accentColor: '#269b59'
                        }}
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {item.ingredient_name}
                      </span>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No ingredients in your fridge yet</p>
                  <a href="/ingredients" className="text-sm font-medium hover:opacity-80 mt-2 inline-block" style={{color: '#269b59'}}>
                    Add Ingredients
                  </a>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                {selectedInventoryItems.size} ingredient{selectedInventoryItems.size !== 1 ? 's' : ''} selected
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowInventoryModal(false);
                    setSelectedInventoryItems(new Set());
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSelectedToSearch}
                  disabled={selectedInventoryItems.size === 0}
                  className="px-6 py-2 text-white rounded-lg hover:opacity-90 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                  style={{ backgroundColor: selectedInventoryItems.size > 0 ? '#269b59' : undefined }}
                >
                  Add to Search
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
