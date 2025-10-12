
'use client';

import StudentList from '@/components/students/StudentList';
import { Button, Stack, Typography } from '@mui/material';
import Link from 'next/link';

export default function StudentsPage() {
    return (
        <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4">Alunos</Typography>
                <Button component={Link} href="/students/novo" variant="contained">
                    + Adicionar Aluno
                </Button>
            </Stack>
            <StudentList />
        </Stack>
    );
}