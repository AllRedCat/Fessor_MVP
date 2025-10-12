
import React from 'react';
import { TextField as MuiInput, TextFieldProps } from '@mui/material';

const Input: React.FC<TextFieldProps> = (props) => {
  return <MuiInput {...props} />;
};

export default Input;
