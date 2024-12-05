import type React from "react";

interface InputProps {
  type?: "text" | "number" | "email" | "password";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  label?: string;
}

export const Input: React.FC<InputProps> = ({
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  label,
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={label} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`border rounded-md px-3 py-2 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};
