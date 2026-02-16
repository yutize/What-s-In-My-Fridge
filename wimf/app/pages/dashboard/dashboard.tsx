import { Form } from "react-router";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import { Navbar } from "~/components/navbar/navbar";
import type { SavedRecipe } from "~/types/recipe";
import type { NutritionProfile } from "~/types/nutrition";

export function Dashboard( { user, savedRecipes, nutritionProfile }: { user: any; savedRecipes: SavedRecipe[]; nutritionProfile: NutritionProfile | null }) {
  return (
    <>
   <Navbar />

    <main className="flex flex-col items-center px-6 py-8 gap-10 max-w-[1400px] mx-auto">
      {/* Welcome Banner */}
      <div className="w-full">
        <div className="rounded-3xl p-12 welcome-gradient bg-transparent dark:bg-transparent shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 rounded-3xl" style={{background: 'linear-gradient(to right, transparent 0%, rgba(5, 150, 105, 0.3) 100%)'}}></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white">Welcome back, {user}!</h1>
            <h2 className="text-xl text-white">Ready to create something delicious today?</h2>
          </div>
        </div>
      </div>

      {/* My Fridge & This Week's Meals Row */}
      <div className="w-full grid grid-cols-2 gap-6">
        {/* My Fridge */}
        <div className="rounded-3xl p-6 dark:border-gray-700 bg-white/65 dark:bg-white/65 box-shadow-custom flex flex-col h-[300px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-700">My Fridge</h2>
            <a href="#" className="text-sm font-medium hover:opacity-80" style={{color: '#269b59'}}>View Full Inventory</a>
          </div>
          <div className="space-y-3 flex-1 flex flex-col">
            <div className="flex gap-3">
              <div className="flex-1 rounded-lg p-3" style={{backgroundColor: 'rgba(38, 155, 89, 0.2)'}}>
                <p className="text-xs text-gray-600 mb-1">Total Items</p>
                <p className="text-2xl font-bold text-gray-700">24</p>
              </div>
              <div className="flex-1 bg-red-100 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Expiring Soon</p>
                <p className="text-2xl font-bold text-gray-700">3</p>
              </div>
            </div>
            
            <div className="space-y-2 flex-1 flex flex-col justify-between">
              <p className="text-xs font-medium text-gray-700">Categories</p>
              <div className="space-y-3 flex-1 flex flex-col justify-around">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600 font-medium w-12">Protein</span>
                  <div className="flex gap-2 flex-1 mx-2">
                    <span className="text-xs text-gray-500">Restock</span>
                    <div className="flex-1 bg-gray-200 rounded h-2 overflow-hidden">
                      <div className="bg-red-500 h-full rounded" style={{width: '60%'}}></div>
                    </div>
                    <span className="text-xs text-gray-500">Full</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600 font-medium w-12">Dairy</span>
                  <div className="flex gap-2 flex-1 mx-2">
                    <span className="text-xs text-gray-500">Restock</span>
                    <div className="flex-1 bg-gray-200 rounded h-2 overflow-hidden">
                      <div className="bg-blue-500 h-full rounded" style={{width: '50%'}}></div>
                    </div>
                    <span className="text-xs text-gray-500">Full</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600 font-medium w-12">Grains</span>
                  <div className="flex gap-2 flex-1 mx-2">
                    <span className="text-xs text-gray-500">Restock</span>
                    <div className="flex-1 bg-gray-200 rounded h-2 overflow-hidden">
                      <div className="bg-yellow-600 h-full rounded" style={{width: '40%'}}></div>
                    </div>
                    <span className="text-xs text-gray-500">Full</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600 font-medium w-12">Produce</span>
                  <div className="flex gap-2 flex-1 mx-2">
                    <span className="text-xs text-gray-500">Restock</span>
                    <div className="flex-1 bg-gray-200 rounded h-2 overflow-hidden">
                      <div className="bg-green-500 h-full rounded" style={{width: '90%'}}></div>
                    </div>
                    <span className="text-xs text-gray-500">Full</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Saved Meals */}
        <div className="rounded-3xl p-6 dark:border-gray-700 bg-white/65 dark:bg-white/65 box-shadow-custom flex flex-col h-[300px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-700">Saved Meals</h2>
            <a href="/savedRecipes" className="text-sm font-medium hover:opacity-80" style={{color: '#269b59'}}>View All</a>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2" style={{scrollbarWidth: 'thin', scrollbarColor: 'rgba(38, 155, 89, 0.5) transparent'}}>
            {savedRecipes.length > 0 ? (
              savedRecipes.map((recipe, index) => {
                const colors = [
                  { bg: 'rgba(20, 184, 166, 0.2)', badge: 'bg-teal-500' },
                  { bg: 'rgba(234, 179, 8, 0.2)', badge: 'bg-yellow-500' },
                  { bg: 'rgba(59, 130, 246, 0.2)', badge: 'bg-blue-500' },
                  { bg: 'rgba(147, 51, 234, 0.2)', badge: 'bg-purple-500' },
                  { bg: 'rgba(236, 72, 153, 0.2)', badge: 'bg-pink-500' },
                ];
                const colorScheme = colors[index % colors.length];
                
                return (
                  <div key={recipe.recipe_id} className="flex items-center gap-4 h-[55px] rounded-lg p-5" style={{backgroundColor: colorScheme.bg}}>
                    <span className={`${colorScheme.badge} text-white px-3 py-1 rounded text-sm font-medium w-[55px] flex items-center justify-center flex-shrink-0`}>#{index + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-700 dark:text-gray-700 line-clamp-1">{recipe.recipe_name}</p>
                      <p className="text-xs text-gray-500">{recipe.servings} servings</p>
                    </div>
                    <img src={recipe.recipe_image} alt={recipe.recipe_name} className="w-[45px] h-[45px] object-cover rounded flex-shrink-0" />
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                <p className="mb-2">No saved recipes yet</p>
                <a href="/recipes" className="text-sm font-medium hover:opacity-80" style={{color: '#269b59'}}>Browse Recipes</a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommended for You */}
      <div className="w-full">
        <div className="rounded-3xl p-6 dark:border-gray-700 bg-white/65 dark:bg-white/65 box-shadow-custom">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-700">Recommended for You</h2>
            <a href="#" className="text-sm font-medium hover:opacity-80" style={{color: '#269b59'}}>See All Recipes</a>
          </div>
          <div className="flex justify-center items-center gap-12">
            <div className="w-[200px] h-[250px] rounded-xl p-4 dark:border-gray-600 box-shadow-small flex flex-col">
              <img src="/recipes/lemonbuttergarlicsalmon.jpg" alt="Lemon Butter Garlic Salmon" className="w-full h-[150px] object-cover rounded-lg mb-4" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-700 line-clamp-2">Lemon Butter Garlic Salmon</p>
            </div>
            <div className="w-[200px] h-[250px] rounded-xl p-4 dark:border-gray-600 box-shadow-small flex flex-col">
              <img src="/recipes/marrymechicken.jpg" alt="Marry Me Chicken" className="w-full h-[150px] object-cover rounded-lg mb-4" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-700 line-clamp-2">Merry Me Chicken</p>
            </div>
            <div className="w-[200px] h-[250px] rounded-xl p-4 dark:border-gray-600 box-shadow-small flex flex-col">
              <img src="/recipes/creamypastacarbanara.jpg" alt="Creamy Pasta Carbonara" className="w-full h-[150px] object-cover rounded-lg mb-4" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-700 line-clamp-2">Creamy Pasta Carbonara</p>
            </div>
            <div className="w-[200px] h-[250px] rounded-xl p-4 dark:border-gray-600 box-shadow-small flex flex-col">
              <img src="/recipes/rainbowsalad.jpeg" alt="Rainbow Salad" className="w-full h-[150px] object-cover rounded-lg mb-4" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-700 line-clamp-2">Rainbow Salad</p>
            </div>
            <div className="w-[200px] h-[250px] rounded-xl p-4 dark:border-gray-600 box-shadow-small flex flex-col">
              <img src="/recipes/tuscanchickenpasta.jpg" alt="Creamy Tuscan Pasta" className="w-full h-[150px] object-cover rounded-lg mb-4" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-700 line-clamp-2">Creamy Tuscan Pasta</p>
            </div>
          </div>
        </div>
      </div>

      {/* Nutrition Profile Overview */}
      <div className="w-full">
        <div className="rounded-3xl p-6 dark:border-gray-700 bg-white/65 dark:bg-white/65 box-shadow-custom">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-700">Nutrition Profile</h2>
            <a href="/nutrition" className="text-sm font-medium hover:opacity-80" style={{color: '#269b59'}}>
              {nutritionProfile ? 'Edit Profile' : 'Set Up Profile'}
            </a>
          </div>
          
          {nutritionProfile ? (
            <div className="grid grid-cols-2 gap-6">
              {/* Daily Goals Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Daily Meal Goals</h3>
                <div className="space-y-3">
                  {nutritionProfile.caloriesLow && nutritionProfile.caloriesHigh && (
                    <div className="flex items-center justify-between p-3 rounded-lg" style={{backgroundColor: 'rgba(239, 68, 68, 0.1)'}}>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-700">Calories</span>
                      </div>
                      <span className="text-sm font-bold text-gray-700">{nutritionProfile.caloriesLow} - {nutritionProfile.caloriesHigh} kcal</span>
                    </div>
                  )}
                  {nutritionProfile.protein && (
                    <div className="flex items-center justify-between p-3 rounded-lg" style={{backgroundColor: 'rgba(147, 51, 234, 0.1)'}}>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-700">Protein</span>
                      </div>
                      <span className="text-sm font-bold text-gray-700">{nutritionProfile.protein}g</span>
                    </div>
                  )}
                  {nutritionProfile.carbs && (
                    <div className="flex items-center justify-between p-3 rounded-lg" style={{backgroundColor: 'rgba(234, 179, 8, 0.1)'}}>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-700">Carbs</span>
                      </div>
                      <span className="text-sm font-bold text-gray-700">{nutritionProfile.carbs}g</span>
                    </div>
                  )}
                  {nutritionProfile.fat && (
                    <div className="flex items-center justify-between p-3 rounded-lg" style={{backgroundColor: 'rgba(34, 197, 94, 0.1)'}}>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-700">Fat</span>
                      </div>
                      <span className="text-sm font-bold text-gray-700">{nutritionProfile.fat}g</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Dietary Preferences Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Dietary Preferences</h3>
                <div className="space-y-4">
                  {/* Allergies */}
                  {nutritionProfile.allergy && JSON.parse(nutritionProfile.allergy).length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-gray-600 mb-2">Allergies & Intolerances</p>
                      <div className="flex flex-wrap gap-2">
                        {JSON.parse(nutritionProfile.allergy).map((allergy: string, index: number) => (
                          <span key={index} className="px-3 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full">
                            {allergy}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Diet Preferences */}
                  {nutritionProfile.preference && JSON.parse(nutritionProfile.preference).length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-gray-600 mb-2">Diet Preferences</p>
                      <div className="flex flex-wrap gap-2">
                        {JSON.parse(nutritionProfile.preference).map((pref: string, index: number) => (
                          <span key={index} className="px-3 py-1 text-xs font-medium text-white rounded-full" style={{backgroundColor: '#269b59'}}>
                            {pref}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {(!nutritionProfile.allergy || JSON.parse(nutritionProfile.allergy).length === 0) && 
                   (!nutritionProfile.preference || JSON.parse(nutritionProfile.preference).length === 0) && (
                    <div className="flex items-center justify-center h-full text-sm text-gray-500">
                      No dietary restrictions set
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-gray-600 mb-4">You haven't set up your nutrition profile yet</p>
              <a 
                href="/nutrition" 
                className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition font-medium"
                style={{backgroundColor: '#269b59'}}
              >
                Set Up Nutrition Profile
              </a>
            </div>
          )}
        </div>
      </div>
   </main>
   </>
  )
};
