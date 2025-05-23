import { Box } from "@mui/material";
import FeaturesSection from "./section/FeatureSection";
import HeroSection from "./section/HeroSection";
import ContactSection from "./section/ContactSection";
import Footer from "./section/Footer";
import AboutSection from "./section/AboutSection";

const LandingPage: React.FC = () => {
  return (
    <Box>
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </Box>
  );
};

export default LandingPage;
