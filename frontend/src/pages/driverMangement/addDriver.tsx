import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Card,
  Container,
  MenuItem,
} from "@mui/material";

const AddDriver: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    busNumber: "",
    routeNumber: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.name.trim()) newErrors.name = "Full name is required.";

    if (!form.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!/^\d{11}$/.test(form.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 11 digits.";
    }

    if (!form.busNumber) newErrors.busNumber = "Bus number is required.";
    if (!form.routeNumber) newErrors.routeNumber = "Bus number is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Profile Saved Successfully!");
      console.log("Form Data: ", form);
    }
  };

  return (
    <Container maxWidth="sm">
      <Card
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          boxShadow: 5,
          borderRadius: 2,
          gap: 2,
        }}
      >
        <Typography variant="h4" align="center" fontWeight="bold">
          Add Driver
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              name="Name"
              label="Full Name"
              value={form.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
              variant="outlined"
            />
          </Box>

          <TextField
            name="phoneNumber"
            label="Phone Number"
            type="tel"
            value={form.phoneNumber}
            onChange={handleChange}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
            fullWidth
            variant="outlined"
          />

          <TextField
            name="busNumber"
            label="Bus Number"
            value={form.busNumber}
            onChange={handleChange}
            error={!!errors.busNumber}
            helperText={errors.busNumber}
            fullWidth
            variant="outlined"
          ></TextField>
          <TextField
            name="route number"
            label="Route Number"
            select
            value={form.routeNumber}
            onChange={handleChange}
            error={!!errors.routeNumber}
            helperText={errors.routeNumber}
            fullWidth
            variant="outlined"
          >
            {" "}
            {Array.from({ length: 15 }, (_, i) => (
              <MenuItem key={i + 1} value={i + 1}>
                {i + 1}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ p: 1.5 }}
        >
          Save
        </Button>
      </Card>
    </Container>
  );
};

export default AddDriver;
