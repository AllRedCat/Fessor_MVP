
import React from 'react';
import ReportCard from './ReportCard';
import { Grid } from '@mui/material';

// Mock data
const reports = [
  { id: 1, studentName: 'John Doe', date: '2025-10-01', summary: 'Good progress in math.' },
  { id: 2, studentName: 'Jane Smith', date: '2025-09-28', summary: 'Needs to improve participation.' },
];

const ReportList: React.FC = () => {
  return (
    <Grid container spacing={2}>
      {reports.map((report) => (
        <Grid item xs={12} sm={6} md={4} key={report.id}>
          <ReportCard
            studentName={report.studentName}
            date={report.date}
            summary={report.summary}
            onView={() => console.log('View report', report.id)}
            onEdit={() => console.log('Edit report', report.id)}
            onDownload={() => console.log('Download report', report.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ReportList;
