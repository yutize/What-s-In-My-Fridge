import { Form, useActionData, useNavigate, useNavigation } from "react-router";
import { useState, useEffect } from "react";
import { RecipeCard } from "~/components/recipes/RecipeCard";
import { RecipeLoadingGrid } from "~/components/recipes/RecipeLoadingSkeleton";
import { Pagination } from "~/components/recipes/Pagination";
import { ThemeToggle } from "~/components/ThemeToggle";

interface InventoryItem {
  ingredient_name: string;
}

interface RecipesProps {
  inventoryItems: InventoryItem[];
}

export function Recipes({ inventoryItems }: RecipesProps) {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const actionData = useActionData<{ recipes?: any; error?: string; success?: boolean; message?: string; searchIngredients?: string[]; timestamp?: number }>();
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting" && navigation.formData?.get("actionType") !== "surpriseMe";

  const apiRecipes = actionData?.recipes?.hits?.map((hit: any) => hit.recipe) || [];

  useEffect(() => {
    if (actionData?.searchIngredients && actionData.searchIngredients.length > 0) {
      setIngredients(actionData.searchIngredients);
    }
  }, [actionData?.searchIngredients]);

  useEffect(() => {
    if (actionData?.message && actionData?.timestamp) {
      setSaveMessage({
        type: actionData.success ? "success" : "error",
        text: actionData.message,
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

  const handleAddIngredient = () => {
    const val = inputValue.trim();
    if (val && !ingredients.includes(val)) {
      setIngredients([...ingredients, val]);
      setInputValue("");
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  const toggleQuickSelect = (name: string) => {
    if (ingredients.includes(name)) {
      setIngredients(ingredients.filter((i) => i !== name));
    } else {
      setIngredients([...ingredients, name]);
    }
  };

  const quickSelectItems = inventoryItems.slice(0, 10).map((i) => i.ingredient_name);

  return (
    <div className="bg-surface text-on-surface min-h-[100vh]">
      
      <header className="bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur-xl fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16">
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
            className="text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 rounded-xl mx-2 flex items-center gap-4 px-4 py-3 transition-transform duration-200 hover:translate-x-1"
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
            href="#search"
            className="w-full bg-primary text-on-primary py-3 rounded-xl flex items-center justify-center gap-2 font-label font-bold text-sm tracking-widest hover:brightness-110 transition-all shadow-lg shadow-primary/20 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">search</span>
            <span>SEARCH RECIPES</span>
          </a>
        </div>
      </aside>

      <main className="pt-24 pb-20 md:pl-64 px-4 md:pr-8 min-h-screen">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          
          {saveMessage && (
            <div className="fixed top-20 right-4 lg:right-10 z-50 animate-fade-in shadow-xl blur-backdrop rounded-full">
              <div
                className={`flex items-center gap-3 px-6 py-3 rounded-full text-sm font-label uppercase tracking-widest font-bold ${saveMessage.type === "success"
                    ? "bg-primary text-on-primary"
                    : "bg-error text-on-error"
                  }`}
              >
                <span className="material-symbols-outlined">
                  {saveMessage.type === "success" ? "check_circle" : "error"}
                </span>
                {saveMessage.text}
              </div>
            </div>
          )}

          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <h1 className="text-6xl md:text-8xl font-serif text-on-surface leading-[0.9] -tracking-[0.02em]">
                  Recipe Search
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-on-surface-variant font-body font-light leading-relaxed max-w-2xl">
                Discover nourishing meals tailored to the ingredients in your pantry. A
                thoughtful approach to everyday cooking.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <a
                  href="/savedRecipes"
                  className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold flex items-center gap-3 shadow-lg shadow-primary/10 hover:opacity-90 active:scale-95 transition-all font-label text-sm uppercase tracking-wider"
                >
                  <span className="material-symbols-outlined">restaurant_menu</span>
                  View Saved Recipes
                </a>
                <a
                  href="/ingredients"
                  className="text-primary font-bold px-6 py-4 rounded-xl hover:bg-primary/5 transition-colors flex items-center gap-2 font-label text-sm uppercase tracking-wider"
                >
                  My Kitchen
                  <span className="material-symbols-outlined">arrow_forward</span>
                </a>
              </div>
            </div>
            <div className="lg:col-span-5 relative hidden md:block">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 bg-surface-container">
                <img
                  alt="Culinary inspiration"
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop"
                />
              </div>
              <div className="absolute -bottom-6 -left-12 bg-white/40 dark:bg-stone-900/40 backdrop-blur-2xl p-6 rounded-2xl border border-white/20 dark:border-stone-700/50 shadow-xl max-w-[200px]">
                <span className="material-symbols-outlined text-secondary text-3xl mb-3">
                  auto_awesome
                </span>
                <p className="text-on-surface font-serif italic text-lg leading-snug">
                  Guided by the rhythm of the seasons.
                </p>
              </div>
            </div>
          </section>

          <section id="search" className="bg-surface-container-low rounded-[2rem] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none flex items-center justify-end overflow-hidden">
              <span className="material-symbols-outlined text-[400px] text-primary -mr-20">
                kitchen
              </span>
            </div>

            <div className="max-w-4xl mx-auto space-y-12 relative z-10">
              <div className="text-center space-y-3">
                <h2 className="text-4xl md:text-5xl font-serif text-on-surface">
                  What ingredients do you have?
                </h2>
                <p className="text-on-surface-variant font-body">
                  Type ingredients to find the perfect pairing for your next meal.
                </p>
              </div>

              <div className="space-y-8">
                
                <div className="flex flex-col md:flex-row gap-4 p-2 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10">
                  <div className="flex-grow flex items-center px-4 py-2 gap-4">
                    <span className="material-symbols-outlined text-outline">search</span>
                    <input
                      type="text"
                      className="bg-transparent border-none focus:ring-0 w-full text-lg placeholder:text-outline-variant font-body outline-none text-on-surface"
                      placeholder="e.g., Roma tomatoes, fresh garlic..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddIngredient}
                    className="bg-primary text-on-primary px-10 py-4 rounded-xl font-bold tracking-wider hover:opacity-90 active:scale-95 transition-all font-label uppercase text-sm"
                  >
                    ADD
                  </button>
                </div>

                {ingredients.length > 0 && (
                  <div className="space-y-3 p-4 bg-primary-container/20 border border-primary/20 rounded-2xl">
                    <div className="flex items-center gap-2 text-primary">
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                      <span className="text-[11px] font-bold uppercase tracking-widest font-label">
                        Selected
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {ingredients.map((ing, i) => (
                        <span
                          key={i}
                          className="bg-primary text-on-primary px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 tracking-wide font-label uppercase shadow-sm"
                        >
                          {ing}
                          <button
                            type="button"
                            onClick={() => handleRemoveIngredient(i)}
                            className="hover:text-red-300 font-bold ml-1 transition-colors material-symbols-outlined text-sm"
                          >
                            close
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {quickSelectItems.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">bolt</span>
                      <span className="text-[11px] font-bold uppercase tracking-widest font-label">
                        Quick Select from Kitchen
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {quickSelectItems.map((item, i) => {
                        const isSelected = ingredients.includes(item);
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => toggleQuickSelect(item)}
                            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-2 border uppercase font-label tracking-wide ${isSelected
                                ? "bg-primary-container text-on-primary-container border-primary object-scale-down"
                                : "bg-surface-container-high hover:bg-primary-container/50 text-on-surface-variant border-outline-variant/10"
                              }`}
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              {isSelected ? "check" : "add"}
                            </span>
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <Form method="post" className="pt-4">
                  {ingredients.map((ing, i) => (
                    <input key={i} type="hidden" name="ingredient" value={ing} />
                  ))}
                  <button
                    type="submit"
                    disabled={ingredients.length === 0 || isLoading}
                    className={`w-full py-5 rounded-2xl disabled:cursor-not-allowed transition font-label text-sm uppercase tracking-widest font-bold flex justify-center items-center gap-3 active:scale-[0.98] ${ingredients.length === 0
                        ? "bg-surface-dim text-outline border-none shadow-none"
                        : "bg-primary text-on-primary shadow-primary/20 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                      }`}
                  >
                    {isLoading ? (
                      <>
                        <span className="material-symbols-outlined animate-spin">autorenew</span>
                        Searching...
                      </>
                    ) : ingredients.length === 0 ? (
                      "Add ingredients to unlock search"
                    ) : (
                      <>
                        <span className="material-symbols-outlined">search</span>
                        Search with {ingredients.length} item
                        {ingredients.length > 1 ? "s" : ""}
                      </>
                    )}
                  </button>
                </Form>
              </div>
            </div>
          </section>

          {isLoading ? (
            <div className="pt-8">
              <RecipeLoadingGrid />
            </div>
          ) : actionData?.error ? (
            <div className="rounded-[2rem] p-8 bg-error-container text-on-error-container border border-error/20 flex flex-col items-center justify-center text-center py-16 gap-4">
              <span className="material-symbols-outlined text-5xl">warning</span>
              <h3 className="text-2xl font-serif">Search Error</h3>
              <p className="font-body opacity-80">{actionData.error}</p>
            </div>
          ) : actionData?.recipes && apiRecipes.length === 0 ? (
            <div className="rounded-[2rem] p-8 bg-surface-container text-on-surface-variant flex flex-col items-center justify-center text-center py-20 gap-4">
              <span className="material-symbols-outlined text-6xl opacity-40">
                search_off
              </span>
              <h3 className="text-2xl font-serif text-on-surface">No recipes found</h3>
              <p className="font-body opacity-80 max-w-md">
                We couldn't find any recipes matching exactly what you searched for. Try removing
                a few ingredients or checking your spelling.
              </p>
            </div>
          ) : apiRecipes.length > 0 ? (
            <div className="pt-8 space-y-10" id="results">
              <div className="flex items-end justify-between border-b-2 border-outline-variant/20 pb-4">
                <h2 className="text-4xl font-serif text-on-surface">
                  Curated Results
                </h2>
                <span className="text-sm font-label uppercase tracking-widest text-primary font-bold">
                  {apiRecipes.length} Found
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentRecipes.map((recipe: any, index: number) => (
                  <RecipeCard
                    key={recipe.url || index}
                    recipe={recipe}
                    currentRecipes={actionData?.recipes}
                    searchIngredients={ingredients}
                  />
                ))}
              </div>

              <div className="pt-8 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          ) : null}
        </div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-stone-50/90 backdrop-blur-xl flex items-center justify-around px-6 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <a href="/dashboard" className="text-stone-500 flex flex-col items-center gap-0.5">
          <span className="material-symbols-outlined">explore</span>
          <span className="text-[9px] font-label font-bold uppercase tracking-tighter">
            Discover
          </span>
        </a>
        <a href="/ingredients" className="text-stone-500 flex flex-col items-center gap-0.5">
          <span className="material-symbols-outlined">restaurant</span>
          <span className="text-[9px] font-label font-bold uppercase tracking-tighter">
            Kitchen
          </span>
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
