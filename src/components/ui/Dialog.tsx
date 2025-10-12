
import React from 'react';
import { Dialog as MuiDialog, DialogProps } from '@mui/material';

const Dialog: React.FC<DialogProps> = (props) => {
  return <MuiDialog {...props} />;
};

export default Dialog;
