import { BaseLayout } from '../layout/BaseLayout.tsx';

import { AccountCircle } from '@mui/icons-material';
import {
  Box,
  Card,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuth } from '../auth/useAuth.ts';

export const ProfilePage = () => {
  const { activeUser } = useAuth();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <BaseLayout>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'opacity 0.5s, transform 0.5s',
            opacity: fadeIn ? 1 : 0,
            transform: fadeIn ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <AccountCircle sx={{ fontSize: 100, color: 'primary.main' }} />
          <Typography
            component="h1"
            variant="h5"
            sx={{ fontWeight: 'bold', color: 'grey.800' }}
          >
            Profile Information
          </Typography>

          <Box sx={{ mt: 2, width: '100%' }}>
            {activeUser ? (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card sx={{ p: 2 }}>
                    <Typography
                      sx={{ color: 'primary.dark' }}
                      variant="h6"
                      fontWeight="bold"
                    >
                      Username:
                    </Typography>
                    <Typography variant="body1">
                      {activeUser.username}
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card sx={{ p: 2 }}>
                    <Typography
                      sx={{ color: 'primary.dark' }}
                      variant="h6"
                      fontWeight="bold"
                    >
                      Email:
                    </Typography>
                    <Typography variant="body1">{activeUser.email}</Typography>
                  </Card>
                </Grid>
              </Grid>
            ) : (
              <Typography variant="body1" color="error">
                No user information available.
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </BaseLayout>
  );
};
