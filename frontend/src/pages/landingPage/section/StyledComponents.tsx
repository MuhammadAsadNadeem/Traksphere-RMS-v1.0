import { styled } from "@mui/material/styles";
import { Box, Button, Container } from "@mui/material";
import { motion } from "framer-motion";

export const HeroContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  width: "100%",
  position: "relative",
  background: theme.palette.background.paper,
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("/assets/pattern.svg")',
    opacity: 0.05,
    animation: "float 20s linear infinite",
  },
  "@keyframes float": {
    "0%": { transform: "translateY(0)" },
    "50%": { transform: "translateY(-20px)" },
    "100%": { transform: "translateY(0)" },
  },
}));

export const HeroContent = styled(motion(Container))(() => ({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  position: "relative",
  zIndex: 1,
}));

export const CTAButton = styled(motion(Button))(({ theme }) => ({
  padding: "12px 32px",
  fontSize: "1.2rem",
  fontWeight: 600,
  borderRadius: "50px",
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: theme.palette.common.white,
  textTransform: "none",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
  },
}));

export const StatsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(4),
  marginTop: theme.spacing(6),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

export const StatCard = styled(motion.div)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  textAlign: "center",
  minWidth: "200px",
}));

export const SearchContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "600px",
  margin: "0 auto",
  marginTop: theme.spacing(4),
  position: "relative",
}));

export const FeatureGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: theme.spacing(3),
  marginTop: theme.spacing(6),
  width: "100%",
}));

export const FeatureCard = styled(motion.div)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

export const ScrollDownButton = styled(motion.div)(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(4),
  left: "50%",
  transform: "translateX(-50%)",
  cursor: "pointer",
  color: theme.palette.common.white,
}));
