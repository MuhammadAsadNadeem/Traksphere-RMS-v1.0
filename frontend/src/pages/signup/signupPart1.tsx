import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Card,
  Container,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormikHelpers, useFormik } from "formik";
import MDLink from "../../components/MDLink";
import { routes } from "../../routes";
import { useNavigate } from "react-router-dom";
import { signUpSchema } from "../../validationSchema";
import SendOtpBtn from "../../components/SendOtpBtn";

import authThunk from "../../store/user/authThunk";
import toaster from "../../utils/toaster";
import { useAppDispatch } from "../../store/hooks";
import { SignUpPart1Type } from "../../types/auth.types";

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const key = e.key;
    if (!/^\d$/.test(key) && key !== "Backspace") {
      e.preventDefault();
    }
  };

  const onSubmit = async (
    values: SignUpPart1Type,
    { setSubmitting, resetForm }: FormikHelpers<SignUpPart1Type>
  ) => {
    try {
      setSubmitting(true);
      await dispatch(authThunk.signup(values)).unwrap();
      resetForm();
      navigate(routes.profile, {
        state: {
          email: values.email,
        },
      });
    } catch (error) {
      toaster.error(error as string);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      code: "",
    },
    validationSchema: signUpSchema,
    onSubmit: onSubmit,
  });

  return (
    <Container
      maxWidth="xs"
      sx={{
        mt: "5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card
        sx={{
          width: "100%",
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
          SignUp
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
          <TextField
            name="email"
            label="Email"
            type="email"
            margin="normal"
            required
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            fullWidth
            variant="outlined"
          />
          <TextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            margin="normal"
            required
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            fullWidth
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            margin="normal"
            required
            type={showConfirmPassword ? "text" : "password"}
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
            fullWidth
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: "flex", width: "100%" }}>
            <TextField
              name="code"
              label="Enter 6-digit code"
              type="text"
              margin="normal"
              required
              value={formik.values.code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.code && Boolean(formik.errors.code)}
              helperText={formik.touched.code && formik.errors.code}
              fullWidth
              onKeyDown={handleKeyPress}
              inputProps={{
                maxLength: 6,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SendOtpBtn email={formik.values.email} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ p: 1.5 }}
            disabled={formik.isSubmitting}
          >
            SignUp
          </Button>
          <Typography variant="body2" align="center">
            Already have an account? <MDLink to={routes.login}>Login</MDLink>
          </Typography>
          <Typography variant="body2" align="center">
            <MDLink to={routes.forgotPassword}>Forgot Password?</MDLink>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default SignUp;
