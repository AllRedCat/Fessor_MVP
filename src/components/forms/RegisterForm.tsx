'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Input } from '@/components/ui';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/contexts/NotificationContext';
import Image from 'next/image';

const registerSchema = z
  .object({
    displayName: z
      .string()
      .min(2, { message: 'Nome deve ter pelo menos 2 caracteres' }),
    email: z.string().email({ message: 'Email inválido' }),
    password: z
      .string()
      .min(6, { message: 'Senha deve ter pelo menos 6 caracteres' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Confirmação de senha obrigatória' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Senhas não coincidem',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const { showNotification } = useNotification();
  const {
    register: registerUser,
    loginWithGoogle,
    error,
    clearError,
  } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setIsLoading(true);
      clearError();

      await registerUser(data.email, data.password, data.displayName);

      showNotification('Cadastro realizado com sucesso!', 'success');
      router.push('/dashboard');
    } catch (error: unknown) {
      console.error('Registration error:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Erro ao fazer cadastro';
      showNotification(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setIsGoogleLoading(true);
      clearError();

      await loginWithGoogle();

      showNotification('Cadastro com Google realizado com sucesso!', 'success');
      router.push('/dashboard');
    } catch (error: unknown) {
      console.error('Google sign-up error:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Erro ao fazer cadastro com Google';
      showNotification(errorMessage, 'error');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-4">
          <Input
            label="Nome Completo"
            className="w-full"
            {...register('displayName')}
            error={!!errors.displayName}
            helperText={errors.displayName?.message}
            disabled={isLoading || isGoogleLoading}
          />
          <Input
            label="Email"
            type="email"
            className="w-full"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            disabled={isLoading || isGoogleLoading}
          />
          <Input
            label="Senha"
            type="password"
            className="w-full"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            disabled={isLoading || isGoogleLoading}
          />
          <Input
            label="Confirmar Senha"
            type="password"
            className="w-full"
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            disabled={isLoading || isGoogleLoading}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || isGoogleLoading}
        >
          {isLoading ? 'Cadastrando...' : 'Cadastrar'}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">ou</span>
          </div>
        </div>

        <Button
          onClick={handleGoogleSignUp}
          type="button"
          variant="outlined"
          className="w-full flex items-center justify-center gap-3"
          disabled={isLoading || isGoogleLoading}
        >
          <Image
            src="/google_logo.png"
            alt="Google"
            width={20}
            height={20}
            className="w-5 h-5"
          />
          {isGoogleLoading
            ? 'Cadastrando com Google...'
            : 'Cadastrar com Google'}
        </Button>

        <div className="text-center text-sm text-gray-600 mt-4">
          Já tem uma conta?{' '}
          <button
            type="button"
            onClick={() => router.push('/login')}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Faça login
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
