import type React from "react";

type SortOption = {
  value: string;
  label: string;
};

interface SortSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: SortOption[];
  label?: string;
}

export const SortSelector: React.FC<SortSelectorProps> = ({
  value,
  onChange,
  options,
  label = "Sort by",
}) => {
  const selectId = "sort-select";

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={selectId} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
