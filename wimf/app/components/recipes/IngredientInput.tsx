import { useState } from "react";

interface IngredientInputProps {
  ingredients: string[];
  onIngredientsChange: (ingredients: string[]) => void;
}

export function IngredientInput({ ingredients, onIngredientsChange }: IngredientInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAddIngredient = () => {
    if (inputValue.trim() && !ingredients.includes(inputValue.trim())) {
      onIngredientsChange([...ingredients, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveIngredient = (index: number) => {
    onIngredientsChange(ingredients.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  return (
    <div>
      {/* Ingredient Input */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter an ingredient (e.g., chicken, rice)"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-200 dark:border-gray-300 dark:text-gray-800"
        />
        <button
          type="button"
          onClick={handleAddIngredient}
          className="px-6 py-3 text-white rounded-lg transition-colors font-medium bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-800 dark:hover:bg-emerald-700"
        >
          Add
        </button>
      </div>

      {/* Ingredient Tags */}
      {ingredients.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-700 dark:text-gray-700 mb-2">
            Selected Ingredients:
          </p>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
              >
                {ingredient}
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  className="hover:text-red-600 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
