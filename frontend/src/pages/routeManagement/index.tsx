import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Paper,
  Tooltip,
  Popover,
} from "@mui/material";
import { Edit, Delete, Add, MoreVert } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getAllRoutes,
  deleteRouteById,
  addNewRoute,
  editRouteById,
} from "../../store/user/adminThunk";
import DeleteConfirmationDialog from "../../components/DeleteDialogBox";
import RouteForm from "./routeForm";
import { RouteType } from "../../types/route.types";
import { BusStopType } from "../../types/stop.types";
import toaster from "../../utils/toaster";
import SearchBar from "../../components/SearchBar";
import SpanLoader from "../../components/SpanLoader";
import CustomNoRowsOverlay from "../../components/TableNoRowsOverlay";

const RouteManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const routes = useAppSelector((state) => state.adminSlice.routes);
  const [selectedRoute, setSelectedRoute] = useState<RouteType | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [routeToDelete, setRouteToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddMode, setIsAddMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedStopsRowId, setSelectedStopsRowId] = useState<string | null>(
    null
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllRoutes())
      .unwrap()
      .catch(() => {
        toaster.error("Failed to get routes.");
      })
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const routesWithDisplayId = Array.isArray(routes)
    ? routes.map((route, index) => ({
        ...route,
        displayId: index + 1,
        driverName: route.driver?.fullName || "N/A",
        stopsCount: route.busStops?.length || 0,
      }))
    : [];

  const handleEditRoute = (route: RouteType) => {
    setSelectedRoute(route);
    setIsAddMode(false);
    setOpenDialog(true);
  };

  const handleAddRoute = () => {
    setSelectedRoute({
      id: "",
      routeName: "",
      routeNumber: "",
      vehicleNumber: "",
      driver: {
        id: "",
        fullName: "",
        phoneNumber: "",
        cnicNumber: "",
      },
      busStops: [],
    });
    setIsAddMode(true);
    setOpenDialog(true);
  };

  const handleDeleteRoute = (routeId: string) => {
    setRouteToDelete(routeId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (routeToDelete) {
      dispatch(deleteRouteById(routeToDelete))
        .unwrap()
        .then(() => {
          toaster.success("Route deleted successfully!");
          setDeleteDialogOpen(false);
          dispatch(getAllRoutes());
        })
        .catch(() => {
          toaster.error("Failed to delete route.");
        });
    }
  };

  const handleSaveRoute = () => {
    if (!selectedRoute) {
      toaster.error("No route selected.");
      return;
    }

    if (
      !selectedRoute.routeName ||
      !selectedRoute.routeNumber ||
      !selectedRoute.vehicleNumber ||
      !selectedRoute.driver?.id
    ) {
      toaster.error("All required fields must be filled.");
      return;
    }

    if (selectedRoute.busStops.length === 0) {
      toaster.error("At least one bus stop must be added.");
      return;
    }

    const backendPayload = {
      id: selectedRoute.id,
      vehicleNumber: selectedRoute.vehicleNumber,
      routeName: selectedRoute.routeName,
      routeNumber: selectedRoute.routeNumber,
      driverId: selectedRoute.driver.id,
      busStopIds: selectedRoute.busStops
        .map((stop) => stop.id)
        .filter((id): id is string => !!id),
    };

    if (isAddMode) {
      dispatch(addNewRoute(backendPayload))
        .unwrap()
        .then(() => {
          toaster.success("Route added successfully!");
          setOpenDialog(false);
          dispatch(getAllRoutes());
        })
        .catch(() => {
          toaster.error("Failed to add route.");
        });
    } else {
      dispatch(
        editRouteById({ userId: selectedRoute.id, values: backendPayload })
      )
        .unwrap()
        .then(() => {
          toaster.success("Route updated successfully!");
          setOpenDialog(false);
          dispatch(getAllRoutes());
        })
        .catch(() => {
          toaster.error("Failed to update route.");
        });
    }
  };

  const handleStopsClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    rowId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedStopsRowId(rowId);
  };

  const handleStopsClose = () => {
    setAnchorEl(null);
    setSelectedStopsRowId(null);
  };

  const filteredRoutes = routesWithDisplayId.filter((route) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      route.routeName.toLowerCase().includes(lowerCaseQuery) ||
      route.routeNumber.toLowerCase().includes(lowerCaseQuery) ||
      route.vehicleNumber.toLowerCase().includes(lowerCaseQuery) ||
      route.driverName.toLowerCase().includes(lowerCaseQuery)
    );
  });

  const currentRouteStops = Array.isArray(routes)
    ? routes.find((r) => r.id === selectedStopsRowId)?.busStops || []
    : [];

  const columns: GridColDef[] = [
    { field: "displayId", headerName: "ID", width: 100 },
    { field: "routeName", headerName: "Route Name", width: 150 },
    { field: "routeNumber", headerName: "Route No", width: 130 },
    { field: "driverName", headerName: "Driver Name", width: 150 },
    { field: "vehicleNumber", headerName: "Vehicle Number", width: 150 },
    {
      field: "busStops",
      headerName: "Bus Stops",
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        const stops = params.row.busStops as BusStopType[];

        if (stops.length === 0) {
          return <Typography variant="body2">N/A</Typography>;
        }

        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              {stops.length > 0 ? `${stops.length} stops` : "N/A"}
            </Typography>
            <Tooltip title="View all stops">
              <IconButton
                size="small"
                onClick={(e) => handleStopsClick(e, params.row.id)}
              >
                <MoreVert fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: "flex" }}>
          <IconButton onClick={() => handleEditRoute(params.row)}>
            <Edit sx={{ color: theme.palette.primary.main }} />
          </IconButton>
          <IconButton onClick={() => handleDeleteRoute(params.row.id)}>
            <Delete sx={{ color: theme.palette.error.main }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ ml: 1, height: "80vh" }}>
      {isLoading ? (
        <SpanLoader />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              p: 3,
              mt: 10,
              mb: 2,
            }}
          >
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              placeholder="Search Route..."
              isMobile={isMobile}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: 2,
                mt: 2,
                color: theme.palette.primary.main,
                width: "95%",
              }}
            >
              Manage Routes
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "95%",
                mb: 2,
              }}
            >
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleAddRoute}
                sx={{
                  backgroundColor: theme.button.backgroundColor,
                  color: theme.button.color,
                  "&:hover": {
                    backgroundColor: theme.button.hoverBackgroundColor,
                  },
                  minWidth: isMobile ? "20%" : "auto",
                }}
              >
                Add Route
              </Button>
            </Box>

            <Paper
              sx={{
                height: 400,
                mt: 1,
                width: "95%",
              }}
            >
              {isLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <SpanLoader />
                </Box>
              ) : (
                <DataGrid
                  rows={filteredRoutes}
                  columns={columns}
                  getRowId={(row) => row.id}
                  initialState={{
                    pagination: { paginationModel: { pageSize: 10, page: 0 } },
                  }}
                  pageSizeOptions={[5, 10, 25, 50, 100]}
                  slots={{
                    noRowsOverlay: () => (
                      <CustomNoRowsOverlay message="No routes available" />
                    ),
                  }}
                  sx={{
                    "& .MuiDataGrid-columnHeader": {
                      backgroundColor: theme.table.backgroundColor,
                      color: theme.table.color,
                    },
                    "& .MuiDataGrid-footerContainer": {
                      backgroundColor: theme.table.backgroundColor,
                      color: theme.table.color,
                    },
                  }}
                />
              )}
            </Paper>
          </Box>

          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleStopsClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Paper
              sx={{ p: 2, maxWidth: 300, maxHeight: 400, overflow: "auto" }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  color: theme.palette.primary.main,
                }}
              >
                Bus Stops
              </Typography>

              {currentRouteStops.length > 0 ? (
                currentRouteStops.map((stop: BusStopType, index: number) => (
                  <Box key={stop.id || index} sx={{ mb: 1 }}>
                    <Typography variant="body1">
                      {index + 1}. {stop.stopName}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2">No stops available</Typography>
              )}
            </Paper>
          </Popover>

          <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                fontSize: "20px",
              }}
            >
              {isAddMode ? "Add New Route" : "Update Route"}
            </DialogTitle>
            <RouteForm
              selectedRoute={selectedRoute}
              onRouteChange={(field, value) =>
                setSelectedRoute({ ...selectedRoute!, [field]: value })
              }
            />
            <DialogActions
              sx={{
                backgroundColor: theme.table.backgroundColor,
                padding: "10px",
              }}
            >
              <Button
                onClick={() => setOpenDialog(false)}
                sx={{ color: theme.button.backgroundColor }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveRoute}
                sx={{
                  backgroundColor: theme.button.backgroundColor,
                  color: theme.button.color,
                  "&:hover": {
                    backgroundColor: theme.button.hoverBackgroundColor,
                  },
                }}
              >
                {isAddMode ? "Add" : "Save"}
              </Button>
            </DialogActions>
          </Dialog>

          <DeleteConfirmationDialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
            onConfirm={confirmDelete}
          />
        </>
      )}
    </Box>
  );
};

export default RouteManagement;
