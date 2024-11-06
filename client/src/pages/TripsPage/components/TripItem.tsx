import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Destination {
  _id: string;
  name: string;
}

interface Trip {
  _id: string;
  userId: string;
  name: string;
  destinations: Destination[];
}

interface TripItemProps {
  activeUserId: string;
  trip: Trip;
  handleDeleteTrip: (id: string, name: string) => void;
}

export const TripItem = ({
  activeUserId,
  trip,
  handleDeleteTrip,
}: TripItemProps) => {
  const navigate = useNavigate();

  const handleEnterTrip = () => navigate(`/trips/${trip._id}`);

  return (
    <Card
      sx={{
        mt: 2,
        p: 2,
        cursor: "pointer",
        "&:hover": { backgroundColor: "grey.200" },
        transition: "0.3s",
      }}
      onClick={handleEnterTrip}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        <Box
          sx={{
            mb: { xs: 2, sm: 0 },
            flex: { xs: "1 1 auto", sm: "0 1 auto" },
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{ fontWeight: "bold", color: "primary.dark" }}
          >
            {trip.name}
          </Typography>
          {trip.destinations.length > 0 ? (
            <>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                sx={{ fontWeight: "bold", mt: 1 }}
              >
                Destinations visited:
              </Typography>
              <Box sx={{ display: "flex" }}>
                {trip.destinations.map((destination) => (
                  <Typography
                    key={destination._id}
                    variant="body2"
                    color="textSecondary"
                    sx={{ mr: 1 }}
                  >
                    {destination.name}
                  </Typography>
                ))}
              </Box>
            </>
          ) : (
            <Typography variant="body2" color="textSecondary">
              No destinations available.
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
            width: { xs: "100%", sm: "auto" },
            flexShrink: 0,
          }}
        >
          <Button
            sx={{ m: 1, minWidth: "120px" }}
            variant="contained"
            onClick={(e) => {
              e.stopPropagation();
              handleEnterTrip();
            }}
          >
            Enter Trip
          </Button>
          {trip.userId === activeUserId && (
            <Button
              sx={{ m: 1, minWidth: "120px" }}
              variant="outlined"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteTrip(trip._id, trip.name);
              }}
            >
              Delete Trip
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
