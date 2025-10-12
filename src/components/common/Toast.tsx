
import React from 'react';
import { Snackbar, Alert, SnackbarProps, AlertColor } from '@mui/material';

interface ToastProps extends SnackbarProps {
  message: string;
  severity: AlertColor;
}

const Toast: React.FC<ToastProps> = ({ message, severity, ...props }) => {
  return (
    <Snackbar {...props}>
      <Alert severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
