import { useLoaderData, Form, useFetcher } from "react-router";
import { useState } from "react";
import type { SavedRecipe } from "~/types/recipe";
import { ThemeToggle } from "~/components/ThemeToggle";

export function SavedRecipes() {
  const { savedRecipes, user, inventoryCount } = useLoaderData<{ savedRecipes: SavedRecipe[]; user: string; inventoryCount: number }>();
  const fetcher = useFetcher();

  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;
  
  const totalPages = Math.ceil(savedRecipes.length / recipesPerPage);
  const startIndex = (currentPage - 1) * recipesPerPage;
  const currentRecipes = savedRecipes.slice(startIndex, startIndex + recipesPerPage);

  const initials = user.charAt(0).toUpperCase();

  return (
    <div className="bg-surface text-on-surface min-h-[100vh]">
      {/* Editorial Header */}
      <header className="bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur-xl fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 border-b border-outline-variant/10">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-serif italic text-emerald-900 dark:text-emerald-100">
            What's In My Fridge
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-4 text-xs font-label uppercase tracking-widest text-on-surface-variant">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span>{inventoryCount} items in fridge</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
              <span>{savedRecipes.length} saved recipes</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="h-8 w-8 rounded-full ring-2 ring-primary/10 flex items-center justify-center font-bold text-sm bg-primary text-on-primary">
              {initials}
            </div>
          </div>
        </div>
      </header>

      {/* Culinary Sidebar */}
      <aside className="h-screen w-64 fixed left-0 top-0 hidden md:flex flex-col bg-stone-50 dark:bg-stone-950 pt-20 px-4 border-r border-outline-variant/10">
        <nav className="flex flex-col gap-2">
          <a
            className="text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 rounded-xl mx-2 flex items-center gap-4 px-4 py-3 transition-transform duration-200 hover:translate-x-1"
            href="/dashboard"
          >
            <span className="material-symbols-outlined">explore</span>
            <span className="font-label text-sm font-medium uppercase tracking-wider">Discover</span>
          </a>
          <a
            className="text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 rounded-xl mx-2 flex items-center gap-4 px-4 py-3 transition-transform duration-200 hover:translate-x-1"
            href="/ingredients"
          >
            <span className="material-symbols-outlined">restaurant</span>
            <span className="font-label text-sm font-medium uppercase tracking-wider">My Kitchen</span>
          </a>
          <a
            className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-100 rounded-xl mx-2 flex items-center gap-4 px-4 py-3 transition-transform duration-200 hover:translate-x-1"
            href="/savedRecipes"
          >
            <span className="material-symbols-outlined">favorite</span>
            <span className="font-label text-sm font-medium uppercase tracking-wider">Saved</span>
          </a>
          <a
            className="text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 rounded-xl mx-2 flex items-center gap-4 px-4 py-3 transition-transform duration-200 hover:translate-x-1"
            href="/nutrition"
          >
            <span className="material-symbols-outlined">person</span>
            <span className="font-label text-sm font-medium uppercase tracking-wider">Profile</span>
          </a>
          <a
            className="text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 rounded-xl mx-2 flex items-center gap-4 px-4 py-3 transition-transform duration-200 hover:translate-x-1"
            href="/logout"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label text-sm font-medium uppercase tracking-wider">Sign Out</span>
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

      <main className="pt-24 pb-20 md:pl-64 px-4 md:pr-8 min-h-screen">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <header className="space-y-4">
            <h1 className="text-5xl md:text-6xl text-on-surface font-headline italic tracking-tight">Your Collection</h1>
            <p className="text-on-surface-variant max-w-2xl font-body leading-relaxed">
              Discover and revisit your favorite culinary finds. A personal archive of thoughtful cooking.
            </p>
          </header>

          {savedRecipes.length > 0 ? (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentRecipes.map((recipe) => {
                  let ingredientsList: string[] = [];
                  try {
                    ingredientsList = JSON.parse(recipe.ingredients);
                  } catch (e) {
                    ingredientsList = [recipe.ingredients];
                  }
                  
                  return (
                    <article key={recipe.recipe_id} className="group bg-surface-container-low rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 border border-outline-variant/10 flex flex-col">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img src={recipe.recipe_image} alt={recipe.recipe_name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <fetcher.Form method="post" className="absolute top-4 right-4">
                          <input type="hidden" name="actionType" value="deleteRecipe" />
                          <input type="hidden" name="recipeId" value={recipe.recipe_id} />
                          <button 
                            type="submit"
                            className="w-10 h-10 rounded-full bg-stone-900/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-error transition-colors"
                            onClick={(e) => { if (!confirm('Are you sure?')) e.preventDefault(); }}
                          >
                            <span className="material-symbols-outlined text-xl">delete</span>
                          </button>
                        </fetcher.Form>
                      </div>

                      <div className="p-8 flex-grow flex flex-col gap-4">
                        <div className="space-y-2">
                          <h3 className="text-2xl font-serif text-on-surface leading-snug">{recipe.recipe_name}</h3>
                          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant">{recipe.servings} Servings</p>
                        </div>
                        
                        <div className="flex-grow">
                          <p className="text-sm text-on-surface-variant font-body line-clamp-3 leading-relaxed">
                            {ingredientsList.join(", ")}
                          </p>
                        </div>

                        <a 
                          href={recipe.recipe_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="mt-4 w-full py-4 rounded-xl border border-primary text-primary font-bold text-sm font-label uppercase tracking-wider text-center hover:bg-primary/5 transition-all"
                        >
                          Discover Full Recipe
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 pt-10">
                  <button 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant disabled:opacity-30 hover:bg-surface-container transition-all"
                  >
                    <span className="material-symbols-outlined">arrow_back</span>
                  </button>
                  <span className="font-label text-sm uppercase tracking-widest font-bold">Page {currentPage} of {totalPages}</span>
                  <button 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant disabled:opacity-30 hover:bg-surface-container transition-all"
                  >
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="py-24 text-center space-y-6">
              <div className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="material-symbols-outlined text-4xl text-outline-variant">restaurant_menu</span>
              </div>
              <h2 className="text-3xl font-serif text-on-surface">No Culinary Favorites Yet</h2>
              <p className="text-on-surface-variant max-w-sm mx-auto font-body">Browse our recipe suggestions and save your first finding to start your collection.</p>
              <a href="/recipes" className="inline-block mt-4 text-primary font-bold font-label uppercase tracking-widest border-b-2 border-primary pb-1">Discover Recipes</a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
