
import { ProtectedRoute } from '@/components/protected-route';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Box, CssBaseline, Toolbar } from '@mui/material';

export default function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ProtectedRoute>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Header />
                <Sidebar />
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                >
                    <Toolbar />
                    {children}
                </Box>
            </Box>
        </ProtectedRoute>
    );
}