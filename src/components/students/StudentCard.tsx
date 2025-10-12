
import React from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';

interface StudentCardProps {
  name: string;
  age: number;
  className: string;
  onViewProfile: () => void;
  onEdit: () => void;
}

const StudentCard: React.FC<StudentCardProps> = ({ name, age, className, onViewProfile, onEdit }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography color="text.secondary">{age} years old</Typography>
        <Typography variant="body2">Class: {className}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onViewProfile}>View Profile</Button>
        <Button size="small" onClick={onEdit}>Edit</Button>
      </CardActions>
    </Card>
  );
};

export default StudentCard;
