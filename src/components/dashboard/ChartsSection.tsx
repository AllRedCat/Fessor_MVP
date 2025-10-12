
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ChartsSection: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Charts
        </Typography>
        <Typography color="text.secondary">
          Charts will be displayed here.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ChartsSection;
