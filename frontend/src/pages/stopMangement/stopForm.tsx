import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Card,
  Autocomplete,
  Button,
  DialogActions,
  CircularProgress,
} from "@mui/material";

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import axios from "axios";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { theme } from "../../theme";

interface Location {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

interface StopData {
  name: string;
  latitude: number;
  longitude: number;
}

interface StopFormProps {
  onSubmit: (stopData: StopData) => void;
  onClose: () => void;
}

const MapComponent: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 12);
  }, [center, map]);

  return null;
};

const StopForm: React.FC<StopFormProps> = ({ onSubmit, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [stopName, setStopName] = useState("");
  const [loading, setLoading] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  const defaultCenter: [number, number] = [30.3753, 69.3451]; // Default center (Pakistan)
  const center =
    selectedLocation &&
    !isNaN(parseFloat(selectedLocation.lat)) &&
    !isNaN(parseFloat(selectedLocation.lon))
      ? ([
          parseFloat(selectedLocation.lat),
          parseFloat(selectedLocation.lon),
        ] as [number, number])
      : defaultCenter;

  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const searchLocations = async (query: string) => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      const response = await axios.get<Location[]>(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}`
      );

      const validLocations = response.data.filter(
        (location: unknown): location is Location => {
          const loc = location as Partial<Location>;
          return (
            typeof loc.lat === "string" &&
            typeof loc.lon === "string" &&
            !isNaN(parseFloat(loc.lat)) &&
            !isNaN(parseFloat(loc.lon))
          );
        }
      );

      setLocations(validLocations);
    } catch (error) {
      console.error("Error searching locations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      searchLocations(value);
    }, 500);
  };

  const handleMarkerDragEnd = (event: L.LeafletEvent) => {
    const marker = event.target;
    const newLatLng = marker.getLatLng();
    setSelectedLocation({
      ...selectedLocation!,
      lat: newLatLng.lat.toString(),
      lon: newLatLng.lng.toString(),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!stopName.trim()) {
      alert("Stop Name is required!");
      return;
    }

    if (!selectedLocation) {
      alert("Please select a location!");
      return;
    }

    const stopData: StopData = {
      name: stopName.trim(),
      latitude: parseFloat(selectedLocation.lat),
      longitude: parseFloat(selectedLocation.lon),
    };

    onSubmit(stopData);

    setSelectedLocation(null);
    setStopName("");
    setSearchQuery("");
    setLocations([]);
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
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
      <Card elevation={0} sx={{ p: 3, borderRadius: "16px" }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <Autocomplete
            freeSolo
            options={locations}
            getOptionLabel={(option: string | Location) =>
              typeof option === "string" ? option : option.display_name
            }
            inputValue={searchQuery}
            onInputChange={(_, value) => handleSearchChange(value)}
            onChange={(_, value: string | Location | null) => {
              if (value && typeof value !== "string") {
                setSelectedLocation(value as Location);
              } else {
                setSelectedLocation(null);
              }
            }}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Location"
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress
                          sx={{ color: theme.palette.primary.dark }}
                          size={20}
                        />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />

          <Box sx={{ height: "400px", width: "100%", mt: 2 }}>
            <MapContainer
              center={center}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <MapComponent center={center} />
              {selectedLocation && (
                <Marker
                  position={[
                    parseFloat(selectedLocation.lat),
                    parseFloat(selectedLocation.lon),
                  ]}
                  icon={customIcon}
                  draggable={true}
                  eventHandlers={{
                    dragend: handleMarkerDragEnd,
                  }}
                />
              )}
            </MapContainer>
          </Box>

          <TextField
            label="Stop Name"
            value={stopName}
            onChange={(e) => setStopName(e.target.value)}
            fullWidth
            required
            sx={{ mt: 2 }}
          />

          <DialogActions>
            <Button
              onClick={onClose}
              sx={{ color: theme.button.backgroundColor }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              sx={{
                backgroundColor: theme.button.backgroundColor,
                color: theme.button.color,
                "&:hover": {
                  backgroundColor: theme.button.hoverBackgroundColor,
                },
              }}
              variant="contained"
            >
              Add Stop
            </Button>
          </DialogActions>
        </Box>
      </Card>
    </Box>
  );
};

export default StopForm;
