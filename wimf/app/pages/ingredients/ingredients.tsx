import { Form } from "react-router";
import { useState } from "react";
import type { InventoryItem } from "~/types/dashboard";
import { ThemeToggle } from "~/components/ThemeToggle";

interface IngredientsProps {
  inventoryItems: InventoryItem[];
}

export function Ingredients({ inventoryItems }: IngredientsProps) {
  const [inputValue, setInputValue] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("unit(s)");
  const [category, setCategory] = useState("Vegetables");
  const [expirationDate, setExpirationDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const categories = ["All", "Vegetables", "Fruits", "Meat", "Dairy", "Grains", "Spices", "Other"];

  const handleClearForm = () => {
    setInputValue("");
    setQuantity("");
    setUnit("unit(s)");
    setCategory("Vegetables");
    setExpirationDate("");
  };

  const filteredIngredients = inventoryItems.filter((ing) => {
    const matchesSearch = ing.ingredient_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "All" || ing.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedIngredients = filteredIngredients.reduce((acc, ing) => {
    const cat = ing.category || "Other";
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(ing);
    return acc;
  }, {} as Record<string, InventoryItem[]>);

  return (
    <div className="bg-background text-on-background min-h-screen">
      
      <header className="bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur-xl fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 transition-all duration-300">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-serif italic text-emerald-900 dark:text-emerald-100">
            What's In My Fridge
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="/savedRecipes"
            className="hidden md:flex items-center gap-2 px-4 py-2 text-primary font-semibold hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition-all duration-300 rounded-xl text-sm"
          >
            <span className="material-symbols-outlined text-[20px]">bookmark</span>
            Saved Recipes
          </a>
          <ThemeToggle />
        </div>
      </header>

      <aside className="h-screen w-64 fixed left-0 top-0 hidden md:flex flex-col bg-stone-50 dark:bg-stone-950 pt-20 px-4">
        <nav className="flex flex-col gap-2">
          <a
            className="text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 rounded-xl mx-2 flex items-center gap-4 px-4 py-3 transition-transform duration-200 hover:translate-x-1"
            href="/dashboard"
          >
            <span className="material-symbols-outlined">explore</span>
            <span className="font-label text-sm font-medium uppercase tracking-wider">
              Discover
            </span>
          </a>
          <a
            className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-100 rounded-xl mx-2 flex items-center gap-4 px-4 py-3 transition-transform duration-200 hover:translate-x-1"
            href="/ingredients"
          >
            <span className="material-symbols-outlined">restaurant</span>
            <span className="font-label text-sm font-medium uppercase tracking-wider">
              My Kitchen
            </span>
          </a>

          <a
            className="text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 rounded-xl mx-2 flex items-center gap-4 px-4 py-3 transition-transform duration-200 hover:translate-x-1"
            href="/nutrition"
          >
            <span className="material-symbols-outlined">person</span>
            <span className="font-label text-sm font-medium uppercase tracking-wider">
              Profile
            </span>
          </a>
          <a
            className="text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 rounded-xl mx-2 flex items-center gap-4 px-4 py-3 transition-transform duration-200 hover:translate-x-1"
            href="/logout"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label text-sm font-medium uppercase tracking-wider">
              Sign Out
            </span>
          </a>
        </nav>
        <div className="mt-auto pb-8 px-4">
          <a
            href="/recipes"
            className="w-full bg-primary text-on-primary py-3 rounded-xl flex items-center justify-center gap-2 font-label font-bold text-sm tracking-widest hover:brightness-110 transition-all shadow-lg shadow-primary/20 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            <span>NEW RECIPE</span>
          </a>
        </div>
      </aside>

      <main className="pt-24 pb-24 md:pb-20 md:pl-64 px-4 md:pr-8 mx-auto max-w-7xl min-h-screen">
        
        <section className="mb-12">
          <h1 className="text-5xl md:text-7xl font-semibold text-on-surface mb-6 tracking-tight font-serif">
            My Fridge Inventory
          </h1>
          <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed font-body">
            Maintain a mindful kitchen. Keep track of your seasonal produce and staples to reduce waste
            and inspire your next culinary creation.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-outline-variant/10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">add_circle</span>
                </div>
                <h2 className="text-2xl font-serif text-on-surface">Add New Ingredient</h2>
              </div>

              <Form method="post" onSubmit={handleClearForm} className="space-y-6">
                <input type="hidden" name="actionType" value="addIngredient" />

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant px-1 font-label">
                    Ingredient Name
                  </label>
                  <input
                    name="ingredientName"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all placeholder:text-outline font-body text-on-surface outline-none"
                    placeholder="e.g. Heirloom Tomatoes"
                    type="text"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant px-1 font-label">
                      Quantity
                    </label>
                    <input
                      name="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all font-body text-on-surface outline-none"
                      placeholder="0"
                      type="number"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant px-1 font-label">
                      Unit
                    </label>
                    <select
                      name="unit"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all text-on-surface font-body outline-none"
                    >
                      <option value="unit(s)">unit(s)</option>
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
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant px-1 font-label">
                    Category
                  </label>
                  <select
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all text-on-surface font-body outline-none"
                  >
                    {categories.filter((cat) => cat !== "All").map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant px-1 font-label">
                    Expiration Date
                  </label>
                  <div className="relative">
                    <input
                      name="expirationDate"
                      value={expirationDate}
                      onChange={(e) => setExpirationDate(e.target.value)}
                      className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all text-on-surface font-body outline-none [color-scheme:light]"
                      type="date"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!inputValue.trim() || !quantity}
                  className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold font-label uppercase tracking-widest shadow-sm hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined text-xl">inventory_2</span>
                  Add to Inventory
                </button>
              </Form>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {inventoryItems.length > 0 && (
              <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-outline-variant/10 flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex-1 w-full relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">
                    search
                  </span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search your fridge..."
                    className="w-full bg-surface-container-low border-none rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-primary/20 transition-all font-body outline-none text-on-surface"
                  />
                </div>
                <div className="w-full sm:w-auto shrink-0">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 pr-8 focus:ring-2 focus:ring-primary/20 transition-all font-body outline-none text-on-surface cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {inventoryItems.length === 0 ? (
              <div className="bg-surface-container-low rounded-3xl p-8 md:p-12 min-h-[500px] flex flex-col items-center justify-center text-center relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

                <div className="relative z-10 max-w-sm mx-auto">
                  <div className="mb-8 flex justify-center">
                    <div className="w-32 h-32 rounded-full bg-surface-container-lowest shadow-xl flex items-center justify-center">
                      <span
                        className="material-symbols-outlined text-6xl text-primary/30"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        restaurant
                      </span>
                    </div>
                  </div>
                  <h3 className="text-3xl font-serif text-on-surface mb-4">Your fridge is waiting...</h3>
                  <p className="text-on-surface-variant mb-8 leading-relaxed font-body">
                    Start building your digital inventory by adding items on the left. We'll help you track expiration dates and suggest recipes based on what you have.
                  </p>
                </div>
              </div>
            ) : filteredIngredients.length === 0 ? (
              <div className="bg-surface-container-low rounded-3xl p-12 text-center border-2 border-dashed border-outline-variant/20 flex flex-col items-center justify-center gap-4">
                <span className="material-symbols-outlined text-5xl text-outline-variant">search_off</span>
                <p className="text-on-surface-variant text-lg font-body">
                  No ingredients match your search.
                </p>
              </div>
            ) : (
              <div className="space-y-8 pb-10">
                {Object.entries(groupedIngredients).map(([cat, items]) => (
                  <div key={cat} className="space-y-4">
                    <h3 className="text-[10px] font-label font-bold uppercase tracking-[0.2em] text-on-surface-variant flex items-center gap-3">
                      <span>{cat}</span>
                      <span className="bg-surface-container-high px-2 py-0.5 rounded-full text-outline-variant">
                        {items.length}
                      </span>
                      <div className="h-px bg-outline-variant/20 flex-1 ml-2"></div>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {items.map((ingredient) => (
                        <div
                          key={ingredient.inventory_id}
                          className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
                        >
                          <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary/50 transition-colors"></div>
                          <div className="flex justify-between items-start">
                            <div className="flex-1 min-w-0 pr-4">
                              <h4 className="font-serif text-xl text-on-surface mb-1 truncate">
                                {ingredient.ingredient_name}
                              </h4>
                              <p className="text-sm font-body text-on-surface-variant mb-2">
                                <span className="font-semibold text-on-surface">
                                  {ingredient.quantity}
                                </span>{" "}
                                {ingredient.unit || "unit(s)"}
                              </p>
                              {ingredient.expiration_date && (
                                <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-surface-container-low rounded-lg text-xs font-label">
                                  <span className="material-symbols-outlined text-[14px] text-black">
                                    event
                                  </span>
                                  <span className="text-on-surface-variant">
                                    Exp: {new Date(ingredient.expiration_date).toLocaleDateString()}
                                  </span>
                                </div>
                              )}
                            </div>

                            <Form method="post">
                              <input type="hidden" name="actionType" value="deleteIngredient" />
                              <input type="hidden" name="inventoryId" value={ingredient.inventory_id} />
                              <button
                                type="submit"
                                title="Remove ingredient"
                                className="w-8 h-8 rounded-full bg-surface-container text-on-surface-variant hover:bg-error/10 hover:text-error flex items-center justify-center transition-colors shadow-sm"
                                onClick={(e) => {
                                  if (!confirm("Are you sure you want to remove this ingredient?")) {
                                    e.preventDefault();
                                  }
                                }}
                              >
                                <span className="material-symbols-outlined text-sm">delete</span>
                              </button>
                            </Form>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-stone-50/90 backdrop-blur-xl flex items-center justify-around px-6 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <a href="/dashboard" className="text-stone-500 flex flex-col items-center gap-0.5">
          <span className="material-symbols-outlined">explore</span>
          <span className="text-[9px] font-label font-bold uppercase tracking-tighter">
            Discover
          </span>
        </a>
        <a
          href="/ingredients"
          className="bg-primary text-white p-3 rounded-full -translate-y-4 shadow-lg shadow-primary/40 ring-4 ring-background"
        >
          <span className="material-symbols-outlined">restaurant</span>
        </a>

        <a href="/nutrition" className="text-stone-500 flex flex-col items-center gap-0.5">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[9px] font-label font-bold uppercase tracking-tighter">
            Profile
          </span>
        </a>
      </nav>
    </div>
  );
}
