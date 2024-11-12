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
import { useAuth } from '../../auth/useAuth.ts';
import ErrorBox from '../../components/ErrorBox.tsx';
import { useDestinations } from '../../hooks/useDestinations.ts';
import { BaseLayout } from '../../layout/BaseLayout.tsx';
import { CreatedModal } from './components/CreatedModal.tsx';

export const CreateDestinationPage = () => {
  const { activeUser } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [activities, setActivities] = useState(['']);
  const [error, setError] = useState('');
  const [errorType, setErrorType] = useState<
    'error' | 'success' | 'warning' | 'info'
  >('info');
  const [openModal, setOpenModal] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const { createDestination, isCreating } = useDestinations();

  useEffect(() => {
    setFadeIn(true);
  }, []);

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

  const handleCreateDestination = async () => {
    if (
      !name ||
      !description ||
      activities.some((activity) => !activity.trim())
    ) {
      setError('All fields should be filled');
      setErrorType('error');
      return;
    }

    if (!activeUser?.id) {
      setError('User ID is required');
      setErrorType('error');
      return;
    }

    const destination = {
      userId: activeUser.id,
      name,
      description,
      activities,
    };

    try {
      await createDestination(destination);
      setError('Destination created successfully!');
      setErrorType('success');
      setName('');
      setDescription('');
      setActivities(['']);
      setOpenModal(true);
    } catch (err) {
      console.error(err);
      setError((err as Error).message || 'Failed to create destination');
      setErrorType('error');
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    window.location.reload();
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
          <Tooltip title="Click to create the destination">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleCreateDestination}
              sx={{ mt: 4 }}
              disabled={isCreating === 'pending'}
            >
              {isCreating ? 'Creating...' : 'Create Destination'}
            </Button>
          </Tooltip>
        </Box>
        <CreatedModal
          handleCloseModal={handleCloseModal}
          openModal={openModal}
        />
      </Container>
    </BaseLayout>
  );
};
