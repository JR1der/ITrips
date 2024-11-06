import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {
  Box,
  Button,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth.ts';
import ErrorBox from '../../components/ErrorBox.tsx';
import { LoadingComponent } from '../../components/LoadingComponent.tsx';
import { useDestinations } from '../../hooks/useDestinations.ts';
import { BaseLayout } from '../../layout/BaseLayout.tsx';
import { EditedModal } from './components/EditedModal.tsx';

export const EditDestinationPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { activeUser } = useAuth();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [activities, setActivities] = useState<string[]>(['']);
  const [error, setError] = useState<string>('');
  const [errorType, setErrorType] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  const {
    destination,
    isFetchingDestinations,
    hasFetchError,
    fetchDestinationById,
    updateDestination,
    isUpdating,
  } = useDestinations();

  useEffect(() => {
    if (id && (!destination || destination._id !== id)) {
      fetchDestinationById(id);
    }
  }, [id, destination, fetchDestinationById]);

  useEffect(() => {
    if (destination) {
      if (activeUser?.id !== destination.userId) {
        navigate('/destinations');
        return;
      }
      setFadeIn(true);
      setName(destination.name);
      setDescription(destination.description);
      setActivities(destination.activities || ['']);
    }
  }, [destination, activeUser, navigate]);

  const handleAddActivity = () => {
    setActivities([...activities, '']);
  };

  const handleRemoveActivity = (index: number) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  const handleActivityChange = (index: number, value: string) => {
    const updatedActivities = activities.map((activity, i) =>
      i === index ? value : activity
    );
    setActivities(updatedActivities);
  };

  const handleEditDestination = async () => {
    if (
      !name ||
      !description ||
      activities.some((activity) => !activity.trim())
    ) {
      setError('All fields should be filled');
      setErrorType('error');
      return;
    }

    const updatedDestination = {
      _id: id,
      name,
      userId: activeUser?.id,
      description,
      activities,
    };

    try {
      await updateDestination(updatedDestination);
      setError('Destination updated successfully');
      setErrorType('success');
      setOpenModal(true);
      if (
        !destination ||
        destination.name !== name ||
        destination.description !== description
      ) {
        fetchDestinationById(id);
      }
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred'
      );
      setErrorType('error');
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  if (isFetchingDestinations || isUpdating) {
    return <LoadingComponent />;
  }

  if (hasFetchError) {
    return (
      <BaseLayout>
        <ErrorBox
          message="An error occurred while fetching the destination."
          type="error"
        />
      </BaseLayout>
    );
  }

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
          <Tooltip title="Enter the name of the destination">
            <TextField
              fullWidth
              label="Destination Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
            />
          </Tooltip>
          <Tooltip title="Enter the description of the destination">
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
            Activities
          </Typography>
          {activities.map((activity, index) => (
            <Box key={index} display="flex" alignItems="center" sx={{ mt: 1 }}>
              <TextField
                fullWidth
                label={`Activity ${index + 1}`}
                value={activity}
                onChange={(e) => handleActivityChange(index, e.target.value)}
                margin="normal"
              />
              <IconButton
                color="primary"
                onClick={() => handleRemoveActivity(index)}
                sx={{ ml: 2 }}
              >
                <RemoveCircleIcon />
              </IconButton>
            </Box>
          ))}
          <Button
            startIcon={<AddCircleIcon />}
            onClick={handleAddActivity}
            sx={{ mt: 2 }}
            variant="outlined"
          >
            Add Activity
          </Button>
          <Tooltip title="Click to edit the destination">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleEditDestination}
              sx={{ mt: 4 }}
            >
              Edit Destination
            </Button>
          </Tooltip>
        </Box>
        <EditedModal
          handleCloseModal={handleCloseModal}
          openModal={openModal}
        />
      </Container>
    </BaseLayout>
  );
};
