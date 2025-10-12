
import React from 'react';
import { Select as MuiSelect, SelectProps } from '@mui/material';

const Select: React.FC<SelectProps> = (props) => {
  return <MuiSelect {...props} />;
};

export default Select;
