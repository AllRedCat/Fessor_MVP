'use client';

import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { useNotification } from '@/contexts/NotificationContext';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { showNotification } = useNotification();
  const router = useRouter();

  React.useEffect(() => {
    router.push('/login');
  }, []);

  const handleTestNotification = () => {
    showNotification('Fessor está funcionando perfeitamente!', 'success');
  };

  // return (
  //   <Container maxWidth="md" sx={{ py: 8 }}>
  //     <Card>
  //       <CardContent sx={{ textAlign: 'center', p: 4 }}>
  //         <Typography variant="h2" component="h1" gutterBottom>
  //           🏫 Fessor
  //         </Typography>
  //         <Typography variant="h5" color="text.secondary" gutterBottom>
  //           Sistema de Relatórios Escolares com IA
  //         </Typography>
  //         <Typography variant="body1" sx={{ mb: 4 }}>
  //           Bem-vindo ao Fessor! Uma aplicação moderna para professores criarem,
  //           gerenciarem e armazenarem relatórios de alunos com auxílio de
  //           inteligência artificial.
  //         </Typography>
  //         <Button
  //           variant="contained"
  //           size="large"
  //           onClick={handleTestNotification}
  //           sx={{ mr: 2 }}
  //         >
  //           Testar Notificações
  //         </Button>
  //         <Button variant="outlined" size="large">
  //           Fazer Login
  //         </Button>
  //       </CardContent>
  //     </Card>
  //   </Container>
  // );
  return (
    <>
      <div>
        <h2>Carregando...</h2>
      </div>
    </>
  );
}
