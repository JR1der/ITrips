import { Alert } from '@mui/material';
import React from 'react';

interface ErrorProps {
  message: string;
  type: string | undefined;
}

const ErrorPage: React.FC<ErrorProps> = ({ message, type }) => {
  return (
    <div
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
    </div>
  );
};

export default ErrorPage;
