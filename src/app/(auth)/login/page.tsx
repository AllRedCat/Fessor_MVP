'use client';

import LoginForm from '@/components/forms/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="h-fit flex items-center justify-center rounded-md bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Faça login em sua conta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Ou{' '}
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              crie uma nova conta
            </Link>
          </p>
        </div>

        <div className="bg-white shadow rounded-lg px-8 py-8">
          <LoginForm />
        </div>

        <div className="text-center text-xs text-gray-500">
          Sistema de Relatórios Fessor - Inteligência Artificial Educacional
        </div>
      </div>
    </div>
  );
}
