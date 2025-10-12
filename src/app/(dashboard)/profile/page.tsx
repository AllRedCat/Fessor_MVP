
'use client';

import ProfileForm from '@/components/forms/ProfileForm';
import { useAuth } from '@/contexts/auth-context';
import { getUserProfile, UserProfile } from '@/lib/firebase/auth';
import { Typography, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
    const { user } = useAuth();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        if (user) {
            getUserProfile(user.uid).then(setUserProfile);
        }
    }, [user]);

    return (
        <Stack spacing={3}>
            <Typography variant="h4">Perfil</Typography>
            {userProfile && (
                <ProfileForm defaultValues={{
                    name: userProfile.displayName || '',
                    email: userProfile.email || '',
                    bio: userProfile.biografia || '',
                }} />
            )}
        </Stack>
    );
}