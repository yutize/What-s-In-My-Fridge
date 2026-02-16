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
        className="block text-sm font-medium text-gray-700 dark:text-gray-700 mb-2"
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
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-200 dark:border-gray-300 dark:text-gray-800"
        />
        <span className="text-sm text-gray-700 dark:text-gray-700">{unit}</span>
      </div>
    </div>
  );
}
