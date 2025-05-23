import { useState } from "react";
import { FormikHelpers, useFormik } from "formik";
import {
  Typography,
  Container,
  TextField,
  Button,
  Box,
  Card,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { changePasswordSchema } from "../../validationSchema";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { routes } from "../../routes";
import userThunk from "../../store/user/userThunk";
import { ChangePasswordType } from "../../types/user.types";
import toaster from "../../utils/toaster";
import theme from "../../theme";

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = (field: string) => {
    if (field === "current") {
      setShowCurrentPassword((prev) => !prev);
    } else if (field === "new") {
      setShowNewPassword((prev) => !prev);
    } else if (field === "confirm") {
      setShowConfirmPassword((prev) => !prev);
    }
  };

  const onSubmit = async (
    values: ChangePasswordType,
    { setSubmitting, resetForm }: FormikHelpers<ChangePasswordType>
  ) => {
    try {
      setSubmitting(true);
      await dispatch(userThunk.changePassword(values)).unwrap();
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
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: onSubmit,
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Container maxWidth="xs">
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
            Change Password
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              label="Current Password"
              type={showCurrentPassword ? "text" : "password"}
              name="currentPassword"
              placeholder="Enter your current password"
              variant="outlined"
              margin="normal"
              required
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.currentPassword &&
                Boolean(formik.errors.currentPassword)
              }
              helperText={
                formik.touched.currentPassword && formik.errors.currentPassword
              }
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => handleTogglePassword("current")}
                    edge="end"
                  >
                    {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />

            <TextField
              fullWidth
              label="New Password"
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              placeholder="Enter your new password"
              variant="outlined"
              margin="normal"
              required
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.newPassword && Boolean(formik.errors.newPassword)
              }
              helperText={
                formik.touched.newPassword && formik.errors.newPassword
              }
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => handleTogglePassword("new")}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm your new password"
              variant="outlined"
              margin="normal"
              required
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => handleTogglePassword("confirm")}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                p: 1.5,
                backgroundColor: theme.button.backgroundColor,
                color: theme.button.color,
                "&:hover": {
                  backgroundColor: theme.button.hoverBackgroundColor,
                },
              }}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Changing..." : "Change Password"}
            </Button>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default ChangePassword;
