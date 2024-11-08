import { Box, Button, Card, Tooltip, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth.ts';
import ErrorBox from '../../components/ErrorBox.tsx';
import { LoadingComponent } from '../../components/LoadingComponent.tsx';
import { useDestinations } from '../../hooks/useDestinations.ts';
import { BaseLayout } from '../../layout/BaseLayout.tsx';
import { DestinationsActivities } from './components/DestinationActivities.tsx';

export const SingleDestinationPage = () => {
  const { id } = useParams();
  const {
    destination,
    isFetchingDestinations,
    hasFetchError,
    fetchDestinationById,
  } = useDestinations();
  const [destinationImage, setDestinationImage] = useState<string | null>(null);
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { activeUser } = useAuth();

  useEffect(() => {
    if (!isFetchingDestinations) {
      setFadeIn(true);
    }
  }, [isFetchingDestinations]);

  useEffect(() => {
    if (id && (!destination || destination._id !== id)) {
      fetchDestinationById(id);
    }
  }, [id, destination, fetchDestinationById]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/destinations/image/${destination?.name}`
        );
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setDestinationImage(data[0].urls.regular);
          }
        } else {
          console.error('Failed to fetch destination image');
        }
      } catch (error) {
        console.error('Error fetching destination image:', error);
      }
    };

    if (destination && destination.name && !destinationImage) {
      fetchImage();
    }
  }, [destination, destinationImage, BACKEND_URL]);

  if (isFetchingDestinations) {
    return <LoadingComponent />;
  }

  if (hasFetchError) {
    return (
      <BaseLayout>
        <ErrorBox
          type="error"
          message="An error occurred while fetching the destination."
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
          {!isFetchingDestinations && !hasFetchError && destination ? (
            <Box>
              {activeUser?.id === destination?.userId && (
                <Tooltip title="Click to edit this destination">
                  <Button
                    fullWidth
                    onClick={() => navigate(`/destinations/edit/${id}`)}
                    variant="outlined"
                    color="primary"
                    size="large"
                    sx={{ marginBottom: 3 }}
                  >
                    Click To Edit Destination
                  </Button>
                </Tooltip>
              )}
              <Card
                sx={{
                  p: 2,
                  backgroundColor: 'primary.main',
                  color: 'white',
                  mb: 2,
                }}
              >
                <Box>
                  <Typography variant="h6" sx={{ p: 1 }}>
                    Destination Name
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    component="h1"
                    sx={{ fontWeight: 'bold', p: 1 }}
                  >
                    {destination?.name}
                  </Typography>
                </Box>
              </Card>
              <Card sx={{ p: 2, backgroundColor: 'white', mb: 2 }}>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ p: 1, color: 'primary.dark', fontWeight: 'bold' }}
                  >
                    Description
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" sx={{ p: 1 }}>
                    {destination?.description}
                  </Typography>
                </Box>
              </Card>
              {destinationImage ? (
                <Card sx={{ backgroundColor: 'primary.main', p: 2 }}>
                  <Box sx={{ maxWidth: '100%', mb: 2 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        mb: 2,
                        color: 'white',
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}
                    >
                      Image of {destination?.name}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '2px solid',
                        borderColor: 'primary.main',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        width: '100%',
                        maxWidth: '100%',
                        maxHeight: '80vh',
                        margin: '0 auto',
                      }}
                    >
                      <img
                        src={destinationImage}
                        alt="Destination"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                        }}
                      />
                    </Box>
                  </Box>
                </Card>
              ) : (
                <ErrorBox
                  message="No image found for this destination"
                  type="info"
                />
              )}
              {destination?.activities && destination?.activities.length > 0 ? (
                <DestinationsActivities destination={destination} />
              ) : (
                <ErrorBox
                  message="This destination has no activities"
                  type="info"
                />
              )}
            </Box>
          ) : (
            <ErrorBox type="info" message="No destination found." />
          )}
        </Box>
      </Container>
    </BaseLayout>
  );
};
