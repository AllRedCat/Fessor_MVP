
'use client';

import { Box, Paper, Stack, TextField, Typography, IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

export default function ChatPage() {
    return (
        <Stack sx={{ height: '100%' }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Chat IA</Typography>
            <Paper sx={{ flexGrow: 1, p: 2, overflowY: 'auto' }}>
                {/* Chat messages will go here */}
                <Typography>Chat interface placeholder</Typography>
            </Paper>
            <Box sx={{ p: 2 }}>
                <Stack direction="row" spacing={1}>
                    <TextField fullWidth placeholder="Digite sua mensagem..." />
                    <IconButton color="primary">
                        <SendIcon />
                    </IconButton>
                </Stack>
            </Box>
        </Stack>
    );
}