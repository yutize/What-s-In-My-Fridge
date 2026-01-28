import { Form } from "react-router";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import { Navbar } from "~/components/navbar/navbar";

export function Dashboard( { user }: { user: any }) {
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

        {/* This Week's Meals */}
        <div className="rounded-3xl p-6 dark:border-gray-700 bg-white/65 dark:bg-white/65 box-shadow-custom flex flex-col h-[300px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-700">This Week's Meals</h2>
            <a href="#" className="text-sm font-medium hover:opacity-80" style={{color: '#269b59'}}>View All</a>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2" style={{scrollbarWidth: 'thin', scrollbarColor: 'rgba(38, 155, 89, 0.5) transparent'}}>
            <div className="flex items-center gap-4 h-[55px] rounded-lg p-5" style={{backgroundColor: 'rgba(20, 184, 166, 0.2)'}}>
              <span className="bg-teal-500 text-white px-3 py-1 rounded text-sm font-medium w-[55px] flex items-center justify-center flex-shrink-0">Mon</span>
              <div className="flex-1 min-w-0">
                <p className="text-gray-700 dark:text-gray-700 line-clamp-1">Marry Me Chicken</p>
                <p className="text-xs text-gray-500">Dinner • 450 kcal</p>
              </div>
              <img src="/recipes/marrymechicken.jpg" alt="Marry Me Chicken" className="w-[45px] h-[45px] object-cover rounded flex-shrink-0" />
            </div>
            <div className="flex items-center gap-4 h-[55px] rounded-lg p-5" style={{backgroundColor: 'rgba(234, 179, 8, 0.2)'}}>
              <span className="bg-yellow-500 text-white px-3 py-1 rounded text-sm font-medium w-[55px] flex items-center justify-center flex-shrink-0">Tue</span>
              <div className="flex-1 min-w-0">
                <p className="text-gray-700 dark:text-gray-700 line-clamp-1">Creamy Pasta Carbonara</p>
                <p className="text-xs text-gray-500">Dinner • 520 kcal</p>
              </div>
              <img src="/recipes/creamypastacarbanara.jpg" alt="Creamy Pasta Carbonara" className="w-[45px] h-[45px] object-cover rounded flex-shrink-0" />
            </div>
            <div className="flex items-center gap-4 h-[55px] rounded-lg p-5" style={{backgroundColor: 'rgba(59, 130, 246, 0.2)'}}>
              <span className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium w-[55px] flex items-center justify-center flex-shrink-0">Wed</span>
              <div className="flex-1 min-w-0">
                <p className="text-gray-700 dark:text-gray-700 line-clamp-1">Rainbow Salad</p>
                <p className="text-xs text-gray-500">Lunch • 150 kcal</p>
              </div>
              <img src="/recipes/rainbowsalad.jpeg" alt="Rainbow Salad" className="w-[45px] h-[45px] object-cover rounded flex-shrink-0" />
            </div>
            <div className="flex items-center gap-4 h-[55px] rounded-lg p-5" style={{backgroundColor: 'rgba(147, 51, 234, 0.2)'}}>
              <span className="bg-purple-500 text-white px-3 py-1 rounded text-sm font-medium w-[55px] flex items-center justify-center flex-shrink-0">Thu</span>
              <div className="flex-1 min-w-0">
                <p className="text-gray-700 dark:text-gray-700 line-clamp-1">Lemon Butter Garlic Salmon</p>
                <p className="text-xs text-gray-500">Dinner • 460 kcal</p>
              </div>
              <img src="/recipes/lemonbuttergarlicsalmon.jpg" alt="Lemon Butter Garlic Salmon" className="w-[45px] h-[45px] object-cover rounded flex-shrink-0" />
            </div>
            <div className="flex items-center gap-4 h-[55px] rounded-lg p-5" style={{backgroundColor: 'rgba(236, 72, 153, 0.2)'}}>
              <span className="bg-pink-500 text-white px-3 py-1 rounded text-sm font-medium w-[55px] flex items-center justify-center flex-shrink-0">Fri</span>
              <div className="flex-1 min-w-0">
                <p className="text-gray-700 dark:text-gray-700 line-clamp-1">Creamy Tuscan Pasta</p>
                <p className="text-xs text-gray-500">Dinner • 480 kcal</p>
              </div>
              <img src="/recipes/tuscanchickenpasta.jpg" alt="Creamy Tuscan Pasta" className="w-[45px] h-[45px] object-cover rounded flex-shrink-0" />
            </div>
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

      {/* Today's Nutrition & Quick Actions Row */}
      <div className="w-full grid grid-cols-2 gap-6">
        {/* Today's Nutrition */}
        <div className="rounded-3xl p-6 dark:border-gray-700 bg-white/65 dark:bg-white/65 box-shadow-custom h-[300px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-700">Today's Nutrition</h2>
            <a href="#" className="text-sm font-medium hover:opacity-80" style={{color: '#269b59'}}>View Details</a>
          </div>
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-red-500 h-2 rounded"></div>
              <span className="text-sm text-gray-700 dark:text-gray-700">Calories</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-purple-500 h-2 rounded"></div>
              <span className="text-sm text-gray-700 dark:text-gray-700">Protein</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-yellow-500 h-2 rounded"></div>
              <span className="text-sm text-gray-700 dark:text-gray-700">Carbs</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-green-500 h-2 rounded"></div>
              <span className="text-sm text-gray-700 dark:text-gray-700">Fat</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-3xl p-6 dark:border-gray-700 bg-white/65 dark:bg-white/65 box-shadow-custom h-[300px] flex flex-col">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-700 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-2 flex-1 auto-rows-fr">
            <a href="/nutrition" className="rounded-lg flex items-center justify-center hover:opacity-90 transition" style={{backgroundColor: '#269b59'}}>
              <span className="text-white font-medium text-center px-4">Daily Nutrition</span>
            </a>
            <a href="/nutrition" className="rounded-lg flex items-center justify-center hover:opacity-90 transition" style={{backgroundColor: '#269b59'}}>
              <span className="text-white font-medium text-center px-4">Allergies & Tolerances</span>
            </a>
            <a href="/recipes" className="rounded-lg flex items-center justify-center hover:opacity-90 transition" style={{backgroundColor: '#269b59'}}>
              <span className="text-white font-medium text-center px-4">Recipe Search</span>
            </a>
            <a href="/recipes" className="rounded-lg flex items-center justify-center hover:opacity-90 transition" style={{backgroundColor: '#269b59'}}>
              <span className="text-white font-medium text-center px-4">Recipe Results</span>
            </a>
          </div>
        </div>
      </div>
   </main>
   </>
  )
};
