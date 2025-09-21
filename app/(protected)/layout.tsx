import NavBar from '@/components/navbar';

export default function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen">
            <NavBar />
            {children}
        </div>
    );
}