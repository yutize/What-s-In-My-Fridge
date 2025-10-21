import { Form } from "react-router";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import { Navbar } from "~/components/navbar/navbar";

export function Dashboard( { user }: { user: any }) {
  return (
    <>
   <Navbar />

    <main className="flex flex-col items-center px-6 py-8 gap-6 max-w-[1400px] mx-auto">
      {/* Welcome Banner */}
      <div className="w-full">
        <div className="rounded-3xl border border-gray-200 p-8 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Welcome back, {user}!</h1>
          <h2 className="text-xl text-gray-600 dark:text-gray-400">Ready to create something delicious today?</h2>
        </div>
      </div>

      {/* My Fridge & This Week's Meals Row */}
      <div className="w-full grid grid-cols-2 gap-6">
        {/* My Fridge */}
        <div className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg flex flex-col h-[300px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">My Fridge</h2>
            <a href="#" className="text-sm text-blue-600 hover:underline dark:text-blue-400">View All</a>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ul>
              <li>test</li>
              <li>test</li>
              <li>test</li>
            </ul>
          </div>
        </div>

        {/* This Week's Meals */}
        <div className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg flex flex-col h-[300px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">This Week's Meals</h2>
            <a href="#" className="text-sm text-blue-600 hover:underline dark:text-blue-400">View All</a>
          </div>
          <div className="flex-1 overflow-y-auto space-y-3">
            <div className="flex items-center gap-3">
              <span className="bg-teal-500 text-white px-3 py-1 rounded text-sm font-medium">Mon</span>
              <span className="text-gray-700 dark:text-gray-300">Merry Me Chicken</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-yellow-500 text-white px-3 py-1 rounded text-sm font-medium">Tue</span>
              <span className="text-gray-700 dark:text-gray-300">Creamy Pasta Carbonara</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium">Wed</span>
              <span className="text-gray-700 dark:text-gray-300">Rainbow Salad</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended for You */}
      <div className="w-full">
        <div className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Recommended for You</h2>
            <a href="#" className="text-sm text-blue-600 hover:underline dark:text-blue-400">See All Recipes</a>
          </div>
          <div className="flex gap-4 overflow-x-auto">
            <div className="min-w-[200px] rounded-xl border border-gray-200 p-4 dark:border-gray-600">
              <div className="w-full h-[150px] bg-gray-200 dark:bg-gray-700 rounded-lg mb-2"></div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Merry Me Chicken</p>
            </div>
            <div className="min-w-[200px] rounded-xl border border-gray-200 p-4 dark:border-gray-600">
              <div className="w-full h-[150px] bg-gray-200 dark:bg-gray-700 rounded-lg mb-2"></div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Creamy Pasta Carbonara</p>
            </div>
            <div className="min-w-[200px] rounded-xl border border-gray-200 p-4 dark:border-gray-600">
              <div className="w-full h-[150px] bg-gray-200 dark:bg-gray-700 rounded-lg mb-2"></div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Rainbow Salad</p>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Nutrition & Quick Actions Row */}
      <div className="w-full grid grid-cols-2 gap-6">
        {/* Today's Nutrition */}
        <div className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg h-[300px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Today's Nutrition</h2>
            <a href="#" className="text-sm text-blue-600 hover:underline dark:text-blue-400">View Details</a>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-red-500 h-2 rounded"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Calories</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-purple-500 h-2 rounded"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Protein</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-yellow-500 h-2 rounded"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Carbs</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-green-500 h-2 rounded"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Fat</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg h-[300px]">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-[100px]"></div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-[100px]"></div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-[100px]"></div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-[100px]"></div>
          </div>
        </div>
      </div>
   </main>
   </>
  )
};
