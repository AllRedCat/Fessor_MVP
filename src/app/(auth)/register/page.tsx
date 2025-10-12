'use client';

import RegisterForm from '@/components/forms/RegisterForm';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="h-fit rounded-md flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Crie sua conta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Ou{' '}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              faça login em sua conta existente
            </Link>
          </p>
        </div>

        <div className="bg-white shadow rounded-lg px-8 py-8">
          <RegisterForm />
        </div>

        <div className="text-center text-xs text-gray-500">
          Sistema de Relatórios Fessor - Inteligência Artificial Educacional
        </div>
      </div>
    </div>
  );
}
