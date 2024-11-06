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
    <Card sx={{ mt: 2, p: 2, backgroundColor: 'primary.main', color: 'white' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', p: 1 }}>
        Activities
      </Typography>
      <Box display="flex" flexWrap="wrap" sx={{ p: 2 }}>
        {destination?.activities.map((activity: string, index: number) => (
          <Chip
            key={index}
            label={activity}
            sx={{
              mr: 1,
              mb: 1,
              backgroundColor: 'white',
              color: 'primary.dark',
            }}
          />
        ))}
      </Box>
    </Card>
  );
};
