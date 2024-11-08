import { Box, Card, Chip, Typography } from '@mui/material';

interface Destination {
  activities: string[];
}

export const DestinationsActivities = ({
  destination,
}: {
  destination: Destination;
}) => {
  return (
    <Card sx={{ mt: 2, p: 2, backgroundColor: 'white', color: 'primary.main' }}>
      <Typography variant="h5" sx={{ fontWeight: 'regular', p: 2 }}>
        Explore this great destination and it's great activities
      </Typography>
      <Box display="flex" flexWrap="wrap" sx={{ p: 2 }}>
        {destination?.activities.map((activity: string, index: number) => (
          <Chip
            key={index}
            label={activity}
            sx={{
              fontSize:'20px',
              mr: 1,
              mb: 1,
              backgroundColor: 'primary.main',
              color: 'white',
            }}
          />
        ))}
      </Box>
    </Card>
  );
};
