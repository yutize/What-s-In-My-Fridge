interface CheckboxOptionProps {
  name: string;
  value: string;
  label: string;
  // Uncontrolled
  defaultChecked?: boolean;
  // Controlled
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function CheckboxOption({
  name,
  value,
  label,
  defaultChecked,
  checked,
  onChange,
}: CheckboxOptionProps) {
  const isControlled = checked !== undefined && onChange !== undefined;

  return (
    <label className="flex items-center gap-2 cursor-pointer">
      {isControlled ? (
        <input
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 appearance-none cursor-pointer checked:bg-emerald-600 checked:border-emerald-600 focus:ring-2 focus:ring-emerald-500 transition-colors"
        />
      ) : (
        <input
          type="checkbox"
          name={name}
          value={value}
          defaultChecked={defaultChecked}
          className="w-4 h-4 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 appearance-none cursor-pointer checked:bg-emerald-600 checked:border-emerald-600 focus:ring-2 focus:ring-emerald-500 transition-colors"
        />
      )}
      <span className="text-sm text-gray-700 dark:text-gray-200">{label}</span>
    </label>
  );
}
