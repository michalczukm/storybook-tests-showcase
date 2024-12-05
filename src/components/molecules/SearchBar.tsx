import type React from "react";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { useCallback, useState } from "react";

interface SearchBarProps {
  value: string;
  onSearch: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value: initialValue,
  onSearch,
  placeholder = "Search products...",
}) => {
  const [prevValue, setPrevValue] = useState(initialValue);
  const [value, setValue] = useState(initialValue);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSearch(value);
    },
    [onSearch, value],
  );

  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  if (prevValue !== initialValue) {
    setPrevValue(initialValue);
    setValue(initialValue);
  }

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
