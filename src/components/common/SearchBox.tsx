
import React from 'react';
import { Input } from '@/components/ui';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  label?: string;
  placeholder?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, label = "Search", placeholder = "" }) => {
  return (
    <Input
      label={label}
      placeholder={placeholder}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBox;
