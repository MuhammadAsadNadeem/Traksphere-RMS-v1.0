import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Box,
  Typography,
  Avatar,
  Fade,
  Link,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Stars as FeaturesIcon,
  Info as InfoIcon,
  ContactSupport as ContactIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/user/userSlice";
import { routes } from "../routes";
import logo from "../assets/images/logo.svg";

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => !!state.userSlice.token); // Ensure boolean
  const theme = useTheme();

  const links = [
    { name: "Home", url: "#home", icon: <HomeIcon /> },
    { name: "Features", url: "#features", icon: <FeaturesIcon /> },
    { name: "About", url: "#about", icon: <InfoIcon /> },
    { name: "Contact", url: "#contact", icon: <ContactIcon /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove only token
    dispatch(logout()); // Update Redux state
    navigate(routes.login); // Redirect
    handleMenuClose();
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: theme.palette.primary.main,
        boxShadow: theme.shadows[5],
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Fade in timeout={1000}>
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar
              src={logo}
              alt="TrakSphere"
              sx={{ width: 50, height: 50 }}
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: theme.palette.primary.contrastText,
                cursor: "pointer",
              }}
              onClick={() => navigate(routes.landingPage)} // Navigate to home
            >
              TRAKSPHERE
            </Typography>
          </Box>
        </Fade>

        <Box display={{ xs: "none", md: "flex" }} alignItems="center" gap={3}>
          {!isLogin &&
            links.map(({ name, url, icon }) => (
              <Button
                key={name}
                component={Link}
                href={routes.landingPage + url}
                color="inherit"
                sx={{
                  "&:hover": {
                    backgroundColor: theme.palette.primary.light,
                  },
                }}
                startIcon={icon}
              >
                {name}
              </Button>
            ))}
          {isLogin ? (
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                "&:hover": {
                  backgroundColor: theme.palette.primary.light,
                },
              }}
            >
              Logout
            </Button>
          ) : (
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<LoginIcon />}
                onClick={() => navigate(routes.login)}
                sx={{
                  "&:hover": {
                    backgroundColor: theme.palette.primary.light,
                  },
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<PersonAddIcon />}
                onClick={() => navigate(routes.signup)}
                sx={{
                  "&:hover": {
                    backgroundColor: theme.palette.primary.light,
                  },
                }}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Box>

        <IconButton
          size="large"
          edge="end"
          color="inherit"
          onClick={handleMenuClick}
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {!isLogin &&
            links.map(({ name, url, icon }) => (
              <MenuItem
                key={name}
                onClick={handleMenuClose}
                component={Link}
                href={routes.landingPage + url}
              >
                {icon} {name}
              </MenuItem>
            ))}
          <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
            {isLogin ? (
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  startIcon={<LoginIcon />}
                  onClick={() => {
                    navigate(routes.login);
                    handleMenuClose();
                  }}
                >
                  Login
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<PersonAddIcon />}
                  onClick={() => {
                    navigate(routes.signup);
                    handleMenuClose();
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
