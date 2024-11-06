import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material';
import Button from '@mui/material/Button';

interface CreatedModalProps {
  handleCloseModal: () => void;
  openModal: boolean;
}

export const CreatedModal = ({
  handleCloseModal,
  openModal,
}: CreatedModalProps) => {
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModal}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            alignItems: 'center',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '50%' },
            bgcolor: 'background.paper',

            borderRadius: 4,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            color="success.light"
            textAlign="center"
          >
            Creation Successful
          </Typography>
          <Typography sx={{ mt: 2 }} textAlign="center">
            Your destination has been created successfully.
          </Typography>
          <Button
            onClick={handleCloseModal}
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              width: { sm: '400', xs: '50%' },
            }}
          >
            Close
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};
