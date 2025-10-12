
import React from 'react';
import { Card as MuiCard, CardProps } from '@mui/material';

const Card: React.FC<CardProps> = (props) => {
  return <MuiCard {...props} />;
};

export default Card;
