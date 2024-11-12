import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  Box,
  Button,
  Fade,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { useAuth } from '../../auth/useAuth.ts';
import ErrorBox from '../../components/ErrorBox.tsx';
import { LoadingComponent } from '../../components/LoadingComponent.tsx';
import { useDestinations } from '../../hooks/useDestinations.ts';
import { useTrips } from '../../hooks/useTrips.ts';
import { BaseLayout } from '../../layout/BaseLayout.tsx';
import { CreatedModal } from './components/CreatedModal.tsx';
import { DestinationItem } from './components/DestinationItem.tsx';
import { ModalAccordionItem } from './components/ModalAccordionItem.tsx';

export interface Destination {
  _id: string;
  name: string;
  description: string;
  activities: string[];
}

export const CreateTripPage: React.FC = () => {
  const { activeUser } = useAuth();
  const { createTrip } = useTrips();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const { destinations, isFetchingDestinations, hasFetchDestError } =
    useDestinations();
  const [selectedDestinations, setSelectedDestinations] = useState<
    Destination[]
  >([]);
  const [error, setError] = useState<string>('');
  const [errorType] = useState<'error' | 'warning' | 'info' | 'success'>(
    'error'
  );
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openCreationModal, setOpenCreationModal] = useState<boolean>(false);
  const [fadeIn, setFadeIn] = useState<boolean>(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleAddDestination = () => {
    setOpenModal(true);
  };

  const handleRemoveDestination = (index: number) => {
    setSelectedDestinations(selectedDestinations.filter((_, i) => i !== index));
  };

  const handleCreateTrip = async () => {
    if (!name || !description || selectedDestinations.length === 0) {
      setError(
        'All fields should be filled and at least one destination selected.'
      );
      return;
    }

    const tripData = {
      userId: activeUser?.id,
      name,
      description,
      destinations: selectedDestinations,
    };

    try {
      await createTrip(tripData);
      setOpenCreationModal(true);
      setName('');
      setDescription('');
      setSelectedDestinations([]);
      setError('');
    } catch (error) {
      setError('An error occurred while creating the trip.');
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseCreationModal = () => {
    setOpenCreationModal(false);
  };

  const handleAddToSelectedDestinations = (destination: Destination) => {
    setSelectedDestinations([...selectedDestinations, destination]);
    handleCloseModal();
  };

  return (
    <BaseLayout>
      <Container>
        <Box
          my={4}
          sx={{
            transition: 'opacity 0.5s, transform 0.5s',
            opacity: fadeIn ? 1 : 0,
            transform: fadeIn ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          {error && <ErrorBox message={error} type={errorType} />}
          <Tooltip title="Enter the name of the trip">
            <TextField
              fullWidth
              label="Trip Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
            />
          </Tooltip>
          <Tooltip title="Enter the description of the trip">
            <TextField
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
              multiline
              rows={4}
            />
          </Tooltip>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Destinations
          </Typography>
          {selectedDestinations.map((destination, index) => (
            <DestinationItem
              key={index}
              destination={destination}
              index={index}
              handleRemoveDestination={handleRemoveDestination}
            />
          ))}
          <Button
            startIcon={<AddCircleIcon />}
            onClick={handleAddDestination}
            sx={{ mt: 2 }}
            variant="contained"
          >
            Add Destination
          </Button>
          <Tooltip title="Click to create the trip">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleCreateTrip}
              sx={{ mt: 4 }}
            >
              Create Trip
            </Button>
          </Tooltip>
        </Box>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="select-destination-modal"
          aria-describedby="select-destination-modal-description"
        >
          <Fade in={openModal}>
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
              <Typography
                variant="h6"
                component="h2"
                textAlign="center"
                sx={{ mb: 2 }}
              >
                Select Destination
              </Typography>
              {isFetchingDestinations && <LoadingComponent />}
              {hasFetchDestError && (
                <ErrorBox
                  message="Error fetching destinations. Please try again later."
                  type="error"
                />
              )}
              {!isFetchingDestinations && !hasFetchDestError && (
                <Box
                  sx={{ maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}
                >
                  {destinations.map((destination: any) => (
                    <ModalAccordionItem
                      key={destination._id}
                      destination={destination}
                      handleAddToSelectedDestinations={
                        handleAddToSelectedDestinations
                      }
                    />
                  ))}
                </Box>
              )}
            </Box>
          </Fade>
        </Modal>
      </Container>
      <CreatedModal
        handleCloseModal={handleCloseCreationModal}
        openModal={openCreationModal}
      />
    </BaseLayout>
  );
};
