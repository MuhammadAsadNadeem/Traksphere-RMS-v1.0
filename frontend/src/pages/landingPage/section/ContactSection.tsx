import React from "react";
import { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Fade,
  Slide,
  Alert,
  CircularProgress,
  alpha,
  useTheme,
  Stack,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationOnIcon,
  Send as SendIcon,
  CheckCircle as CheckCircleIcon,
  Message as MessageIcon,
  ContentCopy as CopyIcon,
} from "@mui/icons-material";
import { useAppDispatch } from "../../../store/hooks";
import messageThunk from "../../../store/user/messageThunk";
import toaster from "../../../utils/toaster";
import { ContactFormType } from "../../../types/message.types";

interface ContactInfoItem {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
  color: string;
  copyable?: boolean;
}

const ContactSection: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<ContactFormType>({
    fullName: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormType, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof ContactFormType]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormType, string>> = {};

    // Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
      newErrors.fullName = "Name should only contain letters and spaces";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      await dispatch(
        messageThunk.sendMessage({
          fullName: formData.fullName,
          email: formData.email,
          message: formData.message,
        })
      ).unwrap();

      setIsSubmitted(true);
      setFormData({ fullName: "", email: "", message: "" });

      toaster.success("Message sent successfully!");

      // Reset success state after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error: unknown) {
      console.error("Failed to send message:", error);
      if (error && typeof error === "object" && "message" in error) {
        toaster.error(
          (error as { message?: string }).message || "Failed to send message"
        );
      } else {
        toaster.error("Failed to send message");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const contactInfo: ContactInfoItem[] = [
    {
      icon: EmailIcon,
      label: "Email Us",
      value: "traksphere@gmail.com",
      href: "mailto:traksphere@gmail.com",
      color: theme.palette.primary.main,
      copyable: true,
    },
    {
      icon: PhoneIcon,
      label: "Call Us",
      value: "+92 320 9450014",
      href: "tel:+923209450014",
      color: theme.palette.success.main,
      copyable: true,
    },
    {
      icon: LocationOnIcon,
      label: "Visit Us",
      value:
        "University of Engineering and Technology, Lahore (New Campus)\nElectrical Engineering Department",
      href: "https://maps.google.com",
      color: theme.palette.secondary.main,
    },
  ];

  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
      backgroundColor: alpha(theme.palette.background.paper, 0.9),
      transition: "all 0.3s ease",
      "& fieldset": {
        borderColor: alpha(theme.palette.divider, 0.3),
        borderWidth: 1,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
        boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
      },
    },
    "& .MuiInputLabel-root": {
      "&.Mui-focused": {
        color: theme.palette.primary.main,
        fontWeight: 600,
      },
    },
  };

  return (
    <section id="contact">
      <Box
        sx={{
          minHeight: "100vh",
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 50%, ${theme.palette.primary.dark} 100%)`,
          position: "relative",
          overflow: "hidden",
          py: { xs: 6, md: 10 },
        }}
      >
        {/* Animated Background Pattern */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `radial-gradient(circle at 30px 30px, ${alpha(
              theme.palette.common.white,
              0.08
            )} 2px, transparent 0)`,
            backgroundSize: "60px 60px",
            animation: "float 20s ease-in-out infinite",
            "@keyframes float": {
              "0%, 100%": { transform: "translateY(0px)" },
              "50%": { transform: "translateY(-10px)" },
            },
          }}
        />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          {/* Header Section */}
          <Fade in timeout={1000}>
            <Box textAlign="center" mb={{ xs: 6, md: 10 }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: { xs: 70, md: 90 },
                  height: { xs: 70, md: 90 },
                  background: `linear-gradient(45deg, ${theme.palette.error.main}, ${theme.palette.info.main})`,
                  borderRadius: 4,
                  mb: 3,
                  boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                  animation: "pulse 2s ease-in-out infinite",
                  "@keyframes pulse": {
                    "0%, 100%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.05)" },
                  },
                }}
              >
                <EmailIcon
                  sx={{
                    fontSize: { xs: 35, md: 45 },
                    color: theme.palette.common.white,
                  }}
                />
              </Box>

              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontWeight: 900,
                  background: `linear-gradient(45deg, ${
                    theme.palette.common.white
                  }, ${alpha(theme.palette.common.white, 0.7)})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 3,
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                  letterSpacing: "-0.02em",
                }}
              >
                Get in Touch
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  color: alpha(theme.palette.common.white, 0.9),
                  maxWidth: 700,
                  mx: "auto",
                  lineHeight: 1.6,
                  fontSize: { xs: "1.1rem", md: "1.4rem" },
                  fontWeight: 400,
                }}
              >
                Have questions about TrakSphere? We're here to help you optimize
                your fleet management experience with cutting-edge solutions.
              </Typography>

              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                sx={{ mt: 4 }}
              >
                <Chip
                  label="Quick Response"
                  sx={{
                    backgroundColor: alpha(theme.palette.success.main, 0.2),
                    color: theme.palette.common.white,
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label="24/7 Support"
                  sx={{
                    backgroundColor: alpha(theme.palette.info.main, 0.2),
                    color: theme.palette.common.white,
                    fontWeight: 600,
                  }}
                />
              </Stack>
            </Box>
          </Fade>

          <Grid container spacing={{ xs: 3, md: 6 }}>
            {/* Contact Form */}
            <Grid item xs={12} lg={8}>
              <Slide direction="up" in timeout={1200}>
                <Card
                  elevation={0}
                  sx={{
                    background: alpha(theme.palette.common.white, 0.98),
                    backdropFilter: "blur(20px)",
                    borderRadius: 5,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.1)",
                    border: `1px solid ${alpha(
                      theme.palette.common.white,
                      0.3
                    )}`,
                    overflow: "hidden",
                  }}
                >
                  <CardContent sx={{ p: { xs: 4, md: 6 } }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={3}
                      mb={5}
                    >
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          borderRadius: 3,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: `0 8px 25px ${alpha(
                            theme.palette.primary.main,
                            0.3
                          )}`,
                        }}
                      >
                        <MessageIcon
                          sx={{
                            color: theme.palette.common.white,
                            fontSize: 28,
                          }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          variant="h4"
                          fontWeight="bold"
                          color="text.primary"
                          sx={{ mb: 1 }}
                        >
                          Send us a Message
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          We'll get back to you within 24 hours
                        </Typography>
                      </Box>
                    </Stack>

                    {isSubmitted && (
                      <Fade in={isSubmitted}>
                        <Alert
                          icon={<CheckCircleIcon fontSize="inherit" />}
                          severity="success"
                          sx={{
                            mb: 4,
                            borderRadius: 3,
                            backgroundColor: alpha(
                              theme.palette.success.main,
                              0.1
                            ),
                            border: `1px solid ${alpha(
                              theme.palette.success.main,
                              0.3
                            )}`,
                            "& .MuiAlert-icon": {
                              fontSize: "1.5rem",
                            },
                          }}
                        >
                          <Typography variant="body1" fontWeight="medium">
                            Message sent successfully! We'll get back to you
                            soon.
                          </Typography>
                        </Alert>
                      </Fade>
                    )}

                    <Box component="form" onSubmit={handleSubmit} noValidate>
                      <Stack spacing={4}>
                        <TextField
                          name="fullName"
                          label="Full Name"
                          fullWidth
                          value={formData.fullName}
                          onChange={handleInputChange}
                          error={Boolean(errors.fullName)}
                          helperText={errors.fullName}
                          autoComplete="name"
                          sx={inputStyles}
                        />

                        <TextField
                          name="email"
                          label="Email Address"
                          type="email"
                          fullWidth
                          value={formData.email}
                          onChange={handleInputChange}
                          error={Boolean(errors.email)}
                          helperText={errors.email}
                          autoComplete="email"
                          sx={inputStyles}
                        />

                        <TextField
                          name="message"
                          label="Your Message"
                          multiline
                          rows={6}
                          fullWidth
                          value={formData.message}
                          onChange={handleInputChange}
                          error={Boolean(errors.message)}
                          helperText={errors.message}
                          placeholder="Tell us how we can help you..."
                          sx={inputStyles}
                        />

                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          fullWidth
                          disabled={isSubmitting}
                          startIcon={
                            isSubmitting ? (
                              <CircularProgress size={20} color="inherit" />
                            ) : (
                              <SendIcon />
                            )
                          }
                          sx={{
                            height: 64,
                            borderRadius: 3,
                            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            boxShadow: `0 8px 25px ${alpha(
                              theme.palette.primary.main,
                              0.4
                            )}`,
                            fontSize: "1.1rem",
                            fontWeight: 600,
                            textTransform: "none",
                            "&:hover": {
                              background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                              boxShadow: `0 12px 35px ${alpha(
                                theme.palette.secondary.main,
                                0.5
                              )}`,
                              transform: "translateY(-2px)",
                            },
                            "&:disabled": {
                              background: alpha(
                                theme.palette.action.disabled,
                                0.3
                              ),
                            },
                            transition: "all 0.3s ease",
                          }}
                        >
                          {isSubmitting ? "Sending Message..." : "Send Message"}
                        </Button>
                      </Stack>
                    </Box>
                  </CardContent>
                </Card>
              </Slide>
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12} lg={4}>
              <Slide direction="left" in timeout={1400}>
                <Box
                  sx={{
                    p: { xs: 4, md: 5 },
                    backgroundColor: alpha(theme.palette.common.white, 0.15),
                    borderRadius: 5,
                    boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
                    height: "90%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    color: theme.palette.common.white,
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${alpha(
                      theme.palette.common.white,
                      0.2
                    )}`,
                  }}
                >
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ mb: 4, textAlign: "center" }}
                  >
                    Contact Information
                  </Typography>

                  <Stack spacing={4}>
                    {contactInfo.map(
                      ({ icon: Icon, label, value, href, color, copyable }) => (
                        <Box
                          key={label}
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 3,
                            p: 3,
                            borderRadius: 3,
                            backgroundColor: alpha(
                              theme.palette.common.white,
                              0.1
                            ),
                            transition: "all 0.3s ease",
                            "&:hover": {
                              backgroundColor: alpha(
                                theme.palette.common.white,
                                0.2
                              ),
                              transform: "translateY(-2px)",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              color,
                              backgroundColor: alpha(color, 0.2),
                              borderRadius: 2,
                              p: 1.5,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              minWidth: 48,
                              minHeight: 48,
                            }}
                          >
                            <Icon fontSize="medium" />
                          </Box>

                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="subtitle1"
                              fontWeight="bold"
                              sx={{ mb: 1 }}
                            >
                              {label}
                            </Typography>

                            {href ? (
                              <Typography
                                variant="body2"
                                component="a"
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  color: theme.palette.common.white,
                                  textDecoration: "none",
                                  whiteSpace: "pre-line",
                                  "&:hover": {
                                    textDecoration: "underline",
                                  },
                                }}
                              >
                                {value}
                              </Typography>
                            ) : (
                              <Typography
                                variant="body2"
                                sx={{ whiteSpace: "pre-line" }}
                              >
                                {value}
                              </Typography>
                            )}
                          </Box>

                          {copyable && (
                            <Tooltip
                              title={copiedField === label ? "Copied!" : "Copy"}
                            >
                              <IconButton
                                size="small"
                                onClick={() => handleCopy(value, label)}
                                sx={{
                                  color: theme.palette.common.white,
                                  "&:hover": {
                                    backgroundColor: alpha(
                                      theme.palette.common.white,
                                      0.1
                                    ),
                                  },
                                }}
                              >
                                <CopyIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Box>
                      )
                    )}
                  </Stack>
                </Box>
              </Slide>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </section>
  );
};

export default ContactSection;
