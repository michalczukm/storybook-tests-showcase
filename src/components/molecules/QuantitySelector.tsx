import type React from "react";
import { Button } from "../atoms/Button";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value,
  onChange,
  min = 0,
  max = Number.POSITIVE_INFINITY,
  disabled = false,
}) => {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="secondary"
        size="sm"
        onClick={handleDecrease}
        disabled={disabled || value <= min}
      >
        -
      </Button>

      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
        className="w-16 text-center border rounded-md py-1 px-2 disabled:bg-gray-100"
        min={min}
        max={max}
      />

      <Button
        variant="secondary"
        size="sm"
        onClick={handleIncrease}
        disabled={disabled || value >= max}
      >
        +
      </Button>
    </div>
  );
};
