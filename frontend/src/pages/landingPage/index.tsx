import { Box } from "@mui/material";
import HeroSection from "./section/HeroSection";
import ContactSection from "./section/ContactSection";
import Footer from "./section/Footer";
import AboutSection from "./section/AboutSection";
import FeatureSection from "./section/FeatureSetion";

const LandingPage: React.FC = () => {
  return (
    <Box>
      <HeroSection />
      <AboutSection />
      <FeatureSection />
      <ContactSection />
      <Footer />
    </Box>
  );
};

export default LandingPage;
