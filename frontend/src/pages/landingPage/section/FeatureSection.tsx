import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  useTheme,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import { motion } from "framer-motion";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SecurityIcon from "@mui/icons-material/Security";
import SpeedIcon from "@mui/icons-material/Speed";
import BarChartIcon from "@mui/icons-material/BarChart";
import DevicesIcon from "@mui/icons-material/Devices";
import SchoolIcon from "@mui/icons-material/School";

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const FeatureCard = styled(Card)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  transition: "all 0.3s ease-in-out",
  height: "100%",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.1)",
    "& .feature-icon": {
      animation: `${pulse} 1s ease-in-out infinite`,
    },
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: "80px",
  height: "80px",
  borderRadius: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
  "& svg": {
    fontSize: "40px",
    color: "white",
  },
}));

const features = [
  {
    icon: <DirectionsBusIcon />,
    title: "Real-Time Tracking",
    description:
      "Track university buses with live GPS updates and estimated arrival times.",
    category: "Core Feature",
  },
  {
    icon: <TrackChangesIcon />,
    title: "Route Optimization",
    description:
      "AI-powered route planning to minimize travel time and maximize efficiency.",
    category: "Smart Technology",
  },
  {
    icon: <NotificationsActiveIcon />,
    title: "Smart Alerts",
    description:
      "Instant notifications for delays, route changes, and emergency updates.",
    category: "Communication",
  },
  {
    icon: <SecurityIcon />,
    title: "Student Safety",
    description:
      "Enhanced security features with emergency response and real-time monitoring.",
    category: "Safety",
  },
  {
    icon: <SpeedIcon />,
    title: "Performance Metrics",
    description:
      "Detailed analytics on bus performance, timing, and passenger load.",
    category: "Analytics",
  },
  {
    icon: <BarChartIcon />,
    title: "Data Analytics",
    description: "Comprehensive insights dashboard for better decision-making.",
    category: "Analytics",
  },
  {
    icon: <DevicesIcon />,
    title: "Cross-Platform Access",
    description:
      "Seamless experience across desktop, tablet, and mobile devices.",
    category: "Accessibility",
  },
  {
    icon: <SchoolIcon />,
    title: "Campus Integration",
    description: "Seamless integration with university systems and schedules.",
    category: "Integration",
  },
];

const FeatureSection = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      id="features"
      sx={{
        py: { xs: 8, md: 12 },
        background: theme.palette.background.paper,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}
        >
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Powerful Features
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ maxWidth: "800px", mx: "auto", mb: 6 }}
          >
            Experience the future of university transportation with our
            cutting-edge features
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FeatureCard elevation={0}>
                  <Box sx={{ position: "relative" }}>
                    <Typography
                      variant="caption"
                      sx={{
                        position: "absolute",
                        top: -theme.spacing(2),
                        right: 0,
                        color: "text.secondary",
                        backgroundColor: "background.paper",
                        px: 1,
                        borderRadius: 1,
                        fontSize: "0.75rem",
                      }}
                    >
                      {feature.category}
                    </Typography>
                    <IconWrapper className="feature-icon">
                      {feature.icon}
                    </IconWrapper>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ fontWeight: 600, mb: 2 }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ lineHeight: 1.7 }}
                    >
                      {feature.description}
                    </Typography>
                  </Box>
                </FeatureCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeatureSection;
