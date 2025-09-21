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
    const [route, setRoute] = useState<string>();

    useEffect(() => {
        let names = user?.displayName?.split(' ');
        if (names && Array.isArray(names)) {
            const initials = names.map((n: string) => n[0]).join('');
            setLetters(initials);
        } else {
            setLetters('');
        }
    }, [user]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setRoute(window.location.pathname);
            console.log(window.location.pathname);
        }
    }, []);

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
        <div className="w-full flex justify-between items-center border-b border-black/10 dark:border-white/10 px-8 bg-white/10">
            <h1 className="text-2xl font-bold">Fessor</h1>
            <div className='flex justify-center items-center gap-4'>
                <button
                    className={`cursor-pointer hover:text-black/50 dark:hover:text-white/50
                    p-5 border-b-4 ${route === '/dashboard' ? 'border-black dark:border-white font-bold' : 'border-transparent'}`}
                    onClick={() => window.location.href = "/dashboard"}
                >
                    Dashboard
                </button>
                <button
                    className={`cursor-pointer hover:text-black/50 dark:hover:text-white/50
                    p-5 border-b-4 ${route === '/chat' ? 'border-black dark:border-white font-bold' : 'border-transparent'}`}
                    onClick={() => window.location.href = "/chat"}
                >
                    Chat IA
                </button>
                <button
                    className={`cursor-pointer hover:text-black/50 dark:hover:text-white/50
                    p-5 border-b-4 ${route === '/reports' ? 'border-black dark:border-white font-bold' : 'border-transparent'}`}
                    onClick={() => window.location.href = "/reports"}
                >
                    Relatórios
                </button>
            </div>
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
                    {/* // TODO: paginas para gestão de usuário */}
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleLogout}>Sair</MenuItem>
                </Menu>
            </Stack>
        </div>
    )
}