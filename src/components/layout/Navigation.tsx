
import React from 'react';
import Link from 'next/link';
import { List, ListItem, ListItemText } from '@mui/material';

const Navigation: React.FC = () => {
  return (
    <List>
      <ListItem component={Link} href="/dashboard">
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem component={Link} href="/alunos">
        <ListItemText primary="Alunos" />
      </ListItem>
      <ListItem component={Link} href="/relatorios">
        <ListItemText primary="Relatórios" />
      </ListItem>
    </List>
  );
};

export default Navigation;
