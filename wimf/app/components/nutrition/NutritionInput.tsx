interface NutritionInputProps {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  unit: string;
}

export function NutritionInput({ label, id, name, placeholder, unit }: NutritionInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
      >
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          id={id}
          name={name}
          placeholder={placeholder}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <span className="text-sm text-gray-600 dark:text-gray-400">{unit}</span>
      </div>
    </div>
  );
}
