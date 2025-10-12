
import React from 'react';
import StudentCard from './StudentCard';
import { Grid } from '@mui/material';

// Mock data
const students = [
  { id: 1, name: 'John Doe', age: 14, className: '8th A' },
  { id: 2, name: 'Jane Smith', age: 15, className: '9th B' },
];

const StudentList: React.FC = () => {
  return (
    <Grid container spacing={2}>
      {students.map((student) => (
        <Grid item xs={12} sm={6} md={4} key={student.id}>
          <StudentCard
            name={student.name}
            age={student.age}
            className={student.className}
            onViewProfile={() => console.log('View profile', student.id)}
            onEdit={() => console.log('Edit student', student.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default StudentList;
