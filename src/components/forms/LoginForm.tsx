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

const loginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(6, { message: 'Senha deve ter pelo menos 6 caracteres' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const router = useRouter();
  const { showNotification } = useNotification();
  const { login, loginWithGoogle, error, clearError } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);
      clearError();

      await login(data.email, data.password);

      showNotification('Login realizado com sucesso!', 'success');
      router.push('/dashboard');
    } catch (error: unknown) {
      console.error('Login error:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Erro ao fazer login';
      showNotification(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      clearError();

      await loginWithGoogle();

      showNotification('Login com Google realizado com sucesso!', 'success');
      router.push('/dashboard');
    } catch (error: unknown) {
      console.error('Google login error:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Erro ao fazer login com Google';
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
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || isGoogleLoading}
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
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
          onClick={handleGoogleSignIn}
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
          {isGoogleLoading ? 'Entrando com Google...' : 'Entrar com Google'}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
