import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { BaseLayout } from "../../layout/BaseLayout";
import { useAuth } from "../../auth/useAuth";

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
            Discover <span style={{ color: "black" }}>IForms</span> - an awesome
            platform where you can create, share, and analyze forms
            effortlessly.
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
                  Create Forms
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Easily create customized forms to collect data and feedback.
                  Our intuitive form builder lets you add various question
                  types, like short answers and rating scales, for gathering
                  precise information.
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Whether you’re conducting surveys or collecting customer
                  feedback, our platform has the tools for professional,
                  engaging forms.
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
                  Share Forms
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Share your forms effortlessly with links, and maximize your
                  audience reach. Embed forms on your website for a seamless
                  user experience.
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  With our sharing tools, you can ensure that your forms receive
                  the visibility they deserve.
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
                  Get Detailed Statistics
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Analyze responses with real-time data insights, response
                  rates, and question-by-question breakdowns.
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Create reports and visualizations to interpret data, using
                  filters and advanced tools to explore trends and patterns.
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
                  Sentiment Analysis
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Use sentiment analysis to understand the emotional tone in
                  feedback, leveraging natural language processing to analyze
                  open-ended responses.
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Whether measuring customer satisfaction or public opinion, our
                  tools provide insights into sentiment and attitude in
                  responses.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </BaseLayout>
  );
};
