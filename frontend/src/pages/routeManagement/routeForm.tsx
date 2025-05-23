import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Autocomplete,
  Select,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  IconButton,
  Divider,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllDrivers, getAllBusStops } from "../../store/user/adminThunk";
import { BusStopType } from "../../types/stop.types";
import { DriverType } from "../../types/driver.types";
import theme from "../../theme";

interface RouteFormProps {
  selectedRoute: {
    id: string;
    routeName: string;
    routeNumber: string;
    vehicleNumber: string;
    driver: DriverType;
    busStops: BusStopType[];
  } | null;
  onRouteChange: (
    field: string,
    value: string | DriverType | BusStopType[]
  ) => void;
}

const RouteForm: React.FC<RouteFormProps> = ({
  selectedRoute,
  onRouteChange,
}) => {
  const dispatch = useAppDispatch();
  const [routeNumberError, setRouteNumberError] = useState<string | null>(null);
  const [selectedBusStop, setSelectedBusStop] = useState<BusStopType | null>(
    null
  );

  const drivers = useAppSelector((state) => state.adminSlice.drivers) || [];
  const busStops = useAppSelector((state) => state.adminSlice.busStops) || [];

  useEffect(() => {
    dispatch(getAllDrivers());
    dispatch(getAllBusStops());
  }, [dispatch]);

  const handleRouteNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numberValue = parseInt(value, 10);

    if (isNaN(numberValue)) {
      setRouteNumberError("Route number must be a valid number.");
    } else if (numberValue < 1 || numberValue > 15) {
      setRouteNumberError("Route number must be between 1 and 15.");
    } else {
      setRouteNumberError(null);
    }

    onRouteChange("routeNumber", value);
  };

  const handleDriverChange = (e: { target: { value: string } }) => {
    const selectedDriver = drivers.find(
      (driver) => driver && driver.id === e.target.value
    );
    if (selectedDriver) {
      onRouteChange("driver", selectedDriver);
    }
  };

  const handleBusStopChange = (
    _: React.SyntheticEvent,
    newValue: BusStopType | null
  ) => {
    setSelectedBusStop(newValue);
  };

  const handleAddBusStop = () => {
    if (selectedBusStop && selectedRoute) {
      const alreadyExists = selectedRoute.busStops.some(
        (stop) => stop && stop.id === selectedBusStop.id
      );

      if (!alreadyExists) {
        const updatedStops = [...selectedRoute.busStops, selectedBusStop];
        onRouteChange("busStops", updatedStops);
      }

      setSelectedBusStop(null);
    }
  };

  const handleRemoveBusStop = (stopId: string) => {
    if (selectedRoute) {
      const updatedStops = selectedRoute.busStops.filter(
        (stop) => stop && stop.id !== stopId
      );
      onRouteChange("busStops", updatedStops);
    }
  };

  if (!selectedRoute) {
    return <Typography padding={2}>No route selected.</Typography>;
  }

  const currentBusStops = selectedRoute.busStops || [];

  const availableBusStops = busStops.filter(
    (stop) =>
      stop && stop.id && !currentBusStops.some((s) => s && s.id === stop.id)
  );

  return (
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
      <TextField
        label="Route Name"
        value={selectedRoute.routeName || ""}
        onChange={(e) => onRouteChange("routeName", e.target.value)}
        fullWidth
        required
      />

      <TextField
        label="Route Number"
        value={selectedRoute.routeNumber || ""}
        onChange={handleRouteNumberChange}
        fullWidth
        error={!!routeNumberError}
        helperText={routeNumberError}
        type="number"
        inputProps={{ min: 1, max: 15 }}
        required
      />

      <TextField
        label="Vehicle Number"
        value={selectedRoute.vehicleNumber || ""}
        onChange={(e) => onRouteChange("vehicleNumber", e.target.value)}
        fullWidth
        required
      />

      <FormControl fullWidth required>
        <InputLabel id="driver-label">Driver</InputLabel>
        <Select
          labelId="driver-label"
          value={selectedRoute.driver?.id || ""}
          onChange={handleDriverChange}
          label="Driver"
        >
          {drivers.map((driver) =>
            driver && driver.id ? (
              <MenuItem key={driver.id} value={driver.id}>
                {driver.fullName || "Unknown Driver"}
              </MenuItem>
            ) : null
          )}
        </Select>
      </FormControl>

      <Typography
        variant="h6"
        sx={{
          mt: 2,
          color: theme.palette.primary.main,
        }}
      >
        Bus Stops
      </Typography>
      <Divider />

      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Autocomplete
          options={availableBusStops}
          getOptionLabel={(option) => option?.stopName || "Unknown Stop"}
          value={selectedBusStop}
          onChange={handleBusStopChange}
          isOptionEqualToValue={(option, value) =>
            option && value && option.id === value.id
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Bus Stop"
              placeholder="Select a stop to add"
              fullWidth
            />
          )}
          sx={{ flexGrow: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddBusStop}
          disabled={!selectedBusStop}
          startIcon={<Add />}
        >
          Add Stop
        </Button>
      </Box>

      <Paper
        variant="outlined"
        sx={{
          mt: 2,
          maxHeight: 200,
          overflow: "auto",
          p: currentBusStops.length ? 0 : 2,
        }}
      >
        {currentBusStops.length > 0 ? (
          <List dense>
            {currentBusStops.map((stop, index) =>
              stop && stop.id ? (
                <ListItem
                  key={stop.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemoveBusStop(stop.id)}
                      size="small"
                    >
                      <Delete fontSize="small" color="error" />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={`${index + 1}. ${stop.stopName || "Unknown Stop"}`}
                  />
                </ListItem>
              ) : null
            )}
          </List>
        ) : (
          <Typography variant="body2" color="secondary" align="center">
            No bus stops added yet. Add stops using the selector above.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default RouteForm;
