import { Navbar } from "~/components/navbar/navbar";
import { Form } from "react-router";
import { useState } from "react";

interface InventoryItem {
  inventory_id: number;
  ingredient_id: number;
  ingredient_name: string;
  category: string | null;
  quantity: number;
  unit: string | null;
  expiration_date: string | null;
}

interface IngredientsProps {
  inventoryItems: InventoryItem[];
}

export function Ingredients({ inventoryItems }: IngredientsProps) {
  const [inputValue, setInputValue] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("unit");
  const [category, setCategory] = useState("Other");
  const [expirationDate, setExpirationDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const categories = ["All", "Vegetables", "Fruits", "Meat", "Dairy", "Grains", "Spices", "Other"];

  const handleClearForm = () => {
    setInputValue("");
    setQuantity("");
    setUnit("unit");
    setCategory("Other");
    setExpirationDate("");
  };

  // Filter ingredients
  const filteredIngredients = inventoryItems.filter((ing) => {
    const matchesSearch = ing.ingredient_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "All" || ing.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Group by category
  const groupedIngredients = filteredIngredients.reduce((acc, ing) => {
    const cat = ing.category || "Other";
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(ing);
    return acc;
  }, {} as Record<string, InventoryItem[]>);

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

            <Form method="post" onSubmit={handleClearForm}>
              <input type="hidden" name="actionType" value="addIngredient" />
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                <input
                  type="text"
                  name="ingredientName"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ingredient name (e.g., Chicken breast)"
                  required
                  className="md:col-span-4 px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-200 dark:border-gray-300 dark:text-gray-800"
                />
                <input
                  type="number"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Quantity"
                  step="0.01"
                  required
                  className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-200 dark:border-gray-300 dark:text-gray-800"
                />
                <select
                  name="unit"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-200 dark:border-gray-300 dark:text-gray-800"
                >
                  <option value="unit">unit(s)</option>
                  <option value="lbs">lbs</option>
                  <option value="oz">oz</option>
                  <option value="g">g</option>
                  <option value="kg">kg</option>
                  <option value="cups">cups</option>
                  <option value="tbsp">tbsp</option>
                  <option value="tsp">tsp</option>
                  <option value="ml">ml</option>
                  <option value="L">L</option>
                </select>
                <select
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-200 dark:border-gray-300 dark:text-gray-800"
                >
                  {categories.filter(cat => cat !== "All").map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <input
                  type="date"
                  name="expirationDate"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  placeholder="Expiration (optional)"
                  className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-200 dark:border-gray-300 dark:text-gray-800"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || !quantity}
                  className="md:col-span-1 px-6 py-3 text-white rounded-lg hover:opacity-90 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                  style={{ backgroundColor: inputValue.trim() && quantity ? '#269b59' : undefined }}
                >
                  Add
                </button>
              </div>
            </Form>
          </div>
        </div>

        {/* Filter and Search Section */}
        {inventoryItems.length > 0 && (
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
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ingredients List */}
        {inventoryItems.length === 0 ? (
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
                          key={ingredient.inventory_id}
                          className="bg-white dark:bg-gray-100 rounded-lg p-4 border border-gray-200 hover:shadow-md transition"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800 text-lg">
                                {ingredient.ingredient_name}
                              </h4>
                              <p className="text-gray-600 text-sm mt-1">
                                Quantity: {ingredient.quantity} {ingredient.unit || 'unit(s)'}
                              </p>
                              {ingredient.expiration_date && (
                                <p className="text-gray-500 text-xs mt-1">
                                  Expires: {new Date(ingredient.expiration_date).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                            <Form method="post">
                              <input type="hidden" name="actionType" value="deleteIngredient" />
                              <input type="hidden" name="inventoryId" value={ingredient.inventory_id} />
                              <button
                                type="submit"
                                className="text-red-500 hover:text-red-700 font-bold text-xl ml-2"
                                title="Remove ingredient"
                                onClick={(e) => {
                                  if (!confirm('Remove this ingredient from your inventory?')) {
                                    e.preventDefault();
                                  }
                                }}
                              >
                                ×
                              </button>
                            </Form>
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
