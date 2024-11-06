import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { BaseLayout } from '../../layout/BaseLayout';

export const WelcomePage = () => {
  return (
    <BaseLayout>
      <Container>
        <Box textAlign="center" my={5}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            Start Planning Your Next Adventure!
          </Typography>
          <Typography variant="h5" color="textSecondary" paragraph>
            Welcome to <span style={{ color: 'black' }}>ITrips</span> – the
            ultimate platform to create, explore, and share unforgettable trips
            and destinations.
          </Typography>
        </Box>

        <Grid
          container
          direction="column"
          alignItems="center"
          spacing={4}
          my={5}
        >
          <Grid item xs={12} md={10} style={{ width: '95%' }}>
            <Card>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  sx={{ fontWeight: 'bold', color: 'primary.dark' }}
                >
                  Create Your Own Trips
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Easily plan your trips by selecting destinations, setting
                  dates, and organizing the details of your adventure. Whether
                  it's a weekend getaway or a long vacation, our platform helps
                  you create and customize your ideal itinerary.
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  From road trips to international holidays, planning your next
                  trip has never been easier.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={10} style={{ width: '95%' }}>
            <Card>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  sx={{ fontWeight: 'bold', color: 'primary.dark' }}
                >
                  Discover and Add New Destinations
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Explore a wide range of destinations and add them to your
                  trips. Whether you're looking for scenic spots, cultural hubs,
                  or adventure destinations, our platform provides a
                  comprehensive list to help you find the perfect places for
                  your journey.
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  With detailed information on each destination, you can make
                  informed decisions about where to go next.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={10} style={{ width: '95%' }}>
            <Card>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  sx={{ fontWeight: 'bold', color: 'primary.dark' }}
                >
                  Share Your Trips with Friends and Family
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Share your trips effortlessly with loved ones. Send them a
                  link to your trip itinerary, so they can view your travel
                  plans and even suggest additions or modifications.
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Planning a group trip? Easily coordinate with everyone
                  involved and keep all details in one place.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={10} style={{ width: '95%' }}>
            <Card>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  sx={{ fontWeight: 'bold', color: 'primary.dark' }}
                >
                  Visualize Your Journey
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  View and analyze your entire trip with a detailed itinerary,
                  destination maps, and travel time estimations. Our platform
                  helps you plan your trip more effectively, giving you all the
                  tools you need to organize your travel experience.
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Whether you're traveling solo or with a group, our visual
                  tools ensure a smooth and organized journey.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </BaseLayout>
  );
};
