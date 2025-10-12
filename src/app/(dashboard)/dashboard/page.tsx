
'use client';

import StatsCard from '@/components/dashboard/StatsCard';
import QuickActions from '@/components/dashboard/QuickActions';
import RecentReports from '@/components/dashboard/RecentReports';
import { Grid, Stack } from '@mui/material';

export default function DashboardPage() {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <QuickActions />
            </Grid>
            <Grid item xs={12} md={4}>
                <StatsCard title="Total Relatórios" value={45} />
            </Grid>
            <Grid item xs={12} md={4}>
                <StatsCard title="Total Alunos" value={28} />
            </Grid>
            <Grid item xs={12} md={4}>
                <StatsCard title="Turmas" value={5} />
            </Grid>
            <Grid item xs={12}>
                <RecentReports />
            </Grid>
        </Grid>
    );
}