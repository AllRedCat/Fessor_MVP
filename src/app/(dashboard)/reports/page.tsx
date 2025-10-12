
'use client';

import ReportList from '@/components/reports/ReportList';
import { Button, Stack, Typography } from '@mui/material';
import Link from 'next/link';

export default function ReportsPage() {
    return (
        <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4">Relatórios</Typography>
                <Button component={Link} href="/reports/novo" variant="contained">
                    + Adicionar Relatório
                </Button>
            </Stack>
            <ReportList />
        </Stack>
    );
}