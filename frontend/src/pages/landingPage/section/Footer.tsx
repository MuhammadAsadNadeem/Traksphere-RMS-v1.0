import { Box, Container, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";

const FooterContainer = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.grey[900]} 0%, ${theme.palette.primary.dark} 100%)`,
  color: "rgba(255, 255, 255, 0.7)",
  padding: theme.spacing(4, 0),
  textAlign: "center",
}));

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Footer = () => {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Typography variant="h6">TrakSphere</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Designed for university transportation.
            </Typography>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Divider sx={{ my: 2, borderColor: "rgba(255, 255, 255, 0.2)" }} />
            <Typography variant="body2">
              © {new Date().getFullYear()} TrakSphere. All rights reserved.
            </Typography>
          </motion.div>
        </motion.div>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
