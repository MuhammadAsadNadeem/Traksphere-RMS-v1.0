import { useCallback, useEffect } from "react";
import {
  Box,
  Typography,
  CardContent,
  Card,
  useTheme,
  Grid,
  Skeleton,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { People, DirectionsBus, Place, Route } from "@mui/icons-material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import "leaflet.gridlayer.googlemutant";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllBusStops, getCounts } from "../../store/user/adminThunk";
import SpanLoader from "../../components/SpanLoader";
import MapIcon from "../../components/MapIcon";

const DEFAULT_CENTER: L.LatLngTuple = [31.5497, 74.3436];
const DEFAULT_ZOOM = 10;

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  color: string;
  loading?: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  icon,
  title,
  value,
  color,
  loading,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          height: "100%",
          background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
          backdropFilter: "blur(10px)",
          border: `1px solid ${color}20`,
          borderRadius: "16px",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: `0 8px 25px ${color}20`,
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box
              sx={{
                p: 1,
                borderRadius: "12px",
                backgroundColor: `${color}15`,
                color: color,
                mr: 2,
              }}
            >
              {icon}
            </Box>
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              {title}
            </Typography>
          </Box>
          {loading ? (
            <Skeleton variant="text" width="60%" height={45} />
          ) : (
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "text.primary",
                mt: 1,
              }}
            >
              {value.toLocaleString()}
            </Typography>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const AdminDashboard: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { counts, busStops, loading } = useAppSelector(
    (state) => state.adminSlice
  );

  const refreshData = useCallback(() => {
    dispatch(getCounts()).unwrap();
    dispatch(getAllBusStops()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const cardData = [
    {
      icon: <People sx={{ fontSize: 32 }} />,
      title: "Total Users",
      value: counts?.totalUsers || 0,
      color: theme.palette.primary.main,
    },
    {
      icon: <DirectionsBus sx={{ fontSize: 32 }} />,
      title: "Total Drivers",
      value: counts?.totalDrivers || 0,
      color: theme.palette.secondary.main,
    },
    {
      icon: <Place sx={{ fontSize: 32 }} />,
      title: "Bus Stops",
      value: counts?.totalBusStops || 0,
      color: theme.palette.success.main,
    },
    {
      icon: <Route sx={{ fontSize: 32 }} />,
      title: "Total Routes",
      value: counts?.totalRoutes || 0,
      color: theme.palette.info.main,
    },
  ];

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        flexGrow: 1,
        p: { xs: 2, sm: 3, md: 4 },
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1.5rem", sm: "2rem" },
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Dashboard Overview
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <DashboardCard
              icon={card.icon}
              title={card.title}
              value={card.value}
              color={card.color}
              loading={loading}
            />
          </Grid>
        ))}
      </Grid>

      <Card
        sx={{
          mt: 4,
          borderRadius: "16px",
          background: "background.paper",
          backdropFilter: "blur(10px)",
          boxShadow: theme.shadows[2],
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: theme.palette.primary.main,
              }}
            >
              Bus Stops Map
            </Typography>
            <Tooltip title="Fullscreen">
              <IconButton></IconButton>
            </Tooltip>
          </Box>

          <Box
            sx={{
              height: { xs: "300px", sm: "400px", md: "500px" },
              width: "100%",
              position: "relative",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            {loading ? (
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SpanLoader />
              </Box>
            ) : (
              <MapContainer
                center={DEFAULT_CENTER}
                zoom={DEFAULT_ZOOM}
                style={{ height: "100%", width: "100%" }}
                zoomControl={!isMobile}
              >
                <TileLayer
                  url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                  maxZoom={20}
                  subdomains={["mt0", "mt1", "mt2", "mt3"]}
                />
                <AnimatePresence>
                  {Array.isArray(busStops) && busStops.length > 0 ? (
                    busStops.map((stop) => (
                      <Marker
                        key={stop.id}
                        position={[stop.latitude, stop.longitude]}
                        icon={MapIcon}
                      >
                        <Popup>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {stop.stopName}
                          </Typography>
                        </Popup>
                      </Marker>
                    ))
                  ) : (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                        zIndex: 1000,
                        backgroundColor: "rgba(255,255,255,0.9)",
                        p: 2,
                        borderRadius: "8px",
                      }}
                    >
                      <Typography variant="body1">
                        No bus stops available.
                      </Typography>
                    </Box>
                  )}
                </AnimatePresence>
              </MapContainer>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminDashboard;
