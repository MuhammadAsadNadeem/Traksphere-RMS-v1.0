import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Box,
  Card,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import MDLink from "../../components/MDLink";
import { routes } from "../../routes";
import { FormikHelpers, useFormik } from "formik";
import { loginSchema } from "../../validationSchema";
import authThunk from "../../store/user/authThunk";
import { useAppDispatch } from "../../store/hooks";
import { LoginType } from "../../types/auth.types";
import toaster from "../../utils/toaster";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/user/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Clear localStorage and Redux state on mount
  useEffect(() => {
    localStorage.removeItem("token");
    dispatch(logout()); // Clear token, user, profile, routes
  }, [dispatch]);

  const onSubmit = async (
    values: LoginType,
    { setSubmitting, resetForm }: FormikHelpers<LoginType>
  ) => {
    try {
      setSubmitting(true);
      await dispatch(authThunk.login(values)).unwrap();
      resetForm();
      navigate(routes.Dashboard);
    } catch (error) {
      toaster.error(typeof error === "string" ? error : "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
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
          Login
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
            fullWidth
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            variant="outlined"
            margin="normal"
            required
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            variant="outlined"
            margin="normal"
            required
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              p: 1.5,
            }}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          gap={1}
          mt={1}
        >
          <Typography variant="body2" align="center">
            Don't have an account? <MDLink to={routes.signup}>SignUp</MDLink>
          </Typography>
          <Typography variant="body2" align="center">
            <MDLink to={routes.forgotPassword}>Forgot Password?</MDLink>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default Login;
