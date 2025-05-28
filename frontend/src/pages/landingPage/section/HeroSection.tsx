import type React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  alpha,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  LocationOn,
  DirectionsBus,
  NotificationsActive,
  Schedule,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { routes } from "../../../routes";

const HeroSection: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleScrollDown = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <section id="home">
      <Box
        component="section"
        sx={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{ position: "relative", pt: 10, zIndex: 2 }}
        >
          <Box
            sx={{
              textAlign: "center",
              color: theme.palette.text.primary,
              maxWidth: "800px",
              mx: "auto",
              px: { xs: 2, sm: 4 },
            }}
          >
            {/* Animated Bus Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [1, 0.8, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: "50%",
                      backgroundColor: alpha(theme.palette.primary.light, 0.2),
                      backdropFilter: "blur(10px)",
                      border: `2px solid ${alpha(
                        theme.palette.primary.light,
                        0.3
                      )}`,
                    }}
                  >
                    <DirectionsBus
                      sx={{ fontSize: 48, color: theme.palette.primary.main }}
                    />
                  </Box>
                </motion.div>
              </Box>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  mb: 3,
                  letterSpacing: "-1px",
                  color: theme.palette.primary.main,
                }}
              >
                Track Your University Bus in{" "}
                <Box
                  component="span"
                  sx={{
                    background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Real-Time
                </Box>
              </Typography>
            </motion.div>

            {/* Subheadline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
                  fontWeight: 400,
                  lineHeight: 1.6,
                  mb: 5,
                  maxWidth: "600px",
                  mx: "auto",
                }}
              >
                Stay safe, stay updated with live GPS tracking and route info
              </Typography>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                component={motion.button}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                variant="contained"
                size="large"
                onClick={() => navigate(routes.signup)}
                sx={{
                  fontSize: { xs: "1.1rem", sm: "1.2rem" },
                  fontWeight: 700,
                  textTransform: "none",
                  px: { xs: 4, sm: 6 },
                  py: { xs: 1.5, sm: 2 },
                  borderRadius: 3,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                  color: "white",
                  boxShadow: "0 8px 30px rgba(0, 34, 255, 0.2)",
                  "&:hover": {
                    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                    boxShadow: "0 12px 40px rgba(0, 34, 255, 0.4)",
                  },
                }}
              >
                Get Started
              </Button>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: 2,
                  mt: 6,
                }}
              >
                {[
                  {
                    text: "Live GPS Tracking",
                    icon: <LocationOn fontSize="small" />,
                  },
                  {
                    text: "Route Updates",
                    icon: <Schedule fontSize="small" />,
                  },
                  {
                    text: "Safety Alerts",
                    icon: <NotificationsActive fontSize="small" />,
                  },
                ].map((feature) => (
                  <motion.div
                    key={feature.text}
                    whileHover={{ y: -2, scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Box
                      sx={{
                        px: 3,
                        py: 1.5,
                        borderRadius: 25,
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        border: `1px solid ${alpha(
                          theme.palette.primary.main,
                          0.3
                        )}`,
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        "&:hover": {
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.2
                          ),
                        },
                      }}
                    >
                      {feature.icon}
                      {feature.text}
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Box>
        </Container>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            color: theme.palette.text.secondary,
            textAlign: "center",
            cursor: "pointer",
            zIndex: 2,
          }}
          onClick={handleScrollDown}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Typography variant="body2" sx={{ mb: 1 }}>
              Scroll Down
            </Typography>
            <KeyboardArrowDown sx={{ fontSize: 32 }} />
          </motion.div>
        </motion.div>
      </Box>
    </section>
  );
};

export default HeroSection;
