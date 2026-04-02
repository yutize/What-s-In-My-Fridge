import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";

export function About() {
  return (
    <>
      <main className="flex items-center justify-center pt-8 pb-8 px-4">
        <div className="max-w-4xl w-full">
          <div className="flex flex-col items-center gap-8">
            <header className="flex flex-col items-center gap-6">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                About What's In My Fridge
              </h1>
            </header>

            <div className="w-full space-y-6">
              <div className="rounded-3xl border border-gray-200 p-8 dark:border-gray-700 bg-white/65 dark:bg-white/65 box-shadow-custom">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">What We Do</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  What's In My Fridge is your intelligent kitchen companion that helps you make the most of what you have. 
                  No more wasting food or wondering what to cook for dinner—our app transforms your ingredients into 
                  delicious meal possibilities.
                </p>
              </div>

              <div className="rounded-3xl border border-gray-200 p-8 dark:border-gray-700 bg-white/65 dark:bg-white/65 box-shadow-custom">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Features</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <span className="text-2xl">🥗</span>
                      Smart Inventory Management
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Keep track of everything in your fridge with our easy-to-use inventory system. Organize ingredients 
                      by category, track quantities and units, and monitor expiration dates to reduce food waste.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <span className="text-2xl">🍳</span>
                      AI-Powered Recipe Discovery
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Find recipes based on what you already have! Our recipe search automatically suggests meals using 
                      your fridge ingredients, or search with custom ingredients. Save your favorites for easy access later.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <span className="text-2xl">📊</span>
                      Personalized Nutrition Tracking
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Create and manage multiple nutrition profiles tailored to your dietary needs. Set calorie ranges, 
                      protein/carb/fat goals, dietary preferences (vegan, vegetarian, etc.), and track allergies. 
                      Recipe searches automatically filter based on your active profile.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <span className="text-2xl">🤖</span>
                      AI Nutrition Assistant
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Our AI assistant helps users estimate macro targets and nutrition goals from information 
                      they provide, such as activity level, goals, and dietary preferences. The assistant can suggest 
                      calories, protein, carbs, and fats, then help apply those values directly to your nutrition profile.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <span className="text-2xl">📱</span>
                      Dashboard Overview
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Your personalized dashboard gives you a quick view of saved recipes, active nutrition goals, 
                      and current fridge inventory—all in one place. Switch between nutrition profiles instantly 
                      to match different family members or dietary plans.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-gray-200 p-8 dark:border-gray-700 bg-white/65 dark:bg-white/65 box-shadow-custom">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">How It Works</h2>
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li className="leading-relaxed">
                    <strong>Add Your Ingredients:</strong> Input what's in your fridge with quantities, units, and optional expiration dates
                  </li>
                  <li className="leading-relaxed">
                    <strong>Set Your Nutrition Profile:</strong> Configure your dietary preferences, allergies, and nutritional goals
                  </li>
                  <li className="leading-relaxed">
                    <strong>Use AI Nutrition Guidance:</strong> Chat with the assistant to calculate suggested macro targets based on your inputs
                  </li>
                  <li className="leading-relaxed">
                    <strong>Discover Recipes:</strong> Use your inventory to automatically find matching recipes, or search with custom ingredients
                  </li>
                  <li className="leading-relaxed">
                    <strong>Save & Track:</strong> Save your favorite recipes and monitor your fridge inventory to stay organized
                  </li>
                </ol>
              </div>

              <div className="rounded-3xl border border-gray-200 p-8 dark:border-gray-700 bg-white/65 dark:bg-white/65 box-shadow-custom">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Built With</h2>
                <p className="text-gray-700 leading-relaxed">
                  This application is built with modern web technologies including React Router, TypeScript, 
                  SQLite for data persistence, and the Edamam Recipe Search API for comprehensive recipe data. 
                  Our goal is to provide a fast, reliable, and user-friendly experience for managing your kitchen.
                </p>
              </div>

              <div className="text-center">
                <a
                  href="/"
                  className="inline-block px-8 py-3 text-white rounded-lg transition font-medium text-lg hover:opacity-90"
                  style={{ backgroundColor: '#269b59' }}
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}