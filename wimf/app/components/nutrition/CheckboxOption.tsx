interface CheckboxOptionProps {
  name: string;
  value: string;
  label: string;
  defaultChecked?: boolean;
}

export function CheckboxOption({ name, value, label, defaultChecked }: CheckboxOptionProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="w-4 h-4 border border-gray-300 rounded bg-gray-100 appearance-none cursor-pointer checked:bg-green-600 checked:border-green-600 focus:ring-2 focus:ring-green-500"
      />
      <span className="text-sm text-gray-700 dark:text-gray-700">{label}</span>
    </label>
  );
}
