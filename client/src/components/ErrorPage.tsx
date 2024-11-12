import { Alert, Box } from '@mui/material';
import React from 'react';

interface ErrorProps {
  message: string;
  type: 'error' | 'info' | 'success' | 'warning' | undefined;
}

const ErrorPage: React.FC<ErrorProps> = ({ message, type = 'error' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        textAlign: 'center',
      }}
    >
      <Alert severity={type}>{message}</Alert>
    </Box>
  );
};

export default ErrorPage;
