'use client'

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeClosed } from "lucide-react";

export default function LoginPage() {
    const [showPass, setShowPass] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        alert(`Email: ${data.email}\nSenha: ${data.password}`);
    }

    return (
        <div className="md:min-w-md py-8 bg-white/30 backdrop-blur-md flex flex-col justify-center items-center rounded-4xl">
            <h1 className="text-3xl font-bold">Login</h1>
            <button
                className="w-[80%] p-4 mt-4 bg-white rounded-md text-black font-bold cursor-pointer"
            >
                <Image
                    src="/google_logo.png"
                    alt="Google logo"
                    width={24}
                    height={24}
                    className="inline-block mr-2 align-middle"
                />
                Login com Google
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
                    <button
                        type="submit"
                        className="mt-6 p-2 min-w-0 w-full rounded-md bg-emerald-300 text-black
                            hover:bg-emerald-600 hover:text-white cursor-pointer font-semibold"
                    >
                        Entrar
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