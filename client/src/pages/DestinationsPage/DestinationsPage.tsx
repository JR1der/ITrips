import { Box, Button, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth.ts";
import ErrorBox from "../../components/ErrorBox.tsx";
import { LoadingComponent } from "../../components/LoadingComponent.tsx";
import { useDestinations } from "../../hooks/useDestinations.ts";
import { BaseLayout } from "../../layout/BaseLayout.tsx";
import { DeleteConfirmationModal } from "./components/DeleteConfirmationModal.tsx";
import { DestinationItem } from "./components/DestinationItem.tsx";

export const DestinationsPage = () => {
  const {
    destinations,
    isFetchingDestinations,
    hasFetchError,
    deleteDestination,
  } = useDestinations();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState({
    id: "",
    name: "",
  });
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();
  const { activeUser } = useAuth();

  useEffect(() => {
    if (!isFetchingDestinations) {
      setFadeIn(true);
    }
  }, [isFetchingDestinations]);

  const handleDeleteDestination = async () => {
    await deleteDestination({
      id: selectedDestination.id,
      userId: activeUser?.id,
    });
    setModalOpen(false);
  };

  const handleOpenModal = (destinationId: string, destinationName: string) => {
    setSelectedDestination({ id: destinationId, name: destinationName });
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  if (isFetchingDestinations) {
    return <LoadingComponent />;
  }

  const userDestinations = destinations.filter(
    (destination: any) => destination.userId === activeUser?.id
  );
  const otherDestinations = destinations.filter(
    (destination: any) => destination.userId !== activeUser?.id
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
        <Tooltip title="Click to create a new destination">
          <Button
            fullWidth
            onClick={() => navigate("/destinations/create")}
            variant="contained"
            color="primary"
            size="large"
            sx={{ marginBottom: 3 }}
          >
            Click To Create A Destination
          </Button>
        </Tooltip>

        {hasFetchError && (
          <ErrorBox
            message="Error fetching destinations. Please try again later."
            type="error"
          />
        )}
        {!hasFetchError && destinations.length === 0 && (
          <ErrorBox
            message="No destinations available. Create a new destination to get started!"
            type="info"
          />
        )}

        {userDestinations.length > 0 && (
          <>
            <Typography
              variant="h5"
              sx={{ color: "primary.main", mt: 2, mb: 1, textAlign: "center" }}
            >
              Your Destinations
            </Typography>
            {userDestinations.map((destination: any) => (
              <DestinationItem
                key={destination._id}
                activeUserId={activeUser?.id}
                destination={destination}
                handleDeleteDestination={(id: string, name: string) =>
                  handleOpenModal(id, name)
                }
              />
            ))}
          </>
        )}

        {otherDestinations.length > 0 && (
          <>
            <Typography
              variant="h5"
              sx={{ color: "primary.main", mt: 2, mb: 1, textAlign: "center" }}
            >
              All Destinations
            </Typography>
            {otherDestinations.map((destination: any) => (
              <DestinationItem
                key={destination._id}
                activeUserId={activeUser?.id}
                destination={destination}
                handleDeleteDestination={(id: string, name: string) =>
                  handleOpenModal(id, name)
                }
              />
            ))}
          </>
        )}
      </Box>
      <DeleteConfirmationModal
        open={modalOpen}
        onClose={handleCloseModal}
        onDelete={handleDeleteDestination}
        destinationName={selectedDestination.name}
      />
    </BaseLayout>
  );
};
