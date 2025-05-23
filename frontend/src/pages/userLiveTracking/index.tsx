import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Card, CardContent, Typography } from "@mui/material";
// import ReactSpeedometer from "react-d3-speedometer";
import theme from "../../theme";
import ReactSpeedometer from "react-d3-speedometer";

// --- Constants ---
const DEFAULT_POSITION: L.LatLngExpression = [31.5204, 74.3587]; // Lahore
const busIcon = new L.Icon({
  iconUrl: "../../../src/assets/images/bus-stop.svg",
  iconSize: [60, 60],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const LiveTracking: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const busMarker = useRef<L.Marker | null>(null);
  const [speed, setSpeed] = useState(0);

  // ---------- Map helpers ----------
  const initializeMap = (latLng: L.LatLngExpression) => {
    if (!mapRef.current) return;

    // clean up any previous map
    if (mapInstance.current) mapInstance.current.remove();

    const map = L.map(mapRef.current).setView(latLng, 13);
    L.tileLayer("https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
      maxZoom: 20,
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }).addTo(map);

    // create the marker once
    busMarker.current = L.marker(latLng, { icon: busIcon })
      .addTo(map)
      .bindPopup("Live Bus Location")
      .openPopup();

    mapInstance.current = map;
  };

  const updateMarker = (latLng: L.LatLngExpression) => {
    busMarker.current?.setLatLng(latLng);
  };

  useEffect(() => {
    initializeMap(DEFAULT_POSITION);
  }, []);

  /* WebSocket: update position whenever data arrives */
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5000");

    socket.onopen = () => console.log("WebSocket connected");

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const lat = parseFloat(data.latitude);
        const lng = parseFloat(data.longitude);
        if (isNaN(lat) || isNaN(lng)) return;

        setSpeed(data.speed ?? 0);
        updateMarker([lat, lng]);
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };

    socket.onclose = () => console.log("WebSocket disconnected");
    socket.onerror = (err) => console.error("WebSocket error:", err);

    return () => socket.close();
  }, []);

  return (
    <Box sx={{ p: 1 }}>
      <Card sx={{ mt: 8, borderRadius: 3, boxShadow: 2 }}>
        <CardContent sx={{ p: 1 }}>
          <Typography
            variant="h5"
            sx={{ p: 1, fontWeight: 600, color: theme.palette.primary.main }}
          >
            Live Bus Location
          </Typography>

          {/* Speedometer */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Box
              sx={{
                width: 200,
                height: 150,
                background: "linear-gradient(145deg,#fff,#f0f0f0)",
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <ReactSpeedometer
                value={speed}
                maxValue={120}
                segments={7}
                needleColor="#2c3e50"
                startColor="#00ff9f"
                endColor="#ff4757"
                width={200}
                height={150}
                ringWidth={25}
                needleTransitionDuration={2000}
                currentValueText={`${speed} km/h`}
                textColor="#333"
                valueTextFontSize="18px"
                labelFontSize="10px"
              />
            </Box>
          </Box>

          {/* Map container */}
          <Box
            ref={mapRef}
            sx={{
              width: "100%",
              height: { xs: "50vh", sm: "60vh", md: "70vh" },
              borderRadius: 3,
            }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default LiveTracking;
