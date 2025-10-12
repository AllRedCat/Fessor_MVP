
import React from 'react';
import { Pagination as MuiPagination, PaginationProps } from '@mui/material';

const Pagination: React.FC<PaginationProps> = (props) => {
  return <MuiPagination {...props} />;
};

export default Pagination;
