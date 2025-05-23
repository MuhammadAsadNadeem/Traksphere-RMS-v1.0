import { useFormik, FormikHelpers } from "formik";
import {
  Typography,
  Container,
  TextField,
  Button,
  Box,
  Card,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { forgotPasswordSchema } from "../../validationSchema";
import { ForgotPasswordType } from "../../types/auth.types";
import authThunk from "../../store/user/authThunk";
import toaster from "../../utils/toaster";
import SendOtpBtn from "../../components/SendOtpBtn";
import { routes } from "../../routes";
import MDLink from "../../components/MDLink";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const key = e.key;
    if (!/^\d$/.test(key) && key !== "Backspace") {
      e.preventDefault();
    }
  };

  const onSubmit = async (
    values: ForgotPasswordType,
    { setSubmitting, resetForm }: FormikHelpers<ForgotPasswordType>
  ) => {
    try {
      setSubmitting(true);
      await dispatch(authThunk.forgotPassword(values)).unwrap();
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
      email: "",
      code: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: onSubmit,
  });

  return (
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
          Forgot Password
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit}>
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
          <Box sx={{ mt: 4, display: "flex", width: "100%" }}>
            <TextField
              name="code"
              label="Enter 6-digit code"
              type="text"
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
            {formik.isSubmitting ? "Sending..." : "Forgot Password"}
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Back to <MDLink to={routes.login}>SignIn</MDLink>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default ForgotPassword;
