interface CheckboxOptionProps {
  name: string;
  value: string;
  label: string;
}

export function CheckboxOption({ name, value, label }: CheckboxOptionProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        name={name}
        value={value}
        className="w-4 h-4 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 appearance-none cursor-pointer checked:bg-emerald-600 checked:border-emerald-600 focus:ring-2 focus:ring-emerald-500 transition-colors"
      />
      <span className="text-sm text-gray-700 dark:text-gray-200">{label}</span>
    </label>
  );
}
