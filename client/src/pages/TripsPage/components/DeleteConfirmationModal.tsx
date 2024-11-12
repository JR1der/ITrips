import { Box, Button, Fade, Modal, TextField, Typography } from '@mui/material';
import { useState } from 'react';

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  tripName: string;
}

export const DeleteConfirmationModal = ({
  open,
  onClose,
  onDelete,
  tripName,
}: DeleteConfirmationModalProps) => {
  const [name, setName] = useState('');
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.value;
    setName(inputName);
    setIsDeleteDisabled(inputName !== tripName);
  };

  const handleDelete = () => {
    if (name === tripName) {
      onDelete();
      setName('');
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
        setName('');
      }}
      aria-labelledby="delete-confirmation-modal"
      aria-describedby="delete-confirmation-modal-description"
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '80%', sm: 400 },
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              textAlign="center"
              sx={{ flexGrow: 1 }}
            >
              Are you sure?
            </Typography>
            <Typography
              variant="h6"
              component="div"
              color="error"
              onClick={() => {
                onClose();
                setName('');
              }}
              sx={{
                position: 'absolute',
                top: '-25px',
                right: '-10px',
                fontSize: '2rem',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              ×
            </Typography>
          </Box>
          <Typography
            id="delete-confirmation-modal-description"
            textAlign="center"
            sx={{ mt: 2 }}
          >
            The trip <strong>{tripName}</strong> will be deleted permanently
          </Typography>
          <Typography
            textAlign="center"
            variant="h6"
            color="error"
            sx={{ fontWeight: 'bold' }}
          >
            These actions cannot be undone.
          </Typography>
          <Typography textAlign="center">
            Type the trip name for confirmation of deletion.
          </Typography>
          <TextField
            fullWidth
            label="Trip name..."
            value={name}
            onChange={handleNameChange}
            margin="normal"
          />
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={isDeleteDisabled}
            sx={{ mt: 2 }}
          >
            Delete
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};
