import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Card,
  Container,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import { useFormik, FormikHelpers } from "formik";
import { userProfileSchema } from "../../validationSchema";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import authThunk from "../../store/user/authThunk";
import toaster from "../../utils/toaster";
import { routes } from "../../routes";
import { SignUpPart2Type } from "../../types/auth.types";
import { BusStopType } from "../../types/stop.types";
import { getBusStopNames } from "../../store/user/userThunk";

const Profile: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const email = location.state?.email;
  const [stops, setStops] = useState<BusStopType[]>([]);

  useEffect(() => {
    const fetchStops = async () => {
      try {
        const response = await dispatch(getBusStopNames()).unwrap();
        setStops(response);
      } catch {
        toaster.error("Failed to load bus stops");
      }
    };
    fetchStops();
  }, [dispatch]);

  const onSubmit = async (
    values: SignUpPart2Type,
    { setSubmitting, resetForm }: FormikHelpers<SignUpPart2Type>
  ) => {
    try {
      setSubmitting(true);
      await dispatch(authThunk.completeSignup(values)).unwrap();
      resetForm();
      navigate(routes.login);
    } catch (error) {
      toaster.error(error as string);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      departmentName: "",
      registrationNumber: "",
      phoneNumber: "",
      gender: "",
      routeNumber: "",
      stopArea: "",
      email: email || "",
    },
    validationSchema: userProfileSchema,
    onSubmit: onSubmit,
  });

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const key = e.key;
    if (!/^\d$/.test(key) && key !== "Backspace") {
      e.preventDefault();
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 7 }}>
      <Card
        sx={{
          my: 4,
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
          Create Profile
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              name="fullName"
              label="Full Name"
              margin="normal"
              required
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
              fullWidth
              variant="outlined"
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              name="departmentName"
              label="Department"
              margin="normal"
              required
              select
              value={formik.values.departmentName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.departmentName &&
                Boolean(formik.errors.departmentName)
              }
              helperText={
                formik.touched.departmentName && formik.errors.departmentName
              }
              fullWidth
              variant="outlined"
            >
              <MenuItem value="Electrical Engineering">
                Electrical Engineering
              </MenuItem>
              <MenuItem value="Computer Science">Computer Science</MenuItem>
              <MenuItem value="Software Engineering">
                Software Engineering
              </MenuItem>
              <MenuItem value="Biomedical Engineering">
                Biomedical Engineering
              </MenuItem>
              <MenuItem value="Chemical Engineering">
                Chemical Engineering
              </MenuItem>
              <MenuItem value="Biotechnology">Biotechnology</MenuItem>
              <MenuItem value="Basic Science">Basic Science</MenuItem>
            </TextField>
            <TextField
              name="registrationNumber"
              label="Registration No"
              margin="normal"
              required
              value={formik.values.registrationNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.registrationNumber &&
                Boolean(formik.errors.registrationNumber)
              }
              helperText={
                formik.touched.registrationNumber &&
                formik.errors.registrationNumber
              }
              fullWidth
              variant="outlined"
            />
          </Box>

          <TextField
            name="phoneNumber"
            label="Phone Number"
            margin="normal"
            required
            type="tel"
            onKeyDown={handleKeyPress}
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            fullWidth
            variant="outlined"
            inputProps={{
              maxLength: 11,
            }}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              name="gender"
              label="Gender"
              margin="normal"
              required
              select
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.gender && Boolean(formik.errors.gender)}
              helperText={formik.touched.gender && formik.errors.gender}
              fullWidth
              variant="outlined"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>

            <TextField
              name="routeNumber"
              label="Route Number"
              margin="normal"
              required
              select
              value={formik.values.routeNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.routeNumber && Boolean(formik.errors.routeNumber)
              }
              helperText={
                formik.touched.routeNumber && formik.errors.routeNumber
              }
              fullWidth
              variant="outlined"
            >
              {Array.from({ length: 15 }, (_, i) => (
                <MenuItem key={i + 1} value={(i + 1).toString()}>
                  {i + 1}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Autocomplete
            freeSolo
            options={stops.map((stop) => stop.stopName)}
            value={formik.values.stopArea}
            onChange={(_, value) =>
              formik.setFieldValue("stopArea", value || "")
            }
            onInputChange={(_, value) =>
              formik.setFieldValue("stopArea", value)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                name="stopArea"
                label="Stop Area"
                margin="normal"
                required
                onBlur={formik.handleBlur}
                error={
                  formik.touched.stopArea && Boolean(formik.errors.stopArea)
                }
                helperText={formik.touched.stopArea && formik.errors.stopArea}
                fullWidth
                variant="outlined"
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ p: 1.5 }}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Saving..." : "Save"}
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default Profile;
