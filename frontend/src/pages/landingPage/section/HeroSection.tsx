import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  Stack,
  alpha,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { routes } from "../../../routes";

const HeroSection: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: `
          radial-gradient(circle at 10% 20%, ${alpha(
            theme.palette.primary.light,
            0.15
          )} 0%, transparent 40%),
          radial-gradient(circle at 90% 80%, ${alpha(
            theme.palette.secondary.light,
            0.15
          )} 0%, transparent 40%)
        `,
      }}
    >
      {/* Animated floating elements */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          zIndex: -1,
        }}
      >
        {[1, 2, 3].map((i) => (
          <Box
            key={i}
            component={motion.div}
            initial={{ y: 0, x: i % 2 === 0 ? -100 : 100 }}
            animate={{
              y: [0, 100, 0],
              x: [i % 2 === 0 ? -100 : 100, i % 2 === 0 ? 100 : -100, 0],
              rotate: 360,
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "linear",
            }}
            sx={{
              position: "absolute",
              top: `${i * 25}%`,
              left: `${i * 20}%`,
              width: 400,
              height: 400,
              background: `linear-gradient(45deg, ${alpha(
                theme.palette.primary.main,
                0.1
              )} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
              borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
              filter: "blur(40px)",
              opacity: 0.4,
            }}
          />
        ))}
      </Box>

      <Container maxWidth="lg">
        <Stack
          alignItems="center"
          textAlign="center"
          spacing={{ xs: 4, md: 6 }}
          sx={{
            position: "relative",
            zIndex: 1,
            py: { xs: 8, md: 12 },
          }}
        >
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: {
                  xs: "2.75rem",
                  sm: "3.5rem",
                  md: "4.5rem",
                  lg: "5rem",
                },
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                maxWidth: "1200px",
                mx: "auto",
                mb: 3,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Revolutionizing Campus Transportation Through Smart Technology
            </Typography>

            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.25rem", md: "1.5rem" },
                color: "text.secondary",
                fontWeight: 400,
                lineHeight: 1.6,
                maxWidth: "800px",
                mx: "auto",
                mb: 4,
              }}
            >
              Optimize campus mobility with real-time tracking, predictive
              analytics, and AI-powered route optimization for students and
              faculty
            </Typography>

            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variant="contained"
              size="large"
              onClick={() => navigate(routes.signup)}
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 6,
                py: 2,
                borderRadius: 3,
                fontSize: "1.1rem",
                fontWeight: 700,
                textTransform: "none",
                background: `linear-gradient(150deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                boxShadow: `0 12px 24px ${alpha(
                  theme.palette.primary.main,
                  0.2
                )}`,
                "&:hover": {
                  boxShadow: `0 16px 32px ${alpha(
                    theme.palette.primary.main,
                    0.3
                  )}`,
                },
              }}
            >
              Start Free Trial
            </Button>
          </Box>

          {/* Stats Grid */}
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
              gap: 4,
              width: "100%",
              maxWidth: "1000px",
              mx: "auto",
              mt: { xs: 4, md: 8 },
            }}
          >
            {[
              { value: "50+", label: "Optimized Routes" },
              { value: "1000+", label: "Daily Commuters" },
              { value: "99.9%", label: "Service Reliability" },
            ].map((stat, index) => (
              <Box
                key={index}
                component={motion.div}
                whileHover={{ y: -5 }}
                sx={{
                  textAlign: "center",
                  p: 3,
                  background: alpha(theme.palette.background.paper, 0.8),
                  borderRadius: 4,
                  backdropFilter: "blur(12px)",
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  boxShadow: `0 8px 32px ${alpha(
                    theme.palette.primary.main,
                    0.05
                  )}`,
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: "2.25rem", md: "2.75rem" },
                    fontWeight: 800,
                    mb: 1,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 100%)`,
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    fontSize: "1.1rem",
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default HeroSection;
