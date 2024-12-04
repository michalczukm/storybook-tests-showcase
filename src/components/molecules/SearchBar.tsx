import type React from "react";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = "Search products...",
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="flex-1">
        <Input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
      <Button type="submit" variant="primary">
        Search
      </Button>
    </form>
  );
};
