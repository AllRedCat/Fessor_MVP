
import React from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';

interface ReportCardProps {
  studentName: string;
  date: string;
  summary: string;
  onView: () => void;
  onEdit: () => void;
  onDownload: () => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ studentName, date, summary, onView, onEdit, onDownload }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{studentName}</Typography>
        <Typography color="text.secondary">{date}</Typography>
        <Typography variant="body2">{summary}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onView}>View</Button>
        <Button size="small" onClick={onEdit}>Edit</Button>
        <Button size="small" onClick={onDownload}>Download PDF</Button>
      </CardActions>
    </Card>
  );
};

export default ReportCard;
