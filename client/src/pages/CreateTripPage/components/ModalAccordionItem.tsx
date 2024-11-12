import AddCircleIcon from '@mui/icons-material/AddCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Typography,
} from '@mui/material';

interface Destination {
  _id: string;
  name: string;
  description: string;
  activities: string[];
}

interface ModalAccordionItemProps {
  destination: Destination;
  handleAddToSelectedDestinations: (destination: Destination) => void;
}

export const ModalAccordionItem: React.FC<ModalAccordionItemProps> = ({
  destination,
  handleAddToSelectedDestinations,
}) => {
  return (
    <Box sx={{ m: 1 }}>
      <Accordion>
        <AccordionSummary
          sx={{
            backgroundColor: 'primary.main',
            borderRadius: 1,
            color: 'white',
          }}
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
        >
          <Button
            onClick={() => handleAddToSelectedDestinations(destination)}
            sx={{
              backgroundColor: 'primary.main',
              p: 0,
            }}
          >
            <AddCircleIcon sx={{ color: 'white' }} />
          </Button>
          <Typography>{destination.name}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: 'grey.100' }}>
          <Typography>{destination.description}</Typography>
          <Box display="flex" mt={1}>
            {destination.activities.map((activity: string, index: number) => (
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
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
