import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useAuth } from "../../auth/useAuth";
import { BaseLayout } from "../../layout/BaseLayout";

export const HomePage = () => {
  const { activeUser } = useAuth();

  return (
    <BaseLayout>
      <Container>
        <Box textAlign="center" my={5}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            Welcome, {activeUser ? `${activeUser.username}` : "Guest"}!
          </Typography>
          <Typography variant="h5" color="textSecondary" paragraph>
            Welcome to <span style={{ color: "black" }}>ITrips</span> – your go-to platform for creating, exploring, and sharing amazing trips and destinations.
          </Typography>
        </Box>

        <Grid
          container
          direction="column"
          alignItems="center"
          spacing={4}
          my={5}
        >
          <Grid item xs={12} md={10} style={{ width: "95%" }}>
            <Card>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "primary.dark" }}
                >
                  Plan Your Dream Trips
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Easily create custom trips by selecting your dream destinations, dates, and travel details. Whether you're exploring new cities or embarking on a nature adventure, our platform makes trip planning seamless.
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Start your next adventure by building a complete itinerary that fits your style and needs.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={10} style={{ width: "95%" }}>
            <Card>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "primary.dark" }}
                >
                  Discover New Destinations
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Explore an extensive list of destinations around the world. Whether you’re looking for a beach vacation, a cultural experience, or a mountain retreat, you’ll find a destination that excites you.
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Browse through various travel spots and add them to your trip plans to create your perfect adventure.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={10} style={{ width: "95%" }}>
            <Card>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "primary.dark" }}
                >
                  Share Your Trips with Friends
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Share your trip itineraries with friends and family to keep them in the loop. Send them a link to view your trip details, suggest changes, or even join the adventure!
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Perfect for group travels and family vacations, sharing your travel plans has never been easier.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={10} style={{ width: "95%" }}>
            <Card>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "primary.dark" }}
                >
                  Visualize Your Journey
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  View your entire trip in a visual format, with a clear itinerary and destination maps. Our platform helps you plan and visualize your travel journey in a way that’s easy to follow.
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  From estimated travel times to activity suggestions, you’ll have all the info you need to make your journey smooth and stress-free.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </BaseLayout>
  );
};
