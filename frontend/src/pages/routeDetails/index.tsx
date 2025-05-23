import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  IconButton,
  Collapse,
  CardContent,
  List,
  ListItem,
  ListItemText,
  useTheme,
  Alert,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllRoutes } from "../../store/user/userThunk";
import SpanLoader from "../../components/SpanLoader";
import { RouteType } from "../../types/user.types";

const RouteDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { routes, isLoading, error } = useAppSelector(
    (state) => state.userSlice
  );
  const [expandedRoute, setExpandedRoute] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    dispatch(getAllRoutes());
  }, [dispatch]);

  const toggleRoute = (routeId: string) => {
    setExpandedRoute((prev) => (prev === routeId ? null : routeId));
  };

  return (
    <Box
      sx={{
        p: theme.spacing(3),
        bgcolor: theme.palette.background.default,
        minHeight: "100vh",
        mt: { xs: theme.spacing(8), sm: theme.spacing(10) },
      }}
    >
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <SpanLoader />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: theme.spacing(2) }}>
          {error || "Failed to load routes. Please try again later."}
        </Alert>
      ) : (
        <>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ mt: theme.spacing(3), color: theme.palette.primary.main }}
            gutterBottom
          >
            Available Routes
          </Typography>
          <Box display="flex" flexDirection="column" gap={theme.spacing(2)}>
            {Array.isArray(routes) && routes.length > 0 ? (
              routes.map((route: RouteType) => (
                <Card
                  key={route.id}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    borderRadius: 2,
                    transition: "0.3s",
                    "&:hover": {
                      backgroundColor: theme.palette.secondary.dark,
                    },
                  }}
                >
                  <Box
                    onClick={() => toggleRoute(route.id)}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    p={theme.spacing(2)}
                    sx={{ cursor: "pointer" }}
                  >
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        Route Name:{" "}
                        <Typography component="span" fontWeight="light">
                          {route.routeName || "N/A"}
                        </Typography>
                      </Typography>
                      <Typography>
                        Route Number:{" "}
                        <Typography component="span" fontWeight="light">
                          {route.routeNumber || "N/A"}
                        </Typography>
                      </Typography>
                      <Typography>
                        Driver Name:{" "}
                        <Typography component="span" fontWeight="light">
                          {route.driver?.fullName || "N/A"}
                        </Typography>
                      </Typography>
                      <Typography>
                        Bus No:{" "}
                        <Typography component="span" fontWeight="light">
                          {route.vehicleNumber || "N/A"}
                        </Typography>
                      </Typography>
                    </Box>
                    <IconButton
                      sx={{ color: theme.palette.primary.contrastText }}
                    >
                      {expandedRoute === route.id ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </IconButton>
                  </Box>

                  <Collapse
                    in={expandedRoute === route.id}
                    timeout="auto"
                    unmountOnExit
                  >
                    <CardContent
                      sx={{
                        bgcolor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight="medium"
                        sx={{ borderBottom: "1px solid #ddd", pb: 1, mb: 2 }}
                      >
                        Bus Stops
                      </Typography>
                      <List>
                        {(route.busStops ?? []).length > 0 ? (
                          route.busStops.map((stop) => (
                            <ListItem key={stop.id}>
                              <ListItemText primary={stop.stopName || "N/A"} />
                            </ListItem>
                          ))
                        ) : (
                          <ListItem>
                            <ListItemText primary="No bus stops available." />
                          </ListItem>
                        )}
                      </List>
                    </CardContent>
                  </Collapse>
                </Card>
              ))
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="50vh"
              >
                <Typography
                  variant="body1"
                  color={theme.palette.secondary.main}
                >
                  No routes found.
                </Typography>
              </Box>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default RouteDetails;
