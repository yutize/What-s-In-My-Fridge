import { Navbar } from "~/components/navbar/navbar";
import { useState } from "react";

interface IngredientItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  addedDate: Date;
}

export function Ingredients() {
  const [ingredients, setIngredients] = useState<IngredientItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("Other");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const categories = ["All", "Vegetables", "Fruits", "Meat", "Dairy", "Grains", "Spices", "Other"];

  const handleAddIngredient = () => {
    if (inputValue.trim()) {
      const newIngredient: IngredientItem = {
        id: Date.now().toString(),
        name: inputValue.trim(),
        quantity: quantity.trim() || "As needed",
        category: category,
        addedDate: new Date(),
      };
      setIngredients([...ingredients, newIngredient]);
      setInputValue("");
      setQuantity("");
      setCategory("Other");
    }
  };

  const handleRemoveIngredient = (id: string) => {
    setIngredients(ingredients.filter((ing) => ing.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all ingredients?")) {
      setIngredients([]);
    }
  };

  // Filter ingredients
  const filteredIngredients = ingredients.filter((ing) => {
    const matchesSearch = ing.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "All" || ing.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Group by category
  const groupedIngredients = filteredIngredients.reduce((acc, ing) => {
    if (!acc[ing.category]) {
      acc[ing.category] = [];
    }
    acc[ing.category].push(ing);
    return acc;
  }, {} as Record<string, IngredientItem[]>);

  return (
    <>
      <Navbar />

      <main className="flex flex-col items-center px-6 py-8 gap-6 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="w-full">
          <div className="rounded-3xl p-8 dark:border-gray-700 bg-white/65 dark:bg-white/65 box-shadow-custom">
            <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-700 mb-2">
              My Fridge Inventory
            </h1>
            <p className="text-gray-700 dark:text-gray-700">
              Keep track of what's in your fridge. Add ingredients with quantities and organize them by category.
            </p>
          </div>
        </div>

        {/* Add Ingredient Section */}
        <div className="w-full">
          <div className="rounded-3xl p-6 dark:border-gray-700 bg-white/65 dark:bg-white/65 box-shadow-custom">
            <h2 className="text-xl font-bold text-gray-700 dark:text-gray-700 mb-4">
              Add New Ingredient
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ingredient name (e.g., Chicken breast)"
                className="md:col-span-5 px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-200 dark:border-gray-300 dark:text-gray-800"
              />
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Quantity (e.g., 2 lbs)"
                className="md:col-span-3 px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-200 dark:border-gray-300 dark:text-gray-800"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="md:col-span-3 px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-200 dark:border-gray-300 dark:text-gray-800"
              >
                {categories.filter(cat => cat !== "All").map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddIngredient}
                disabled={!inputValue.trim()}
                className="md:col-span-1 px-6 py-3 text-white rounded-lg hover:opacity-90 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                style={{ backgroundColor: inputValue.trim() ? '#269b59' : undefined }}
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Filter and Search Section */}
        {ingredients.length > 0 && (
          <div className="w-full">
            <div className="rounded-3xl p-6 dark:border-gray-700 bg-white/65 dark:bg-white/65 box-shadow-custom">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex-1 w-full md:w-auto">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search ingredients..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-200 dark:border-gray-300 dark:text-gray-800"
                  />
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="flex-1 md:flex-none px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-200 dark:border-gray-300 dark:text-gray-800"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <button
                    onClick={handleClearAll}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ingredients List */}
        {ingredients.length === 0 ? (
          <div className="w-full">
            <div className="rounded-3xl p-12 dark:border-gray-700 bg-white/65 dark:bg-white/65 box-shadow-custom text-center">
              <div className="text-6xl mb-4">🥗</div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-700 mb-2">
                Your fridge is empty!
              </h3>
              <p className="text-gray-700 dark:text-gray-700">
                Start adding ingredients to keep track of what you have.
              </p>
            </div>
          </div>
        ) : filteredIngredients.length === 0 ? (
          <div className="w-full">
            <div className="rounded-3xl p-12 dark:border-gray-700 bg-white/65 dark:bg-white/65 box-shadow-custom text-center">
              <p className="text-gray-700 dark:text-gray-700 text-lg">
                No ingredients match your search.
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <div className="rounded-3xl p-6 dark:border-gray-700 bg-white/65 dark:bg-white/65 box-shadow-custom">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-700 dark:text-gray-700">
                  Your Ingredients ({filteredIngredients.length})
                </h2>
              </div>

              {/* Grouped by Category */}
              <div className="space-y-6">
                {Object.entries(groupedIngredients).map(([cat, items]) => (
                  <div key={cat}>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-700 mb-3 flex items-center gap-2">
                      <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: '#269b59' }}></span>
                      {cat} ({items.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {items.map((ingredient) => (
                        <div
                          key={ingredient.id}
                          className="bg-white dark:bg-gray-100 rounded-lg p-4 border border-gray-200 hover:shadow-md transition"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800 text-lg">
                                {ingredient.name}
                              </h4>
                              <p className="text-gray-600 text-sm mt-1">
                                Quantity: {ingredient.quantity}
                              </p>
                              <p className="text-gray-500 text-xs mt-1">
                                Added: {ingredient.addedDate.toLocaleDateString()}
                              </p>
                            </div>
                            <button
                              onClick={() => handleRemoveIngredient(ingredient.id)}
                              className="text-red-500 hover:text-red-700 font-bold text-xl ml-2"
                              title="Remove ingredient"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
