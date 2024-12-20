import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material';
import Button from '@mui/material/Button';

interface EditedModalProps {
  handleCloseModal: () => void;
  openModal: boolean;
}

export const EditedModal: React.FC<EditedModalProps> = ({
  handleCloseModal,
  openModal,
}) => {
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
            Update Successful
          </Typography>
          <Typography sx={{ mt: 2 }} textAlign="center">
            Your destination has been updated successfully.
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
