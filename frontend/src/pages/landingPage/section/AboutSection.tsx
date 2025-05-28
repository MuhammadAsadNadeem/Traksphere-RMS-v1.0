"use client";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Avatar,
  Stack,
  Container,
  useTheme,
  Paper,
  IconButton,
  alpha,
} from "@mui/material";
import {
  DirectionsBus as DirectionsBusIcon,
  Wifi as WifiIcon,
  Storage as StorageIcon,
  FlashOn as FlashOnIcon,
  BarChart as BarChartIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Route as RouteIcon,
  Notifications as NotificationsIcon,
  TrendingUp as TrendingUpIcon,
  AutoAwesome as AutoAwesomeIcon,
} from "@mui/icons-material";
import { motion, useInView } from "framer-motion";
import { styled, keyframes } from "@mui/material/styles";
import { useRef, useState } from "react";

// Keyframe animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Styled Components
const GlassmorphicBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.primary.main, 0.1)} 0%, 
    ${alpha(theme.palette.secondary.main, 0.05)} 50%,
    ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
  backdropFilter: "blur(20px)",
  borderRadius: 24,
  border: `1px solid ${alpha("#ffffff", 0.2)}`,
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "1px",
    background: `linear-gradient(90deg, transparent, ${alpha(
      "#ffffff",
      0.4
    )}, transparent)`,
  },
}));

const NeumorphicCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(145deg, ${
    theme.palette.background.paper
  }, ${alpha(theme.palette.grey[100], 0.8)})`,
  borderRadius: 24,
  border: "none",
  boxShadow: `
    20px 20px 40px ${alpha(theme.palette.grey[400], 0.2)},
    -20px -20px 40px ${alpha("#ffffff", 0.8)},
    inset 0 0 0 1px ${alpha(theme.palette.grey[200], 0.3)}
  `,
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-12px) scale(1.02)",
    boxShadow: `
      25px 25px 50px ${alpha(theme.palette.grey[400], 0.3)},
      -25px -25px 50px ${alpha("#ffffff", 0.9)},
      inset 0 0 0 1px ${alpha(theme.palette.primary.main, 0.2)}
    `,
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: `linear-gradient(90deg, transparent, ${alpha(
      "#ffffff",
      0.4
    )}, transparent)`,
    transition: "left 0.5s",
  },
  "&:hover::before": {
    left: "100%",
  },
}));

const HolographicText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(45deg, 
    ${theme.palette.primary.light}, 
    ${theme.palette.secondary.dark}, 
    ${theme.palette.primary.dark},
    ${theme.palette.secondary.light})`,

  backgroundSize: "400% 400%",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  animation: `${shimmer} 3s ease-in-out infinite`,
  fontWeight: 900,
  letterSpacing: "-0.02em",
}));

const FloatingIcon = styled(Avatar)(({ theme }) => ({
  animation: `${float} 3s ease-in-out infinite`,
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
  border: `2px solid ${alpha("#ffffff", 0.2)}`,
  "&:hover": {
    animation: `${pulse} 0.5s ease-in-out`,
    transform: "scale(1.1)",
  },
}));

const TechBubble = styled(Chip)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.background.paper, 0.9)}, 
    ${alpha(theme.palette.grey[50], 0.9)})`,
  backdropFilter: "blur(10px)",
  border: `1px solid ${alpha(theme.palette.grey[300], 0.3)}`,
  borderRadius: 20,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    transform: "translateY(-4px) scale(1.05)",
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    color: "#ffffff",
    boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.4)}`,
    "& .MuiAvatar-root": {
      background: alpha("#ffffff", 0.2),
    },
  },
}));

const MetricCard = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${alpha("#ffffff", 0.1)}, 
    ${alpha("#ffffff", 0.05)})`,
  backdropFilter: "blur(20px)",
  borderRadius: 20,
  border: `1px solid ${alpha("#ffffff", 0.2)}`,
  padding: theme.spacing(4),
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(circle at 50% 0%, ${alpha(
      "#ffffff",
      0.1
    )}, transparent 70%)`,
    pointerEvents: "none",
  },
}));

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, rotateX: -15, y: 50 },
  visible: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Data
const benefits = [
  {
    title: "Real-Time Tracking",
    description:
      "Advanced GPS integration provides precise location data with sub-meter accuracy, enabling students to track buses in real-time with predictive arrival estimates.",
    icon: <DirectionsBusIcon />,
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    delay: 0,
  },
  {
    title: "Smart Route Optimization",
    description:
      "AI-powered algorithms analyze traffic patterns, passenger density, and historical data to optimize routes dynamically, reducing travel time by up to 40%.",
    icon: <RouteIcon />,
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    delay: 0.1,
  },
  {
    title: "Intelligent Alerts",
    description:
      "Proactive notification system with machine learning capabilities that predicts delays, suggests alternative routes, and provides emergency communications.",
    icon: <NotificationsIcon />,
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    delay: 0.2,
  },
  {
    title: "Advanced Security",
    description:
      "Multi-layered security framework with biometric authentication, encrypted communications, and real-time monitoring for comprehensive passenger safety.",
    icon: <SecurityIcon />,
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    delay: 0.3,
  },
];

const techStack = [
  {
    name: "React 18",
    icon: <FlashOnIcon />,
    category: "Frontend",
    color: "#61DAFB",
  },
  {
    name: "Node.js",
    icon: <StorageIcon />,
    category: "Backend",
    color: "#339933",
  },
  {
    name: "PostgreSQL",
    icon: <StorageIcon />,
    category: "Database",
    color: "#336791",
  },
  {
    name: "WebSocket",
    icon: <WifiIcon />,
    category: "Real-time",
    color: "#FF6B6B",
  },
  {
    name: "STM32 IoT",
    icon: <DirectionsBusIcon />,
    category: "Hardware",
    color: "#03234B",
  },
];

const stats = [
  {
    value: "99.9%",
    label: "System Uptime",
    icon: <SpeedIcon />,
    description: "Enterprise-grade reliability",
  },
  {
    value: "65%",
    label: "Efficiency Boost",
    icon: <TrendingUpIcon />,
    description: "Reduced wait times & fuel consumption",
  },
  {
    value: "24/7",
    label: "Smart Monitoring",
    icon: <BarChartIcon />,
    description: "Continuous system optimization",
  },
];

export default function AboutSection() {
  const theme = useTheme();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const heroRef = useRef(null);
  const benefitsRef = useRef(null);
  const techRef = useRef(null);
  const statsRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const benefitsInView = useInView(benefitsRef, { once: true });
  const techInView = useInView(techRef, { once: true });
  const statsInView = useInView(statsRef, { once: true });

  return (
    <section id="about">
      <Box
        sx={{
          background: `
          radial-gradient(circle at 20% 80%, ${alpha(
            theme.palette.primary.main,
            0.15
          )} 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, ${alpha(
            theme.palette.secondary.main,
            0.15
          )} 0%, transparent 50%),
          linear-gradient(135deg, ${
            theme.palette.background.default
          } 0%, ${alpha(theme.palette.grey[50], 0.8)} 100%)
        `,
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23${theme.palette.primary.main.slice(
              1
            )}' fillOpacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            pointerEvents: "none",
          },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{ py: { xs: 8, md: 12 }, position: "relative", zIndex: 1 }}
        >
          {/* Hero Section */}
          <motion.div
            ref={heroRef}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <Box sx={{ textAlign: "center", mb: { xs: 10, md: 16 } }}>
              <motion.div variants={itemVariants}>
                <Chip
                  icon={<AutoAwesomeIcon />}
                  label="Next-Generation Campus Transportation"
                  sx={{
                    mb: 4,
                    px: 3,
                    py: 1,
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    background: `linear-gradient(135deg, ${alpha(
                      theme.palette.primary.main,
                      0.1
                    )}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${alpha(
                      theme.palette.primary.main,
                      0.2
                    )}`,
                    color: theme.palette.primary.main,
                  }}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <HolographicText
                  variant="h1"
                  sx={{
                    fontSize: { xs: "3rem", md: "5rem", lg: "6.5rem" },
                    mb: 4,
                    lineHeight: 0.9,
                  }}
                >
                  TrakSphere
                </HolographicText>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="h4"
                  sx={{
                    color: theme.palette.text.secondary,
                    maxWidth: 900,
                    mx: "auto",
                    fontWeight: 300,
                    lineHeight: 1.4,
                    mb: 6,
                    fontSize: { xs: "1.25rem", md: "1.75rem" },
                  }}
                >
                  Revolutionizing university transportation with , real-time
                  analytics, and seamless user experiences that transform how
                  students navigate campus.
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                  sx={{ flexWrap: "wrap", gap: 2 }}
                >
                  {["Smart", "Efficient", "Secure", "Innovative"].map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      variant="outlined"
                      sx={{
                        borderColor: alpha(theme.palette.primary.main, 0.3),
                        color: theme.palette.primary.main,
                        fontWeight: 500,
                        "&:hover": {
                          background: alpha(theme.palette.primary.main, 0.1),
                          borderColor: theme.palette.primary.main,
                        },
                      }}
                    />
                  ))}
                </Stack>
              </motion.div>
            </Box>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            ref={benefitsRef}
            initial="hidden"
            animate={benefitsInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <Box sx={{ mb: { xs: 10, md: 16 } }}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    mb: 3,
                    textAlign: "center",
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.text.secondary})`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Core Capabilities
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.text.secondary,
                    textAlign: "center",
                    mb: 8,
                    maxWidth: 600,
                    mx: "auto",
                    fontWeight: 400,
                  }}
                >
                  Cutting-edge features designed to enhance every aspect of
                  campus transportation
                </Typography>
              </motion.div>

              <Grid container spacing={4}>
                {benefits.map((benefit, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <motion.div
                      variants={cardVariants}
                      custom={index}
                      whileHover={{ scale: 1.02 }}
                      onHoverStart={() => setHoveredCard(index)}
                      onHoverEnd={() => setHoveredCard(null)}
                    >
                      <NeumorphicCard elevation={0}>
                        <CardContent sx={{ p: 5 }}>
                          <Stack
                            direction="row"
                            spacing={3}
                            alignItems="flex-start"
                          >
                            <FloatingIcon
                              sx={{
                                width: 64,
                                height: 64,
                                background: benefit.gradient,
                                animationDelay: `${benefit.delay}s`,
                              }}
                            >
                              {benefit.icon}
                            </FloatingIcon>
                            <Box sx={{ flex: 1 }}>
                              <Typography
                                variant="h5"
                                sx={{
                                  fontWeight: 700,
                                  mb: 2,
                                  color:
                                    hoveredCard === index
                                      ? theme.palette.primary.main
                                      : theme.palette.text.primary,
                                  transition: "color 0.3s ease",
                                }}
                              >
                                {benefit.title}
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{
                                  color: theme.palette.text.secondary,
                                  lineHeight: 1.7,
                                  fontSize: "1.1rem",
                                }}
                              >
                                {benefit.description}
                              </Typography>
                            </Box>
                          </Stack>
                        </CardContent>
                      </NeumorphicCard>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            ref={techRef}
            initial="hidden"
            animate={techInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <GlassmorphicBox
              sx={{ p: { xs: 6, md: 8 }, mb: { xs: 10, md: 16 } }}
            >
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    mb: 3,
                    textAlign: "center",
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                  }}
                >
                  Technology Stack
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.text.secondary,
                    textAlign: "center",
                    mb: 8,
                    maxWidth: 700,
                    mx: "auto",
                    fontWeight: 400,
                  }}
                >
                  Built with industry-leading technologies for maximum
                  performance, scalability, and reliability
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Grid container spacing={3} justifyContent="center">
                  {techStack.map((tech, index) => (
                    <Grid item key={index}>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <TechBubble
                          icon={
                            <Avatar
                              sx={{
                                width: 32,
                                height: 32,
                                background: `linear-gradient(135deg, ${
                                  tech.color
                                }, ${alpha(tech.color, 0.7)})`,
                                color: "#ffffff",
                              }}
                            >
                              {tech.icon}
                            </Avatar>
                          }
                          label={tech.name}
                          sx={{
                            px: 3,
                            py: 1.5,
                            fontSize: "1rem",
                            fontWeight: 600,
                            height: 48,
                          }}
                        />
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            </GlassmorphicBox>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            ref={statsRef}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={itemVariants}
          >
            <Paper
              elevation={0}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                borderRadius: 6,
                overflow: "hidden",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                },
              }}
            >
              <CardContent
                sx={{ p: { xs: 8, md: 12 }, position: "relative", zIndex: 1 }}
              >
                <Box sx={{ textAlign: "center", mb: 8 }}>
                  <IconButton
                    sx={{
                      background: alpha("#ffffff", 0.2),
                      color: "#ffffff",
                      mb: 4,
                      width: 80,
                      height: 80,
                      "&:hover": {
                        background: alpha("#ffffff", 0.3),
                      },
                    }}
                  >
                    <BarChartIcon sx={{ fontSize: 40 }} />
                  </IconButton>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 800,
                      mb: 3,
                      color: "#ffffff",
                      fontSize: { xs: "2.5rem", md: "3.5rem" },
                    }}
                  >
                    Performance Metrics
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: alpha("#ffffff", 0.9),
                      maxWidth: 600,
                      mx: "auto",
                      fontWeight: 400,
                    }}
                  >
                    Real-world impact and measurable improvements in campus
                    transportation efficiency
                  </Typography>
                </Box>

                <Grid container spacing={4} justifyContent="center">
                  {stats.map((stat, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                      >
                        <MetricCard>
                          <Box sx={{ mb: 3, color: "#ffffff" }}>
                            {stat.icon}
                          </Box>
                          <Typography
                            variant="h1"
                            sx={{
                              fontWeight: 900,
                              mb: 2,
                              color: "#ffffff",
                              fontSize: { xs: "3rem", md: "4rem" },
                              textShadow: `0 0 20px ${alpha("#ffffff", 0.5)}`,
                            }}
                          >
                            {stat.value}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              color: alpha("#ffffff", 0.9),
                              fontWeight: 600,
                              mb: 1,
                            }}
                          >
                            {stat.label}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: alpha("#ffffff", 0.7),
                              fontSize: "0.9rem",
                            }}
                          >
                            {stat.description}
                          </Typography>
                        </MetricCard>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </section>
  );
}
