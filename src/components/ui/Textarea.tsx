
import React from 'react';
import { TextField as MuiTextarea, TextFieldProps } from '@mui/material';

const Textarea: React.FC<TextFieldProps> = (props) => {
  return <MuiTextarea multiline {...props} />;
};

export default Textarea;
