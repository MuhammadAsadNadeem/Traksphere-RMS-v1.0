import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Container,
  useTheme,
} from "@mui/material";
import {
  DirectionsBus,
  Route,
  Warning,
  Update,
  Person,
  Security,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  borderRadius: 16,
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
    "& .feature-icon": {
      transform: "scale(1.1)",
      color: theme.palette.secondary.main,
    },
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 64,
  height: 64,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: `${theme.palette.primary.main}15`,
  marginBottom: theme.spacing(2),
  transition: "all 0.3s ease",
}));

const features = [
  {
    icon: DirectionsBus,
    title: "Live Bus Tracking",
    description:
      "Real-time GPS tracking of all buses with precise location updates and estimated arrival times.",
  },
  {
    icon: Route,
    title: "Route Optimization",
    description:
      "AI-powered route planning to minimize travel time and fuel consumption while maximizing efficiency.",
  },
  {
    icon: Warning,
    title: "Emergency Alerts",
    description:
      "Instant emergency notifications and panic button integration for passenger and driver safety.",
  },
  {
    icon: Update,
    title: "Real-time Updates",
    description:
      "Live updates on delays, route changes, and service announcements delivered instantly.",
  },
  {
    icon: Person,
    title: "Driver Management",
    description:
      "Comprehensive driver monitoring, performance analytics, and shift management system.",
  },
  {
    icon: Security,
    title: "Passenger Safety",
    description:
      "Advanced safety features including passenger counting, emergency protocols, and incident reporting.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export default function FeatureSection() {
  const theme = useTheme();

  return (
    <section id="features">
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
            }}
          >
            Powerful Features
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto", lineHeight: 1.6 }}
          >
            Discover how TrakSphere revolutionizes public transportation with
            cutting-edge technology
          </Typography>
        </Box>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <motion.div variants={cardVariants}>
                  <StyledCard>
                    <CardContent sx={{ p: 4, textAlign: "center" }}>
                      <IconWrapper>
                        <feature.icon
                          className="feature-icon"
                          sx={{
                            fontSize: 32,
                            color: theme.palette.primary.main,
                          }}
                        />
                      </IconWrapper>

                      <Typography
                        variant="h5"
                        component="h3"
                        gutterBottom
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.text.primary,
                          mb: 2,
                        }}
                      >
                        {feature.title}
                      </Typography>

                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                          lineHeight: 1.6,
                          fontSize: "1rem",
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </section>
  );
}
