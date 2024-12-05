import type React from "react";
import { useState } from 'react';

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
  value: initialValue,
  onChange,
  placeholder,
  error,
  label,
}) => {
  const [localValue, setLocalValue] = useState(initialValue);
  const [previousValue, setPreviousValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);
  };

  if (previousValue !== initialValue) {
    setLocalValue(initialValue);
    setPreviousValue(initialValue);
  }

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={label} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        value={localValue}
        id={label}
        onChange={handleChange}
        placeholder={placeholder}
        className={`border rounded-md px-3 py-2 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <span data-testid="input-error" className="text-sm text-red-500">{error}</span>}
    </div>
  );
};
