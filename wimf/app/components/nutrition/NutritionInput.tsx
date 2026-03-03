interface NutritionInputProps {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  unit: string;
  defaultValue?: string;
}

export function NutritionInput({ label, id, name, placeholder, unit, defaultValue }: NutritionInputProps) {
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
          defaultValue={defaultValue}
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
        />
        <span className="text-sm text-gray-700 dark:text-gray-200">{unit}</span>
      </div>
    </div>
  );
}
