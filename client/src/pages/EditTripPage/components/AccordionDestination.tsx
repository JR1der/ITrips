import {Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, Typography} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Destination {
    _id: string;
    name: string;
    description: string;
    activities: string[];
}

interface AccordionDestinationProps {
    destination: Destination;
    handleSelectDestination: (destination: Destination) => void;
}

export const AccordionDestination = ({destination, handleSelectDestination}: AccordionDestinationProps) => {
    return (
        <Box sx={{m: 1}} key={destination._id}>
            <Accordion>
                <AccordionSummary
                    sx={{
                        backgroundColor: 'primary.main',
                        borderRadius: 1,
                        color: 'white'
                    }}
                    expandIcon={<ExpandMoreIcon sx={{color: 'white'}}/>}
                >
                    <Button
                        onClick={() => handleSelectDestination(destination)}
                        sx={{
                            backgroundColor: 'primary.main',
                            p: 0,
                        }}
                    >
                        <AddCircleIcon sx={{color: 'white'}}/>
                    </Button>
                    <Typography>{destination.name}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{backgroundColor: 'grey.100'}}>
                    <Typography>{destination.description}</Typography>
                    <Box display="flex" mt={1}>
                        {destination.activities.map((activity: string, index: number) => (
                            <Chip key={index} label={activity}
                                  sx={{
                                      mr: 1,
                                      backgroundColor: 'primary.main',
                                      color: 'white'
                                  }}/>
                        ))}
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}