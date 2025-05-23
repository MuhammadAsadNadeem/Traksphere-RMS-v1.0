import { Box, Typography, Grid, Container, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import MapIcon from "@mui/icons-material/Map";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TimelineIcon from "@mui/icons-material/Timeline";

// Styled Container for About Section
const AboutContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(8, 0),
  position: "relative",
  overflow: "hidden",
}));

// Styled Content Box
const AboutContent = styled(Box)(({ theme }) => ({
  textAlign: "center",
  maxWidth: "900px",
  margin: "0 auto",
  padding: theme.spacing(0, 2),
}));

// Styled Card for Features/Mission
const InfoCard = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(3),
  background: "rgba(255, 255, 255, 0.9)",
  borderRadius: "12px",
  boxShadow: `0 4px 15px ${theme.palette.primary.light}`, // Subtle purple shadow
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: `0 6px 20px ${theme.palette.primary.dark}`, // Deep purple glow
  },
}));

const AboutSection = () => {
  const theme = useTheme();

  return (
    <AboutContainer id="about">
      <Container>
        {/* Section Heading */}
        <AboutContent>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "3.5rem" },
              fontWeight: "700",
              color: theme.palette.primary.main,
              mb: 2,
            }}
          >
            About Traksphere
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", md: "1.25rem" },
              color: theme.palette.text.secondary,
              mb: 6,
              maxWidth: "700px",
              mx: "auto",
            }}
          >
            Traksphere is a cutting-edge route management system designed to
            streamline fleet operations, optimize travel paths, and enhance
            safety with real-time insights.
          </Typography>
        </AboutContent>

        {/* Key Info Cards */}
        <Grid container spacing={4} justifyContent="center">
          {[
            {
              icon: (
                <MapIcon
                  sx={{ fontSize: "3rem", color: theme.palette.primary.main }}
                />
              ),
              title: "Our Vision",
              description:
                "To revolutionize transportation with intelligent route planning and real-time tracking.",
            },
            {
              icon: (
                <DirectionsCarIcon
                  sx={{ fontSize: "3rem", color: theme.palette.primary.main }}
                />
              ),
              title: "Our Mission",
              description:
                "Empower fleets with tools to reduce costs, improve efficiency, and ensure passenger safety.",
            },
            {
              icon: (
                <TimelineIcon
                  sx={{ fontSize: "3rem", color: theme.palette.primary.main }}
                />
              ),
              title: "Our Technology",
              description:
                "Leveraging AI and GPS to deliver precise route optimization and fleet management.",
            },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <InfoCard>
                <Box mb={2}>{item.icon}</Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "600",
                    color: theme.palette.primary.dark,
                    mb: 1,
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary, lineHeight: 1.6 }}
                >
                  {item.description}
                </Typography>
              </InfoCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </AboutContainer>
  );
};

export default AboutSection;
