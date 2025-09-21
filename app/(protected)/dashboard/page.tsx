'use client';

import { ProtectedRoute } from '@/components/protected-route';
import { useAuth } from '@/contexts/auth-context';

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <DashboardContent />
        </ProtectedRoute>
    );
}

function DashboardContent() {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">
                                Olá, {user?.displayName || user?.email}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Sair
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                Bem-vindo ao Fessor!
                            </h2>
                            <p className="text-gray-600">
                                Sistema de relatórios escolares com IA
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}