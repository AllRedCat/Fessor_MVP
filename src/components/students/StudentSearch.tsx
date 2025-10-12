
import React from 'react';
import { Input } from '@/components/ui';

interface StudentSearchProps {
  onSearch: (query: string) => void;
}

const StudentSearch: React.FC<StudentSearchProps> = ({ onSearch }) => {
  return (
    <Input
      label="Search Students"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default StudentSearch;
