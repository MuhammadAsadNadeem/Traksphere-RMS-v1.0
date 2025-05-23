import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Card,
  Container,
  Grid,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import toaster from "../../../utils/toaster";
import messageThunk from "../../../store/user/messageThunk";
import { ContactFormType } from "../../../types/message.types";
import { useAppDispatch } from "../../../store/hooks";

const ContactSection: React.FC = () => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<ContactFormType>({
    fullName: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormType, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormType, string>> = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(form.fullName)) {
      newErrors.fullName = "Name should only contain letters and spaces.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email address.";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      await dispatch(messageThunk.sendMessage(form)).unwrap();
      toaster.success("Message sent successfully!");
      setForm({ fullName: "", email: "", message: "" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Typography variant="h3" align="center" fontWeight="bold" mb={4}>
        Get in Touch
      </Typography>
      <Typography
        variant="h6"
        align="center"
        color="text.secondary"
        maxWidth={800}
        mx="auto"
        mb={6}
      >
        Have questions about TrakSphere? We're here to help you optimize your
        fleet management experience.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Card sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h5" fontWeight="bold" mb={3}>
              Send us a Message
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
              noValidate
            >
              <TextField
                name="fullName"
                label="Full Name"
                fullWidth
                value={form.fullName}
                onChange={handleChange}
                error={Boolean(errors.fullName)}
                helperText={errors.fullName}
                autoComplete="name"
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                fullWidth
                value={form.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
                autoComplete="email"
              />
              <TextField
                name="message"
                label="Message"
                multiline
                rows={4}
                fullWidth
                value={form.message}
                onChange={handleChange}
                error={Boolean(errors.message)}
                helperText={errors.message}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Send Message"}
              </Button>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h5" fontWeight="bold" mb={3}>
              Contact Information
            </Typography>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <EmailIcon color="primary" fontSize="large" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Email Us
                </Typography>
                <Typography variant="subtitle1">
                  traksphere@gmail.com
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <PhoneIcon color="primary" fontSize="large" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Call Us
                </Typography>
                <Typography variant="subtitle1">+92 320 9450014</Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <LocationOnIcon color="primary" fontSize="large" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Visit Us
                </Typography>
                <Typography variant="subtitle1">
                  University of Engineering and Technology, Lahore (New Campus)
                  <br />
                  Electrical Engineering Department
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactSection;
