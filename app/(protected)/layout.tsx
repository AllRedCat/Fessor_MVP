import NavBar from '@/components/navbar';
import { ProtectedRoute } from '@/components/protected-route';

export default function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ProtectedRoute>
            <NavBar />
            {children}
        </ProtectedRoute>
    );
}