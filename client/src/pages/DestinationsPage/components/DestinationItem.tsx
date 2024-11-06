import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Destination {
  _id: string;
  name: string;
  userId: string;
}

interface DestinationItemProps {
  activeUserId?: string;
  destination: Destination;
  handleDeleteDestination: (id: string, name: string) => void;
}

export const DestinationItem: React.FC<DestinationItemProps> = ({
  activeUserId,
  destination,
  handleDeleteDestination,
}) => {
  const navigate = useNavigate();

  const handleEnterDestination = () => {
    navigate(`/destinations/${destination._id}`);
  };

  return (
    <Card
      sx={{
        mt: 2,
        p: 2,
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "grey.200",
        },
        transition: "0.3s",
      }}
      onClick={() => handleEnterDestination()}
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
            {destination.name}
          </Typography>
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
            onClick={(event) => {
              event.stopPropagation();
              handleEnterDestination();
            }}
          >
            Enter Destination
          </Button>
          {destination.userId === activeUserId && (
            <Button
              sx={{ m: 1, minWidth: "120px" }}
              variant="outlined"
              onClick={(event) => {
                event.stopPropagation();
                handleDeleteDestination(destination._id, destination.name);
              }}
            >
              Delete Destination
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
