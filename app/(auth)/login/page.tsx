'use client'

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeClosed } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export default function LoginPage() {
    const [showPass, setShowPass] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { login, loginWithGoogle, error, clearError } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        clearError();

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || email.trim().length === 0) {
            alert('Por favor, digite seu email.');
            setIsLoading(false);
            return;
        }

        if (!password || password.trim().length === 0) {
            alert('Por favor, digite sua senha.');
            setIsLoading(false);
            return;
        }

        try {
            await login(email.trim(), password);
            router.push('/dashboard');
        } catch (error: any) {
            console.error('Erro no login:', error);
            if (error.code) {
                if (!error.message || error.message.includes('FirebaseError')) {
                } else {
                    // alert('Erro inesperado. Tente novamente.');
                }
            }
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
            <h1 className="text-3xl font-bold light:text-white">Login</h1>
            {error && (
                <div className="w-[80%] mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-md text-red-200 text-sm flex items-center space-x-2">
                    <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <p className="font-medium">Erro no Login</p>
                        <p className="text-sm opacity-90">{error}</p>
                    </div>
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
                {isLoading ? 'Entrando...' : 'Login com Google'}
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
                        className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-black outline-1 -outline-offset-1
                        placeholder:text-black/50 outline-black/50 dark:text-white
                        dark:outline-white/10 dark:placeholder:text-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    />
                    <label htmlFor="password" className="mt-4">Senha</label>
                    <div
                        className="flex justify-between
                           min-w-0 flex-auto rounded-md bg-white/5 text-base text-black outline-1 -outline-offset-1
                           outline-black/50 dark:text-white
                           dark:outline-white/10 placeholder:text-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/"
                    >
                        <input
                            type={showPass ? "text" : "password"}
                            id="password"
                            name="password"
                            required
                            placeholder={showPass? "123456789" : "*********" }
                            autoComplete="password"
                            className="w-full px-3.5 py-2 -outline-offset-1 outline-white rounded-l-md placeholder:text-black/50
                                dark:outline-white/10 dark:placeholder:text-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                        <button
                            type="button"
                            className="border-l border-black/50 dark:border-white/5 h-full p-2 cursor-pointer dark:text-gray-300"
                            onClick={() => setShowPass(prev => !prev)}
                        >
                            {showPass ? <Eye /> : <EyeClosed />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-6 p-2 min-w-0 w-full rounded-md bg-emerald-300 text-black
                            hover:bg-emerald-600 hover:text-white cursor-pointer font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? 'Entrando...' : 'Entrar'}
                    </button>
                    <button
                        type="button"
                        className=" p-2 min-w-0 w-full rounded-md hover:bg-slate-700/50 cursor-pointer"
                        onClick={() => window.location.href = "/register"}
                    >
                        Registrar-se
                    </button>
                </div>
            </form>
            <div className="mt-4">
                <span>Visite nossa </span><Link href="https://www.google.com/" className="text-green-500">pagina</Link><span> para saber mais</span>
            </div>
        </div >
    )
}