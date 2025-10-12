
import React from 'react';
import { Table as MuiTable, TableProps } from '@mui/material';

const Table: React.FC<TableProps> = (props) => {
  return <MuiTable {...props} />;
};

export default Table;
