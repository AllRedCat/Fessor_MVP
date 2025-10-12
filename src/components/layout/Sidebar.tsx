'use client';

import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Home, People, Description, Chat } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const drawerWidth = 240;

const Sidebar: React.FC = () => {
  const router = useRouter();

  const menuItems = [
    { text: 'Dashboard', icon: <Home />, path: '/dashboard' },
    { text: 'Alunos', icon: <People />, path: '/students' },
    { text: 'Relatórios', icon: <Description />, path: '/reports' },
    { text: 'Chat IA', icon: <Chat />, path: '/chat' },
  ];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding onClick={() => router.push(item.path)}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;