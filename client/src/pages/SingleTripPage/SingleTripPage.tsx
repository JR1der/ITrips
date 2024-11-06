import { Box, Button, Card, Tooltip, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../auth/useAuth.ts";
import ErrorBox from "../../components/ErrorBox.tsx";
import { LoadingComponent } from "../../components/LoadingComponent.tsx";
import { useTrips } from "../../hooks/useTrips.ts";
import { BaseLayout } from "../../layout/BaseLayout.tsx";
import { AccordionDestination } from "./components/AccordionDestination.tsx";

export const SingleTripPage = () => {
  const { id } = useParams<{ id: string }>();
  const { trip, isFetchingTrips, hasFetchError, fetchTripById } = useTrips();
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();
  const { activeUser } = useAuth();

  useEffect(() => {
    if (!isFetchingTrips) {
      setFadeIn(true);
    }
  }, [isFetchingTrips]);

  useEffect(() => {
    if (id && (!trip || trip._id !== id)) {
      fetchTripById(id);
    }
  }, [id, trip, fetchTripById]);

  if (isFetchingTrips) {
    return <LoadingComponent />;
  }

  if (hasFetchError) {
    return (
      <BaseLayout>
        <ErrorBox
          type="error"
          message="An error occurred while fetching the trip."
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
            transition: "opacity 0.5s, transform 0.5s",
            opacity: fadeIn ? 1 : 0,
            transform: fadeIn ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {!isFetchingTrips && !hasFetchError && trip ? (
            <Box>
              {activeUser?.id === trip?.userId && (
                <Tooltip title="Click to edit this trip">
                  <Button
                    fullWidth
                    onClick={() => navigate(`/trip/edit/${id}`)}
                    variant="outlined"
                    color="primary"
                    size="large"
                    sx={{ marginBottom: 3 }}
                  >
                    Click To Edit Trip
                  </Button>
                </Tooltip>
              )}
              <Card
                sx={{
                  p: 2,
                  backgroundColor: "primary.main",
                  color: "white",
                  mb: 2,
                }}
              >
                <Box>
                  <Typography variant="h6" sx={{ p: 1 }}>
                    Trip Name
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    component="h1"
                    sx={{ fontWeight: "bold", p: 1 }}
                  >
                    {trip.name}
                  </Typography>
                </Box>
              </Card>
              <Card sx={{ p: 2, backgroundColor: "white", mb: 2 }}>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      p: 1,
                      color: "primary.dark",
                      fontWeight: "bold",
                    }}
                  >
                    Description
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" sx={{ p: 1 }}>
                    {trip.description}
                  </Typography>
                </Box>
              </Card>
              {trip.destinations && trip.destinations.length > 0 ? (
                trip.destinations.map((destination, index) => (
                  <AccordionDestination key={index} destination={destination} />
                ))
              ) : (
                <ErrorBox message="This trip has no destinations" type="info" />
              )}
            </Box>
          ) : (
            <ErrorBox type="info" message="No trip found." />
          )}
        </Box>
      </Container>
    </BaseLayout>
  );
};
