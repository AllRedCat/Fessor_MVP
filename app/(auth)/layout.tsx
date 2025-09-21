export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-indigo-900 ">
            <h1 className="text-5xl font-bold mb-4">Fessor</h1>
            <div className="mb-6">
                <p>Seu serviço para gestão de relatórios dos seus alunos</p>
            </div>
            {children}
        </div>
    );
}