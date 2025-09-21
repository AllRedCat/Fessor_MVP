'use client'

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeClosed } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export default function RegisterPage() {
    const [showPass, setShowPass] = useState<boolean>(false);
    const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { register, loginWithGoogle, error, clearError } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        clearError();

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirm-password") as string;

        // Validação de senhas
        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            alert('A senha deve ter pelo menos 6 caracteres!');
            setIsLoading(false);
            return;
        }

        try {
            await register(email, password);
            router.push('/dashboard');
        } catch (error) {
            console.error('Erro no registro:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        clearError();

        try {
            await loginWithGoogle();
            router.push('/dashboard');
        } catch (error) {
            console.error('Erro no login com Google:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="md:min-w-md py-8 bg-white/30 backdrop-blur-md flex flex-col justify-center items-center rounded-4xl">
            <h1 className="text-3xl font-bold">
                Registre-se
            </h1>
            {error && (
                <div className="w-[80%] mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-md text-red-200 text-sm">
                    {error}
                </div>
            )}
            <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-[80%] p-4 mt-4 bg-white rounded-md text-black font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
            >
                <Image
                    src="/google_logo.png"
                    alt="Google logo"
                    width={24}
                    height={24}
                    className="inline-block mr-2 align-middle"
                />
                {isLoading ? 'Entrando...' : 'Registrar com Google'}
            </button>
            <hr className="w-[80%] mt-6 text-white/50" />
            <form
                onSubmit={handleSubmit}
                className="w-[80%]"
            >
                <div className="flex flex-col mt-4">
                    <label htmlFor="email" className="mt-4">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        required
                        placeholder="example@email.com"
                        autoComplete="email"
                        className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1
                        outline-white/10 placeholder:text-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    />
                    <label htmlFor="password" className="mt-4">Senha</label>
                    <div
                        className="flex justify-between
                           min-w-0 flex-auto rounded-md bg-white/5 text-base text-white outline-1 -outline-offset-1
                           outline-white/10 placeholder:text-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/"
                    >
                        <input
                            type={showPass ? "text" : "password"}
                            id="password"
                            name="password"
                            required
                            placeholder="***********"
                            autoComplete="password"
                            className="w-full px-3.5 py-2 -outline-offset-1
                                outline-white/10 placeholder:text-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                        <button
                            type="button"
                            className="border-l border-white/5 h-full p-2 cursor-pointer text-gray-300"
                            onClick={() => setShowPass(prev => !prev)}
                        >
                            {showPass ? <Eye /> : <EyeClosed />}
                        </button>
                    </div>
                    <label htmlFor="password" className="mt-4">Confirme a senha</label>
                    <div
                        className="flex justify-between
                           min-w-0 flex-auto rounded-md bg-white/5 text-base text-white outline-1 -outline-offset-1
                           outline-white/10 placeholder:text-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/"
                    >
                        <input
                            type={showConfirmPass ? "text" : "password"}
                            id="confirm-password"
                            name="confirm-password"
                            required
                            placeholder="***********"
                            autoComplete="password"
                            className="w-full px-3.5 py-2 -outline-offset-1
                                outline-white/10 placeholder:text-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                        <button
                            type="button"
                            className="border-l border-white/5 h-full p-2 cursor-pointer text-gray-300"
                            onClick={() => setShowConfirmPass(prev => !prev)}
                        >
                            {showConfirmPass ? <Eye /> : <EyeClosed />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-6 p-2 min-w-0 w-full rounded-md bg-emerald-300 text-black
                            hover:bg-emerald-600 hover:text-white cursor-pointer font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? 'Registrando...' : 'Registre-se'}
                    </button>
                    <button
                        type="button"
                        className="p-2 min-w-0 w-full rounded-md hover:bg-slate-700/50 cursor-pointer"
                        onClick={() => window.location.href = "/login"}
                    >
                        Já possui conta? Entre
                    </button>
                </div>
            </form>
            <div className="mt-4">
                <span>Visite nossa </span><Link href="https://www.google.com/" className="text-green-500">pagina</Link><span> para saber mais</span>
            </div>
        </div>
    )
}