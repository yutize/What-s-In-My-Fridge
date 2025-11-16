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
        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
    </label>
  );
}
