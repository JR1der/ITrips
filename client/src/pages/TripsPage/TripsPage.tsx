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

interface Trip {
  _id: string;
  userId: string;
  name: string;
  destinations: any[];
  favorite: boolean;
}

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

  const handleDeleteTrip = async (tripId: string) => {
    await deleteTrip(tripId);
    setModalOpen(false);
  };

  const handleOpenModal = (tripId: string, tripName: string) => {
    setSelectedTrip({ id: tripId, name: tripName });
    setModalOpen(true);
  };

  const favoriteTrips = trips.filter((trip) => trip.favorite);

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

        {/* Favorite Trips */}
        {favoriteTrips.length > 0 && (
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
              Favorite Trips
            </Typography>
            {favoriteTrips.map((trip: Trip) => (
              <TripItem
                key={trip._id}
                activeUserId={activeUser?.id}
                trip={trip}
                handleDeleteTrip={handleOpenModal}
              />
            ))}
          </>
        )}

        {/* All Trips */}
        {trips && (
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
            {trips.map((trip: Trip) => (
              <TripItem
                key={trip._id}
                activeUserId={activeUser?.id}
                trip={trip}
                handleDeleteTrip={handleOpenModal}
              />
            ))}
          </>
        )}
      </Box>
      <DeleteConfirmationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onDelete={() => handleDeleteTrip(selectedTrip.id)}
        tripName={selectedTrip.name}
      />
    </BaseLayout>
  );
};
