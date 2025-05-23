import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";
import { Delete, AddLocation } from "@mui/icons-material";
import toaster from "../../utils/toaster";
import DeleteConfirmationDialog from "../../components/DeleteDialogBox";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addNewStop,
  deleteStopById,
  getAllBusStops,
} from "../../store/user/adminThunk";
import SearchBar from "../../components/SearchBar";
import StopForm from "./stopForm";
import SpanLoader from "../../components/SpanLoader";
import CustomNoRowsOverlay from "../../components/TableNoRowsOverlay";

interface StopData {
  name: string;
  latitude: number;
  longitude: number;
}

const StopManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const stops = useAppSelector((state) => state.adminSlice?.busStops || []);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [stopToDelete, setStopToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllBusStops()).finally(() => setIsLoading(false));
  }, [dispatch]);

  const processedStops = (stops || [])
    .filter((stop) => stop)
    .map((stop, index) => ({
      ...stop,
      stopName: stop.stopName || "Unnamed Stop",
      latitude: stop.latitude || 0,
      longitude: stop.longitude || 0,
      displayId: index + 1,
      id: stop.id || `stop-${index + 1}`,
    }));

  const filteredStops = processedStops.filter((stop) =>
    Object.values(stop).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleAddStop = () => setOpenDialog(true);

  const handleDeleteStop = (stopId: string) => {
    setStopToDelete(stopId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (stopToDelete) {
      dispatch(deleteStopById(stopToDelete))
        .unwrap()
        .then(() => {
          toaster.success("Stop deleted successfully!");
          dispatch(getAllBusStops());
        })
        .catch(() => toaster.error("Failed to delete stop."))
        .finally(() => setDeleteDialogOpen(false));
    }
  };

  const handleSaveStop = (stopData: StopData) => {
    dispatch(
      addNewStop({
        stopName: stopData.name,
        latitude: stopData.latitude,
        longitude: stopData.longitude,
        id: "",
      })
    )
      .unwrap()
      .then(() => {
        toaster.success("Stop added successfully!");
        setOpenDialog(false);
        dispatch(getAllBusStops());
      })
      .catch(() => toaster.error("Failed to add stop."));
  };

  const columns: GridColDef[] = [
    { field: "displayId", headerName: "ID", width: 100 },
    { field: "stopName", headerName: "Stop Name", width: 200 },
    { field: "latitude", headerName: "Latitude", width: 150 },
    { field: "longitude", headerName: "Longitude", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleDeleteStop(params.row.id)}
          disabled={!params.row.id}
        >
          <Delete
            sx={{ color: params.row.id ? theme.palette.error.main : "gray" }}
          />
        </IconButton>
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
              placeholder="Search Stop..."
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
              Manage Stops
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
                startIcon={<AddLocation />}
                onClick={handleAddStop}
                sx={{
                  backgroundColor: theme.button.backgroundColor,
                  color: theme.palette.primary.contrastText,
                  "&:hover": {
                    backgroundColor: theme.button.hoverBackgroundColor,
                  },
                }}
              >
                Add Stop
              </Button>
            </Box>

            <Paper
              sx={{
                height: 400,
                mt: 2,
                width: "95%",
              }}
            >
              <DataGrid
                rows={filteredStops}
                columns={columns}
                getRowId={(row) => row.id}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10, page: 0 } },
                }}
                pageSizeOptions={[5, 10, 25, 50, 100]}
                slots={{
                  noRowsOverlay: () => (
                    <CustomNoRowsOverlay message="No Stop available" />
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
            </Paper>
          </Box>

          <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            fullWidth
            maxWidth="md"
          >
            <DialogTitle
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                fontSize: "20px",
              }}
            >
              Add New Stop
            </DialogTitle>
            <StopForm
              onSubmit={handleSaveStop}
              onClose={() => setOpenDialog(false)}
            />
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

export default StopManagement;
