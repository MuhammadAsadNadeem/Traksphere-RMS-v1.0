"use client";
import {
  Box,
  Container,
  Typography,
  Paper,
  IconButton,
  useTheme,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  DirectionsBus,
  Schedule,
  LocationOn,
  ReportProblem,
} from "@mui/icons-material";

const features = [
  {
    icon: <DirectionsBus />,
    title: "View Routes",
    description:
      "Access all available bus routes and view details like stops and schedules.",
    color: "#3B82F6",
    gradient: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    delay: 0.1,
  },
  {
    icon: <Schedule />,
    title: "Check Schedule",
    description:
      "Know exactly when your bus will arrive and plan your day ahead.",
    color: "#8B5CF6",
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
    delay: 0.2,
  },
  {
    icon: <LocationOn />,
    title: "Real-Time Location",
    description: "Track buses in real-time and never miss your ride again.",
    color: "#10B981",
    gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
    delay: 0.3,
  },
  {
    icon: <ReportProblem />,
    title: "Report Complaints",
    description: "Have an issue? Log complaints to help improve bus services.",
    color: "#F59E0B",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
    delay: 0.4,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const cardVariants = {
  hidden: { scale: 0.8, opacity: 0, rotateY: -15 },
  visible: {
    scale: 1,
    opacity: 1,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  hover: {
    scale: 1.05,
    y: -8,
    rotateY: 5,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const ModernUserDashboard = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mt: 2,
        minHeight: "100vh",
        background: `linear-gradient(135deg, 
          ${theme.palette.mode === "dark" ? "#0F172A" : "#F8FAFC"} 0%, 
          ${theme.palette.mode === "dark" ? "#1E293B" : "#E2E8F0"} 50%, 
          ${theme.palette.mode === "dark" ? "#334155" : "#CBD5E1"} 100%)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Elements */}
      <motion.div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-10%",
          width: "300px",
          height: "300px",
          background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
          borderRadius: "50%",
          opacity: 0.1,
          filter: "blur(40px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <motion.div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-10%",
          width: "400px",
          height: "400px",
          background: "linear-gradient(135deg, #10B981 0%, #3B82F6 100%)",
          borderRadius: "50%",
          opacity: 0.08,
          filter: "blur(50px)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <Container
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: theme.spacing(6),
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header Section */}
        <motion.div variants={itemVariants}>
          <Box sx={{ textAlign: "center", mb: theme.spacing(8) }}>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.2,
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  background:
                    "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 3,
                  fontSize: { xs: "2.5rem", md: "4rem" },
                }}
              >
                Welcome Aboard
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 400,
                  color: theme.palette.text.secondary,
                  mb: 4,
                  maxWidth: "600px",
                  mx: "auto",
                  lineHeight: 1.6,
                }}
              >
                We're thrilled to have you join our journey. Discover how our
                app transforms your daily commute into a seamless experience.
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Chip
                label="✨ New Experience Awaits"
                sx={{
                  background:
                    "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
                  color: "white",
                  fontWeight: 600,
                  px: 2,
                  py: 1,
                }}
              />
            </motion.div>
          </Box>
        </motion.div>

        {/* Main Content Card */}
        <motion.div variants={itemVariants} style={{ width: "100%" }}>
          <Paper
            component={motion.div}
            sx={{
              width: "100%",
              maxWidth: "1200px",
              p: { xs: theme.spacing(4), md: theme.spacing(6) },
              borderRadius: 4,
              background:
                theme.palette.mode === "dark"
                  ? "rgba(30, 41, 59, 0.8)"
                  : "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(20px)",
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.05)"
              }`,
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                  : "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
            }}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <motion.div variants={itemVariants}>
              <Box sx={{ textAlign: "center", mb: theme.spacing(6) }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    mb: 3,
                    fontSize: { xs: "2rem", md: "2.5rem" },
                  }}
                >
                  What Our App Does
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 400,
                    color: theme.palette.text.secondary,
                    maxWidth: "800px",
                    mx: "auto",
                    lineHeight: 1.7,
                  }}
                >
                  Transform your daily commute with real-time bus tracking,
                  intelligent route planning, and comprehensive schedule
                  management. Your journey to stress-free travel starts here.
                </Typography>
              </Box>
            </motion.div>

            {/* Feature Cards */}
            <Box
              component={motion.div}
              variants={containerVariants}
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  lg: "repeat(4, 1fr)",
                },
                gap: theme.spacing(3),
                mb: theme.spacing(6),
              }}
            >
              {features.map((item, index) => (
                <Paper
                  key={index}
                  component={motion.div}
                  variants={cardVariants}
                  whileHover="hover"
                  sx={{
                    p: theme.spacing(4),
                    borderRadius: 3,
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                    background: theme.palette.background.paper,
                    border: `2px solid transparent`,
                    cursor: "pointer",
                    "&:hover": {
                      borderColor: item.color,
                    },
                  }}
                >
                  {/* Gradient overlay on hover */}
                  <motion.div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: item.gradient,
                      opacity: 0,
                      zIndex: 0,
                    }}
                    whileHover={{ opacity: 0.05 }}
                    transition={{ duration: 0.3 }}
                  />

                  <Box sx={{ position: "relative", zIndex: 1 }}>
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconButton
                        sx={{
                          fontSize: 48,
                          mb: 2,
                          background: item.gradient,
                          color: "white",
                          width: 80,
                          height: 80,
                          "&:hover": {
                            background: item.gradient,
                            transform: "scale(1.1)",
                          },
                        }}
                      >
                        {item.icon}
                      </IconButton>
                    </motion.div>

                    {/* Content */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.text.primary,
                        mb: 2,
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Box
                      sx={{
                        width: 40,
                        height: 3,
                        background: item.gradient,
                        borderRadius: 2,
                        mx: "auto",
                        mb: 2,
                      }}
                    />

                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        lineHeight: 1.6,
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Box>

                  {/* Bottom accent line */}
                  <motion.div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: item.gradient,
                      transformOrigin: "left",
                      scaleX: 0,
                    }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Paper>
              ))}
            </Box>
          </Paper>
        </motion.div>

        {/* Floating Elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              width: Math.random() * 8 + 4,
              height: Math.random() * 8 + 4,
              background: features[i % features.length]?.color || "#3B82F6",
              borderRadius: "50%",
              opacity: 0.3,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </Container>
    </Box>
  );
};

export default ModernUserDashboard;
