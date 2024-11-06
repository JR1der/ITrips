import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Card,
  Chip,
  Fade,
  IconButton,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth.ts';
import ErrorBox from '../../components/ErrorBox.tsx';
import { LoadingComponent } from '../../components/LoadingComponent.tsx';
import { useDestinations } from '../../hooks/useDestinations.ts';
import { useTrips } from '../../hooks/useTrips.ts';
import { BaseLayout } from '../../layout/BaseLayout.tsx';
import { EditedModal } from '../EditTripPage/components/EditedModal.tsx';
import { AccordionDestination } from './components/AccordionDestination.tsx';

export const EditTripPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDestinations, setSelectedDestinations] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [errorType, setErrorType] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [showEditedModal, setShowEditedModal] = useState(false);
  const { activeUser } = useAuth();
  const { fetchTripById, updateTrip, trip, tripLoading, tripError } =
    useTrips();
  const { destinations, destLoading, destError } = useDestinations();

  useEffect(() => {
    if (!trip && id) fetchTripById(id);
  }, [id, trip, fetchTripById]);

  useEffect(() => {
    if (trip) {
      if (activeUser?.id !== trip.userId) {
        navigate('/trips');
        return;
      }
    }
    if (trip && !tripLoading && !tripError) {
      setName(trip.name || '');
      setDescription(trip.description || '');
      setSelectedDestinations(trip.destinations || []);
    }
  }, [trip, tripLoading, tripError]);

  const handleEditTrip = async () => {
    if (!name || !description || selectedDestinations.length === 0) {
      setError('All fields should be filled');
      setErrorType('error');
      return;
    }

    const updatedTrip = {
      _id: id,
      name,
      userId: activeUser?.id,
      description,
      destinations: selectedDestinations.map((destination) => destination._id),
    };

    try {
      await updateTrip(updatedTrip);
      setError('Trip updated successfully');
      setErrorType('success');
      setShowEditedModal(true);
      if (!trip || trip.name !== name || trip.description !== description) {
        fetchTripById(id);
      }
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred'
      );
      setErrorType('error');
    }
  };

  const handleCloseEditedModal = () => {
    setShowEditedModal(false);
    window.location.reload();
  };

  if (tripLoading || destLoading) return <LoadingComponent />;

  return (
    <BaseLayout>
      <Container>
        <Box my={4}>
          {error && <ErrorBox message={error} type={errorType} />}
          <TextField
            fullWidth
            label="Trip Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            multiline
            rows={4}
          />

          <Typography variant="h6" sx={{ mt: 2 }}>
            Selected Destinations:
          </Typography>
          <Button
            startIcon={<AddCircleIcon />}
            sx={{ mt: 2 }}
            variant="contained"
            color="primary"
            onClick={() => setOpenModal(true)}
          >
            Add Destination
          </Button>

          {selectedDestinations.map((destination, index) => (
            <Card
              key={index}
              sx={{
                mt: 2,
                p: 2,
                backgroundColor: 'white',
                '&:hover': { backgroundColor: 'grey.300' },
                transition: '0.5s',
              }}
            >
              <Box display="flex" alignItems="center">
                <Typography variant="h6" sx={{ color: 'primary.dark' }}>
                  {destination.name}
                </Typography>
                <IconButton
                  color="error"
                  onClick={() =>
                    setSelectedDestinations(
                      selectedDestinations.filter((_, i) => i !== index)
                    )
                  }
                  sx={{ ml: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
              <Box display="flex" mt={1}>
                {destination.activities.map((activity, activityIndex) => (
                  <Chip
                    key={activityIndex}
                    label={activity}
                    sx={{
                      mr: 1,
                      backgroundColor: 'primary.main',
                      color: 'white',
                    }}
                  />
                ))}
              </Box>
            </Card>
          ))}

          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
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
                {destLoading && <LoadingComponent />}
                {destError && (
                  <ErrorBox
                    message="Error fetching destinations. Please try again later."
                    type="error"
                  />
                )}
                {!destLoading && !destError && (
                  <Box
                    sx={{ maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}
                  >
                    {destinations.map((destination) => (
                      <AccordionDestination
                        key={destination._id}
                        destination={destination}
                        handleSelectDestination={(dest) => {
                          setSelectedDestinations([
                            ...selectedDestinations,
                            dest,
                          ]);
                          setOpenModal(false);
                        }}
                      />
                    ))}
                  </Box>
                )}
              </Box>
            </Fade>
          </Modal>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleEditTrip}
            sx={{ mt: 2 }}
          >
            Click To Edit Trip
          </Button>
        </Box>
      </Container>

      <EditedModal
        handleCloseModal={handleCloseEditedModal}
        openModal={showEditedModal}
      />
    </BaseLayout>
  );
};
