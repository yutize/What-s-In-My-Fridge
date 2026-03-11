import { Navbar } from "~/components/navbar/navbar";
import { useTheme } from "~/context/ThemeContext";
import { useState, useEffect } from "react";

export function Settings() {
  const { theme, setTheme } = useTheme();
  
  // Profile Settings State
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [newAllergy, setNewAllergy] = useState("");
  
  // Load saved preferences
  useEffect(() => {
    const savedPreferences = localStorage.getItem("dietaryPreferences");
    const savedAllergies = localStorage.getItem("allergies");
    
    if (savedPreferences) {
      setDietaryPreferences(JSON.parse(savedPreferences));
    }
    if (savedAllergies) {
      setAllergies(JSON.parse(savedAllergies));
    }
  }, []);

  // Save preferences
  const handleDietaryChange = (preference: string) => {
    const updated = dietaryPreferences.includes(preference)
      ? dietaryPreferences.filter((p) => p !== preference)
      : [...dietaryPreferences, preference];
    
    setDietaryPreferences(updated);
    localStorage.setItem("dietaryPreferences", JSON.stringify(updated));
  };

  const addAllergy = () => {
    if (newAllergy.trim() && !allergies.includes(newAllergy.trim())) {
      const updated = [...allergies, newAllergy.trim()];
      setAllergies(updated);
      localStorage.setItem("allergies", JSON.stringify(updated));
      setNewAllergy("");
    }
  };

  const removeAllergy = (allergy: string) => {
    const updated = allergies.filter((a) => a !== allergy);
    setAllergies(updated);
    localStorage.setItem("allergies", JSON.stringify(updated));
  };

  const dietaryOptions = [
    "Vegetarian",
    "Vegan",
    "Pescatarian",
    "Gluten-Free",
    "Dairy-Free",
    "Keto",
    "Paleo",
    "Low-Carb",
    "High-Protein",
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Settings</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your preferences and account settings
            </p>
          </div>

          <div className="space-y-6">
            {/* Appearance Settings */}
            <section className="bg-white dark:bg-gray-700 rounded-2xl shadow-sm p-6 transition-colors duration-200">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Appearance
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-200">Theme</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Choose your preferred color scheme
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTheme("light")}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        theme === "light"
                          ? "bg-emerald-600 text-white shadow-md"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      Light
                    </button>
                    <button
                      onClick={() => setTheme("dark")}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        theme === "dark"
                          ? "bg-emerald-600 text-white shadow-md"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      Dark
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Dietary Preferences */}
            <section className="bg-white dark:bg-gray-700 rounded-2xl shadow-sm p-6 transition-colors duration-200">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Dietary Preferences
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {dietaryOptions.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={dietaryPreferences.includes(option)}
                      onChange={() => handleDietaryChange(option)}
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </section>

            {/* Allergies & Restrictions */}
            <section className="bg-white dark:bg-gray-700 rounded-2xl shadow-sm p-6 transition-colors duration-200">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Allergies & Food Restrictions
              </h2>
              
              <div className="space-y-4">
                {/* Add Allergy Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newAllergy}
                    onChange={(e) => setNewAllergy(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addAllergy()}
                    placeholder="Add an allergy or restriction..."
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-500 rounded-lg bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    onClick={addAllergy}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Add
                  </button>
                </div>

                {/* Allergies List */}
                {allergies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {allergies.map((allergy) => (
                      <div
                        key={allergy}
                        className="flex items-center gap-2 px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full"
                      >
                        <span className="text-sm font-medium">{allergy}</span>
                        <button
                          onClick={() => removeAllergy(allergy)}
                          className="hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {allergies.length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                    No allergies or restrictions added yet
                  </p>
                )}
              </div>
            </section>

            {/* Account Settings */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 transition-colors duration-200">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Account
              </h2>
              
              <div className="space-y-4">
                <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                  <p className="font-medium text-gray-700 dark:text-gray-200">Change Password</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Update your account password
                  </p>
                </button>
                
                <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                  <p className="font-medium text-gray-700 dark:text-gray-200">Email Preferences</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Manage notification settings
                  </p>
                </button>
                
                <button className="w-full text-left px-4 py-3 rounded-lg border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                  <p className="font-medium text-red-600 dark:text-red-400">Delete Account</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Permanently delete your account and data
                  </p>
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
