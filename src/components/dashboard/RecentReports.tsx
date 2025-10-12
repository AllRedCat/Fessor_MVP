
import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

// Mock data, replace with actual data from your backend
const recentReports = [
  { id: 1, studentName: 'John Doe', date: '2025-10-01', summary: 'Good progress in math.' },
  { id: 2, studentName: 'Jane Smith', date: '2025-09-28', summary: 'Needs to improve participation.' },
];

const RecentReports: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recent Reports
        </Typography>
        <List>
          {recentReports.map((report) => (
            <ListItem key={report.id}>
              <ListItemText
                primary={report.studentName}
                secondary={`${report.date} - ${report.summary}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RecentReports;
