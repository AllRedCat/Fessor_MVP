import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from '@/contexts/auth-context';
import { NotificationProvider } from '@/contexts/NotificationContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fessor - Sistema de Relatórios Escolares',
  description:
    'Sistema para geração automatizada de relatórios comportamentais de estudantes usando IA',
  keywords: [
    'relatórios escolares',
    'educação',
    'professores',
    'inteligência artificial',
    'gestão escolar',
  ],
  authors: [{ name: 'Fessor Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ThemeProvider>
          <CssBaseline />
          <NotificationProvider>
            <AuthProvider>{children}</AuthProvider>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
