import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Typography,
} from '@mui/material';

interface Destination {
  _id: string;
  name: string;
  userId?: string;
  description?: string;
  activities?: string[];
}

interface AccordionDestinationProps {
  destination: Destination;
}

export const AccordionDestination = ({
  destination,
}: AccordionDestinationProps) => {
  return (
    <Accordion sx={{ mt: 2 }}>
      <AccordionSummary
        sx={{
          backgroundColor: 'white',
          borderRadius: 1,
          color: 'primary.dark',
          fontWeight: 'bold',
        }}
        expandIcon={<ExpandMoreIcon sx={{ color: 'primary.dark' }} />}
      >
        <Typography>{destination.name}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ backgroundColor: 'grey.100' }}>
        <Typography>{destination.description}</Typography>
        <Box display="flex" mt={1}>
          {destination?.activities?.map((activity, index) => (
            <Chip
              key={index}
              label={activity}
              sx={{
                mr: 1,
                backgroundColor: 'primary.main',
                color: 'white',
              }}
            />
          ))}
          {destination.activities?.length === 0 && (
            <Typography sx={{ width: '100%', textAlign: 'center', mt: 2 }}>
              No activities available for this destination.
            </Typography>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
