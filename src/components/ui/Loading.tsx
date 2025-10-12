
import React from 'react';
import { CircularProgress, CircularProgressProps } from '@mui/material';

const Loading: React.FC<CircularProgressProps> = (props) => {
  return <CircularProgress {...props} />;
};

export default Loading;
