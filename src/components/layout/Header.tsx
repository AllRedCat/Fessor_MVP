
'use client';

import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Menu, MenuItem, Stack } from '@mui/material';
import { useAuth } from '@/contexts/auth-context';

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const [letters, setLetters] = useState<string>();

    useEffect(() => {
        let names = user?.displayName?.split(' ');
        if (names && Array.isArray(names)) {
            const initials = names.map((n: string) => n[0]).join('');
            setLetters(initials);
        } else {
            setLetters('');
        }
    }, [user]);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    Fessor
                </Typography>
                <Stack direction="row" spacing={2} className='flex items-center'>
                    <Typography>Olá, {user?.displayName || user?.email}</Typography>
                    <button
                        className='cursor-pointer'
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <Avatar sx={{ bgcolor: 'deepskyblue'}}>{letters}</Avatar>
                    </button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => window.location.href = "/profile"}>Perfil</MenuItem>
                        <MenuItem onClick={handleLogout}>Sair</MenuItem>
                    </Menu>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
