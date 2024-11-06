import {
  Box,
  Button,
  CircularProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth.ts";
import ErrorBox from "../../components/ErrorBox.tsx";
import { useTrips } from "../../hooks/useTrips.ts";
import { BaseLayout } from "../../layout/BaseLayout.tsx";
import { DeleteConfirmationModal } from "./components/DeleteConfirmationModal.tsx";
import { TripItem } from "./components/TripItem.tsx";

export const TripsPage = () => {
  const { activeUser } = useAuth();
  const { trips, isLoading, isError, deleteTrip } = useTrips();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<{
    id: string;
    name: string;
  }>({ id: "", name: "" });
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      setFadeIn(true);
    }
  }, [isLoading]);

  const handleDeleteTrip = async () => {
    await deleteTrip({
      id: selectedTrip.id,
      userId: activeUser?.id,
    });
    setModalOpen(false);
  };

  const handleOpenModal = (tripId: string, tripName: string) => {
    setSelectedTrip({ id: tripId, name: tripName });
    setModalOpen(true);
  };

  const userTrips = trips.filter((trip: any) => trip.userId === activeUser?.id);
  const otherTrips = trips.filter(
    (trip: any) => trip.userId !== activeUser?.id
  );

  return (
    <BaseLayout>
      <Box
        sx={{
          padding: 3,
          transition: "opacity 0.5s, transform 0.5s",
          opacity: fadeIn ? 1 : 0,
          transform: fadeIn ? "translateY(0)" : "translateY(20px)",
        }}
      >
        <Tooltip title="Click to create a new trip">
          <Button
            fullWidth
            onClick={() => navigate("/trips/create")}
            variant="contained"
            color="primary"
            size="large"
            sx={{ marginBottom: 3 }}
          >
            Click To Create A Trip
          </Button>
        </Tooltip>
        {isLoading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70vh",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {isError && (
          <ErrorBox
            message="Error fetching trips. Please try again later."
            type="error"
          />
        )}
        {!isLoading && trips?.length === 0 && (
          <ErrorBox
            message="No trips available. Create a new trip to get started!"
            type="info"
          />
        )}
        {userTrips.length > 0 && (
          <>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                mb: 3,
                mt: 3,
                color: "primary.dark",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Your Trips
            </Typography>
            {userTrips.map((trip: any) => (
              <TripItem
                key={trip._id}
                activeUserId={activeUser?.id}
                trip={trip}
                handleDeleteTrip={(id: string, name: string) =>
                  handleOpenModal(id, name)
                }
              />
            ))}
          </>
        )}
        {/* All Trips */}
        {otherTrips.length > 0 && (
          <>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                mb: 3,
                mt: 3,
                color: "primary.dark",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              All Trips
            </Typography>
            {otherTrips.map((trip: any) => (
              <TripItem
                key={trip._id}
                activeUserId={activeUser?.id}
                trip={trip}
                handleDeleteTrip={(id: string, name: string) =>
                  handleOpenModal(id, name)
                }
              />
            ))}
          </>
        )}
      </Box>
      <DeleteConfirmationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onDelete={handleDeleteTrip} // Call the updated delete function
        tripName={selectedTrip.name}
      />
    </BaseLayout>
  );
};
