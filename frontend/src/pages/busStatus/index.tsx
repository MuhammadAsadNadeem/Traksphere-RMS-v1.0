import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Card, CardContent, Typography } from "@mui/material";
import BatteryState from "../../components/BatteryState";
import SignalStrength from "../../components/SignalStength";
import SpeedGuage from "../../components/SpeedGuage";
import SpanLoader from "../../components/SpanLoader";
import theme from "../../theme";

// --- Constants ---
const DEFAULT_POSITION: L.LatLngExpression = [31.5497, 74.3436]; // Lahore
const busIcon = new L.Icon({
  iconUrl: "../../../src/assets/images/bus-stop.svg",
  iconSize: [60, 60],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// --- Component ---
const BusStatus: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const busMarker = useRef<L.Marker | null>(null);

  const [, setMapReady] = useState(false);
  const [isDataReceived, setIsDataReceived] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [internalBattery, setInternalBattery] = useState(100);
  const [externalBattery, setExternalBattery] = useState(100);
  const [signalStrength, setSignalStrength] = useState(20);
  const [speed, setSpeed] = useState(0);

  // --- Initialize Map with default location ---
  const initializeMap = (latLng: L.LatLngExpression) => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current).setView(latLng, 13);
    L.tileLayer("https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
      maxZoom: 20,
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }).addTo(map);

    const marker = L.marker(latLng, { icon: busIcon })
      .addTo(map)
      .bindPopup("Bus Initial Location")
      .openPopup();

    mapInstance.current = map;
    busMarker.current = marker;
    setMapReady(true);
  };

  const updateMarker = (latLng: L.LatLngExpression) => {
    if (busMarker.current) {
      busMarker.current.setLatLng(latLng);
    }
  };

  // --- WebSocket Connection ---
  useEffect(() => {
    initializeMap(DEFAULT_POSITION); // Initialize with Lahore always

    const socket = new WebSocket("ws://localhost:5000");

    const timeout = setTimeout(() => {
      if (!isDataReceived) {
        setIsLoading(false); // Stop showing loader even if no data
      }
    }, 5000);

    socket.onopen = () => console.log("WebSocket connected");

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const lat = parseFloat(data.latitude);
        const lng = parseFloat(data.longitude);
        if (isNaN(lat) || isNaN(lng)) return;

        const latLng = L.latLng(lat, lng);
        setInternalBattery(data.internal_battery_percent);
        setExternalBattery(data.external_battery_percent);
        setSignalStrength(data.signal_strength);
        setSpeed(data.speed);

        setIsDataReceived(true);
        setIsLoading(false);
        updateMarker(latLng);
        mapInstance.current?.setView(latLng, 13);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socket.onclose = () => console.log("WebSocket disconnected");
    socket.onerror = (err) => console.error("WebSocket error:", err);

    return () => {
      socket.close();
      clearTimeout(timeout);
    };
  });

  // --- Render Sections ---
  const renderStatusCard = () => (
    <Card sx={{ mt: 8, mb: 1, borderRadius: 3, boxShadow: 2 }}>
      <CardContent>
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, color: theme.palette.primary.main }}
        >
          Live Bus Status
        </Typography>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{ display: "flex", flexWrap: "wrap", rowGap: 1, columnGap: 1 }}
          >
            <Box
              sx={{
                flex: { xs: "1 1 100%", sm: "1 1 22%" },
                minWidth: "120px",
              }}
            >
              <BatteryState value={internalBattery} label="Internal Battery" />
            </Box>
            <Box
              sx={{
                flex: { xs: "1 1 100%", sm: "1 1 30%" },
                minWidth: "150px",
              }}
            >
              <BatteryState value={externalBattery} label="External Battery" />
            </Box>
            <Box
              sx={{
                flex: { xs: "1 1 100%", sm: "1 1 20%" },
                mt: 6,
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <SignalStrength value={signalStrength} />
            </Box>
            <Box
              sx={{
                flex: { xs: "1 1 100%", sm: "1 1 20%" },
                minWidth: "100px",
              }}
            >
              <SpeedGuage speed={speed} />
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const renderMapCard = () => (
    <Card
      sx={{
        height: { xs: "50vh", sm: "60vh", md: "75vh" },
        borderRadius: 3,
        boxShadow: 2,
      }}
    >
      <CardContent sx={{ height: "100%", p: 2 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, color: theme.palette.primary.main }}
        >
          Live Bus Location
        </Typography>
        <div
          ref={mapRef}
          style={{ width: "100%", height: "100%", borderRadius: "12px" }}
        />
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 1 }}>
      {renderStatusCard()}
      {isLoading ? (
        <Box
          sx={{
            height: "75vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SpanLoader />
        </Box>
      ) : (
        renderMapCard()
      )}
    </Box>
  );
};

export default BusStatus;
