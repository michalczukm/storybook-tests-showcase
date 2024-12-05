type SortOption<T extends string> = {
  value: T;
  label: string;
};

interface SortSelectorProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: SortOption<T>[];
  label?: string;
}

export const SortSelector = <T extends string>({
  value,
  onChange,
  options,
  label = "Sort by",
}: SortSelectorProps<T>) => {
  const selectId = "sort-select";

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={selectId} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="border border-gray-300 rounded-md px-3 py-2 pr-8 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
