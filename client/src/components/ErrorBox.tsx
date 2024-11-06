import { Alert, Box } from '@mui/material';
import React from 'react';

interface ErrorProps {
  message: string;
  type: 'error' | 'warning' | 'info' | 'success';
}

const ErrorBox: React.FC<ErrorProps> = ({ message, type }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Box
        sx={{
          width: '100%',
        }}
      >
        <Alert severity={type}>{message}</Alert>
      </Box>
    </Box>
  );
};

export default ErrorBox;
