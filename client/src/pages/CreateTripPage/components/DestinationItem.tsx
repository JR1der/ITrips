import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Card, Chip, IconButton, Typography } from '@mui/material';

interface Destination {
  name: string;
  activities: string[];
}

interface DestinationItemProps {
  destination: Destination;
  index: number;
  handleRemoveDestination: (index: number) => void;
}

export const DestinationItem: React.FC<DestinationItemProps> = ({
  destination,
  index,
  handleRemoveDestination,
}) => {
  return (
    <Card
      sx={{
        mt: 2,
        p: 2,
        backgroundColor: 'white',
        '&:hover': {
          backgroundColor: 'grey.300',
        },
        transition: '0.5s',
      }}
    >
      <Box display="flex" alignItems="center">
        <Typography variant="h6" sx={{ color: 'primary.dark' }}>
          {destination.name}
        </Typography>
        <IconButton
          color="error"
          onClick={() => handleRemoveDestination(index)}
          sx={{ ml: 1 }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
      <Box display="flex" mt={1}>
        {destination.activities.map(
          (activity: string, activityIndex: number) => (
            <Chip
              key={activityIndex}
              label={activity}
              sx={{
                mr: 1,
                backgroundColor: 'primary.main',
                color: 'white',
              }}
            />
          )
        )}
      </Box>
    </Card>
  );
};
