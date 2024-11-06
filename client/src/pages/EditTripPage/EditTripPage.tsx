import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {BaseLayout} from '../../layout/BaseLayout.tsx';
import Container from '@mui/material/Container';
import {Box, TextField, Button, Typography, Modal, Fade, Chip, IconButton, Card} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorBox from '../../components/ErrorBox.tsx';
import {useTrip} from '../../hooks/useTrip.ts';
import {useDestinations} from '../../hooks/useDestinations.ts';
import {EditedModal} from "../EditDestinationPage/components/EditedModal.tsx";
import {AccordionDestination} from "./components/AccordionDestination.tsx";
import {LoadingComponent} from "../../components/LoadingComponent.tsx";
import {Destination} from "../CreateTripPage/CreateTripPage.tsx";

export const EditTripPage = () => {
    const {id} = useParams<{ id?: string }>() ?? {id: ''};
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedDestinations, setSelectedDestinations] = useState<Destination[]>([]);
    const [error, setError] = useState('');
    const [errorType, setErrorType] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [trip, tripLoading, tripError] = useTrip(id);
    const [openModal, setOpenModal] = useState(false);
    const [destinations, destLoading, destError] = useDestinations(); // Custom hook to fetch destinations
    const [showEditedModal, setShowEditedModal] = useState(false);
    const api = import.meta.env.REACT_APP_API_URL;

    useEffect(() => {
        if (!tripLoading) {
            if (tripError) {
                setError('Error fetching trip data');
                setErrorType('error');
            } else {
                setName(trip?.name || '');
                setDescription(trip?.description || '');
                setSelectedDestinations(trip?.destinations || []);
            }
            setIsLoading(false);
        }
    }, [trip, tripLoading, tripError]);

    const handleEditTrip = async () => {
        if (!name || !description) {
            setError('All fields should be filled');
            setErrorType('error');
            return;
        }

        const tripData = {
            name,
            description,
            destinations: selectedDestinations.map(destination => destination?._id)
        };

        try {
            const res = await fetch(`${api}/trip/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tripData),
            });

            const result = await res.json();
            console.log(result)
            if (res.ok) {
                setError(result.message);
                setErrorType('success');
                setShowEditedModal(true);
            } else {
                setError(result.message);
                setErrorType('warning');
            }
        } catch (err) {
            console.error(err);
            setError((err as Error).message);
            setErrorType('error');
        }
    };

    const handleAddDestination = () => {
        setOpenModal(true);
    };

    const handleSelectDestination = (destination: Destination) => {
        setSelectedDestinations([...selectedDestinations, destination]);
        setOpenModal(false);
    };

    const handleRemoveDestination = (index: number) => {
        setSelectedDestinations(selectedDestinations.filter((_, i) => i !== index));
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleCloseEditedModal = () => {
        setShowEditedModal(false);
        window.location.reload();
    };
    if (isLoading || tripLoading || destLoading) {
        return (
            <LoadingComponent/>
        );
    }
    return (
        <BaseLayout>
            <Container>
                <Box my={4}>
                    <>
                        {error && <ErrorBox message={error} type={errorType}/>}

                        <TextField
                            fullWidth
                            label="Trip Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            margin="normal"
                            multiline
                            rows={4}
                        />
                        {/* Render selected destinations */}
                        <Typography variant="h6" sx={{mt: 2}}>
                            Selected Destinations:
                        </Typography>
                        <Button
                            startIcon={<AddCircleIcon/>}
                            sx={{mt: 2}}
                            variant="contained"
                            color="primary"
                            onClick={handleAddDestination}
                        >
                            Add Destination
                        </Button>
                        {selectedDestinations?.map((destination, index) => (
                            <Card
                                key={index}
                                sx={{
                                    mt: 2,
                                    p: 2,
                                    backgroundColor: 'white',
                                    '&:hover': {
                                        backgroundColor: 'grey.300'
                                    },
                                    transition: '0.5s'
                                }}
                            >
                                <Box display="flex" alignItems="center">
                                    <Typography variant="h6"
                                                sx={{color: 'primary.dark'}}>{destination?.name}</Typography>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleRemoveDestination(index)}
                                        sx={{ml: 1}}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                </Box>
                                <Box display="flex" mt={1}>
                                    {destination?.activities.map((activity: string, activityIndex: number) => (
                                        <Chip
                                            key={activityIndex}
                                            label={activity}
                                            sx={{
                                                mr: 1,
                                                backgroundColor: 'primary.main',
                                                color: 'white'
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Card>
                        ))}
                        <Modal
                            open={openModal}
                            onClose={handleCloseModal}
                            aria-labelledby="select-destination-modal"
                            aria-describedby="select-destination-modal-description"
                        >
                            <Fade in={openModal}>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: {xs: '80%', sm: 400},
                                        bgcolor: 'background.paper',
                                        boxShadow: 24,
                                        p: 4,
                                        borderRadius: 2,
                                    }}
                                >
                                    <Typography variant="h6" component="h2" textAlign="center" sx={{mb: 2}}>
                                        Select Destination
                                    </Typography>
                                    {destLoading && <LoadingComponent/>}
                                    {destError &&
                                        <ErrorBox message="Error fetching destinations. Please try again later."
                                                  type="error"/>}
                                    {!destLoading && !destError && (
                                        <Box sx={{maxHeight: 'calc(100vh - 200px)', overflow: 'auto'}}>
                                            {destinations?.map((destination) => (
                                                <AccordionDestination key={destination._id}
                                                                      destination={destination}
                                                                      handleSelectDestination={handleSelectDestination}/>
                                            ))}
                                        </Box>)
                                    }
                                </Box>
                            </Fade>
                        </Modal>
                    </>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleEditTrip}
                        sx={{mt: 2}}
                    >
                        Click To Edit Trip
                    </Button>
                </Box>
            </Container>
            <EditedModal handleCloseModal={handleCloseEditedModal} openModal={showEditedModal}/>
        </BaseLayout>
    );
};