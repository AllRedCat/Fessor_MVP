
import React from 'react';
import { Button, Stack } from '@mui/material';
import Link from 'next/link';

const QuickActions: React.FC = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Button component={Link} href="/relatorios/novo" variant="contained">
        + Novo Relatório
      </Button>
      <Button component={Link} href="/alunos/novo" variant="contained">
        + Novo Aluno
      </Button>
    </Stack>
  );
};

export default QuickActions;
