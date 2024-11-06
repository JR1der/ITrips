import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { object, string } from 'yup';
import { useAuth } from '../../auth/useAuth';
import ErrorPage from '../../components/ErrorPage.tsx';
import { BaseLayout } from '../../layout/BaseLayout.tsx';

const validationSchema = object({
  email: string().email('Enter a valid email').required('Email is required'),
  password: string().required('Password is required'),
});

export const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const { login, isAuthenticating } = useAuth();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await login(values.email, values.password);
      } catch {
        setError('Invalid credentials, please try again.');
      }
    },
  });

  if (isAuthenticating) {
    return <Typography variant="h6">Authenticating...</Typography>;
  }

  return (
    <BaseLayout>
      <Container component="main" maxWidth="xs">
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
          <Typography component="h1" variant="h5" fontWeight="bold">
            Sign in
          </Typography>
          <Box sx={{ mb: 2 }} />
          <form onSubmit={formik.handleSubmit}>
            {error && <ErrorPage message={error} type="error" />}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="center" alignItems="center">
              <Link href="/auth/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </form>
        </Box>
      </Container>
    </BaseLayout>
  );
};
