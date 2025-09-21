"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function NavBar() {
    const { user, logout } = useAuth();

    const [letters, setLetters] = useState<string>();

    useEffect(() => {
        let names = user?.displayName?.split(' ');
        console.log(names);

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
        <div className="w-full flex justify-between items-center border-b py-4 px-8 bg-white/10">
            <h1 className="text-2xl font-bold">Fessor</h1>
            <Stack direction="row" spacing={2} className='flex items-center'>
                <span className=''>
                    Olá, {user?.displayName || user?.email}
                </span>
                <button
                    className='cursor-pointer'
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <Avatar>{letters}</Avatar>
                </button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                        list: {
                            'aria-labelledby': 'basic-button',
                        },
                    }}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleLogout}>Sair</MenuItem>
                </Menu>
            </Stack>
        </div>
    )
}