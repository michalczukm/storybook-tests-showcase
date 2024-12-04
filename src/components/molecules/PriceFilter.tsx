import React from 'react';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';

interface PriceFilterProps {
  minPrice: string;
  maxPrice: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
  onApply: () => void;
  onReset: () => void;
}

export const PriceFilter: React.FC<PriceFilterProps> = ({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
  onApply,
  onReset
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply();
  };

  return (
    <form onSubmit={handleSubmit} className="w-64 p-4 border rounded-lg bg-white">
      <h3 className="text-lg font-semibold mb-4">Price Range</h3>
      
      <div className="space-y-4">
        <div>
          <Input
            type="number"
            value={minPrice}
            onChange={onMinChange}
            placeholder="Min price"
            label="Minimum"
          />
        </div>
        
        <div>
          <Input
            type="number"
            value={maxPrice}
            onChange={onMaxChange}
            placeholder="Max price"
            label="Maximum"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={onReset}
          >
            Reset
          </Button>
          <Button
            type="submit"
            variant="primary"
          >
            Apply
          </Button>
        </div>
      </div>
    </form>
  );
}; 