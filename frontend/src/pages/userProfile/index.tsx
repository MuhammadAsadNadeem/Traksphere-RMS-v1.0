import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Avatar,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { UpdateProfileType } from "../../types/user.types";
import userThunk, { getBusStopNames } from "../../store/user/userThunk";
import toaster from "../../utils/toaster";
import SpanLoader from "../../components/SpanLoader";
import theme from "../../theme";

import { updateProfileSchema } from "../../validationSchema";
import * as Yup from "yup";

const UserProfile: React.FC = () => {
  const userProfile = useAppSelector((state) => state.userSlice.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UpdateProfileType | null>(null);
  const [stopNames, setStopNames] = useState<
    Array<{ id: string; stopName: string }>
  >([]);
  const dispatch = useAppDispatch();

  const busNumbers = Array.from({ length: 15 }, (_, i) => (i + 1).toString());
  const departments = [
    "Electrical Engineering",
    "Computer Science",
    "Software Engineering",
    "Biomedical Engineering",
    "Chemical Engineering",
    "Biotechnology",
    "Basic Science",
  ];
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (profile) {
      updateProfileSchema
        .validate(profile, { abortEarly: false })
        .then(() => setIsFormValid(true))
        .catch(() => setIsFormValid(false));
    }
  }, [profile]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await dispatch(userThunk.getProfile()).unwrap();
      } catch (error) {
        toaster.error(error as string);
      }
    };

    const fetchStopNames = async () => {
      try {
        const stops = await dispatch(getBusStopNames()).unwrap();
        setStopNames(stops);
      } catch (error) {
        console.error("Failed to fetch stop names:", error);
      }
    };
    if (!userProfile) {
      fetchProfile();
    } else {
      setProfile(userProfile);
    }

    fetchStopNames();
  }, [dispatch, userProfile]);

  const handleSave = async () => {
    try {
      if (isEditing && profile) {
        await updateProfileSchema.validate(profile, { abortEarly: false });
        await dispatch(userThunk.updateProfile(profile)).unwrap();
        toaster.success("Profile updated successfully!");
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          if (err.message) {
            toaster.error(err.message);
          }
        });
      } else {
        toaster.error(error as string);
      }
    } finally {
      handleToggle();
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile!,
      [name]: value,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile!,
      [name]: value,
    }));
  };

  const handleToggle = () => {
    setIsEditing((prev) => !prev);
  };

  function stringToColor(string: string) {
    let hash = 0;
    for (let i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

  function stringAvatar(name: string) {
    const nameParts = name.split(" ");
    const initials =
      nameParts.length > 1
        ? `${nameParts[0][0]}${nameParts[1][0]}`
        : `${nameParts[0][0] || ""}`;
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: { sm: 100 },
        height: { sm: 100 },
        margin: "0 auto",
      },
      children: initials.toUpperCase(),
    };
  }

  if (!profile) {
    return <SpanLoader />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        ml: 2,
        mr: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: { xs: 2, sm: 4 },
          maxWidth: { xs: "100%", sm: 700 },
          margin: "20px auto",
          textAlign: "center",
          borderRadius: 3,
        }}
      >
        <Box position="relative" mb={2}>
          <Avatar
            alt="Profile Picture"
            {...stringAvatar(profile.fullName || "")}
          />
        </Box>

        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
        >
          Welcome, {profile.fullName || ""}
        </Typography>
        <Typography
          color="gray"
          mb={3}
          sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
        >
          {userProfile?.email || ""}
        </Typography>

        <Box component="form" noValidate autoComplete="off">
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              marginBottom: 2,
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", sm: "calc(50% - 8px)" },
                flexShrink: 0,
              }}
            >
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={profile.fullName || ""}
                onChange={handleChange}
                disabled={!isEditing}
                size="small"
                error={/\d/.test(profile.fullName || "")}
                helperText={
                  /\d/.test(profile.fullName || "")
                    ? "Name should not contain numbers."
                    : ""
                }
              />
            </Box>

            <Box
              sx={{
                width: { xs: "100%", sm: "calc(50% - 8px)" },
                flexShrink: 0,
              }}
            >
              <FormControl fullWidth size="small">
                <InputLabel>Department</InputLabel>
                <Select
                  label="Department"
                  name="departmentName"
                  value={profile.departmentName || ""}
                  onChange={handleSelectChange}
                  disabled={!isEditing}
                >
                  {departments.map((dept) => (
                    <MenuItem key={dept} value={dept}>
                      {dept}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box
              sx={{
                width: { xs: "100%", sm: "calc(50% - 8px)" },
                flexShrink: 0,
              }}
            >
              <TextField
                fullWidth
                label="Registration Number"
                name="registrationNumber"
                value={profile.registrationNumber}
                onChange={handleChange}
                disabled={!isEditing}
                size="small"
              />
            </Box>

            <Box
              sx={{
                width: { xs: "100%", sm: "calc(50% - 8px)" },
                flexShrink: 0,
              }}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleChange}
                disabled={!isEditing}
                size="small"
                error={profile.phoneNumber?.length !== 11}
                helperText={
                  profile.phoneNumber?.length !== 11
                    ? "Phone number must be exactly 11 digits."
                    : ""
                }
              />
            </Box>

            <Box
              sx={{
                width: { xs: "100%", sm: "calc(50% - 8px)" },
                flexShrink: 0,
              }}
            >
              <FormControl fullWidth size="small">
                <InputLabel>Route Number</InputLabel>
                <Select
                  label="Bus Number"
                  name="routeNumber"
                  value={profile.routeNumber || ""}
                  onChange={handleSelectChange}
                  disabled={!isEditing}
                >
                  {busNumbers.map((bus) => (
                    <MenuItem key={bus} value={bus}>
                      {bus}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box
              sx={{
                width: { xs: "100%", sm: "calc(50% - 8px)" },
                flexShrink: 0,
              }}
            >
              {stopNames.length > 0 ? (
                <FormControl fullWidth size="small">
                  <InputLabel>Stop Area</InputLabel>
                  <Select
                    label="Stop Area"
                    name="stopArea"
                    value={profile.stopArea || ""}
                    onChange={handleSelectChange}
                    disabled={!isEditing}
                  >
                    {stopNames.map((stop) => (
                      <MenuItem key={stop.id} value={stop.stopName}>
                        {stop.stopName}
                      </MenuItem>
                    ))}
                    <MenuItem value="Other">Other (Please Specify)</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  fullWidth
                  label="Stop Area"
                  name="stopArea"
                  value={profile.stopArea || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  size="small"
                />
              )}
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: isEditing
                ? theme.button.backgroundColor
                : theme.button.hoverBackgroundColor,
              "&:hover": {
                backgroundColor: isEditing
                  ? theme.button.hoverBackgroundColor
                  : theme.button.backgroundColor,
              },
            }}
            startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
            onClick={isEditing ? handleSave : handleToggle}
            disabled={isEditing && !isFormValid}
          >
            {isEditing ? "Save" : "Edit Profile"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default UserProfile;
