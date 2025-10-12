
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface StudentProfileProps {
  name: string;
  age: number;
  className: string;
  observations: string;
  // Add more fields as needed from the database schema
}

const StudentProfile: React.FC<StudentProfileProps> = (props) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">{props.name}</Typography>
        <Typography variant="h6">{props.age} years old</Typography>
        <Typography variant="subtitle1">Class: {props.className}</Typography>
        <Typography variant="body1">{props.observations}</Typography>
      </CardContent>
    </Card>
  );
};

export default StudentProfile;
